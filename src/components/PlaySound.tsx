import React, { useState } from "react";

interface AnimationInstance {
  id: number;
  width: string;
  top: string;
}

export default function PlaySound() {
  const [animations, setAnimations] = useState<AnimationInstance[]>([]);

  const handleClick = () => {
    const audio = new Audio("/audio/kuru_kuru.mp3");
    audio.play().catch(() => console.log("Audio Failed"));

    const id = Date.now();
    const randomWidth = Math.floor(Math.random() * (60 - 20 + 1)) + 20;
    const randomTop = Math.floor(Math.random() * 80) + 10; // Random between 10% and 90%
    const newInstance = {
      id,
      width: `${randomWidth}vw`,
      top: `${randomTop}vh`,
    };

    setAnimations((prev) => [...prev, newInstance]);

    setTimeout(() => {
      setAnimations((prev) => prev.filter((anim) => anim.id !== id));
    }, 3000);
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-white text-xl font-bold mb-8 tracking-widest">
        something fun nuix decided to add
      </h2>

      <button
        onClick={handleClick}
        className="px-8 py-4 bg-[#2a2542] text-white font-bold rounded-lg hover:opacity-90 transition-opacity z-50"
      >
        clikc me
      </button>

      {animations.map((anim) => (
        <div
          key={anim.id}
          className="absolute -translate-y-1/2 right-0 pointer-events-none"
          style={{
            width: anim.width,
            top: anim.top,
            animation: "moveLeft 3s linear forwards",
            zIndex: 10,
          }}
        >
          <img
            src="/herta-kurukuru.gif"
            alt="Kuru Kuru"
            className="w-full h-auto object-contain"
          />
        </div>
      ))}

      <style>{`
        @keyframes moveLeft {
          from { transform: translateX(100vw) translateY(-50%); }
          to { transform: translateX(-100vw) translateY(-50%); }
        }
      `}</style>
    </div>
  );
}
