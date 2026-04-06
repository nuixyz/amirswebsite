"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../../../services/authService";
import { blogService, BlogPost } from "../../../services/blogService";
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Star,
  Clock,
  Calendar,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    loadPosts();
  }, []);

  const checkAuth = async () => {
    const currentUser = await authService.getCurrentUser();
    if (!currentUser) {
      router.push("/admin/login");
    } else {
      setUser(currentUser);
    }
  };

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await authService.signOut();
    router.push("/admin/login");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await blogService.deletePost(id);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-surface-container-lowest border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl text-on-surface">
              Admin Dashboard
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Manage your blog posts
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-on-surface-variant">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-sm text-on-surface-variant 
                       hover:text-primary transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-on-surface-variant text-sm">
              Total Posts:{" "}
              <span className="font-bold text-on-surface">{posts.length}</span>
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/posts/new")}
            className="flex items-center gap-2 bg-primary text-white font-semibold 
                     text-sm tracking-label uppercase px-6 py-3 rounded-lg 
                     hover:opacity-90 transition-opacity shadow-lg"
          >
            <Plus size={18} />
            New Post
          </button>
        </div>

        {/* Posts Table */}
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-lg">
          <table className="w-full">
            <thead className="bg-surface-container border-b border-outline-variant">
              <tr>
                <th className="text-left px-6 py-4 text-xs tracking-label uppercase font-semibold text-on-surface-variant">
                  Post
                </th>
                <th className="text-left px-6 py-4 text-xs tracking-label uppercase font-semibold text-on-surface-variant">
                  Category
                </th>
                <th className="text-left px-6 py-4 text-xs tracking-label uppercase font-semibold text-on-surface-variant">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-xs tracking-label uppercase font-semibold text-on-surface-variant">
                  Published
                </th>
                <th className="text-right px-6 py-4 text-xs tracking-label uppercase font-semibold text-on-surface-variant">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-surface-container/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={post.imageUrl || "/covers/stargazer.png"}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold text-on-surface mb-1">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                          <Clock size={12} />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 bg-secondary-container/30 
                                   text-primary text-xs tracking-label uppercase font-semibold 
                                   rounded-full"
                    >
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {post.isFeatured && (
                      <div className="flex items-center gap-1 text-primary">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-semibold">Featured</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                      <Calendar size={14} />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/admin/posts/${post.id}`)}
                        className="p-2 text-on-surface-variant hover:text-primary 
                                 hover:bg-surface-container rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-on-surface-variant hover:text-red-500 
                                 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-on-surface-variant mb-4">No posts yet</p>
              <button
                onClick={() => router.push("/admin/posts/new")}
                className="text-primary hover:underline text-sm font-semibold"
              >
                Create your first post
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
