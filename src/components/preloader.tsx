"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return p;
        }
        return p + Math.random() * (p < 50 ? 8 : 3);
      });
    }, 80);

    // When everything (fonts, images) is fully loaded, finish and dismiss
    const finish = () => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setVisible(false), 600);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", finish);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Cover image */}
          <motion.div
            className="relative w-40 h-40 md:w-56 md:h-56 overflow-hidden mb-8"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/maidamir.jpg"
              alt="amirthetrash"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-display font-bold text-on-surface mb-2"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              letterSpacing: "-0.04em",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Yokoso!! Mina-san~
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-body text-on-surface-variant text-sm tracking-label uppercase mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            ִ ࣪ ˖ ࣪ ᨰꫀᥣᥴ᥆ꩇꫀ ! ᰔ ִ ׄ
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="w-40 md:w-56 h-[2px] bg-surface-container overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="h-full bg-primary origin-left"
              style={{ scaleX: progress / 100 }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
            />
          </motion.div>

          {/* Percentage */}
          <motion.span
            className="font-display text-xs text-on-surface-variant mt-3 tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
