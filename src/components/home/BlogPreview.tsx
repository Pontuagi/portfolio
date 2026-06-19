import Link from "next/link";
import { stories } from "@/data/stories";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getStoryPath } from "@/lib/storyLinks";

export function BlogPreview() {
  return (
    <Section id="stories" className="bg-[#f7f5ef] dark:bg-[#0b201d]">
      <div className="mb-12 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-teal-800 dark:text-teal-200">
            Short Stories
          </p>
          <h2 className="mt-4 text-3xl font-bold text-emerald-950 dark:text-emerald-50 sm:text-4xl">
            Short Stories, Lasting Lessons
          </h2>
          <p className="mt-4 text-lg leading-8 text-stone-700 dark:text-emerald-50/75">
            I love short stories because they are small but powerful. They take
            little time to read, but they can leave behind lessons, emotion,
            perspective, and inspiration.
          </p>
          <p className="mt-4 leading-7 text-stone-600 dark:text-emerald-50/65">
            This section helps me keep track of impactful stories I come across,
            write, or learn from, while giving readers a quiet place to notice
            something meaningful in everyday life.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/stories">Browse stories</Button>
            <Button href="/stories/write" variant="secondary">
              Write a story
            </Button>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {[
            ["Little time", "A story can meet a reader in a spare minute."],
            ["Deep feeling", "A small scene can carry emotion and memory."],
            ["Shared lesson", "Stories preserve what experience teaches us."],
          ].map(([title, description]) => (
            <div
              key={title}
              className="rounded-lg border border-emerald-950/10 bg-white/65 p-4 dark:border-white/10 dark:bg-white/[0.06]"
            >
              <p className="text-sm font-bold text-emerald-950 dark:text-emerald-50">
                {title}
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-emerald-50/65">
                {description}
              </p>
            </div>
          ))}
          <div className="mt-3 flex flex-wrap gap-3 sm:col-span-3 lg:col-span-1">
            {stories.slice(0, 3).map((story) => (
              <Link
                key={story.slug}
                href={getStoryPath({ id: story.slug, slug: story.slug })}
                className="rounded-lg border border-emerald-950/10 bg-white/65 px-4 py-2 text-sm font-semibold text-teal-800 transition hover:border-teal-700/40 hover:text-teal-950 dark:border-white/10 dark:bg-white/[0.06] dark:text-teal-200 dark:hover:border-teal-200/35 dark:hover:text-teal-100"
              >
                {story.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {stories.slice(0, 3).map((story) => (
          <BlogCard key={story.slug} story={story} />
        ))}
      </div>
    </Section>
  );
}
