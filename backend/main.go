package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"google.golang.org/api/option"
)

type BlogPost struct {
	ID          string    `json:"id" firestore:"-"`
	Title       string    `json:"title" firestore:"title"`
	Slug        string    `json:"slug" firestore:"slug"`
	Excerpt     string    `json:"excerpt" firestore:"excerpt"`
	Content     string    `json:"content" firestore:"content"`
	ImageURL    string    `json:"imageUrl" firestore:"imageUrl"`
	Category    string    `json:"category" firestore:"category"`
	IsFeatured  bool      `json:"isFeatured" firestore:"isFeatured"`
	ReadTime    string    `json:"readTime" firestore:"readTime"`
	PublishedAt time.Time `json:"publishedAt" firestore:"publishedAt"`
	CreatedAt   time.Time `json:"createdAt" firestore:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt" firestore:"updatedAt"`
}

type Server struct {
	firestoreClient *firestore.Client
	authClient      *auth.Client
	router          *mux.Router
}

func NewServer(ctx context.Context) (*Server, error) {
	// Initialize Firebase
	opt := option.WithCredentialsFile("serviceAccountKey.json")
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		return nil, fmt.Errorf("error initializing app: %v", err)
	}

	// Initialize Firestore
	firestoreClient, err := app.Firestore(ctx)
	if err != nil {
		return nil, fmt.Errorf("error initializing firestore: %v", err)
	}

	// Initialize Auth
	authClient, err := app.Auth(ctx)
	if err != nil {
		return nil, fmt.Errorf("error initializing auth: %v", err)
	}

	s := &Server{
		firestoreClient: firestoreClient,
		authClient:      authClient,
		router:          mux.NewRouter(),
	}

	s.setupRoutes()
	return s, nil
}

func (s *Server) setupRoutes() {
	// Public routes
	s.router.HandleFunc("/api/posts", s.handleGetPosts).Methods("GET", "OPTIONS")
	s.router.HandleFunc("/api/posts/featured", s.handleGetFeaturedPost).Methods("GET", "OPTIONS")
	s.router.HandleFunc("/api/posts/{slug}", s.handleGetPostBySlug).Methods("GET", "OPTIONS")

	// Protected routes (require authentication)
	s.router.HandleFunc("/api/admin/posts", s.authMiddleware(s.handleCreatePost)).Methods("POST", "OPTIONS")
	s.router.HandleFunc("/api/admin/posts/{id}", s.authMiddleware(s.handleUpdatePost)).Methods("PUT", "OPTIONS")
	s.router.HandleFunc("/api/admin/posts/{id}", s.authMiddleware(s.handleDeletePost)).Methods("DELETE", "OPTIONS")
}

// Middleware to verify Firebase auth token
func (s *Server) authMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Missing authorization header", http.StatusUnauthorized)
			return
		}

		// Extract token from "Bearer <token>"
		token := authHeader[7:] // Remove "Bearer " prefix

		// Verify the token
		_, err := s.authClient.VerifyIDToken(context.Background(), token)
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		next(w, r)
	}
}

// GET /api/posts - Get all blog posts
func (s *Server) handleGetPosts(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	posts := []BlogPost{}

	iter := s.firestoreClient.Collection("posts").
		OrderBy("publishedAt", firestore.Desc).
		Documents(ctx)

	for {
		doc, err := iter.Next()
		if err != nil {
			break
		}

		var post BlogPost
		doc.DataTo(&post)
		post.ID = doc.Ref.ID
		posts = append(posts, post)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

// GET /api/posts/{slug} - Get single post by slug
func (s *Server) handleGetPostBySlug(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	slug := vars["slug"]

	ctx := context.Background()
	iter := s.firestoreClient.Collection("posts").
		Where("slug", "==", slug).
		Limit(1).
		Documents(ctx)

	doc, err := iter.Next()
	if err != nil {
		http.Error(w, "Post not found", http.StatusNotFound)
		return
	}

	var post BlogPost
	doc.DataTo(&post)
	post.ID = doc.Ref.ID

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
}

// GET /api/posts/featured - Get featured post
func (s *Server) handleGetFeaturedPost(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	iter := s.firestoreClient.Collection("posts").
		Where("isFeatured", "==", true).
		OrderBy("publishedAt", firestore.Desc).
		Limit(1).
		Documents(ctx)

	doc, err := iter.Next()
	if err != nil {
		http.Error(w, "No featured post found", http.StatusNotFound)
		return
	}

	var post BlogPost
	doc.DataTo(&post)
	post.ID = doc.Ref.ID

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
}

// POST /api/admin/posts - Create new post (protected)
func (s *Server) handleCreatePost(w http.ResponseWriter, r *http.Request) {
	var post BlogPost
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	post.CreatedAt = time.Now()
	post.UpdatedAt = time.Now()
	if post.PublishedAt.IsZero() {
		post.PublishedAt = time.Now()
	}

	ctx := context.Background()
	docRef, _, err := s.firestoreClient.Collection("posts").Add(ctx, post)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	post.ID = docRef.ID

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(post)
}

// PUT /api/admin/posts/{id} - Update post (protected)
func (s *Server) handleUpdatePost(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var post BlogPost
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	post.UpdatedAt = time.Now()

	ctx := context.Background()
	_, err := s.firestoreClient.Collection("posts").Doc(id).Set(ctx, post, firestore.MergeAll)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	post.ID = id

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(post)
}

// DELETE /api/admin/posts/{id} - Delete post (protected)
func (s *Server) handleDeletePost(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	ctx := context.Background()
	_, err := s.firestoreClient.Collection("posts").Doc(id).Delete(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func main() {
	ctx := context.Background()

	server, err := NewServer(ctx)
	if err != nil {
		log.Fatalf("Failed to initialize server: %v", err)
	}
	defer server.firestoreClient.Close()

	// Setup CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "https://amirthetrash.com"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	handler := c.Handler(server.router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatal(err)
	}
}