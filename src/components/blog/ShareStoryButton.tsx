"use client";

import { useState } from "react";
import type { BlogPost } from "@/types/portfolio";
import { getAbsoluteStoryUrl } from "@/lib/storyLinks";

type ShareStoryButtonProps = {
  post: Pick<BlogPost, "id" | "slug" | "title" | "preview">;
};

export function ShareStoryButton({ post }: ShareStoryButtonProps) {
  const [message, setMessage] = useState("");

  async function handleShare() {
    const url = getAbsoluteStoryUrl(post);

    setMessage("");

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.preview,
          url,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await copyStoryUrl(url);
      setMessage("Story link copied.");
    } catch {
      setMessage("Could not copy link.");
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        className="rounded-md border border-emerald-950/15 px-4 py-2 text-sm font-semibold text-teal-800 transition hover:border-teal-700 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-white/15 dark:text-teal-200 dark:hover:border-teal-300 dark:hover:bg-white/10"
        onClick={handleShare}
      >
        Share
      </button>
      {message ? (
        <p className="text-sm font-medium text-teal-800 dark:text-teal-200" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}

async function copyStoryUrl(url: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(url);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = url;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";

  document.body.appendChild(textarea);
  textarea.select();

  try {
    const copied = document.execCommand("copy");
    if (!copied) {
      throw new Error("Copy command failed.");
    }
  } finally {
    document.body.removeChild(textarea);
  }
}
