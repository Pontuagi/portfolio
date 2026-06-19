import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { MotionCard } from "@/components/motion/MotionCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function FeaturedProjects() {
  return (
    <Section id="work" className="bg-emerald-950 text-white dark:bg-[#05100f]">
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-200">
            Featured work
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            Projects told as decisions, not thumbnails.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-emerald-50/70">
            Each project carries a small product story: what needed to be solved,
            what I built, and what the work taught me.
          </p>
        </div>
        <Button
          href="/projects"
          variant="secondary"
          className="shrink-0 bg-white/10 dark:bg-white/[0.08]"
        >
          View all projects
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {projects.slice(0, 3).map((project, index) => (
          <MotionCard key={project.slug} className="group overflow-hidden rounded-xl">
            <Link
              href="/projects"
              className="block h-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.07] transition hover:bg-white/[0.12]"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={700}
                  height={480}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                {/* Numbered label */}
                <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-950/75 text-xs font-bold text-amber-200 backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-200">
                  {project.category}
                </p>
                <h3 className="mt-3 text-lg font-bold leading-snug">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-emerald-50/65">
                  {project.summary}
                </p>
                <p className="mt-5 text-xs font-semibold text-emerald-50/40 transition group-hover:text-amber-200">
                  View case study →
                </p>
              </div>
            </Link>
          </MotionCard>
        ))}
      </div>
    </Section>
  );
}
