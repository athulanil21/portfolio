"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className={`mb-16 md:mb-20 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {subtitle && (
          <span className="mb-3 inline-block font-body text-sm font-medium tracking-[0.2em] text-accent-blue uppercase">
            {subtitle}
          </span>
        )}
        <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-6xl">
          {title}
        </h2>
        <motion.div
          className={`mt-4 h-px bg-gradient-to-r from-transparent via-accent-blue to-transparent ${
            align === "left"
              ? "w-24 from-accent-blue via-accent-purple to-transparent"
              : "mx-auto w-32"
          }`}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        />
      </motion.div>
    </div>
  );
}
