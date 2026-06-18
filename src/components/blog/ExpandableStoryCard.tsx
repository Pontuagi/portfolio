"use client";

import Link from "next/link";
import { useState } from "react";
import type { BlogPost } from "@/types/portfolio";
import { getStoryPath } from "@/lib/storyLinks";
import { MotionCard } from "@/components/motion/MotionCard";
import { ShareStoryButton } from "@/components/blog/ShareStoryButton";

type ExpandableStoryCardProps = {
  post: BlogPost;
  showStatus?: boolean;
};

export function ExpandableStoryCard({
  post,
  showStatus = false,
}: ExpandableStoryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const displayDate = post.publishedAt ?? post.createdAt ?? post.updatedAt;
  const publiclyShareable = post.status === "approved";
  const storyPath = publiclyShareable ? getStoryPath(post) : "";

  return (
    <MotionCard className="rounded-lg border border-emerald-950/10 bg-white/80 p-6 shadow-sm shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.07]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50">
            {publiclyShareable ? (
              <Link
                href={storyPath}
                className="transition hover:text-teal-800 dark:hover:text-teal-200"
              >
                {post.title}
              </Link>
            ) : (
              post.title
            )}
          </h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-emerald-50/65">
            By {post.authorName} {displayDate ? `on ${formatDate(displayDate)}` : ""}
          </p>
        </div>
        {showStatus ? (
          <span className={statusClassName(post.status)}>{post.status}</span>
        ) : null}
      </div>

      <p className="mt-5 whitespace-pre-line leading-7 text-stone-700 dark:text-emerald-50/75">
        {expanded ? post.content : post.preview}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-stone-500 dark:text-emerald-50/55">
          {post.wordCount} words
        </p>
        <div className="flex flex-wrap items-start gap-3">
          {publiclyShareable ? (
            <Link
              href={storyPath}
              className="rounded-md border border-emerald-950/15 px-4 py-2 text-sm font-semibold text-teal-800 transition hover:border-teal-700 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-white/15 dark:text-teal-200 dark:hover:border-teal-300 dark:hover:bg-white/10"
            >
              Open story
            </Link>
          ) : null}
          <button
            type="button"
            className="rounded-md border border-emerald-950/15 px-4 py-2 text-sm font-semibold text-teal-800 transition hover:border-teal-700 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-white/15 dark:text-teal-200 dark:hover:border-teal-300 dark:hover:bg-white/10"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
          {publiclyShareable ? <ShareStoryButton post={post} /> : null}
        </div>
      </div>
    </MotionCard>
  );
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
}

function statusClassName(status: BlogPost["status"]) {
  const base = "rounded-full px-3 py-1 text-sm font-semibold capitalize";

  if (status === "approved") {
    return `${base} bg-teal-100 text-teal-900 dark:bg-teal-300/15 dark:text-teal-100`;
  }

  if (status === "rejected") {
    return `${base} bg-red-100 text-red-900 dark:bg-red-400/15 dark:text-red-100`;
  }

  return `${base} bg-amber-100 text-amber-950 dark:bg-amber-300/15 dark:text-amber-100`;
}
