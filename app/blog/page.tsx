import { BlogListClient } from "@/components/blog/BlogListClient";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export default function BlogPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Short Stories"
        title="Short-stories."
        description="Permanent stories and approved community submissions live here. Readers can filter by author name and expand each card to read the full story."
      />
      <Section className="bg-white dark:bg-[#071412]">
        <BlogListClient />
      </Section>
    </main>
  );
}
