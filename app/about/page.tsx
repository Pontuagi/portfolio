import Image from "next/image";
import { timeline } from "@/data/timeline";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

export default function AboutPage() {
  const education = timeline.filter((item) => item.type === "education");
  const experience = timeline.filter((item) => item.type === "experience");

  return (
    <main>
      <PageHeader
        eyebrow="About"
        title="I connect engineering discipline with software that people can actually use."
        description="My background spans mechatronics, full-stack engineering, backend systems, mobile development, and team delivery work."
      />

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Image
            src="/images/office.jpeg"
            alt="Workspace"
            width={900}
            height={700}
            className="h-full max-h-[520px] rounded-lg object-cover"
          />
          <div className="space-y-5 text-lg leading-8 text-stone-700">
            <p>
              As a full-stack software engineer, I bring front-end and back-end
              development together with curiosity, lifelong learning, and a practical
              eye for systems that make work easier.
            </p>
            <p>
              ALX Africa gave me a strong foundation in C, Python, JavaScript,
              Django, Node.js, and backend development. My mechatronics background
              keeps me attentive to real-world constraints, automation, and the
              connection between tools and human routines.
            </p>
            <p>
              I am especially interested in automation companies, mobility products,
              and local household technology: software and systems that simplify
              processes and improve life for future generations.
            </p>
            <Button href={site.cvHref} target="_blank" rel="noreferrer">
              Download CV
            </Button>
          </div>
        </div>
      </Section>

      <Section className="bg-[#f7f5ef]">
        <div className="grid gap-10 lg:grid-cols-2">
          <TimelineColumn title="Education" items={education} />
          <TimelineColumn title="Experience" items={experience} />
        </div>
      </Section>
    </main>
  );
}

type TimelineColumnProps = {
  title: string;
  items: typeof timeline;
};

function TimelineColumn({ title, items }: TimelineColumnProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-emerald-950">{title}</h2>
      <div className="mt-8 space-y-5">
        {items.map((item) => (
          <article
            key={`${item.title}-${item.period}`}
            className="border-l-2 border-teal-700 bg-white/70 py-1 pl-5"
          >
            <h3 className="text-lg font-bold text-emerald-950">{item.title}</h3>
            <p className="mt-1 text-sm font-medium text-stone-500">
              {item.organization} | {item.period}
            </p>
            <p className="mt-3 leading-7 text-stone-700">{item.description}</p>
            {item.highlights ? (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-700">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
