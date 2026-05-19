"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { personalInfo } from "@/data/portfolio-data";
import SectionHeading from "@/components/ui/section-heading";
import { fadeInLeft, fadeInRight } from "@/lib/animations";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message too short"),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
  };

  const inputClass = "w-full rounded-xl border border-border-subtle bg-bg-secondary px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-300 focus:border-accent-blue/50 focus:shadow-[0_0_20px_rgba(0,180,255,0.08)] focus:bg-bg-secondary/80";

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Get In Touch" subtitle="Contact" />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <motion.div variants={fadeInLeft} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass flex flex-col items-center justify-center rounded-2xl p-12 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}>
                  <CheckCircle size={48} className="mb-4 text-accent-cyan" />
                </motion.div>
                <h3 className="mb-2 font-display text-xl font-semibold text-text-primary">Message Sent!</h3>
                <p className="text-sm text-text-secondary">Thanks for reaching out. I&apos;ll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <input {...register("name")} placeholder="Your Name" className={inputClass} />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                  </div>
                  <div>
                    <input {...register("email")} placeholder="Email Address" className={inputClass} />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <input {...register("subject")} placeholder="Subject" className={inputClass} />
                  {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>}
                </div>
                <div>
                  <textarea {...register("message")} placeholder="Your Message" rows={5} className={`${inputClass} resize-none`} />
                  {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 px-6 py-3.5 text-sm font-medium text-text-primary border border-accent-blue/30 transition-all duration-300 hover:border-accent-blue/60 hover:shadow-[0_0_30px_rgba(0,180,255,0.15)] disabled:opacity-50"
                  data-cursor-hover
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-blue border-t-transparent" />
                  ) : (
                    <>Send Message <Send size={16} /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div variants={fadeInRight} initial="hidden" animate={isInView ? "visible" : "hidden"} className="flex flex-col gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="mb-4 font-display text-lg font-semibold text-text-primary">Let&apos;s Connect</h3>
              <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                I&apos;m always interested in new opportunities, collaborations, and interesting projects. Whether you have a question or just want to say hi, feel free to reach out.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { icon: MapPin, label: personalInfo.location },
                  { icon: Clock, label: personalInfo.availability },
                ].map(({ icon: Icon, label, href }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-bg-secondary">
                      <Icon size={16} className="text-accent-blue" />
                    </div>
                    {href ? (
                      <a href={href} className="text-sm text-text-secondary hover:text-accent-blue transition-colors" data-cursor-hover>{label}</a>
                    ) : (
                      <span className="text-sm text-text-secondary">{label}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h4 className="mb-4 font-display text-sm font-semibold text-text-primary">Follow Me</h4>
              <div className="flex gap-3">
                {[
                  { icon: GithubIcon, href: personalInfo.social.github, label: "GitHub" },
                  { icon: LinkedinIcon, href: personalInfo.social.linkedin, label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-subtle bg-bg-secondary text-text-muted transition-all duration-300 hover:border-accent-blue/30 hover:text-accent-blue hover:shadow-[0_0_20px_rgba(0,180,255,0.08)]" data-cursor-hover>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
