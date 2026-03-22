"use client";

import { useEffect } from "react";

/**
 * Watches every element with [data-bg] on the page.
 * When one crosses 50% into the viewport, it writes its color to document.body.
 * This means the body background is always the color of whatever section
 * is currently dominant on screen — no split-screen artifacts.
 */
export function useBodyColor() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-bg]"),
    );

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const color = (entry.target as HTMLElement).dataset.bg;
            if (color) {
              document.body.style.backgroundColor = color;
            }
          }
        });
      },
      {
        // Fire when the section is 40% visible — feels natural on most monitors
        threshold: 0.4,
      },
    );

    targets.forEach((el) => observer.observe(el));

    // Set initial color immediately from whichever section is at the top
    const first = targets[0];
    if (first?.dataset.bg) {
      document.body.style.backgroundColor = first.dataset.bg;
    }

    return () => observer.disconnect();
  }, []);
}
