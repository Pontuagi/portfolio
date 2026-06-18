"use client";

import { useState } from "react";
import type { BlogPost } from "@/types/portfolio";
import { AdminActionButtons } from "@/components/admin/AdminActionButtons";
import { Card } from "@/components/ui/Card";

type AdminStoryCardProps = {
  post: BlogPost;
  working: boolean;
  onApprove: (post: BlogPost) => void;
  onReject: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
};

export function AdminStoryCard({
  post,
  working,
  onApprove,
  onReject,
  onDelete,
}: AdminStoryCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="p-5">
      <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className={statusClassName(post.status)}>{post.status}</span>
            <span className="text-sm text-stone-500">
              {post.createdAt ? formatDate(post.createdAt) : "No created date"}
            </span>
          </div>
          <h2 className="mt-3 text-xl font-bold text-emerald-950">{post.title}</h2>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600">
            <span>{post.authorName}</span>
            <span>{post.authorEmail}</span>
            <span>{post.wordCount} words</span>
          </div>
          <p className="mt-4 whitespace-pre-line leading-7 text-stone-700">
            {expanded ? post.content : post.preview}
          </p>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-4 text-sm font-semibold text-teal-800 hover:text-teal-950"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </div>
        <AdminActionButtons
          status={post.status}
          working={working}
          onApprove={() => onApprove(post)}
          onReject={() => onReject(post)}
          onDelete={() => onDelete(post)}
        />
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
