"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  children: React.ReactNode;
  fromColor: string; // current section bg
  toColor: string; // next section bg — wipes up from bottom
}

/**
 * Wraps a section so that as you scroll through it, the NEXT section's
 * background color rises from the bottom like a curtain (BandLab-style).
 *
 * The section is given extra scroll height (200vh) so the user actually
 * scrolls "through" it while the content stays sticky in the viewport.
 * The curtain fills from 0% → 100% over that scroll distance.
 */
export default function ScrollColorWipe({
  children,
  fromColor,
  toColor,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to this tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Curtain height: 0% → 100% as you scroll through
  const curtainHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    // Outer container is 200vh tall — gives the scroll "room" to breathe
    <div ref={containerRef} style={{ height: "200vh", position: "relative" }}>
      {/* Sticky inner: stays fixed in viewport while user scrolls through the 200vh */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: fromColor,
        }}
      >
        {/* The actual section content */}
        <div style={{ position: "relative", zIndex: 10, height: "100%" }}>
          {children}
        </div>

        {/* Curtain: rises from bottom, covers the fromColor with toColor */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: "auto 0 0 0", // anchored to bottom
            backgroundColor: toColor,
            height: curtainHeight, // grows upward
            zIndex: 20,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
