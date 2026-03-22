"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import tetoPlush from "../../public/tetoplush.jpg";
import amir from "../../public/amir.webp"

export default function HeroSection() {
  return (
    <section
      className="px-8 md:px-16 py-20 flex flex-col items-center text-center bg-surface"
      data-scroll-section
    >
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="w-48 h-48 md:w-64 md:h-64 bg-surface-container border-4 border-primary overflow-hidden"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="w-full h-full bg-surface-high flex items-center justify-center">
            <Image src={amir} alt="me" />
          </div>
        </motion.div>
        <motion.div
          className="absolute -bottom-4 -right-4 bg-secondary text-on-surface px-4 py-1
                        font-display text-xs tracking-label whitespace-nowrap"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          i like umamusume
        </motion.div>
      </motion.div>

      {/* Name — display-lg, tight tracking */}
      <motion.h1
        className="font-display text-6xl md:text-9xl font-bold text-on-surface mt-12 mb-2"
        style={{ letterSpacing: "-0.04em" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        @amirthetrash
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="font-body text-xl md:text-2xl text-on-surface-variant tracking-tight lowercase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        phd in procrastination
      </motion.p>
    </section>
  );
}
