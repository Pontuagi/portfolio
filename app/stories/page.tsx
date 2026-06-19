import { BlogListClient } from "@/components/blog/BlogListClient";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export default function BlogPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Short Stories"
        title="Short Stories, Lasting Lessons"
        description="I love short stories because they are small but powerful. They take little time to read, but they can leave behind lessons, emotion, perspective, and inspiration. This space helps me keep track of impactful stories I come across, write, and learn from."
        actions={
          <>
            <Button href="#stories-list">Browse stories</Button>
            <Button href="/stories/write" variant="secondary">
              Write a story
            </Button>
          </>
        }
      />
      <Section id="stories-list" className="bg-white dark:bg-[#071412]">
        <BlogListClient />
      </Section>
    </main>
  );
}
