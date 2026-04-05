"use client";

import { ArrowUpRight } from "lucide-react";

interface Album {
  title: string;
  tag: string;
  description: string;
  coverSrc: string;
  spotifyUrl: string;
  accentColor: string;
}

const albums: Album[] = [
  {
    title: "STARGAZER",
    tag: "dariacore · hyperflip",
    description:
      "A hazy collection of bedroom beats for late nights and slow mornings.",
    coverSrc: "/covers/stargazer.png",
    spotifyUrl: "https://open.spotify.com/album/6XaXQpf2WPAsPDtmC8Hu0B",
    accentColor: "#7c3aed", // purple
  },
  {
    title: "TRASH!",
    tag: "Breakcore · Nostalgia",
    description:
      "Glassy textures and fractured rhythms — an ode to the early internet era.",
    coverSrc: "/covers/1990sweetheart.png",
    spotifyUrl: "https://open.spotify.com/album/1qvZ5o2qlHt8a0QZjFoFIa",
    accentColor: "#0ea5e9", // sky blue
  },
  {
    title: "frutiger aero",
    tag: "ambient",
    description:
      "Everything soft, strange, and a little off-beat. The vibe is exactly what it sounds like.",
    coverSrc: "/covers/frutiger.png",
    spotifyUrl: "https://open.spotify.com/album/4U0whAn4icvy4yDYJeU9MO",
    accentColor: "#b33791", // primary pink
  },
  {
    title: "Formula 1",
    tag: "house",
    description:
      "White noise and wandering synths for when you need to disappear for a while.",
    coverSrc: "/covers/formulaone.png",
    spotifyUrl: "https://open.spotify.com/album/0EnNMM5gbpum3zrBWCC14w",
    accentColor: "#059669", // emerald
  },
];

export default function Albums() {
  return (
    <section className="py-20 px-6 md:px-12" data-scroll-section>
      {/* Section header */}
      <div className="flex items-end justify-between mb-10 max-w-350 mx-auto">
        <h2
          className="font-display font-bold text-on-surface"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            letterSpacing: "-0.03em",
          }}
        >
          My Albums
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block ml-3 align-middle text-primary"
            style={{ width: "0.7em", height: "0.7em" }}
          >
            <path
              d="M14 30V10l18-4v16"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="30" r="4" fill="currentColor" />
            <circle cx="28" cy="22" r="4" fill="currentColor" />
          </svg>
        </h2>
      </div>

      {/* Album grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 max-w-350 mx-auto"
        style={{ border: "1px solid var(--color-surface-container)" }}
      >
        {albums.map((album) => (
          <AlbumCard key={album.title} album={album} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <a
          href="https://open.spotify.com/artist/4hBSyWM9kJonEcn7d6UnO9"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-7 py-3
                     border border-white
                     text-white text-xs tracking-label uppercase font-semibold
                     hover:border-primary hover:text-primary
                     transition-all duration-300 rounded-3xl"
        >
          Listen on Spotify
          <ArrowUpRight
            size={14}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
          />
        </a>
      </div>
    </section>
  );
}

// ── Individual card ──────────────────────────────────────────────────────────
function AlbumCard({ album }: { album: Album }) {
  return (
    <a
      href={album.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="album-card group relative flex flex-col justify-between
                 bg-surface-container overflow-hidden cursor-pointer
                 border-r border-b border-surface-container
                 min-h-105 p-7"
      style={
        {
          "--accent": album.accentColor,
        } as React.CSSProperties
      }
    >
      {/* Cover image — subtle background layer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={album.coverSrc}
        alt={album.title}
        className="absolute inset-0 w-full h-full object-cover opacity-40
                   group-hover:opacity-20 transition-opacity duration-500"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      {/* Gradient overlay — always present, darkens toward bottom */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

      {/* Hover wipe — color floods up from bottom */}
      <div
        className="album-wipe absolute inset-x-0 bottom-0 h-0
                   transition-all duration-500 ease-out
                   group-hover:h-full"
        style={{ backgroundColor: album.accentColor, opacity: 0.92 }}
      />

      {/* Content — sits above the wipe layer */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Top: album title */}
        <h3
          className="font-display font-bold text-on-surface leading-none"
          style={{
            fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)",
            letterSpacing: "-0.03em",
          }}
        >
          {album.title}
        </h3>

        {/* Bottom block: tag + description + arrow */}
        <div>
          {/* Tag pill */}
          <span
            className="inline-block mb-4 px-3 py-1 text-[10px] font-semibold
                       tracking-label uppercase border border-current rounded-full
                       text-white group-hover:text-white group-hover:border-white
                       transition-colors duration-300"
          >
            {album.tag}
          </span>

          <p
            className="text-sm text-white leading-relaxed mb-5
                       group-hover:text-white/80 transition-colors duration-300"
          >
            {album.description}
          </p>

          {/* Learn more row */}
          <div
            className="flex items-center gap-2 text-xs tracking-label uppercase font-semibold
                          text-white group-hover:text-white transition-colors duration-300"
          >
            <ArrowUpRight size={13} />
            Listen on Spotify
          </div>
        </div>
      </div>
    </a>
  );
}
