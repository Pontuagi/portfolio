import Link from "next/link";
import { stories } from "@/data/stories";
import { BlogCard } from "@/components/blog/BlogCard";
import { Section } from "@/components/ui/Section";

export function BlogPreview() {
  return (
    <Section className="bg-[#f7f5ef] dark:bg-[#0b201d]">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-800 dark:text-teal-200">
            Short Stories
          </p>
          <h2 className="mt-4 text-3xl font-bold text-emerald-950 dark:text-emerald-50 sm:text-4xl">
            Short-stories.
          </h2>
          <p className="mt-4 text-lg leading-8 text-stone-700 dark:text-emerald-50/75">
            A small writing space for reflections, prayers, inherited will, and
            the stories that stay.
          </p>
        </div>
        <Link
          href="/stories"
          className="font-semibold text-teal-800 transition hover:text-teal-950 dark:text-teal-200 dark:hover:text-teal-100"
        >
          Read short stories
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {stories.slice(0, 3).map((story) => (
          <BlogCard key={story.slug} story={story} />
        ))}
      </div>
    </Section>
  );
}
