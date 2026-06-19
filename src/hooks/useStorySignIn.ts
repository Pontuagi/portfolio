"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { User } from "firebase/auth";
import {
  completeBlogEmailSignIn,
  getPendingBlogIdentity,
  getUserProfile,
  hasEmailSignInLink,
  sendBlogSignInLink,
  subscribeToAuth,
} from "@/services/auth/blogAuthService";

type StorySignInNotifications = {
  showError: (message: string, title?: string) => void;
  showSuccess: (message: string, title?: string) => void;
};

export function useStorySignIn({ showError, showSuccess }: StorySignInNotifications) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const completingEmailLinkRef = useRef(false);

  useEffect(() => {
    let settled = false;
    const fallbackTimer = window.setTimeout(() => {
      if (!settled && !completingEmailLinkRef.current) {
        setAuthLoading(false);
      }
    }, 5000);

    const unsubscribe = subscribeToAuth(async (currentUser) => {
      settled = true;
      window.clearTimeout(fallbackTimer);
      setUser(currentUser);
      setAuthLoading(false);

      if (currentUser) {
        setEmail(currentUser.email ?? "");
        setName(currentUser.displayName ?? "");

        try {
          const profile = await getUserProfile(currentUser.uid);
          if (profile) {
            setName(profile.name);
            setEmail(profile.email);
          }
        } catch {
          // The write form can still work from auth data when profile fetch fails.
        }
      }
    });

    return () => {
      window.clearTimeout(fallbackTimer);
      unsubscribe();
    };
  }, []);

  const completeSignIn = useCallback(
    async (emailValue = email, nameValue = name) => {
      if (typeof window === "undefined") {
        return;
      }

      try {
        completingEmailLinkRef.current = true;
        setWorking(true);
        setAuthLoading(false);
        setError("");
        const signedInUser = await completeBlogEmailSignIn(
          emailValue,
          nameValue,
          window.location.href,
        );
        setUser(signedInUser);
        setEmail(signedInUser.email ?? emailValue.trim().toLowerCase());
        setName(signedInUser.displayName ?? nameValue.trim());
        setNeedsConfirmation(false);
        setSuccess("You are signed in. You can submit your story now.");
        showSuccess("You are signed in. You can submit your story now.", "Authentication successful");
      } catch (caughtError) {
        const message =
          caughtError instanceof Error ? caughtError.message : "Could not complete sign-in.";
        setError(message);
        showError(message, "Authentication error");
      } finally {
        completingEmailLinkRef.current = false;
        setAuthLoading(false);
        setWorking(false);
      }
    },
    [email, name, showError, showSuccess],
  );

  useEffect(() => {
    if (typeof window === "undefined" || !hasEmailSignInLink(window.location.href)) {
      return;
    }

    const pendingIdentity = getPendingBlogIdentity();
    setName(pendingIdentity.name);
    setEmail(pendingIdentity.email);

    if (!pendingIdentity.name || !pendingIdentity.email) {
      setNeedsConfirmation(true);
      setAuthLoading(false);
      return;
    }

    void completeSignIn(pendingIdentity.email, pendingIdentity.name);
  }, [completeSignIn]);

  async function sendSignInLink() {
    try {
      setWorking(true);
      setError("");
      setSuccess("");
      await sendBlogSignInLink(name, email);
      setLinkSent(true);
      showSuccess("Check your inbox for the secure sign-in link.", "Sign-in link sent");
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Could not send sign-in link.";
      setError(message);
      showError(message, "Authentication error");
    } finally {
      setWorking(false);
    }
  }

  return {
    authLoading,
    completeSignIn,
    email,
    error,
    linkSent,
    name,
    needsConfirmation,
    sendSignInLink,
    setEmail,
    setError,
    setName,
    setSuccess,
    setUser,
    setWorking,
    success,
    user,
    working,
  };
}
