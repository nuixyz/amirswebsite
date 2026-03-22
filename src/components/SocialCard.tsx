import { Music2, Youtube, Instagram, Twitter, ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface LinkItem {
  label: string;
  Icon: LucideIcon;
  href: string;
}

const links: LinkItem[] = [
  { label: "Spotify", Icon: Music2, href: "https://spotify.com" },
  { label: "YouTube", Icon: Youtube, href: "https://youtube.com" },
  { label: "Instagram", Icon: Instagram, href: "https://instagram.com" },
  { label: "Twitter / X", Icon: Twitter, href: "https://twitter.com" },
];

export default function SocialCard() {
  return (
    <section
      className="py-20 px-8 flex flex-col items-center bg-surface"
      data-scroll-section
    >
      {/* Section header with ruled lines — mirrors the HTML's decorative lines */}
      <h2
        className="font-display text-2xl font-bold uppercase mb-12 flex items-center gap-4"
        style={{ letterSpacing: "-0.02em" }}
      >
        <span className="w-8 h-px bg-primary inline-block" />
        Check out my socials!
        <span className="w-8 h-px bg-primary inline-block" />
      </h2>

      {/* Link list — max-w-xl centered, matches HTML */}
      <div className="w-full max-w-xl flex flex-col gap-2">
        {links.map(({ label, Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-6
                       bg-surface-container
                       border-2 border-transparent
                       hover:border-primary
                       hover:bg-surface-high
                       transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <Icon size={20} className="text-primary" />
              <span className="font-display font-bold uppercase tracking-tight text-on-surface">
                {label}
              </span>
            </div>
            <ArrowRight
              size={18}
              className="text-on-surface-variant
                         group-hover:translate-x-2 group-hover:text-primary
                         transition-all duration-300"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
