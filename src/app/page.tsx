"use client";

import { useState } from "react";
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
      </SmoothScrollProvider>
    </>
  );
}
