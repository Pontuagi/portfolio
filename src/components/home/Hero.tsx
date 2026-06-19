"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { site } from "@/lib/site";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0.05]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.68], [1, 0.2]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 55]);

  return (
    <motion.section
      ref={sectionRef}
      className="story-gradient subtle-grid relative overflow-hidden px-5 pb-24 pt-36 sm:px-6 lg:px-8 lg:pb-36 lg:pt-44"
      initial={prefersReducedMotion ? false : { opacity: 0.96 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">

        {/* ── Left: content ── */}
        <motion.div
          className="order-2 min-w-0 lg:order-1"
          style={prefersReducedMotion ? undefined : { opacity: contentOpacity, y: contentY }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-800 dark:text-teal-200">
            Builder · Software Engineer
          </p>
          <h1 className="mt-3 max-w-[22rem] text-4xl font-bold leading-tight text-emerald-950 dark:text-emerald-50 sm:max-w-3xl sm:text-5xl lg:text-4xl xl:text-5xl">
            {site.name}
          </h1>
          <p className="mt-3 max-w-[22rem] text-xl font-medium leading-snug text-stone-600 dark:text-emerald-50/70 sm:max-w-3xl sm:text-2xl lg:text-xl xl:text-2xl">
            I turn real-world problems into useful software.
          </p>
          <p className="mt-5 max-w-[21rem] text-base leading-7 text-stone-600 dark:text-emerald-50/70 sm:max-w-2xl sm:text-lg sm:leading-8">
            Nairobi-based full-stack engineer shaped by mechatronics,
            ALX software training, and the belief that good products begin by
            listening carefully to people.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <AnimatedButton href="/projects">Explore my work</AnimatedButton>
            <AnimatedButton href="/stories" variant="secondary">
              Read short stories
            </AnimatedButton>
          </div>

          {/* Process steps */}
          <div className="mt-10 grid max-w-xl gap-3 text-sm sm:grid-cols-3">
            {(
              [
                { step: "Listen", detail: "Understand the need." },
                { step: "Shape", detail: "Find the clear path." },
                { step: "Build", detail: "Ship with care." },
              ] as const
            ).map(({ step, detail }, i) => (
              <motion.div
                key={step}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{
                  delay: 0.18 + i * 0.09,
                  duration: 0.52,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-xl border border-emerald-950/10 bg-white/60 px-4 py-4 dark:border-white/10 dark:bg-white/[0.06]"
              >
                <p className="font-semibold text-emerald-950 dark:text-emerald-50">
                  {step}
                </p>
                <p className="mt-1 text-stone-500 dark:text-emerald-50/55">{detail}</p>
              </motion.div>
            ))}
          </div>

          {/* Social links */}
          <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium text-stone-500 dark:text-emerald-50/55">
            <Link
              href="#intro"
              className="transition hover:text-teal-800 dark:hover:text-teal-200"
            >
              Follow the journey ↓
            </Link>
            {site.socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-teal-800 dark:hover:text-teal-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Right: portrait ── */}
        <motion.div
          className="relative order-1 min-w-0 lg:order-2"
          style={prefersReducedMotion ? undefined : { opacity: portraitOpacity, y: portraitY }}
        >
          {/* Decorative background shapes */}
          <div className="absolute -left-6 top-6 hidden h-28 w-28 rounded-2xl bg-amber-200/65 dark:bg-amber-300/15 lg:block" />
          <div className="absolute -right-5 bottom-12 hidden h-24 w-24 rounded-2xl border border-teal-600/20 bg-teal-600/8 dark:border-teal-300/20 dark:bg-teal-300/8 lg:block" />

          {/* Portrait card — floating */}
          <motion.div
            className="relative overflow-hidden rounded-full border border-emerald-950/10 bg-white/85 p-3 shadow-2xl shadow-emerald-950/12 dark:border-white/10 dark:bg-white/[0.08] dark:shadow-black/35"
            animate={
              prefersReducedMotion
                ? undefined
                : { y: [0, -16, 0], rotate: [0, -0.7, 0.45, 0] }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 9, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <div className="overflow-hidden rounded-full">
              <Image
                src="/images/bg.png"
                alt="Kipkoech Benedict"
                width={720}
                height={720}
                className="w-full object-cover object-top"
                style={{ aspectRatio: "1 / 1" }}
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
              />
            </div>
          </motion.div>

          {/* Floating chip — top right */}
          <motion.div
            className="absolute -right-3 top-8 hidden items-center gap-2 rounded-xl border border-emerald-950/10 bg-white/95 px-4 py-2.5 shadow-lg shadow-emerald-950/8 dark:border-white/10 dark:bg-emerald-950/95 lg:flex"
            animate={
              prefersReducedMotion ? undefined : { y: [0, -7, 0] }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
            }
          >
            <span className="text-base">⚡</span>
            <span className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
              Full-stack
            </span>
          </motion.div>

          {/* Floating chip — bottom left */}
          <motion.div
            className="absolute -left-5 bottom-24 hidden items-center gap-2 rounded-xl border border-emerald-950/10 bg-white/95 px-4 py-2.5 shadow-lg shadow-emerald-950/8 dark:border-white/10 dark:bg-emerald-950/95 lg:flex"
            animate={
              prefersReducedMotion ? undefined : { y: [0, 7, 0] }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
            }
          >
            <span className="text-base">🛠</span>
            <span className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
              Nairobi, Kenya
            </span>
          </motion.div>

          {/* Quote card */}
          {/* <div className="mt-4 rounded-xl bg-emerald-950 p-5 shadow-xl shadow-emerald-950/25 dark:bg-emerald-50 lg:absolute lg:-bottom-4 lg:right-5 lg:mt-0 lg:max-w-[15rem]">
            <p className="text-sm leading-6 text-emerald-50/85 dark:text-emerald-950/75">
              Engineering discipline meets empathy: who is this for, what changes,
              what should feel easier after?
            </p>
          </div> */}
        </motion.div>
      </div>
    </motion.section>
  );
}
