import Link from "next/link";
import type { Story } from "@/types/portfolio";
import { getStoryPath } from "@/lib/storyLinks";
import { MotionCard } from "@/components/motion/MotionCard";
import { ShareStoryButton } from "@/components/blog/ShareStoryButton";

type BlogCardProps = {
  story: Story;
};

export function BlogCard({ story }: BlogCardProps) {
  const published = story.status === "published";
  const storyLinkTarget = {
    id: story.slug,
    slug: story.slug,
    title: story.title,
    preview: story.excerpt,
  };
  const storyPath = getStoryPath(storyLinkTarget);

  return (
    <MotionCard className="flex h-full flex-col rounded-lg border border-emerald-950/10 bg-white/80 p-6 shadow-sm shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.07]">
      <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase text-teal-800 dark:text-teal-200">
        <span>{story.category}</span>
        <span className="text-stone-500 dark:text-emerald-50/55">{story.readTime}</span>
      </div>
      <h3 className="mt-5 text-xl font-bold text-emerald-950 dark:text-emerald-50">
        {published ? (
          <Link
            href={storyPath}
            className="transition hover:text-teal-800 dark:hover:text-teal-200"
          >
            {story.title}
          </Link>
        ) : (
          story.title
        )}
      </h3>
      <p className="mt-3 flex-1 leading-7 text-stone-700 dark:text-emerald-50/75">
        {story.excerpt}
      </p>
      <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
        <p className="py-2 text-sm font-semibold text-stone-500 dark:text-emerald-50/55">
          {published ? "Published" : "Draft"}
        </p>
        {published ? (
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={storyPath}
              className="py-2 text-sm font-semibold text-teal-800 transition hover:text-teal-950 dark:text-teal-200 dark:hover:text-teal-100"
            >
              Read story
            </Link>
            <ShareStoryButton post={storyLinkTarget} />
          </div>
        ) : null}
      </div>
    </MotionCard>
  );
}
