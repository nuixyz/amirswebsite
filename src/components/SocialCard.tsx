import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faSoundcloud,
  faTiktok,
  faSpotify,
  faYoutube,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faMusic, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface LinkItem {
  label: string;
  Icon: IconDefinition;
  href: string;
}

const links: LinkItem[] = [
  {
    label: "Spotify",
    Icon: faSpotify,
    href: "https://open.spotify.com/artist/4hBSyWM9kJonEcn7d6UnO9",
  },
  {
    label: "Apple Music",
    Icon: faMusic,
    href: "https://music.apple.com/us/artist/amirthetrash/1712005676",
  },
  {
    label: "YouTube",
    Icon: faYoutube,
    href: "https://www.youtube.com/@amirthetrash",
  },
  {
    label: "SoundCloud",
    Icon: faSoundcloud,
    href: "https://soundcloud.com/amirthetrash",
  },
  {
    label: "Tik Tok",
    Icon: faTiktok,
    href: "https://tiktok.com/@amirthetrash",
  },
  {
    label: "Instagram",
    Icon: faInstagram,
    href: "https://www.instagram.com/amirthetrash",
  },
  {
    label: "Twitter / X",
    Icon: faXTwitter,
    href: "https://x.com/amirthetrash",
  },
];

export default function SocialCard() {
  return (
    <section className="py-20 px-8 flex flex-col items-center bg-surface">
      <h2 className="font-display text-2xl font-bold uppercase mb-12 flex items-center gap-4">
        <span className="w-8 h-px bg-primary inline-block" />
        Check out my socials!
        <span className="w-8 h-px bg-primary inline-block" />
      </h2>

      <div className="w-full max-w-xl flex flex-col gap-2">
        {links.map(({ label, Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-6 bg-surface-container border-2 border-transparent hover:border-primary transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              {/* Use the FontAwesomeIcon component here */}
              <FontAwesomeIcon icon={Icon} className="text-primary w-5 h-5" />
              <span className="font-display font-bold uppercase tracking-tight text-on-surface">
                {label}
              </span>
            </div>
            {/* Direct replacement for ArrowRight */}
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-on-surface-variant group-hover:translate-x-2 group-hover:text-primary transition-all duration-300 w-4.5"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
