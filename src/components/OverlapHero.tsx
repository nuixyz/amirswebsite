"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  label?: string;
  line1?: string;
  line2?: string;
  line3?: string;
  body?: string;
  imageSrc: string;
  imageAlt: string;
}

export default function OverlapHero({
  label = "woohoo",
  line1 = "i miss my wife",
  line2 = "zhu yuan",
  line3 = "umamusume",
  body = "wei",
  imageSrc,
  imageAlt,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    // mobile
    <div ref={ref}>
      <section className="md:hidden w-100% mx-3 px-6 py-16 flex flex-col gap-5">
        <motion.p
          className="text-xs tracking-[0.15em] uppercase font-semibold text-white/60"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {label}
        </motion.p>
        <motion.div
          className="w-full aspect-4/3 relative overflow-hidden rounded-2xl"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        <motion.span
          className="font-display font-bold text-white leading-none block"
          style={{
            fontSize: "clamp(52px, 16vw, 80px)",
            letterSpacing: "-0.04em",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {line1} {line2} {line3}
        </motion.span>

        <motion.p
          className="font-body font-semibold text-white text-base leading-relaxed max-w-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {body}
        </motion.p>
      </section>

      {/* desktop */}
      <section
        className="hidden md:block w-full overflow-hidden"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="relative w-full"
          style={{ minHeight: "clamp(520px, 80vw, 900px)" }}
        >
          <motion.p
            className="absolute top-12 left-[15%] z-20
                       text-xs tracking-[0.15em] uppercase font-semibold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {label}
          </motion.p>

          <motion.span
            className="absolute z-20 font-display font-bold text-white select-none leading-none"
            style={{
              fontSize: "clamp(80px, 13vw, 200px)",
              letterSpacing: "-0.04em",
              top: "6%",
              left: "30%",
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {line1}
          </motion.span>

          <motion.div
            className="absolute z-10 overflow-hidden"
            style={{
              width: "clamp(280px, 30vw, 460px)",
              aspectRatio: "3/4",
              top: "12%",
              left: "40%",
              transform: "translateX(-50%)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="30vw"
            />
          </motion.div>

          <motion.span
            className="absolute z-0 font-display font-bold text-white select-none leading-none whitespace-nowrap"
            style={{
              fontSize: "clamp(80px, 13vw, 200px)",
              letterSpacing: "-0.04em",
              top: "38%",
              left: "8%",
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {line2}
          </motion.span>

          <motion.span
            className="absolute z-20 font-display font-bold text-white select-none leading-none"
            style={{
              fontSize: "clamp(80px, 13vw, 200px)",
              letterSpacing: "-0.04em",
              bottom: "6%",
              right: "8%",
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {line3}
          </motion.span>

          <motion.p
            className="absolute z-20 font-body font-semibold text-white"
            style={{
              fontSize: "clamp(14px, 1.4vw, 22px)",
              lineHeight: 1.4,
              maxWidth: "clamp(160px, 14vw, 220px)",
              top: "38%",
              right: "6%",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {body}
          </motion.p>
        </div>
      </section>
    </div>
  );
}
