"use client";

import Image from "next/image";
import tetoPlush from "../../public/tetoplush.jpg";

export default function HeroSection() {
  return (
    <section className="px-8 md:px-16 py-20 flex flex-col items-center text-center bg-surface">
      <div className="relative mb-8">
        <div className="w-48 h-48 md:w-64 md:h-64 bg-surface-container border-4 border-primary overflow-hidden">
          <div className="w-full h-full bg-surface-high flex items-center justify-center">
            <Image src={tetoPlush} alt="me" />
          </div>
        </div>
        <div
          className="absolute -bottom-4 -right-4 bg-secondary text-on-surface px-4 py-1
                        font-display text-xs tracking-label whitespace-nowrap"
        >
          i like umamusume
        </div>
      </div>

      {/* Name — display-lg, tight tracking */}
      <h1
        className="font-display text-6xl md:text-9xl font-bold text-on-surface mt-12 mb-2"
        style={{ letterSpacing: "-0.04em" }}
      >
        @amirthetrash
      </h1>

      {/* Subtitle */}
      <p className="font-body text-xl md:text-2xl text-on-surface-variant tracking-tight lowercase">
        phd in procrastination
      </p>
    </section>
  );
}
