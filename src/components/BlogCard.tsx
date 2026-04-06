"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogPost } from "@/services/blogService";

interface Props {
  post: BlogPost;
}

export default function BlogCard({ post }: Props) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article
        className="group h-full bg-surface-container-lowest rounded-lg overflow-hidden 
                        shadow-md hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-surface-container">
          <img
            src={post.imageUrl || "/covers/stargazer.png"}
            alt={post.title}
            className="w-full h-full object-cover grayscale-20 contrast-110
                     group-hover:scale-105 transition-transform duration-700"
          />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span
              className="inline-block px-3 py-1 bg-secondary-container/90 backdrop-blur-sm
                           text-primary text-xs tracking-label uppercase font-semibold 
                           rounded-full"
            >
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3
            className="font-display font-bold text-on-surface mb-2 
                     group-hover:text-primary transition-colors duration-300"
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              letterSpacing: "-0.02em",
              lineHeight: "1.2",
            }}
          >
            {post.title}
          </h3>

          <p className="text-on-surface-variant text-sm leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-on-surface-variant">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="tracking-label uppercase font-semibold">
                {post.readTime}
              </span>
            </div>

            <div
              className="flex items-center gap-1 text-primary font-semibold 
                          group-hover:gap-2 transition-all duration-300"
            >
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
