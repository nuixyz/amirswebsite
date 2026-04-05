"use client";

import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import WaveformBar from "./WaveformBar";
import { usePlayer } from "@/hooks/usePlayer";

interface Track {
  title: string;
  artist: string;
  album: string;
  coverSrc: string;
  audioSrc: string;
}

interface Props {
  track: Track;
}

export default function LatestRelease({ track }: Props) {
  const { playing, progress, toggle } = usePlayer(track.audioSrc);

  return (
    <section
      className="bg-surface-low py-20 px-4"
      style={{ willChange: "transform" }}
      data-scroll-section
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 flex items-center gap-4 px-4">
          <div className="flex items-end gap-0.75 h-8">
            {[60, 100, 40, 80, 55].map((h, i) => (
              <span
                key={i}
                className="w-0.75 bg-primary rounded-sm"
                style={{
                  height: `${h}%`,
                  animation: playing
                    ? `eq-bounce ${0.4 + i * 0.1}s ease-in-out infinite alternate`
                    : "none",
                  willChange: playing ? "transform" : "auto",
                }}
              />
            ))}
          </div>
          <h2
            className="font-display text-3xl font-bold uppercase"
            style={{ letterSpacing: "-0.02em" }}
          >
            Latest Release
          </h2>
        </div>

        <div>
          <div className="w-full aspect-video md:aspect-21/9 bg-surface-high relative group overflow-hidden flex flex-col justify-end p-8">
            <div
              className="absolute inset-0 opacity-30
                         group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage: `url(${track.coverSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                willChange: "transform",
              }}
            />
            <div
              className="absolute inset-0 bg-to-t from-surface via-surface/60 to-transparent"
              style={{ isolation: "isolate" }}
            />

            <div className="relative z-10">
              <h3
                className="font-display text-4xl text-on-surface font-bold mb-1"
                style={{ letterSpacing: "-0.03em" }}
              >
                {track.title.toUpperCase()}
              </h3>
              <p className="font-body text-on-surface-variant uppercase tracking-label text-sm mb-6">
                {track.artist}&nbsp;&nbsp;•&nbsp;&nbsp;{track.album}
              </p>

              <div className="flex items-center gap-4">
                <button
                  className="text-on-surface-variant hover:text-on-surface transition-colors"
                  aria-label="Previous"
                >
                  <SkipBack size={18} />
                </button>

                <button
                  onClick={toggle}
                  className="w-12 h-12 flex items-center justify-center shrink-0
                             bg-primary text-on-primary
                             hover:opacity-90 transition-opacity"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? <Pause size={18} /> : <Play size={18} />}
                </button>

                <button
                  className="text-on-surface-variant hover:text-on-surface transition-colors"
                  aria-label="Next"
                >
                  <SkipForward size={18} />
                </button>

                <div className="flex-1">
                  <WaveformBar progress={progress} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes eq-bounce {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
