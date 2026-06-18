import Image from "next/image";
import type { Project } from "@/types/portfolio";
import { Button } from "@/components/ui/Button";

type ProjectCaseStudyProps = {
  project: Project;
  reverse?: boolean;
};

export function ProjectCaseStudy({ project, reverse = false }: ProjectCaseStudyProps) {
  return (
    <article
      className={`grid gap-8 rounded-lg border border-emerald-950/10 bg-white/80 p-5 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-8 ${
        reverse ? "lg:[&>div:first-child]:order-2" : ""
      }`}
    >
      <div className="overflow-hidden rounded-lg bg-stone-200">
        <Image
          src={project.image}
          alt={project.title}
          width={900}
          height={700}
          className="h-full min-h-72 w-full object-cover"
        />
      </div>
      <div>
        <p className="text-sm font-semibold uppercase text-teal-800">
          {project.category}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-emerald-950">{project.title}</h2>
        <p className="mt-4 text-lg leading-8 text-stone-700">{project.summary}</p>

        <div className="mt-8 grid gap-5">
          <CaseStudyBlock title="Problem" body={project.problem} />
          <CaseStudyBlock title="Solution" body={project.solution} />
          <CaseStudyBlock title="Impact" body={project.impact} />
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-950"
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
    </article>
  );
}

function CaseStudyBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase text-emerald-950">
        {title}
      </h3>
      <p className="mt-2 leading-7 text-stone-700">{body}</p>
    </div>
  );
}
