"use client";

import React, { useState, useEffect, useRef } from "react";

type Direction = "up" | "down" | "left" | "right";

interface Position {
  x: number;
  y: number;
}

const MouseTracker: React.FC = () => {
  const [imgPos, setImgPos] = useState<Position>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>("down");

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setImgPos((prevPos) => {
          const dx = newX - prevPos.x;
          const dy = newX - prevPos.y;

          if (Math.abs(dx) > Math.abs(dy)) {
            setDirection(dx > 0 ? "right" : "left");
          } else {
            setDirection(dy > 0 ? "down" : "up");
          }

          return { x: newX, y: newY };
        });
      }, 300);
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
      className="fixed pointer-events-none z-50 transition-all duration-1000 ease-in-out"
      style={{
        left: `${imgPos.x}px`,
        top: `${imgPos.y}px`,
        transform: "translate(-50%, -50%)",
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
