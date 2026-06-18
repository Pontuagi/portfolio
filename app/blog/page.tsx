import { BlogListClient } from "@/components/blog/BlogListClient";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export default function BlogPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Blog"
        title="Short stories from the community."
        description="Approved stories appear here after review. Readers can filter by author name and expand each card to read the full story."
      />
      <Section className="bg-white">
        <BlogListClient />
      </Section>
    </main>
  );
}
