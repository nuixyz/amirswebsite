"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/services/blogService";

interface Props {
  post: BlogPost;
}

export default function FeaturedStory({ post }: Props) {
  return (
    <div className="mb-16">
      <p className="text-xs tracking-label uppercase text-on-surface-variant mb-4">
        Featured Story
      </p>

      <Link href={`/blog/${post.slug}`}>
        <div className="group relative bg-surface-container-lowest rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative aspect-video md:aspect-auto md:h-full min-h-80 overflow-hidden">
              <img
                src={post.imageUrl || "/covers/stargazer.png"}
                alt={post.title}
                className="w-full h-full object-cover grayscale-20 contrast-110 
                         group-hover:scale-105 transition-transform duration-700"
              />

              {/* Number Badge */}
              <div
                className="absolute bottom-6 right-6 bg-primary text-white 
                            w-16 h-16 flex items-center justify-center"
              >
                <span className="font-display font-bold text-2xl">01</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-4">
                <span
                  className="inline-block px-3 py-1 bg-secondary-container/30 
                               text-primary text-xs tracking-label uppercase font-semibold 
                               rounded-full"
                >
                  {post.category}
                </span>
              </div>

              <h2
                className="font-display font-bold text-on-surface mb-4 
                         group-hover:text-primary transition-colors duration-300"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.1",
                }}
              >
                {post.title}
              </h2>

              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-on-surface-variant">
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
                  className="flex items-center gap-2 text-primary font-semibold text-xs tracking-label uppercase
                              group-hover:gap-4 transition-all duration-300"
                >
                  <span>Read Story</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
