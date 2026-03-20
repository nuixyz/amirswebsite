"use client";

import Image from "next/image";

interface Props {
  label?: string;
  line1?: string;
  line2?: string;
  line3?: string;
  body?: string;
  imageSrc: string;
  imageAlt: string;
}

export default function OverlapHero({
  label = "MUSIC FOR EVERYONE",
  line1 = "We",
  line2 = "Welcome",
  line3 = "All",
  body = "We believe everyone should be able to enjoy and create music.",
  imageSrc,
  imageAlt,
}: Props) {
  return (
    <section className="bg-surface w-full overflow-hidden">
      {/*
        Layout strategy:
        - The section is relative, tall enough for all three lines + image
        - Image is centered, absolutely positioned in the middle layer (z-10)
        - line1 sits ABOVE the image (z-20) — top area, left-of-center
        - line2 sits BEHIND the image (z-0) — spans left through the image
        - line3 sits ABOVE the image (z-20) — bottom area, right-of-center
        - Body copy floats right, vertically centered with the image (z-20)
        - Label is top-left, small caps (z-20)
      */}

      <div
        className="relative w-full"
        style={{ minHeight: "clamp(520px, 80vw, 900px)" }}
      >
        {/* ── Label — top left ── */}
        <p
          className="absolute top-12 left-[15%] z-20
                     text-xs tracking-label uppercase text-on-surface-variant"
        >
          {label}
        </p>

        {/* ── Line 1 — "We" — top area, slightly right of center, above image ── */}
        <div
          className="absolute z-20 font-display font-bold text-on-surface select-none"
          style={{
            fontSize: "clamp(80px, 13vw, 200px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            top: "6%",
            left: "30%",
          }}
        >
          {line1}
        </div>

        {/* ── Image — center, mid z-index so line2 goes behind it ── */}
        <div
          className="absolute z-10 overflow-hidden"
          style={{
            width: "clamp(280px, 30vw, 460px)",
            aspectRatio: "3 / 4",
            // aspectRatio: "1",
            top: "12%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 30vw"
          />
        </div>

        {/* ── Line 2 — "Welcome" — spans full width behind the image (z-0) ── */}
        <div
          className="absolute z-0 font-display font-bold text-on-surface select-none whitespace-nowrap"
          style={{
            fontSize: "clamp(80px, 13vw, 200px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            top: "38%",
            left: "8%",
          }}
        >
          {line2}
        </div>

        {/* ── Line 3 — "All" — bottom right, above image ── */}
        <div
          className="absolute z-20 font-display font-bold text-on-surface select-none"
          style={{
            fontSize: "clamp(80px, 13vw, 200px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            bottom: "6%",
            right: "8%",
          }}
        >
          {line3}
        </div>

        {/* ── Body copy — right side, vertically centered with image ── */}
        <p
          className="absolute z-20 font-body text-on-surface font-semibold"
          style={{
            fontSize: "clamp(14px, 1.4vw, 22px)",
            lineHeight: 1.4,
            maxWidth: "clamp(160px, 14vw, 220px)",
            top: "38%",
            right: "6%",
          }}
        >
          {body}
        </p>
      </div>
    </section>
  );
}
