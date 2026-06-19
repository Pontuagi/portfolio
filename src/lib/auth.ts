import { FirebaseError } from "firebase/app";
import {
  browserLocalPersistence,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  setPersistence,
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
const sessionStartedAtKey = "portfolioStorySessionStartedAt";
const sessionMaxAgeMs = 7 * 24 * 60 * 60 * 1000;
let persistencePromise: Promise<void> | null = null;

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

  await ensureBrowserAuthPersistence();

  try {
    await sendSignInLinkToEmail(auth, trimmedEmail, {
      url: `${getAppUrl()}/stories/write`,
      handleCodeInApp: true,
    });
  } catch (error) {
    throw new Error(getFirebaseAuthErrorMessage(error));
  }

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

  await ensureBrowserAuthPersistence();

  let credential;

  try {
    credential = await signInWithEmailLink(auth, trimmedEmail, url);
  } catch (error) {
    throw new Error(getFirebaseAuthErrorMessage(error));
  }

  void updateProfile(credential.user, { displayName: trimmedName }).catch(() => {
    // Auth succeeded; display name sync is non-critical for entering the form.
  });
  void upsertUserProfile(credential.user.uid, trimmedName, trimmedEmail).catch(() => {
    // Auth succeeded; profile sync can be retried by later profile writes.
  });

  if (typeof window !== "undefined") {
    window.localStorage.removeItem(pendingEmailKey);
    window.localStorage.removeItem(pendingNameKey);
    markStorySessionStarted();
    window.history.replaceState({}, document.title, "/stories/write");
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

  void ensureBrowserAuthPersistence();

  return onAuthStateChanged(
    auth,
    async (user) => {
      if (user && isStorySessionExpired()) {
        await signOutBlogUser();
        callback(null);
        return;
      }

      if (user) {
        ensureStorySessionStarted();
      }

      callback(user);
    },
    () => callback(null),
  );
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
  clearStorySession();
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

function getFirebaseAuthErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    if (error.code === "auth/configuration-not-found") {
      return "Firebase Authentication is not enabled for this project yet. In Firebase Console, open Authentication > Sign-in method, enable Email/Password, enable Email link passwordless sign-in, save, and make sure localhost plus your deployed domain are authorized.";
    }

    if (error.code === "auth/operation-not-allowed") {
      return "Email sign-in is not enabled in Firebase Authentication. Enable Email/Password and Email link passwordless sign-in in Firebase Console, then try again.";
    }

    if (error.code === "auth/unauthorized-domain") {
      return "This domain is not authorized in Firebase Authentication. Add localhost and your deployed domain under Authentication > Settings > Authorized domains.";
    }

    if (error.code === "auth/invalid-email") {
      return "Please enter a valid email address.";
    }
  }

  return error instanceof Error ? error.message : "Could not complete Firebase sign-in.";
}

function ensureBrowserAuthPersistence() {
  if (!auth || typeof window === "undefined") {
    return Promise.resolve();
  }

  persistencePromise ??= setPersistence(auth, browserLocalPersistence);

  return persistencePromise;
}

function markStorySessionStarted() {
  window.localStorage.setItem(sessionStartedAtKey, String(Date.now()));
}

function ensureStorySessionStarted() {
  if (typeof window === "undefined") {
    return;
  }

  if (!window.localStorage.getItem(sessionStartedAtKey)) {
    markStorySessionStarted();
  }
}

function clearStorySession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(sessionStartedAtKey);
}

function isStorySessionExpired() {
  if (typeof window === "undefined") {
    return false;
  }

  const startedAt = Number(window.localStorage.getItem(sessionStartedAtKey));
  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return false;
  }

  return Date.now() - startedAt > sessionMaxAgeMs;
}
