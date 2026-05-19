"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { projects, projectCategories } from "@/data/portfolio-data";
import SectionHeading from "@/components/ui/section-heading";
import GlowCard from "@/components/ui/glow-card";
import { staggerContainer, staggerItem } from "@/lib/animations";

const projectIllustrations: Record<string, React.ReactNode> = {
  "erp-mcp-server": (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="mcp1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00b4ff" /><stop offset="100%" stopColor="#a855f7" /></linearGradient>
        <linearGradient id="mcp2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#06ffd0" /><stop offset="100%" stopColor="#00b4ff" /></linearGradient>
      </defs>
      <rect x="60" y="20" width="80" height="50" rx="6" fill="url(#mcp1)" opacity="0.15" stroke="url(#mcp1)" strokeWidth="1.5" />
      <text x="100" y="50" textAnchor="middle" fill="#00b4ff" fontSize="14" fontWeight="bold">MCP</text>
      <rect x="70" y="75" width="60" height="20" rx="4" fill="url(#mcp2)" opacity="0.1" stroke="url(#mcp2)" strokeWidth="1" />
      <circle cx="85" cy="85" r="6" fill="#06ffd0" opacity="0.3" />
      <circle cx="115" cy="85" r="6" fill="#00b4ff" opacity="0.3" />
      <rect x="40" y="110" width="30" height="25" rx="4" fill="#a855f7" opacity="0.1" stroke="#a855f7" strokeWidth="1" />
      <rect x="130" y="110" width="30" height="25" rx="4" fill="#00b4ff" opacity="0.1" stroke="#00b4ff" strokeWidth="1" />
      <line x1="100" y1="95" x2="55" y2="110" stroke="#a855f7" strokeWidth="1" opacity="0.4" />
      <line x1="100" y1="95" x2="145" y2="110" stroke="#00b4ff" strokeWidth="1" opacity="0.4" />
      <line x1="100" y1="70" x2="100" y2="95" stroke="#06ffd0" strokeWidth="1" opacity="0.4" />
    </svg>
  ),
  "telegram-erp-bot": (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="tg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00b4ff" /><stop offset="100%" stopColor="#06ffd0" /></linearGradient>
      </defs>
      <rect x="50" y="15" width="100" height="130" rx="12" fill="#0c0c14" stroke="url(#tg1)" strokeWidth="1.5" />
      <rect x="60" y="30" width="80" height="20" rx="6" fill="#00b4ff" opacity="0.15" />
      <circle cx="135" cy="20" r="12" fill="#00b4ff" opacity="0.8" />
      <path d="M131 18 L139 22 L131 26 Z" fill="white" />
      <rect x="60" y="58" width="70" height="15" rx="4" fill="#a855f7" opacity="0.1" stroke="#a855f7" strokeWidth="0.5" />
      <rect x="60" y="78" width="55" height="15" rx="4" fill="#06ffd0" opacity="0.1" stroke="#06ffd0" strokeWidth="0.5" />
      <rect x="60" y="98" width="75" height="15" rx="4" fill="#00b4ff" opacity="0.1" stroke="#00b4ff" strokeWidth="0.5" />
      <rect x="60" y="118" width="60" height="12" rx="4" fill="#a855f7" opacity="0.08" />
    </svg>
  ),
  "whatsapp-erp-bot": (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="wa1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#25d366" /><stop offset="100%" stopColor="#128c7e" /></linearGradient>
      </defs>
      <rect x="50" y="15" width="100" height="130" rx="12" fill="#0c0c14" stroke="url(#wa1)" strokeWidth="1.5" />
      <rect x="60" y="30" width="80" height="20" rx="6" fill="#25d366" opacity="0.15" />
      <circle cx="135" cy="20" r="12" fill="#25d366" opacity="0.8" />
      <path d="M131 17 Q135 14 139 17 Q139 21 135 23 Q131 21 131 17Z" fill="white" />
      <rect x="60" y="58" width="70" height="15" rx="4" fill="#25d366" opacity="0.1" stroke="#25d366" strokeWidth="0.5" />
      <rect x="60" y="78" width="55" height="15" rx="4" fill="#06ffd0" opacity="0.1" stroke="#06ffd0" strokeWidth="0.5" />
      <rect x="60" y="98" width="75" height="15" rx="4" fill="#25d366" opacity="0.1" stroke="#25d366" strokeWidth="0.5" />
      <rect x="60" y="118" width="60" height="12" rx="4" fill="#25d366" opacity="0.08" />
    </svg>
  ),
  "artcl-ai": (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="ai1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#00b4ff" /></linearGradient>
      </defs>
      <ellipse cx="100" cy="50" rx="40" ry="30" fill="url(#ai1)" opacity="0.1" stroke="url(#ai1)" strokeWidth="1.5" />
      <path d="M80 40 Q90 30 100 40 Q110 30 120 40" stroke="#a855f7" strokeWidth="2" fill="none" />
      <path d="M75 50 Q90 40 100 50 Q110 40 125 50" stroke="#00b4ff" strokeWidth="2" fill="none" />
      <circle cx="85" cy="45" r="3" fill="#a855f7" />
      <circle cx="100" cy="42" r="3" fill="#00b4ff" />
      <circle cx="115" cy="45" r="3" fill="#a855f7" />
      <rect x="50" y="90" width="100" height="50" rx="8" fill="#0c0c14" stroke="#a855f7" strokeWidth="1" opacity="0.5" />
      <circle cx="75" cy="110" r="8" fill="#00b4ff" opacity="0.2" />
      <rect x="90" y="100" width="40" height="6" rx="3" fill="#a855f7" opacity="0.2" />
      <rect x="90" y="112" width="30" height="6" rx="3" fill="#06ffd0" opacity="0.2" />
      <rect x="90" y="124" width="35" height="6" rx="3" fill="#00b4ff" opacity="0.2" />
    </svg>
  ),
  "saybill-erp": (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="erp1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#f97316" /></linearGradient>
      </defs>
      <rect x="40" y="20" width="120" height="120" rx="10" fill="#0c0c14" stroke="url(#erp1)" strokeWidth="1.5" />
      <rect x="50" y="30" width="40" height="15" rx="4" fill="#a855f7" opacity="0.2" />
      <rect x="50" y="52" width="100" height="30" rx="6" fill="#a855f7" opacity="0.08" />
      <circle cx="120" cy="67" r="10" fill="#f97316" opacity="0.2" />
      <path d="M115 67 L120 62 L125 67 L120 72 Z" fill="#f97316" opacity="0.4" />
      <rect x="50" y="90" width="45" height="40" rx="6" fill="#a855f7" opacity="0.06" />
      <rect x="105" y="90" width="45" height="40" rx="6" fill="#f97316" opacity="0.06" />
      <rect x="55" y="95" width="15" height="3" rx="1.5" fill="#a855f7" opacity="0.3" />
      <rect x="55" y="102" width="25" height="3" rx="1.5" fill="#a855f7" opacity="0.2" />
      <rect x="55" y="109" width="20" height="3" rx="1.5" fill="#a855f7" opacity="0.2" />
      <rect x="110" y="95" width="15" height="3" rx="1.5" fill="#f97316" opacity="0.3" />
      <rect x="110" y="102" width="25" height="3" rx="1.5" fill="#f97316" opacity="0.2" />
      <rect x="110" y="109" width="20" height="3" rx="1.5" fill="#f97316" opacity="0.2" />
    </svg>
  ),
  "lend-rental": (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="car1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#06ffd0" /><stop offset="100%" stopColor="#00b4ff" /></linearGradient>
      </defs>
      <rect x="30" y="60" width="100" height="50" rx="8" fill="#0c0c14" stroke="url(#car1)" strokeWidth="1.5" />
      <path d="M50 80 L70 65 L110 65 L120 80 Z" fill="#06ffd0" opacity="0.15" stroke="#06ffd0" strokeWidth="1" />
      <circle cx="60" cy="105" r="10" fill="#0c0c14" stroke="#06ffd0" strokeWidth="1.5" />
      <circle cx="110" cy="105" r="10" fill="#0c0c14" stroke="#06ffd0" strokeWidth="1.5" />
      <circle cx="60" cy="105" r="4" fill="#06ffd0" opacity="0.3" />
      <circle cx="110" cy="105" r="4" fill="#06ffd0" opacity="0.3" />
      <rect x="145" y="70" width="30" height="40" rx="6" fill="#0c0c14" stroke="#00b4ff" strokeWidth="1" />
      <circle cx="160" cy="85" r="8" fill="#00b4ff" opacity="0.2" />
      <path d="M156 85 L160 80 L164 85 L160 90 Z" fill="#00b4ff" opacity="0.4" />
      <line x1="130" y1="85" x2="145" y2="85" stroke="#06ffd0" strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />
    </svg>
  ),
  "omnichannel-integration": (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="shop1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#95bf47" /><stop offset="100%" stopColor="#5e8e3e" /></linearGradient>
      </defs>
      <path d="M50 40 L65 30 L80 40 L80 70 L50 70 Z" fill="url(#shop1)" opacity="0.15" stroke="url(#shop1)" strokeWidth="1.5" />
      <text x="65" y="58" textAnchor="middle" fill="#95bf47" fontSize="16" fontWeight="bold">S</text>
      <rect x="110" y="40" width="50" height="40" rx="6" fill="#0c0c14" stroke="#a855f7" strokeWidth="1.5" />
      <text x="135" y="65" textAnchor="middle" fill="#a855f7" fontSize="8" fontWeight="bold">ARTCL</text>
      <text x="135" y="75" textAnchor="middle" fill="#a855f7" fontSize="8" fontWeight="bold">ERP</text>
      <path d="M80 55 Q95 55 110 55" stroke="#06ffd0" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
      <circle cx="95" cy="55" r="4" fill="#06ffd0" opacity="0.4" />
      <rect x="70" y="95" width="30" height="25" rx="4" fill="#0c0c14" stroke="#00b4ff" strokeWidth="1" />
      <circle cx="85" cy="105" r="6" fill="#00b4ff" opacity="0.2" />
      <line x1="65" y1="70" x2="85" y2="95" stroke="#00b4ff" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
      <line x1="135" y1="80" x2="100" y2="100" stroke="#a855f7" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
    </svg>
  ),
  "custom-erp": (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="cloud1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#06ffd0" /><stop offset="100%" stopColor="#00b4ff" /></linearGradient>
      </defs>
      <path d="M80 30 Q80 20 95 20 Q100 10 115 15 Q125 10 130 20 Q140 20 140 30 Q145 35 140 40 L80 40 Q75 35 80 30Z" fill="url(#cloud1)" opacity="0.15" stroke="url(#cloud1)" strokeWidth="1.5" />
      <line x1="110" y1="40" x2="110" y2="55" stroke="#06ffd0" strokeWidth="1" strokeDasharray="3 3" />
      <rect x="60" y="60" width="35" height="70" rx="4" fill="#0c0c14" stroke="#a855f7" strokeWidth="1" />
      <rect x="82" y="60" width="35" height="70" rx="4" fill="#0c0c14" stroke="#00b4ff" strokeWidth="1" />
      <rect x="105" y="60" width="35" height="70" rx="4" fill="#0c0c14" stroke="#06ffd0" strokeWidth="1" />
      <rect x="65" y="68" width="8" height="4" rx="2" fill="#a855f7" opacity="0.3" />
      <rect x="65" y="76" width="8" height="4" rx="2" fill="#a855f7" opacity="0.3" />
      <rect x="65" y="84" width="8" height="4" rx="2" fill="#a855f7" opacity="0.3" />
      <rect x="87" y="68" width="8" height="4" rx="2" fill="#00b4ff" opacity="0.3" />
      <rect x="87" y="76" width="8" height="4" rx="2" fill="#00b4ff" opacity="0.3" />
      <rect x="87" y="84" width="8" height="4" rx="2" fill="#00b4ff" opacity="0.3" />
      <rect x="110" y="68" width="8" height="4" rx="2" fill="#06ffd0" opacity="0.3" />
      <rect x="110" y="76" width="8" height="4" rx="2" fill="#06ffd0" opacity="0.3" />
      <rect x="110" y="84" width="8" height="4" rx="2" fill="#06ffd0" opacity="0.3" />
    </svg>
  ),
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Projects" subtitle="Explore My Work" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="mb-12 flex flex-wrap justify-center gap-2">
          {projectCategories.map((cat) => (
            <button key={cat} onClick={() => setActiveFilter(cat)} className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${cat === activeFilter ? "text-text-primary" : "text-text-muted hover:text-text-secondary"}`} data-cursor-hover>
              {cat === activeFilter && <motion.div layoutId="project-filter" className="absolute inset-0 rounded-lg border border-accent-purple/30 bg-accent-purple/10" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} variants={staggerContainer} initial="hidden" animate="visible" exit={{ opacity: 0, transition: { duration: 0.2 } }} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <motion.div key={project.id} variants={staggerItem} layout>
                <GlowCard className="flex h-full flex-col p-6">
                  {/* Badges */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent-cyan/10 px-2.5 py-1 text-[11px] font-medium text-accent-cyan border border-accent-cyan/20">
                        <Star size={10} fill="currentColor" />Featured
                      </span>
                    )}
                    <span className="inline-flex items-center rounded-full bg-accent-purple/10 px-2.5 py-1 text-[11px] font-medium text-accent-purple border border-accent-purple/20">
                      {project.category}
                    </span>
                  </div>

                  {/* Content Row */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex-1">
                      <h3 className="mb-2 font-display text-lg font-semibold text-text-primary leading-tight">{project.title}</h3>
                      <p className="mb-4 text-sm leading-relaxed text-text-secondary">{project.description}</p>
                    </div>

                    {/* Illustration */}
                    <div className="mb-4 flex justify-center">
                      <div className="h-32 w-full max-w-[180px]">
                        {projectIllustrations[project.id] || (
                          <div className="flex h-full items-center justify-center rounded-lg bg-bg-secondary">
                            <span className="font-display text-3xl font-bold text-white/10">{project.title.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.techStack.map((t) => (
                        <span key={t} className="rounded-lg bg-bg-secondary px-3 py-1.5 text-xs text-text-muted border border-border-subtle">{t}</span>
                      ))}
                    </div>

                    {/* Action Button */}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-2 rounded-lg bg-accent-blue/10 px-4 py-2.5 text-sm font-medium text-accent-blue border border-accent-blue/20 transition-all duration-300 hover:bg-accent-blue/20"
                        data-cursor-hover
                      >
                        Live Demo
                        <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ) : null}
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
