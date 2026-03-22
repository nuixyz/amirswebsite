"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { Howl } from "howler";

export function usePlayer(src: string) {
  const howl = useRef<Howl | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const raf = useRef<number>(0);
  const playingRef = useRef(false);

  const ensureHowl = useCallback(() => {
    if (howl.current) return howl.current;

    const h = new Howl({
      src: [src],
      html5: true, // streams instead of decoding all at once
      onend: () => {
        cancelAnimationFrame(raf.current);
        playingRef.current = false;
        setPlaying(false);
        setProgress(1);
      },
      onloaderror: (_id, err) => console.error("Howler load error:", err),
      onplayerror: (_id, err) => console.error("Howler play error:", err),
    });

    howl.current = h;
    return h;
  }, [src]);

  // Clean up when src changes or component unmounts
  useEffect(() => {
    return () => {
      if (howl.current) {
        howl.current.unload();
        howl.current = null;
      }
      cancelAnimationFrame(raf.current);
      playingRef.current = false;
      setPlaying(false);
      setProgress(0);
    };
  }, [src]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden && playingRef.current) {
        cancelAnimationFrame(raf.current);
      } else if (!document.hidden && playingRef.current) {
        raf.current = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const tick = useCallback(() => {
    const h = howl.current;
    if (!h) return;
    const duration = h.duration();
    const seek = h.seek();
    if (duration && typeof seek === "number") {
      setProgress(seek / duration);
    }
    raf.current = requestAnimationFrame(tick);
  }, []);

  const toggle = useCallback(() => {
    const h = ensureHowl();

    if (playingRef.current) {
      h.pause();
      cancelAnimationFrame(raf.current);
      playingRef.current = false;
      setPlaying(false);
    } else {
      h.play();
      raf.current = requestAnimationFrame(tick);
      playingRef.current = true;
      setPlaying(true);
    }
  }, [ensureHowl, tick]);

  const seek = useCallback((ratio: number) => {
    const h = howl.current;
    if (!h) return;
    const duration = h.duration();
    if (duration) {
      h.seek(ratio * duration);
      setProgress(ratio);
    }
  }, []);

  return { playing, progress, toggle, seek };
}
