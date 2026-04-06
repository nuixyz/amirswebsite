"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogService, BlogPost } from "@/services/blogService";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const data = await blogService.getPostBySlug(slug);
      setPost(data);
    } catch (error) {
      console.error("Error loading post:", error);
    } finally {
      setLoading(false);
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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-on-surface mb-4">
            Post Not Found
          </h1>
          <Link
            href="/blog"
            className="text-primary hover:underline flex items-center gap-2 justify-center"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar />

      <main className="pt-20 pb-16 bg-surface min-h-screen">
        <article className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary 
                     text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          {/* Category Badge */}
          <div className="mb-4">
            <span
              className="inline-block px-4 py-2 bg-secondary-container/30 
                           text-primary text-xs tracking-label uppercase font-semibold 
                           rounded-full"
            >
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display font-bold text-on-surface mb-6"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: "1.1",
            }}
          >
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-on-surface-variant text-sm mb-10 pb-10 border-b border-outline-variant">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{publishedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span className="tracking-label uppercase font-semibold">
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video mb-12 rounded-lg overflow-hidden bg-surface-container">
            <img
              src={post.imageUrl || "/covers/stargazer.png"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none
                        prose-headings:font-display prose-headings:font-bold prose-headings:text-on-surface
                        prose-p:text-on-surface prose-p:leading-relaxed
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-on-surface prose-strong:font-semibold
                        prose-code:text-primary prose-code:bg-surface-container prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                        prose-pre:bg-surface-container-high prose-pre:text-on-surface
                        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                        prose-ul:text-on-surface prose-ol:text-on-surface
                        prose-li:text-on-surface"
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Share Section */}
          <div className="mt-16 pt-10 border-t border-outline-variant">
            <p className="text-xs tracking-label uppercase text-on-surface-variant mb-4">
              Share This Post
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied!");
                }}
                className="px-4 py-2 bg-surface-container hover:bg-surface-container-high 
                         text-on-surface text-sm font-semibold rounded-lg transition-colors"
              >
                Copy Link
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-surface-container hover:bg-surface-container-high 
                         text-on-surface text-sm font-semibold rounded-lg transition-colors"
              >
                Share on Twitter
              </a>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
