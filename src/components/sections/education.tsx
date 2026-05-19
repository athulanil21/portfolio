"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education } from "@/data/portfolio-data";
import SectionHeading from "@/components/ui/section-heading";
import { GraduationCap } from "lucide-react";

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding relative" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Education" subtitle="Academic Background" />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 h-full w-px bg-border-subtle md:left-1/2 md:-translate-x-px">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1] }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-12">
            {education.map((edu, i) => {
              const Icon = edu.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.6, delay: 0.2 * i }}
                  className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Node */}
                  <div className="absolute left-6 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                    <div className="h-3 w-3 rounded-full border-2 border-accent-purple bg-bg-primary shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
                  </div>

                  {/* Spacer for mobile offset */}
                  <div className="w-12 shrink-0 md:hidden" />

                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="glass rounded-2xl p-6 transition-all duration-300 hover:border-accent-purple/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.05)]">
                      <div className={`mb-4 flex items-center gap-3 ${isLeft ? "md:justify-end" : ""}`}>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-purple/10">
                          <Icon size={20} className="text-accent-purple" />
                        </div>
                      </div>

                      <h3 className="font-display text-lg font-semibold text-text-primary">{edu.degree}</h3>
                      <p className="mb-2 text-sm font-medium text-accent-blue">{edu.institution}</p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent-purple/10 px-2.5 py-0.5 text-xs font-medium text-accent-purple">
                        <GraduationCap size={12} />
                        {edu.duration}
                      </span>
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
