"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import LocomotiveScroll from "locomotive-scroll";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const locomotiveRef = useRef<LocomotiveScroll | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    locomotiveRef.current = new LocomotiveScroll({
      lenisOptions: {
        lerp: 0.08,
        duration: 0.5,
        smoothWheel: true,
      },
    });

    return () => {
      locomotiveRef.current?.destroy();
      locomotiveRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!locomotiveRef.current) return;

    // In v5, scrollTo handles the jump to top
    locomotiveRef.current.scrollTo(0, {
      duration: 0,
      immediate: true, // Ensures it snaps to top on route change
    });
  }, [pathname]);

  return <>{children}</>;
}
