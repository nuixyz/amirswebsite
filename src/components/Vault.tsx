"use client";

import { Lock, ShoppingBag } from "lucide-react";

export default function Vault() {
  return (
    <section className="py-20 px-6" data-scroll-section>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Unreleased Vault Card */}
        <a
          href="https://www.patreon.com/amirthetrash"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden bg-white border-2 border-dashed border-primary/30 
                     hover:border-primary transition-all duration-300 p-8 md:p-12 
                     flex flex-col items-center justify-center text-center min-h-80"
        >
          <div className="mb-6 text-primary">
            <Lock size={64} strokeWidth={1.5} />
          </div>
          <h3 className="font-display font-bold text-on-surface text-3xl md:text-4xl mb-4">
            Unreleased Vault
          </h3>
          <p className="text-on-surface-variant text-sm md:text-base mb-6 max-w-sm">
            Locked for public ears. Exclusive access available for Patreon
            supporters.
          </p>
          <button
            className="bg-primary text-white font-semibold text-sm tracking-label uppercase
                       px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            Request Access
          </button>
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </a>

        {/* The Trash Merch Card */}
        <div
          className="group relative overflow-hidden bg-secondary-container/20 border-2 border-dashed border-outline-variant
                     p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-80"
        >
          <div className="mb-6 text-on-surface-variant opacity-60">
            <ShoppingBag size={64} strokeWidth={1.5} />
          </div>
          <h3 className="font-display font-bold text-on-surface text-3xl md:text-4xl mb-4">
            The Trash Merch
          </h3>
          <div className="bg-surface-container-highest px-4 py-2 rounded-full mb-6">
            <span className="text-xs tracking-label uppercase font-semibold text-on-surface-variant">
              Coming Soon
            </span>
          </div>
          <div className="flex gap-4 mt-4 opacity-40">
            <div className="w-16 h-16 bg-surface-container rounded" />
            <div className="w-16 h-16 bg-surface-container rounded" />
            <div className="w-16 h-16 bg-surface-container rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
