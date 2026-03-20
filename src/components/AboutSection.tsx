"use client";

import Image from "next/image";

interface Props {
  label?: string;
  heading: string;
  accentWord?: string;
  imageSrc: string;
  imageAlt: string;
}

export default function AboutSection({
  label = "About Me",
  heading,
  accentWord,
  imageSrc,
  imageAlt,
}: Props) {
  const parts = accentWord
    ? heading.split(new RegExp(`(${accentWord})`, "i"))
    : [heading];

  return (
    <section className="bg-surface w-full min-h-[480px] flex items-center">
      <div className="w-full flex flex-col md:flex-row items-stretch">
        {/* ── Left: text block ── */}
        <div className="flex-1 px-12 md:px-20 py-16 md:py-20 flex flex-col justify-center">
          <p className="text-xs tracking-label uppercase text-on-surface-variant mb-6 md:mb-8">
            {label}
          </p>

          <h2
            className="font-display font-bold text-on-surface leading-[1.1]"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {parts.map((part, i) =>
              accentWord && part.toLowerCase() === accentWord.toLowerCase() ? (
                // Replace the accent word with the double-chevron symbol in primary color
                <span
                  key={i}
                  aria-hidden="true"
                  className="inline-block mx-1 text-primary"
                  style={{ lineHeight: 1 }}
                >
                  {/* Double chevron SVG — mirrors the BandLab-style icon in the screenshot */}
                  <svg
                    viewBox="0 0 40 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block align-middle"
                    style={{ width: "0.85em", height: "0.85em" }}
                    aria-label={accentWord}
                  >
                    <path
                      d="M4 32 L20 10 L36 32"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M4 44 L20 22 L36 44"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </h2>
        </div>

        {/* ── Right: image ── bleeds to edge, no rounded corners */}
        <div
          className="w-full md:w-[38%] md:max-w-[560px] flex-shrink-0
                        aspect-[4/3] md:aspect-auto relative overflow-hidden"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover grayscale-[20%] contrast-110"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </div>
    </section>
  );
}
