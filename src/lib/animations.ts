import type { Variants } from "framer-motion";

/* ── Mobile detection helper ── */
function isMobile() {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
}

/* ── Fade variants ── */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: isMobile() ? 20 : 40, filter: isMobile() ? "none" : "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "none",
    transition: { duration: isMobile() ? 0.4 : 0.7, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: isMobile() ? -20 : -40, filter: isMobile() ? "none" : "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "none",
    transition: { duration: isMobile() ? 0.4 : 0.7, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: isMobile() ? -30 : -60, filter: isMobile() ? "none" : "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "none",
    transition: { duration: isMobile() ? 0.4 : 0.7, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: isMobile() ? 30 : 60, filter: isMobile() ? "none" : "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "none",
    transition: { duration: isMobile() ? 0.4 : 0.7, ease: [0.25, 0.4, 0.25, 1] },
  },
};

/* ── Scale ── */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: isMobile() ? 0.3 : 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

/* ── Stagger containers ── */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: isMobile() ? 0.05 : 0.1,
      delayChildren: isMobile() ? 0.05 : 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: isMobile() ? 0.05 : 0.15,
      delayChildren: isMobile() ? 0.05 : 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: isMobile() ? 15 : 30, filter: isMobile() ? "none" : "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "none",
    transition: { duration: isMobile() ? 0.3 : 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

/* ── Slide reveal (for masked text) ── */
export const slideReveal: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

/* ── Navbar ── */
export const navbarVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};
