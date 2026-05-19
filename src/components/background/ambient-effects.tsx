"use client";

import { useMousePosition } from "@/hooks/use-mouse-position";

export default function AmbientEffects() {
  const mouse = useMousePosition();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Radial cursor glow */}
      <div
        className="absolute h-[600px] w-[600px] rounded-full opacity-20 blur-[120px] transition-transform duration-700 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(0,180,255,0.3) 0%, rgba(168,85,247,0.15) 50%, transparent 70%)",
          left: mouse.x - 300,
          top: mouse.y - 300,
        }}
      />

      {/* Top-right glow blob */}
      <div
        className="absolute -top-40 -right-40 h-[500px] w-[500px] animate-pulse-glow rounded-full opacity-15 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Bottom-left glow blob */}
      <div
        className="absolute -bottom-40 -left-40 h-[500px] w-[500px] animate-pulse-glow rounded-full opacity-10 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(6,255,208,0.4) 0%, transparent 70%)",
          animationDelay: "1.5s",
        }}
      />

      {/* Gradient mesh */}
      <div
        className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 animate-gradient-shift rounded-full opacity-5 blur-[150px]"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(0,180,255,0.4), rgba(168,85,247,0.3), rgba(6,255,208,0.3), rgba(0,180,255,0.4))",
          backgroundSize: "200% 200%",
        }}
      />
    </div>
  );
}
