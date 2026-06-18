import { skillGroups } from "@/data/skills";
import { Section } from "@/components/ui/Section";

export function Skills() {
  return (
    <Section className="bg-white">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-semibold uppercase text-teal-800">
          Skills and tools
        </p>
        <h2 className="mt-4 text-3xl font-bold text-emerald-950 sm:text-4xl">
          A practical stack for full-stack product work.
        </h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-5">
        {skillGroups.map((group) => (
          <article
            key={group.title}
            className="rounded-lg border border-emerald-950/10 bg-[#f7f5ef] p-5"
          >
            <h3 className="text-lg font-bold text-emerald-950">{group.title}</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">{group.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-white px-3 py-1 text-sm font-medium text-stone-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
