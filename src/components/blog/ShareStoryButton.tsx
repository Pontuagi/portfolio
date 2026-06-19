"use client";

import { useState } from "react";
import type { BlogPost } from "@/types/portfolio";
import { getAbsoluteStoryUrl } from "@/lib/storyLinks";

type ShareStoryButtonProps = {
  post: Pick<BlogPost, "id" | "slug" | "title" | "preview">;
  tone?: "default" | "blue" | "attention";
};

export function ShareStoryButton({ post, tone = "default" }: ShareStoryButtonProps) {
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
        className={buttonToneClassName(tone)}
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

function buttonToneClassName(tone: ShareStoryButtonProps["tone"]) {
  const base =
    "rounded-md border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  if (tone === "blue") {
    return `${base} border-sky-800/25 text-sky-800 hover:border-sky-700 hover:bg-sky-50 focus-visible:outline-sky-600 dark:border-sky-300/25 dark:text-sky-200 dark:hover:border-sky-300 dark:hover:bg-sky-400/10`;
  }

  if (tone === "attention") {
    return `${base} border-sky-700 bg-sky-700 text-white shadow-sm shadow-sky-950/15 hover:border-sky-800 hover:bg-sky-800 focus-visible:outline-sky-600 dark:border-sky-300 dark:bg-sky-300 dark:text-sky-950 dark:hover:bg-sky-200`;
  }

  return `${base} border-emerald-950/15 text-teal-800 hover:border-teal-700 hover:bg-teal-50 focus-visible:outline-teal-600 dark:border-white/15 dark:text-teal-200 dark:hover:border-teal-300 dark:hover:bg-white/10`;
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
