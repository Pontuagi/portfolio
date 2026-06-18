import {
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import type { UserProfile } from "@/types/portfolio";
import { auth, db, requireFirebase } from "@/lib/firebase";

const pendingEmailKey = "portfolioBlogPendingEmail";
const pendingNameKey = "portfolioBlogPendingName";

export function getAppUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
}

export async function sendBlogSignInLink(name: string, email: string) {
  const { auth } = requireFirebase();
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedName || !trimmedEmail) {
    throw new Error("Please enter your name and email address.");
  }

  await sendSignInLinkToEmail(auth, trimmedEmail, {
    url: `${getAppUrl()}/blog/write`,
    handleCodeInApp: true,
  });

  if (typeof window !== "undefined") {
    window.localStorage.setItem(pendingEmailKey, trimmedEmail);
    window.localStorage.setItem(pendingNameKey, trimmedName);
  }
}

export function hasEmailSignInLink(url: string) {
  if (!auth) {
    return false;
  }

  return isSignInWithEmailLink(auth, url);
}

export function getPendingBlogIdentity() {
  if (typeof window === "undefined") {
    return { name: "", email: "" };
  }

  return {
    name: window.localStorage.getItem(pendingNameKey) ?? "",
    email: window.localStorage.getItem(pendingEmailKey) ?? "",
  };
}

export async function completeBlogEmailSignIn(email: string, name: string, url: string) {
  const { auth } = requireFirebase();
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedName = name.trim();

  if (!trimmedEmail || !trimmedName) {
    throw new Error("Please confirm your name and email to finish signing in.");
  }

  const credential = await signInWithEmailLink(auth, trimmedEmail, url);
  await updateProfile(credential.user, { displayName: trimmedName });
  await upsertUserProfile(credential.user.uid, trimmedName, trimmedEmail);

  if (typeof window !== "undefined") {
    window.localStorage.removeItem(pendingEmailKey);
    window.localStorage.removeItem(pendingNameKey);
    window.history.replaceState({}, document.title, "/blog/write");
  }

  return credential.user;
}

export async function upsertUserProfile(userId: string, name: string, email: string) {
  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  const userRef = doc(db, "users", userId);
  const snapshot = await getDoc(userRef);

  await setDoc(
    userRef,
    {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      createdAt: snapshot.exists() ? snapshot.data().createdAt : serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  if (!auth) {
    callback(null);
    return () => undefined;
  }

  return onAuthStateChanged(auth, callback);
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  const snapshot = await getDoc(doc(db, "users", userId));
  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    id: userId,
    name: String(data.name ?? ""),
    email: String(data.email ?? ""),
    createdAt: data.createdAt?.toDate?.() ?? null,
    updatedAt: data.updatedAt?.toDate?.() ?? null,
  };
}

export function getCurrentBlogUser() {
  return auth?.currentUser ?? null;
}

export async function signOutBlogUser() {
  if (!auth) {
    return;
  }

  await signOut(auth);
}

export function getUserProfileFromAuth(user: User, fallbackName = ""): UserProfile {
  return {
    id: user.uid,
    name: user.displayName ?? fallbackName,
    email: user.email ?? "",
    createdAt: null,
    updatedAt: null,
  };
}
