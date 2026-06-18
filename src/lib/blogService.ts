import {
  addDoc,
  collection,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  type DocumentData,
} from "firebase/firestore";
import { permanentBlogPosts } from "@/data/stories";
import type { BlogPost, BlogStatus } from "@/types/portfolio";
import { db, requireFirebase } from "@/lib/firebase";

export const maxStoryWords = 500;
export const maxStoryTitleLength = 80;

export function countWords(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function createPreview(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean);
  const previewWords = words.slice(0, 34).join(" ");
  return words.length > 34 ? `${previewWords}...` : previewWords;
}

export async function createBlogPost({
  title,
  content,
  authorId,
  authorName,
  authorEmail,
}: {
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
}) {
  const { db } = requireFirebase();
  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();
  const wordCount = countWords(trimmedContent);

  if (!trimmedTitle) {
    throw new Error("Please add a story title.");
  }

  if (trimmedTitle.length > maxStoryTitleLength) {
    throw new Error(`Titles must be ${maxStoryTitleLength} characters or fewer.`);
  }

  if (!trimmedContent) {
    throw new Error("Please write your short story.");
  }

  if (wordCount > maxStoryWords) {
    throw new Error(`Stories must be ${maxStoryWords} words or fewer.`);
  }

  await addDoc(collection(db, "blogPosts"), {
    title: trimmedTitle,
    content: trimmedContent,
    preview: createPreview(trimmedContent),
    wordCount,
    authorId,
    authorName: authorName.trim(),
    authorEmail: authorEmail.trim().toLowerCase(),
    status: "pending" satisfies BlogStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publishedAt: null,
  });
}

export async function getApprovedBlogPosts(authorName?: string) {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  const constraints = [
    where("status", "==", "approved"),
    orderBy("publishedAt", "desc"),
    limit(50),
  ];
  const snapshot = await getDocs(query(collection(db, "blogPosts"), ...constraints));
  const posts = snapshot.docs.map((docSnapshot) =>
    mapBlogPost(docSnapshot.id, docSnapshot.data()),
  );

  const normalizedAuthor = authorName?.trim().toLowerCase();
  if (!normalizedAuthor) {
    return posts;
  }

  return posts.filter((post) =>
    post.authorName.toLowerCase().includes(normalizedAuthor),
  );
}

export async function getApprovedBlogPostByStoryId(storyId: string) {
  const decodedStoryId = decodeURIComponent(storyId);
  const permanentPost = permanentBlogPosts.find(
    (post) =>
      post.status === "approved" &&
      (post.slug === decodedStoryId || post.id === decodedStoryId),
  );

  if (permanentPost) {
    return permanentPost;
  }

  if (!db) {
    return null;
  }

  const snapshot = await getDocs(
    query(
      collection(db, "blogPosts"),
      where(documentId(), "==", decodedStoryId),
      where("status", "==", "approved"),
      limit(1),
    ),
  );

  const docSnapshot = snapshot.docs[0];
  if (!docSnapshot) {
    return null;
  }

  return mapBlogPost(docSnapshot.id, docSnapshot.data());
}

export async function getUserBlogPosts(authorId: string) {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  const snapshot = await getDocs(
    query(
      collection(db, "blogPosts"),
      where("authorId", "==", authorId),
      orderBy("createdAt", "desc"),
      limit(100),
    ),
  );

  return snapshot.docs.map((docSnapshot) =>
    mapBlogPost(docSnapshot.id, docSnapshot.data()),
  );
}

function mapBlogPost(id: string, data: DocumentData): BlogPost {
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

function isBlogStatus(value: unknown): value is BlogStatus {
  return value === "pending" || value === "approved" || value === "rejected";
}

function toDate(value: unknown) {
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
