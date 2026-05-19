"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, personalInfo } from "@/data/portfolio-data";
import { navbarVariants } from "@/lib/animations";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrolled(currentScrollY > 50);
    setHidden(currentScrollY > lastScrollY && currentScrollY > 400);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Active section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 right-0 left-0 z-[100] transition-all duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "glass-strong" : ""}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="font-display text-xl font-bold text-text-primary"
            data-cursor-hover
          >
            <span className="text-accent-blue">&lt;</span>
            {personalInfo.name}
            <span className="text-accent-blue"> /&gt;</span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="group relative px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                data-cursor-hover
              >
                {item.label}
                {/* Active indicator */}
                <motion.div
                  className="absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-accent-blue"
                  initial={false}
                  animate={{
                    width: activeSection === item.href.replace("#", "") ? "60%" : "0%",
                    opacity: activeSection === item.href.replace("#", "") ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                {/* Hover underline */}
                <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-accent-blue/50 transition-all duration-300 group-hover:w-3/4" />
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-white/5 md:hidden"
            aria-label="Toggle menu"
            data-cursor-hover
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-strong fixed inset-0 z-[99] flex items-center justify-center md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center gap-6"
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  onClick={() => handleNavClick(item.href)}
                  className={`font-display text-2xl font-medium transition-colors ${
                    activeSection === item.href.replace("#", "")
                      ? "text-accent-blue"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
