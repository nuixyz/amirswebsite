import Link from "next/link";

const links = [
  { label: "Spotify", href: "https://spotify.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-low mt-20" data-scroll-section>
      <div
        className="max-w-6xl mx-auto px-6 py-10
                      flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <span className="font-display text-xs font-bold tracking-label text-on-surface">
          @amirthetrash
        </span>

        <nav className="flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-xs tracking-label uppercase text-on-surface-variant
                         hover:text-primary transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-outline-variant tracking-label">
          © 2026 amir. busy ramadimming.
        </p>
      </div>
    </footer>
  );
}
