"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/data/portfolio-data";
import SectionHeading from "@/components/ui/section-heading";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const currentCategory = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Tech Stack" subtitle="What I Work With" />

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-2"
        >
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-secondary"
                }`}
                data-cursor-hover
              >
                {isActive && (
                  <motion.div
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-xl border border-accent-blue/30 bg-accent-blue/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{
                      boxShadow: "0 0 20px rgba(0,180,255,0.1)",
                    }}
                  />
                )}
                <Icon size={16} className="relative z-10" />
                <span className="relative z-10 hidden sm:inline">{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          >
            {currentCategory.skills.map((skill) => {
              const SkillIcon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="group relative"
                  data-cursor-hover
                >
                  <div className="glass relative flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-all duration-300 hover:border-accent-blue/30 hover:shadow-[0_0_30px_rgba(0,180,255,0.08)]">
                    {/* Glow ring behind icon */}
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-accent-blue/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-border-subtle bg-bg-secondary transition-all duration-300 group-hover:border-accent-blue/30 group-hover:bg-accent-blue/5">
                        <SkillIcon
                          size={22}
                          className="text-text-muted transition-colors duration-300 group-hover:text-accent-blue"
                        />
                      </div>
                    </div>

                    <span className="text-sm font-medium text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
                      {skill.name}
                    </span>

                    {/* Proficiency ring */}
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          className={`h-1 w-1 rounded-full transition-all duration-500 ${
                            dot <= 4
                              ? "bg-accent-blue group-hover:shadow-[0_0_4px_rgba(0,180,255,0.5)]"
                              : "bg-border-subtle"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
