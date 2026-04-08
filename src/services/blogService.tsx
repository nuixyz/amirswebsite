import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl: string;
  category: string;
  isFeatured: boolean;
  readTime: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

class BlogService {
  async getAllPosts(): Promise<BlogPost[]> {
    const q = query(collection(db, "posts"), orderBy("publishedAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      publishedAt:
        doc.data().publishedAt?.toDate?.()?.toISOString() ??
        doc.data().publishedAt,
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() ?? doc.data().createdAt,
      updatedAt:
        doc.data().updatedAt?.toDate?.()?.toISOString() ?? doc.data().updatedAt,
    })) as BlogPost[];
  }

  async getPostBySlug(slug: string): Promise<BlogPost> {
    const q = query(
      collection(db, "posts"),
      where("slug", "==", slug),
      limit(1),
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) throw new Error("Post not found");
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      publishedAt:
        doc.data().publishedAt?.toDate?.()?.toISOString() ??
        doc.data().publishedAt,
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() ?? doc.data().createdAt,
      updatedAt:
        doc.data().updatedAt?.toDate?.()?.toISOString() ?? doc.data().updatedAt,
    } as BlogPost;
  }

  async getFeaturedPost(): Promise<BlogPost> {
    const q = query(
      collection(db, "posts"),
      where("isFeatured", "==", true),
      orderBy("publishedAt", "desc"),
      limit(1),
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) throw new Error("No featured post found");
    const d = snapshot.docs[0];
    return {
      id: d.id,
      ...d.data(),
      publishedAt:
        d.data().publishedAt?.toDate?.()?.toISOString() ?? d.data().publishedAt,
      createdAt:
        d.data().createdAt?.toDate?.()?.toISOString() ?? d.data().createdAt,
      updatedAt:
        d.data().updatedAt?.toDate?.()?.toISOString() ?? d.data().updatedAt,
    } as BlogPost;
  }

  async createPost(post: Partial<BlogPost>): Promise<BlogPost> {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, "posts"), {
      ...post,
      createdAt: now,
      updatedAt: now,
      publishedAt: post.publishedAt
        ? Timestamp.fromDate(new Date(post.publishedAt))
        : now,
    });
    return { id: docRef.id, ...post } as BlogPost;
  }

  async updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    await updateDoc(doc(db, "posts", id), {
      ...post,
      updatedAt: Timestamp.now(),
    });
    return { id, ...post } as BlogPost;
  }

  async deletePost(id: string): Promise<void> {
    await deleteDoc(doc(db, "posts", id));
  }
}

export const blogService = new BlogService();
