"use client";

import { testimonials } from "@/data/portfolio-data";
import SectionHeading from "@/components/ui/section-heading";
import { Quote } from "lucide-react";

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="glass mx-3 w-[340px] shrink-0 rounded-2xl p-6 sm:w-[400px]">
      <Quote size={20} className="mb-3 text-accent-blue/40" />
      <p className="mb-4 text-sm leading-relaxed text-text-secondary italic">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 text-sm font-bold text-accent-blue">
          {t.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">{t.name}</p>
          <p className="text-xs text-text-muted">{t.role}, {t.company}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Testimonials" subtitle="What Others Say" />
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-4">
        <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-bg-primary to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-bg-primary to-transparent" />
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {doubled.map((t, i) => (
            <TestimonialCard key={`r1-${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative">
        <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-bg-primary to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-bg-primary to-transparent" />
        <div className="flex animate-marquee-reverse hover:[animation-play-state:paused]">
          {[...doubled].reverse().map((t, i) => (
            <TestimonialCard key={`r2-${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
