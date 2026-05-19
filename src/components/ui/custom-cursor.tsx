"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-media-query";

export default function CustomCursor() {
  const isMobile = useIsMobile();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);
    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    const interactiveEls = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
    );

    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    // MutationObserver for dynamically added elements
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      els.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
      observer.disconnect();
    };
  }, [isMobile, handleMouseMove]);

  if (isMobile) return null;

  const size = isHovering ? 48 : isClicking ? 16 : 24;

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Main cursor ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: size,
          height: size,
          borderWidth: isHovering ? 2 : 1.5,
          opacity: 1,
        }}
        initial={{ opacity: 0, width: 24, height: 24 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div
          className="h-full w-full rounded-full border-accent-blue"
          style={{
            borderWidth: "inherit",
            borderStyle: "solid",
            borderColor: "var(--accent-blue)",
            boxShadow: isHovering
              ? "0 0 20px rgba(0,180,255,0.4), inset 0 0 20px rgba(0,180,255,0.1)"
              : "0 0 10px rgba(0,180,255,0.2)",
            transition: "box-shadow 0.3s ease",
          }}
        />
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full"
          style={{ background: "var(--accent-blue)" }}
          animate={{
            width: isClicking ? 8 : 4,
            height: isClicking ? 8 : 4,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}
