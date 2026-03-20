"use client";
import Link from "next/link";

const links = ["Music", "Blog", "Gallery", "About"];

export default function Navbar() {
  return (
    <nav className="fixed top-0 right-0 z-50 bg-surface-variant/70 backdrop-blur-md border-b border-outline-variant/15">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="px-12 font-display text-sm font-semibold tracking-[0.15em] text-on-surface">
          @amirthetrash
        </span>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l}
              href={`/${l.toLowerCase()}`}
              className="text-xs tracking-label uppercase text-on-surface-variant
                         hover:text-primary transition-colors duration-200"
            >
              {l}
            </Link>
          ))}
        </div>
        <button
          className="bg-gradient-to-br from-primary to-primary-dim
                           text-[#f59fff] text-xs font-semibold tracking-label uppercase
                           px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
        >
          Listen Now
        </button>
      </div>
    </nav>
  );
}
