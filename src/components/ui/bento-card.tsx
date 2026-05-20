"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { Project } from "@/data/portfolio-data";

interface BentoCardProps {
  project: Project;
  illustration: React.ReactNode;
  className?: string;
}

export default function BentoCard({ project, illustration, className = "" }: BentoCardProps) {
  const isLarge = project.size === "large";
  const isMedium = project.size === "medium";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card transition-all duration-300 hover:border-accent-blue/30 hover:shadow-[0_0_30px_rgba(0,180,255,0.08)] ${className}`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

      {/* Glow Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at 50% 50%, rgba(0,180,255,0.15), transparent 60%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex flex-wrap gap-2">
            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-cyan/10 px-2.5 py-1 text-[11px] font-medium text-accent-cyan border border-accent-cyan/20">
                <Star size={10} fill="currentColor" />Featured
              </span>
            )}
            <span className="inline-flex items-center rounded-full bg-accent-purple/10 px-2.5 py-1 text-[11px] font-medium text-accent-purple border border-accent-purple/20">
              {project.category}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="flex-1">
          <h3 className={`font-display font-semibold text-text-primary leading-tight ${isLarge ? "text-2xl mb-4" : isMedium ? "text-xl mb-3" : "text-lg mb-2"}`}>
            {project.title}
          </h3>
          
          <p className={`text-text-secondary ${isLarge ? "text-base mb-6" : isMedium ? "text-sm mb-4" : "text-sm mb-3"}`}>
            {isLarge ? project.longDescription : project.description}
          </p>
        </div>

        {/* Illustration (Large/Medium only) */}
        {(isLarge || isMedium) && (
          <div className={`mb-4 flex justify-center ${isLarge ? "h-48" : "h-32"}`}>
            <div className="w-full max-w-[240px]">
              {illustration}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, isLarge ? 6 : 4).map((t) => (
            <span key={t} className="rounded-lg bg-bg-secondary/80 px-3 py-1.5 text-xs text-text-muted border border-border-subtle backdrop-blur-sm">
              {t}
            </span>
          ))}
        </div>

        {/* Action Button */}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center justify-center gap-2 rounded-lg bg-accent-blue/10 px-4 py-2.5 text-sm font-medium text-accent-blue border border-accent-blue/20 transition-all duration-300 hover:bg-accent-blue/20 w-fit"
          >
            Live Demo
            <ExternalLink size={14} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
