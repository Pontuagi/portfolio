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
import { auth, db, requireFirebase } from "@/config/firebase";
import { getFirebaseAuthErrorMessage } from "@/services/auth/firebaseAuthErrors";
import {
  clearPendingBlogIdentity,
  clearStorySession,
  ensureStorySessionStarted,
  getPendingBlogIdentity,
  isStorySessionExpired,
  markStorySessionStarted,
  savePendingBlogIdentity,
} from "@/services/auth/sessionStorage";

let persistencePromise: Promise<void> | null = null;

export { getPendingBlogIdentity };

/**
 * Returns the browser origin used for Firebase email-link redirects.
 */
export function getAppUrl() {
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

  savePendingBlogIdentity(trimmedName, trimmedEmail);
}

export function hasEmailSignInLink(url: string) {
  if (!auth) {
    return false;
  }

  return isSignInWithEmailLink(auth, url);
}

/**
 * Completes Firebase email-link sign-in and stores the display profile used by story submissions.
 */
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
    clearPendingBlogIdentity();
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

function ensureBrowserAuthPersistence() {
  if (!auth || typeof window === "undefined") {
    return Promise.resolve();
  }

  persistencePromise ??= setPersistence(auth, browserLocalPersistence);

  return persistencePromise;
}
