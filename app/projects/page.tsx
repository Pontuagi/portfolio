import { projects } from "@/data/projects";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export default function ProjectsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Projects"
        title="Case studies from web, mobile, and product interface work."
        description="These are not just screenshots. Each project is framed around the problem, the solution, the technologies, and the learning or impact behind it."
      />
      <Section className="bg-[#f7f5ef] dark:bg-[#0b201d]">
        <div className="space-y-10">
          {projects.map((project, index) => (
            <ProjectCaseStudy
              key={project.slug}
              project={project}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
