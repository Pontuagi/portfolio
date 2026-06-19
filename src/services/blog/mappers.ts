import { Timestamp, type DocumentData } from "firebase/firestore";
import type { BlogPost, BlogStatus } from "@/types/portfolio";

/**
 * Converts Firestore data into the stable BlogPost shape used by UI components.
 */
export function mapBlogPost(id: string, data: DocumentData): BlogPost {
  return {
    id,
    slug: typeof data.slug === "string" && data.slug.trim() ? data.slug : undefined,
    title: String(data.title ?? ""),
    content: String(data.content ?? ""),
    preview: String(data.preview ?? ""),
    wordCount: Number(data.wordCount ?? 0),
    authorId: String(data.authorId ?? ""),
    authorName: String(data.authorName ?? "Unknown author"),
    authorEmail: String(data.authorEmail ?? ""),
    status: isBlogStatus(data.status) ? data.status : "pending",
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
    publishedAt: toDate(data.publishedAt),
  };
}

export function isBlogStatus(value: unknown): value is BlogStatus {
  return value === "pending" || value === "approved" || value === "rejected";
}

export function toDate(value: unknown) {
  if (!value) {
    return null;
  }

  if (value instanceof Timestamp) {
    return value.toDate();
  }

  if (value instanceof Date) {
    return value;
  }

  return null;
}
