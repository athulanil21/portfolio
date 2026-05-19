"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { personalInfo } from "@/data/portfolio-data";
import { useMousePosition } from "@/hooks/use-mouse-position";
import MagneticButton from "@/components/ui/magnetic-button";
import { staggerContainer, staggerItem, slideReveal } from "@/lib/animations";

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const mouse = useMousePosition();
  const sectionRef = useRef<HTMLElement>(null);

  // Rotate taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % personalInfo.taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 md:pt-20"
    >
      {/* Mouse-reactive ambient light */}
      <div
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full opacity-10 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,180,255,0.5) 0%, transparent 70%)",
          left: mouse.x - 250,
          top: mouse.y - 250,
          transition: "left 0.5s ease-out, top 0.5s ease-out",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        {/* Name */}
        <motion.div variants={staggerItem} className="overflow-hidden">
          <motion.h1
            variants={slideReveal}
            className="font-display text-5xl font-bold tracking-tight text-text-primary sm:text-7xl md:text-8xl lg:text-9xl"
          >
            {personalInfo.name}
            <span className="text-accent-blue">.</span>
          </motion.h1>
        </motion.div>

        {/* Rotating tagline */}
        <motion.div
          variants={staggerItem}
          className="mt-4 h-10 overflow-hidden sm:mt-6"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -40, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="font-display text-lg font-medium text-accent-purple sm:text-2xl md:text-3xl"
            >
              {personalInfo.taglines[taglineIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={staggerItem}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:mt-8 sm:text-lg"
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={staggerItem}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-10"
        >
          <MagneticButton
            variant="primary"
            onClick={() =>
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View My Work
            <ArrowDown size={16} className="animate-bounce" />
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Get In Touch
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={staggerItem}
          className="mt-10 flex items-center justify-center gap-4 sm:mt-12"
        >
          {[
            { icon: GithubIcon, href: personalInfo.social.github, label: "GitHub" },
            { icon: LinkedinIcon, href: personalInfo.social.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-text-muted transition-all duration-300 hover:border-accent-blue/40 hover:text-accent-blue hover:shadow-[0_0_20px_rgba(0,180,255,0.1)]"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-hover
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        data-cursor-hover
        aria-label="Scroll to about"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
