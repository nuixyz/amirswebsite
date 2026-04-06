export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  isFeatured: boolean;
  readTime: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

class BlogService {
  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem("authToken");

    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response;
  }

  // Public endpoints
  async getAllPosts(): Promise<BlogPost[]> {
    const response = await fetch(`${API_URL}/api/posts`);
    if (!response.ok) throw new Error("Failed to fetch posts");
    return response.json();
  }

  async getPostBySlug(slug: string): Promise<BlogPost> {
    const response = await fetch(`${API_URL}/api/posts/${slug}`);
    if (!response.ok) throw new Error("Failed to fetch post");
    return response.json();
  }

  async getFeaturedPost(): Promise<BlogPost> {
    const response = await fetch(`${API_URL}/api/posts/featured`);
    if (!response.ok) throw new Error("Failed to fetch featured post");
    return response.json();
  }

  // Admin endpoints (require authentication)
  async createPost(post: Partial<BlogPost>): Promise<BlogPost> {
    const response = await this.fetchWithAuth(`${API_URL}/api/admin/posts`, {
      method: "POST",
      body: JSON.stringify(post),
    });
    return response.json();
  }

  async updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    const response = await this.fetchWithAuth(
      `${API_URL}/api/admin/posts/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(post),
      },
    );
    return response.json();
  }

  async deletePost(id: string): Promise<void> {
    await this.fetchWithAuth(`${API_URL}/api/admin/posts/${id}`, {
      method: "DELETE",
    });
  }
}

export const blogService = new BlogService();
