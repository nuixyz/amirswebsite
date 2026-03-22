"use client";
import { useEffect, useRef } from "react";

interface Props {
  progress: number; // 0–1
  bars?: number;
}

const PRIMARY = "#b7004d";        // --color-primary from globals.css
const MUTED   = "#eeeeee";        // --color-surface-container

export default function WaveformBar({ progress, bars = 48 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heights   = useRef<number[]>([]);

  // Generate heights once
  useEffect(() => {
    heights.current = Array.from(
      { length: bars },
      () => 20 + Math.random() * 60
    );
    draw(progress);
  }, [bars]);

  useEffect(() => {
    draw(progress);
  }, [progress]);

  function draw(prog: number) {
    const canvas = canvasRef.current;
    if (!canvas || heights.current.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const gap = 2;
    const barW = (W - gap * (bars - 1)) / bars;

    ctx.clearRect(0, 0, W, H);

    heights.current.forEach((hPct, i) => {
      const barH = (hPct / 100) * H;
      const x = i * (barW + gap);
      const y = H - barH;

      ctx.fillStyle = i / bars < prog ? PRIMARY : MUTED;
      const r = Math.min(2, barW / 2, barH / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + barW - r, y);
      ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
      ctx.lineTo(x + barW, y + barH);
      ctx.lineTo(x, y + barH);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
    });
  }

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={48}
      style={{ width: "100%", height: "48px", display: "block" }}
      aria-label={`Playback progress: ${Math.round(progress * 100)}%`}
    />
  );
}