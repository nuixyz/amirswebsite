"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import amir from "../../public/amir.webp";

export default function HeroSection() {
  return (
    <section
      className="px-6 md:px-16 pt-28 pb-16 flex flex-col items-center text-center"
      data-scroll-section
    >
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="w-36 h-36 md:w-64 md:h-64 bg-surface-container border-4 border-primary overflow-hidden"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Image src={amir} alt="me" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          className="absolute -bottom-4 -right-4 bg-secondary text-on-surface px-3 py-1
                     font-display text-[10px] md:text-xs tracking-label whitespace-nowrap"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          i like umamusume
        </motion.div>
      </motion.div>

      <motion.h1
        className="font-pixel font-bold text-on-surface mt-10 mb-2"
        style={{
          fontSize: "clamp(2.4rem, 12vw, 8rem)",
          letterSpacing: "-0.04em",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        @amirthetrash
      </motion.h1>

      <motion.p
        className="font-body text-base md:text-2xl text-on-surface-variant tracking-tight lowercase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        phd in procrastination
      </motion.p>
    </section>
  );
}
