import { HeroSceneLoader } from "@/components/home/HeroSceneLoader";
import { MotionSection } from "@/components/motion/MotionSection";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <MotionSection className="story-gradient subtle-grid overflow-hidden px-5 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase text-teal-800 dark:text-teal-200">
            Full-stack software engineer
          </p>
          <h1 className="mt-5 max-w-[22rem] break-words text-3xl font-bold leading-tight text-emerald-950 dark:text-emerald-50 sm:max-w-3xl sm:text-6xl lg:text-5xl xl:text-6xl">
            I build software that turns complex ideas into useful everyday tools.
          </h1>
          <p className="mt-6 max-w-[21rem] break-words text-base leading-7 text-stone-700 dark:text-emerald-50/75 sm:max-w-2xl sm:text-lg sm:leading-8">
            I am {site.name}, a Nairobi-based engineer shaped by mechatronics,
            ALX software training, backend specialization, and hands-on product work
            across web and mobile platforms.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AnimatedButton href="/projects">Explore case studies</AnimatedButton>
            <AnimatedButton href="/contact" variant="secondary">
              Start a conversation
            </AnimatedButton>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-stone-600 dark:text-emerald-50/65">
            {site.socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-teal-800 dark:hover:text-teal-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="relative min-h-80 min-w-0">
          <div className="absolute -right-24 -top-16 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl dark:bg-teal-300/10" />
          <HeroSceneLoader />
          <p className="mx-auto -mt-8 max-w-sm text-center text-sm leading-6 text-stone-600 dark:text-emerald-50/65 sm:-mt-12">
            From engineering systems to software systems, I care about tools that
            simplify work and improve lives.
          </p>
        </div>
      </div>
    </MotionSection>
  );
}
