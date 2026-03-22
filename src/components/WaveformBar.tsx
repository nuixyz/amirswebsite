"use client";
import { useEffect, useState } from "react";

interface Props {
  progress: number; // 0–1
  bars?: number;
}

export default function WaveformBar({ progress, bars = 48 }: Props) {
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    setHeights(Array.from({ length: bars }, () => 20 + Math.random() * 60));
  }, [bars]);

  return (
    <div className="flex items-end gap-0.5 h-12 w-full">
      {heights.map((h, i) => {
        const played = i / bars < progress;
        return (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className={`flex-1 rounded-sm transition-colors duration-300 ${
              played ? "bg-surface" : "bg-primary"
            }`}
          />
        );
      })}
    </div>
  );
}
