import { MyStoriesClient } from "@/components/blog/MyStoriesClient";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export default function MyStoriesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="My stories"
        title="Track your submitted short stories."
        description="After passwordless sign-in, you can see your pending, approved, and rejected story submissions in one place."
      />
      <Section className="bg-white">
        <MyStoriesClient />
      </Section>
    </main>
  );
}
