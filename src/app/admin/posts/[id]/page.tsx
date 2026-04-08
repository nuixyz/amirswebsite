"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { authService } from "../../../../services/authService";
import { blogService, BlogPost } from "../../../../services/blogService";
import { ArrowLeft, Save, Eye } from "lucide-react";

export default function PostEditor() {
  const router = useRouter();
  const params = useParams();
  const isEdit = params.id !== "new";
  const postId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    imageUrl: "",
    category: "TUTORIAL",
    isFeatured: false,
    readTime: "5 min",
  });

  useEffect(() => {
    checkAuth();
    if (isEdit) {
      loadPost();
    }
  }, []);

  const checkAuth = async () => {
    const user = await authService.getCurrentUser();
    if (!user) {
      router.push("/admin/login");
    }
  };

  const loadPost = async () => {
    try {
      setLoading(true);
      const posts = await blogService.getAllPosts();
      const post = posts.find((p) => p.id === postId);
      if (post) {
        setFormData({
          title: post.title,
          slug: post.slug,
          description: post.description,
          content: post.content,
          imageUrl: post.imageUrl,
          category: post.category,
          isFeatured: post.isFeatured,
          readTime: post.readTime,
        });
      }
    } catch (error) {
      console.error("Error loading post:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isEdit) {
        await blogService.updatePost(postId, formData);
      } else {
        await blogService.createPost(formData);
      }
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-surface-container-lowest border-b border-outline-variant sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary 
                     transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open(`/blog/${formData.slug}`, "_blank")}
              className="flex items-center gap-2 px-4 py-2 text-sm text-on-surface-variant 
                       hover:text-primary transition-colors"
              disabled={!formData.slug}
            >
              <Eye size={16} />
              Preview
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center gap-2 bg-primary text-white font-semibold 
                       text-sm tracking-label uppercase px-6 py-2.5 rounded-lg 
                       hover:opacity-90 transition-opacity shadow-lg
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              {saving ? "Saving..." : isEdit ? "Update" : "Publish"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-xs tracking-label uppercase font-semibold text-on-surface mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter post title..."
              className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg
                       text-on-surface placeholder:text-on-surface-variant
                       focus:outline-none focus:ring-2 focus:ring-primary/20
                       text-2xl font-display font-bold"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs tracking-label uppercase font-semibold text-on-surface mb-2">
              URL Slug
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="url-slug"
              className="w-full px-4 py-3 bg-surface-container rounded-lg
                       text-on-surface placeholder:text-on-surface-variant
                       focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          {/* Grid: Category, Read Time, Featured */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs tracking-label uppercase font-semibold text-on-surface mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 bg-surface-container rounded-lg
                         text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="TUTORIAL">Tutorial</option>
                <option value="RECORDING">Recording</option>
                <option value="PRODUCTION">Production</option>
                <option value="LIFESTYLE">Lifestyle</option>
              </select>
            </div>

            <div>
              <label className="block text-xs tracking-label uppercase font-semibold text-on-surface mb-2">
                Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) =>
                  setFormData({ ...formData, readTime: e.target.value })
                }
                placeholder="5 min"
                className="w-full px-4 py-3 bg-surface-container rounded-lg
                         text-on-surface placeholder:text-on-surface-variant
                         focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs tracking-label uppercase font-semibold text-on-surface mb-2">
                Featured Post
              </label>
              <label className="flex items-center gap-3 px-4 py-3 bg-surface-container rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                  className="w-5 h-5 text-primary focus:ring-primary/20"
                />
                <span className="text-on-surface">
                  {formData.isFeatured ? "Yes" : "No"}
                </span>
              </label>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs tracking-label uppercase font-semibold text-on-surface mb-2">
              Featured Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-surface-container rounded-lg
                       text-on-surface placeholder:text-on-surface-variant
                       focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="mt-4 w-full max-w-md h-48 object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs tracking-label uppercase font-semibold text-on-surface mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Short description of the post..."
              rows={3}
              className="w-full px-4 py-3 bg-surface-container rounded-lg
                       text-on-surface placeholder:text-on-surface-variant
                       focus:outline-none focus:ring-2 focus:ring-primary/20
                       resize-none"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs tracking-label uppercase font-semibold text-on-surface mb-2">
              Content (Markdown)
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Write your post content in markdown..."
              rows={20}
              className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg
                       text-on-surface placeholder:text-on-surface-variant
                       focus:outline-none focus:ring-2 focus:ring-primary/20
                       resize-none font-mono text-sm"
              required
            />
          </div>
        </form>
      </main>
    </div>
  );
}
