"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories } from "@/data/portfolio-data";
import SectionHeading from "@/components/ui/section-heading";
import SkillGalaxy from "@/components/ui/skill-galaxy";
import { useIsMobile } from "@/hooks/use-media-query";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Tech Stack" subtitle="What I Work With" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {isMobile ? (
            /* Mobile Fallback: Simple Grid */
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {skillCategories.flatMap((cat) =>
                cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="glass flex flex-col items-center gap-2 rounded-xl p-4 text-center"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg-secondary">
                      <skill.icon size={20} className="text-text-muted" />
                    </div>
                    <span className="text-sm font-medium text-text-secondary">{skill.name}</span>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Desktop: 3D Galaxy */
            <SkillGalaxy />
          )}
        </motion.div>
      </div>
    </section>
  );
}
