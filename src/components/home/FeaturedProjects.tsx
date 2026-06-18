import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function FeaturedProjects() {
  return (
    <Section className="bg-emerald-950 text-white">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-amber-200">
            Featured work
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Projects told as decisions, not thumbnails.
          </h2>
          <p className="mt-4 text-lg leading-8 text-emerald-50/75">
            Each project carries a small product story: what needed to be solved,
            what I built, and what the work taught me.
          </p>
        </div>
        <Button href="/projects" variant="secondary" className="bg-white">
          View all projects
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <Link
            key={project.slug}
            href="/projects"
            className="group overflow-hidden rounded-lg border border-white/10 bg-white/10"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={700}
              height={520}
              className="h-64 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            />
            <div className="p-6">
              <p className="text-sm font-semibold uppercase text-amber-200">
                {project.category}
              </p>
              <h3 className="mt-3 text-xl font-bold">{project.title}</h3>
              <p className="mt-3 leading-7 text-emerald-50/75">{project.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
