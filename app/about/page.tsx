import { timeline } from "@/data/timeline";
import { ProfileSummary } from "@/components/about/ProfileSummary";
import { TimelineColumn } from "@/components/about/TimelineColumn";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

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

      <Section className="bg-white dark:bg-[#071412]">
        <ProfileSummary />
      </Section>

      <Section className="bg-[#f7f5ef] dark:bg-[#0b201d]">
        <div className="grid gap-10 lg:grid-cols-2">
          <TimelineColumn title="Education" items={education} />
          <TimelineColumn title="Experience" items={experience} />
        </div>
      </Section>
    </main>
  );
}
