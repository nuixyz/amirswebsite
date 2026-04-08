"use client";
import React, { useState, useEffect, useRef } from "react";

type Direction = "up" | "down" | "left" | "right";
interface Position {
  x: number;
  y: number;
}

const MouseTracker: React.FC = () => {
  const [imgPos, setImgPos] = useState<Position>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>("right");
  const rafRef = useRef<number | null>(null);
  const prevPos = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const timeoutRef = { current: null as NodeJS.Timeout | null };

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const dx = newX - prevPos.current.x;
        const dy = newY - prevPos.current.y;

        if (Math.abs(dx) > Math.abs(dy)) {
          setDirection(dx > 0 ? "right" : "left");
        } else {
          setDirection(dy > 0 ? "down" : "up");
        }

        prevPos.current = { x: newX, y: newY };
        setImgPos({ x: newX, y: newY });
      }, 500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const imageSources: Record<Direction, string> = {
    up: "up.png",
    down: "down.png",
    left: "left.png",
    right: "right.png",
  };

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: `${imgPos.x}px`,
        top: `${imgPos.y}px`,
        transform: "translate(-50%, -50%)",
        transition: "left 1s ease-out, top 1s ease-out",
      }}
    >
      <img
        src={imageSources[direction]}
        alt={`Moving ${direction}`}
        className="w-30 h-30 object-contain"
      />
    </div>
  );
};

export default MouseTracker;
