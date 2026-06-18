import Image from "next/image";
import type { Project } from "@/types/portfolio";
import { MotionCard } from "@/components/motion/MotionCard";
import { Button } from "@/components/ui/Button";

type ProjectCaseStudyProps = {
  project: Project;
  reverse?: boolean;
};

export function ProjectCaseStudy({ project, reverse = false }: ProjectCaseStudyProps) {
  return (
    <MotionCard
      className={`grid gap-8 rounded-lg border border-emerald-950/10 bg-white/80 p-5 shadow-sm shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.07] lg:grid-cols-[0.9fr_1.1fr] lg:p-8 ${
        reverse ? "lg:[&>div:first-child]:order-2" : ""
      }`}
    >
      <div className="overflow-hidden rounded-lg bg-stone-200 dark:bg-emerald-950">
        <Image
          src={project.image}
          alt={project.title}
          width={900}
          height={700}
          className="h-full min-h-72 w-full object-cover transition duration-300 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
        />
      </div>
      <div>
        <p className="text-sm font-semibold uppercase text-teal-800 dark:text-teal-200">
          {project.category}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-emerald-950 dark:text-emerald-50">
          {project.title}
        </h2>
        <p className="mt-4 text-lg leading-8 text-stone-700 dark:text-emerald-50/75">
          {project.summary}
        </p>

        <div className="mt-8 grid gap-5">
          <CaseStudyBlock title="Problem" body={project.problem} />
          <CaseStudyBlock title="Solution" body={project.solution} />
          <CaseStudyBlock title="Impact" body={project.impact} />
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-950 dark:bg-amber-300/15 dark:text-amber-100"
            >
              {technology}
            </span>
          ))}
        </div>

        {project.link ? (
          <Button href={project.link.href} className="mt-8" target="_blank" rel="noreferrer">
            {project.link.label}
          </Button>
        ) : null}
      </div>
    </MotionCard>
  );
}

function CaseStudyBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase text-emerald-950 dark:text-emerald-50">
        {title}
      </h3>
      <p className="mt-2 leading-7 text-stone-700 dark:text-emerald-50/75">{body}</p>
    </div>
  );
}
