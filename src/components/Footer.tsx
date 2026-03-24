import Link from "next/link";

const links = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/4hBSyWM9kJonEcn7d6UnO9",
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/in/artist/amirthetrash/1712005676",
  },
  { label: "Instagram", href: "https://www.instagram.com/amircynical/" },
  { label: "YouTube", href: "https://www.youtube.com/@amirthetrash" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer data-scroll-section>
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-6">
        <span className="font-display text-sm font-bold tracking-label text-white/80">
          © 2026 amir. busy ramadimming.
        </span>

        {/* Links — wrap on mobile */}
        <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-xs tracking-label font-bold uppercase text-white/80
                         hover:text-primary transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs font-bold text-white/80 tracking-label text-center md:text-right">
          made by nuix
        </p>
      </div>
    </footer>
  );
}
