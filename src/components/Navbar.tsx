"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = ["Music", "Blog", "Gallery", "About"];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-variant/70 backdrop-blur-md border-b border-outline-variant/15">
      <div className="w-full px-8 h-14 flex items-center justify-between">
        <span className="font-display text-sm font-bold tracking-[0.15em] text-on-surface whitespace-nowrap">
          @amirthetrash
        </span>

        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => {
            const href = `/${l.toLowerCase()}`;
            const isActive =
              pathname === href || (l === "Music" && pathname === "/");

            return (
              <Link
                key={l}
                href={href}
                className={`relative text-xs tracking-label uppercase transition-colors duration-200
                  ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
              >
                {l}
                {isActive && (
                  <span className="absolute -bottom-[18px] left-0 right-0 h-[2px] bg-primary" />
                )}
              </Link>
            );
          })}
        </div>

        <button
          className="bg-gradient-to-br from-primary to-primary-dim
                           text-[#8ACCD5] text-xs font-semibold tracking-label uppercase
                           px-4 py-2 rounded-md hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Listen Now
        </button>
      </div>
    </nav>
  );
}
