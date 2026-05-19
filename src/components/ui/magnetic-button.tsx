"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.15,
      y: (e.clientY - rect.top - rect.height / 2) * 0.15,
    });
  };

  const handleLeave = () => setPosition({ x: 0, y: 0 });

  const baseStyles =
    "relative inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300 font-display tracking-wide";

  const variants = {
    primary:
      "bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 text-text-primary border border-accent-blue/30 hover:border-accent-blue/60 hover:shadow-[0_0_30px_rgba(0,180,255,0.15)]",
    secondary:
      "bg-bg-card text-text-primary border border-border-subtle hover:border-accent-purple/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
    ghost:
      "text-text-secondary hover:text-text-primary hover:bg-white/5",
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      data-cursor-hover
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} type="button">
      {content}
    </button>
  );
}
