"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import FeaturedStory from "@/components/FeaturedStory";
import { blogService, BlogPost } from "@/services/blogService";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = [
    "ALL",
    "TUTORIAL",
    "RECORDING",
    "PRODUCTION",
    "LIFESTYLE",
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const allPosts = await blogService.getAllPosts();
      const featured = await blogService.getFeaturedPost();

      setPosts(allPosts.filter((p) => !p.isFeatured));
      setFeaturedPost(featured);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts =
    selectedCategory === "ALL"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="pt-20 pb-16 bg-surface min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-12">
            <p className="text-xs tracking-label uppercase text-on-surface-variant mb-4">
              The Blog
            </p>
            <h1
              className="font-display font-bold text-on-surface mb-6"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Stories & Sounds
            </h1>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs tracking-label uppercase font-semibold rounded-full transition-all
                    ${
                      selectedCategory === cat
                        ? "bg-primary text-white"
                        : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Story */}
          {featuredPost && <FeaturedStory post={featuredPost} />}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-on-surface-variant">
                No posts found in this category.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
