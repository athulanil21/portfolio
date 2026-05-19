"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { certifications } from "@/data/portfolio-data";
import SectionHeading from "@/components/ui/section-heading";
import { Award } from "lucide-react";

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="section-padding relative" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Certifications" subtitle="Professional Development" />

        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass rounded-2xl p-5 transition-all duration-300 hover:border-accent-cyan/20 hover:shadow-[0_0_30px_rgba(6,255,208,0.05)]"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-cyan/10">
                  <Award size={20} className="text-accent-cyan" />
                </div>
              </div>
              <h3 className="font-display text-base font-semibold text-text-primary">{cert.name}</h3>
              <p className="mt-1 text-sm text-text-secondary">{cert.issuer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
