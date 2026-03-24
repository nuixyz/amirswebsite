"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = ["Music", "Blog", "Gallery", "About"];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-outline-variant/15">
        <div className="w-full px-6 h-14 flex items-center justify-between">
          <span className="font-display text-sm font-bold tracking-[0.15em] text-on-surface whitespace-nowrap">
            <a>@amirthetrash</a>
          </span>

          {/* Desktop links — centered */}
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
                    ${isActive ? "text-primary font-semibold" : "text-black hover:text-primary"}`}
                >
                  {l}
                  {isActive && (
                    <span className="absolute -bottom-4.5 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              className="bg-primary text-white text-xs font-semibold tracking-label uppercase
                               px-4 py-2 rounded-md hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <a href="https://www.paypal.com/paypalme/amirthetrash">
                Support Me!
              </a>
            </button>
            <button
              className="md:hidden text-on-surface p-1"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* mobile */}
      <div
        className={`fixed inset-0 z-40 flex flex-col pt-14 md:hidden
                    transition-opacity duration-300
                    ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{
          backgroundColor: "rgba(249, 249, 249, 0.96)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <nav className="flex flex-col gap-1 px-6 pt-8">
          {links.map((l, i) => {
            const href = `/${l.toLowerCase()}`;
            const isActive =
              pathname === href || (l === "Music" && pathname === "/");
            return (
              <Link
                key={l}
                href={href}
                onClick={() => setOpen(false)}
                className={`font-display font-bold py-4 border-b border-outline-variant/20
                            ${isActive ? "text-primary" : "text-on-surface hover:text-primary"}`}
                style={{
                  fontSize: "clamp(1.8rem, 8vw, 2.5rem)",
                  letterSpacing: "-0.02em",
                  transform: open ? "translateY(0)" : "translateY(10px)",
                  opacity: open ? 1 : 0,
                  transition: `transform 0.3s ease ${i * 50}ms, opacity 0.3s ease ${i * 50}ms, color 0.2s`,
                }}
              >
                {l}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
