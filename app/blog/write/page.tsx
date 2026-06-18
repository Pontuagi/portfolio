import { WriteStoryClient } from "@/components/blog/WriteStoryClient";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export default function WriteStoryPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Write"
        title="Submit a short story with passwordless sign-in."
        description="Provide your name and email, open the secure Firebase sign-in link, then submit a story in 500 words or fewer."
      />
      <Section className="bg-white">
        <WriteStoryClient />
      </Section>
    </main>
  );
}
