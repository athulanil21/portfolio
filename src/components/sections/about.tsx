"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, stats } from "@/data/portfolio-data";
import SectionHeading from "@/components/ui/section-heading";
import GlowCard from "@/components/ui/glow-card";
import { staggerContainer, staggerItem, fadeInLeft, fadeInRight } from "@/lib/animations";
import { Sparkles, Target, Zap, Brain } from "lucide-react";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-3xl font-bold text-accent-blue md:text-4xl">
      {count}
      {suffix}
    </span>
  );
}

const philosophyItems = [
  {
    icon: Brain,
    title: "AI-First Thinking",
    description: "Every solution starts with understanding where intelligence can create the most impact.",
  },
  {
    icon: Target,
    title: "Production Focus",
    description: "Building systems that don't just work in notebooks — they thrive at scale.",
  },
  {
    icon: Zap,
    title: "Speed & Quality",
    description: "Moving fast without breaking things. Clean code, rapid iteration, reliable delivery.",
  },
  {
    icon: Sparkles,
    title: "Continuous Learning",
    description: "Staying ahead of the curve in the fastest-moving field in technology.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="About Me" subtitle="Who I Am" />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Bio & Stats */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Profile visual */}
            <div className="relative mb-8 inline-block">
              <div className="glass relative h-64 w-64 overflow-hidden rounded-2xl sm:h-72 sm:w-72">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 via-accent-purple/10 to-accent-cyan/20" />
                {personalInfo.image ? (
                  <img
                    src={personalInfo.image}
                    alt={personalInfo.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-6xl font-bold text-accent-blue/30 sm:text-7xl">
                      {personalInfo.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-3 -z-10 rounded-2xl bg-gradient-to-r from-accent-blue/10 via-accent-purple/10 to-accent-cyan/10 blur-xl" />
            </div>

            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
              {personalInfo.bio}
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              I thrive at the intersection of AI research and software engineering,
              turning complex models into production-ready systems that deliver real business value.
              From LLM-powered agents to computer vision pipelines, I bring ideas from concept to deployment.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-1 text-xs text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Philosophy Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid gap-4 sm:grid-cols-2"
          >
            {philosophyItems.map((item) => (
              <motion.div key={item.title} variants={staggerItem}>
                <GlowCard className="h-full p-6">
                  <item.icon size={24} className="mb-3 text-accent-blue" />
                  <h3 className="mb-2 font-display text-base font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
