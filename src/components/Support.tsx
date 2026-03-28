"use client";

import { Heart } from "lucide-react";

export default function SupportSection() {
  return (
    <section className="mx-12 py-20 px-6 bg-surface rounded-4xl" data-scroll-section>
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="font-display font-bold text-on-surface mb-4"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Support the Trash
        </h2>
        <p className="text-on-surface-variant text-base md:text-lg mb-10 max-w-xl mx-auto">
          Independent music is powered by you. Help keep the lights on and the
          synths buzzing.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Patreon Button */}
          <a
            href="https://www.patreon.com/amirthetrash"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-[#FF424D] text-white font-semibold
                       rounded-lg hover:opacity-90 transition-opacity shadow-lg w-full sm:w-auto justify-center"
          >
            <Heart size={20} fill="white" />
            Patreon
          </a>

          {/* PayPal Button */}
          <a
            href="https://www.paypal.com/paypalme/amirthetrash"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-[#0070BA] text-white font-semibold
                       rounded-lg hover:opacity-90 transition-opacity shadow-lg w-full sm:w-auto justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 01-.794.679H7.72a.483.483 0 01-.477-.558L9.22 7.783a.966.966 0 01.953-.815h4.395c.77 0 1.477.06 2.116.196 1.976.42 3.179 1.708 3.383 3.314z" />
              <path d="M7.159 3.073a.966.966 0 01.953-.814h4.818c2.343 0 3.964.486 4.82 1.548.39.48.661 1.038.806 1.667.145.63.166 1.38.062 2.28-.002.018-.004.034-.006.05v.018a4.454 4.454 0 01-.19.876 5.6 5.6 0 01-.514 1.188 4.265 4.265 0 01-.847.998 4.905 4.905 0 01-1.223.782 6.784 6.784 0 01-1.655.483c-.617.114-1.305.171-2.06.171h-.527a.967.967 0 00-.953.815L8.62 19.41l-.003.017-.353 2.24a.483.483 0 01-.477.558H4.89a.484.484 0 01-.478-.558L7.16 3.073z" />
            </svg>
            PayPal
          </a>
        </div>
      </div>
    </section>
  );
}
