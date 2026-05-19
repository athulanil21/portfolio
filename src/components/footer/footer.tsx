"use client";

import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { personalInfo } from "@/data/portfolio-data";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border-subtle">
      {/* Gradient separator */}
      <div className="absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-display text-sm font-medium text-text-primary">
            <span className="text-accent-blue">&lt;</span>
            {personalInfo.name}
            <span className="text-accent-blue"> /&gt;</span>
          </p>
          <p className="mt-1 flex items-center justify-center gap-1 text-xs text-text-muted sm:justify-start">
            Built with <Heart size={12} className="text-accent-purple" /> and lots of coffee
          </p>
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: GithubIcon, href: personalInfo.social.github, label: "GitHub" },
            { icon: LinkedinIcon, href: personalInfo.social.linkedin, label: "LinkedIn" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-muted transition-colors duration-300 hover:text-accent-blue"
              data-cursor-hover
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-text-muted transition-all duration-300 hover:border-accent-blue/30 hover:text-accent-blue"
          aria-label="Back to top"
          data-cursor-hover
        >
          <ArrowUp size={16} />
        </motion.button>
      </div>

      <div className="pb-4 text-center text-xs text-text-muted">
        © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
      </div>
    </footer>
  );
}
