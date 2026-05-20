"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import Navbar from "@/components/navigation/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Education from "@/components/sections/education";
import Certifications from "@/components/sections/certifications";
import CodingGame from "@/components/sections/coding-game";
import Contact from "@/components/sections/contact";
import Footer from "@/components/footer/footer";
import AmbientEffects from "@/components/background/ambient-effects";
import LoadingScreen from "@/components/ui/loading-screen";
import Terminal from "@/components/ui/terminal";
import { Terminal as TerminalIcon } from "lucide-react";

// Dynamic imports for heavy 3D/cursor components (no SSR)
const ParticleField = dynamic(
  () => import("@/components/background/particle-field"),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import("@/components/ui/custom-cursor"),
  { ssr: false }
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Keyboard shortcut to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "K") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}

      <SmoothScrollProvider>
        {/* Background layers */}
        <ParticleField />
        <AmbientEffects />

        {/* Custom cursor */}
        <CustomCursor />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <CodingGame />
          <Contact />
        </main>

        <Footer />

        {/* Terminal Toggle Button */}
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="fixed bottom-6 right-6 z-[150] flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-bg-card text-text-muted transition-all duration-300 hover:border-accent-blue/40 hover:text-accent-blue hover:shadow-[0_0_15px_rgba(0,180,255,0.2)]"
          aria-label="Open Terminal"
          title="Open Terminal (Ctrl+Shift+K)"
        >
          <TerminalIcon size={18} />
        </button>

        {/* Terminal Overlay */}
        <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      </SmoothScrollProvider>
    </>
  );
}
