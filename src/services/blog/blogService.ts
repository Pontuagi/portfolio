import {
  addDoc,
  collection,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { permanentBlogPosts } from "@/data/stories";
import type { BlogPost, BlogStatus } from "@/types/portfolio";
import { db, requireFirebase } from "@/config/firebase";
import { mapBlogPost } from "@/services/blog/mappers";
import { validateStoryDraft } from "@/services/blog/validation";

type CreateBlogPostInput = {
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
};

export async function createBlogPost({
  title,
  content,
  authorId,
  authorName,
  authorEmail,
}: CreateBlogPostInput) {
  const { db } = requireFirebase();
  const draft = validateStoryDraft(title, content);
  const trimmedAuthorName = authorName.trim();
  const trimmedAuthorEmail = authorEmail.trim().toLowerCase();

  if (!trimmedAuthorName || !trimmedAuthorEmail) {
    throw new Error("Please sign in again so your story has a name and email.");
  }

  try {
    await addDoc(collection(db, "blogPosts"), {
      title: draft.title,
      content: draft.content,
      preview: draft.preview,
      wordCount: draft.wordCount,
      authorId,
      authorName: trimmedAuthorName,
      authorEmail: trimmedAuthorEmail,
      status: "pending" satisfies BlogStatus,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      publishedAt: null,
    });
  } catch (error) {
    throw new Error(getStorySubmissionErrorMessage(error));
  }
}

export async function getApprovedBlogPosts(authorName?: string) {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  const snapshot = await getDocs(
    query(collection(db, "blogPosts"), where("status", "==", "approved"), limit(50)),
  );
  const posts = snapshot.docs
    .map((docSnapshot) => mapBlogPost(docSnapshot.id, docSnapshot.data()))
    .sort(newestPublishedFirst);

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

function newestPublishedFirst(first: BlogPost, second: BlogPost) {
  const firstTime =
    first.publishedAt?.getTime() ?? first.createdAt?.getTime() ?? first.updatedAt?.getTime() ?? 0;
  const secondTime =
    second.publishedAt?.getTime() ??
    second.createdAt?.getTime() ??
    second.updatedAt?.getTime() ??
    0;

  return secondTime - firstTime;
}

function getStorySubmissionErrorMessage(error: unknown) {
  if (error instanceof FirebaseError && error.code === "permission-denied") {
    return "Firestore rejected this story write. Deploy the latest firestore.rules for blogPosts, then try submitting again.";
  }

  return error instanceof Error ? error.message : "Could not submit story.";
}
