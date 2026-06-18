"use client";

import { useState } from "react";
import type { BlogPost } from "@/types/portfolio";
import { Card } from "@/components/ui/Card";

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

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-emerald-950">{post.title}</h2>
          <p className="mt-2 text-sm text-stone-600">
            By {post.authorName} {displayDate ? `on ${formatDate(displayDate)}` : ""}
          </p>
        </div>
        {showStatus ? (
          <span className={statusClassName(post.status)}>{post.status}</span>
        ) : null}
      </div>

      <p className="mt-5 whitespace-pre-line leading-7 text-stone-700">
        {expanded ? post.content : post.preview}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-stone-500">{post.wordCount} words</p>
        <button
          type="button"
          className="rounded-md border border-emerald-950/15 px-4 py-2 text-sm font-semibold text-teal-800 transition hover:border-teal-700 hover:bg-teal-50"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      </div>
    </Card>
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
    return `${base} bg-teal-100 text-teal-900`;
  }

  if (status === "rejected") {
    return `${base} bg-red-100 text-red-900`;
  }

  return `${base} bg-amber-100 text-amber-950`;
}
