import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
  Timestamp,
  type DocumentData,
} from "firebase/firestore";
import type { AdminProfile, AdminRole, BlogPost, BlogStatus } from "@/types/portfolio";
import { db } from "@/lib/firebase";

export async function getAdminProfile(userId: string): Promise<AdminProfile | null> {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  const snapshot = await getDoc(doc(db, "admins", userId));
  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();
  if (!isAdminRole(data.role)) {
    return null;
  }

  return {
    id: userId,
    email: String(data.email ?? ""),
    role: data.role,
    createdAt: toDate(data.createdAt),
  };
}

export async function getAdminBlogPosts(status: BlogStatus) {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  const snapshot = await getDocs(
    query(collection(db, "blogPosts"), where("status", "==", status), limit(100)),
  );

  return snapshot.docs
    .map((docSnapshot) => mapBlogPost(docSnapshot.id, docSnapshot.data()))
    .sort((first, second) => {
      const firstTime = first.createdAt?.getTime() ?? 0;
      const secondTime = second.createdAt?.getTime() ?? 0;
      return secondTime - firstTime;
    });
}

export async function approveBlogPost(postId: string) {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  await updateDoc(doc(db, "blogPosts", postId), {
    status: "approved" satisfies BlogStatus,
    publishedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function rejectBlogPost(postId: string) {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  await updateDoc(doc(db, "blogPosts", postId), {
    status: "rejected" satisfies BlogStatus,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBlogPost(postId: string) {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  await deleteDoc(doc(db, "blogPosts", postId));
}

function mapBlogPost(id: string, data: DocumentData): BlogPost {
  return {
    id,
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

function isAdminRole(value: unknown): value is AdminRole {
  return value === "owner" || value === "admin";
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
