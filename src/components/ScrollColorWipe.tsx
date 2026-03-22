"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  bgColor: string; // this section's background
  nextBgColor: string; // next section's background — bleeds in from bottom as you scroll out
}

/**
 * Each section is 100vh + sticky. As you scroll out of a section, the NEXT
 * section's color bleeds up from below — exactly like BandLab. No curtain div,
 * no 200vh trick. The color change is driven purely by which section is in view.
 *
 * Usage:
 *   <ScrollColorWipe bgColor="#0e0e0e" nextBgColor="#131313">
 *     <OverlapHero ... />
 *   </ScrollColorWipe>
 */
export default function ScrollColorWipe({
  children,
  bgColor,
  nextBgColor,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // fires as top of section scrolls to top of viewport
  });

  // As you scroll the section away upward (progress 0→1), the bg transitions
  // from this section's color to the next — creating the "instant color swap"
  // feel because it snaps fast at the midpoint
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [bgColor, bgColor, nextBgColor],
  );

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <motion.div
        style={{
          backgroundColor,
          position: "sticky",
          top: 0,
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
