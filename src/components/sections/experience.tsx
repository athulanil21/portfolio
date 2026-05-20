"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experiences } from "@/data/portfolio-data";
import SectionHeading from "@/components/ui/section-heading";
import { Briefcase, Code2, Rocket } from "lucide-react";

const typeIcons = { fulltime: Briefcase, freelance: Rocket, internship: Code2 };
const typeLabels = { fulltime: "Full-time", freelance: "Freelance", internship: "Internship" };

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="section-padding relative" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Experience" subtitle="My Journey" />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 h-full w-px bg-border-subtle md:left-1/2 md:-translate-x-px">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan"
              style={{ scaleY }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const Icon = typeIcons[exp.type];
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                  className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Node */}
                  <div className="absolute left-6 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                    <div className="h-3 w-3 rounded-full border-2 border-accent-blue bg-bg-primary shadow-[0_0_10px_rgba(0,180,255,0.4)]" />
                  </div>

                  {/* Spacer for mobile offset */}
                  <div className="w-12 shrink-0 md:hidden" />

                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="glass rounded-2xl p-6 transition-all duration-300 hover:border-accent-blue/20 hover:shadow-[0_0_30px_rgba(0,180,255,0.05)]">
                      <div className={`mb-2 flex items-center gap-2 ${isLeft ? "md:justify-end" : ""}`}>
                        <span className="flex items-center gap-1 rounded-full bg-accent-blue/10 px-2.5 py-0.5 text-xs font-medium text-accent-blue">
                          <Icon size={12} />
                          {typeLabels[exp.type]}
                        </span>
                        <span className="text-xs text-text-muted">{exp.duration}</span>
                      </div>

                      <h3 className="font-display text-lg font-semibold text-text-primary">{exp.role}</h3>
                      <p className="mb-3 text-sm font-medium text-accent-purple">{exp.company}</p>
                      <p className="mb-4 text-sm leading-relaxed text-text-secondary">{exp.description}</p>

                      <div className={`flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""}`}>
                        {exp.techStack.map((t) => (
                          <span key={t} className="rounded-md bg-bg-secondary px-2 py-0.5 text-xs text-text-muted">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
