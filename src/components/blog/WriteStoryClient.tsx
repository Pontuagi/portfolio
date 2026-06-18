"use client";

import { FormEvent, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import {
  completeBlogEmailSignIn,
  getPendingBlogIdentity,
  getUserProfile,
  hasEmailSignInLink,
  sendBlogSignInLink,
  subscribeToAuth,
} from "@/lib/auth";
import {
  countWords,
  createBlogPost,
  maxStoryTitleLength,
  maxStoryWords,
} from "@/lib/blogService";
import { isFirebaseConfigured } from "@/lib/firebase";
import { BlogState } from "@/components/blog/BlogState";

export function WriteStoryClient() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const wordCount = countWords(content);
  const overWordLimit = wordCount > maxStoryWords;
  const titleTooLong = title.length > maxStoryTitleLength;

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (currentUser) => {
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

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !hasEmailSignInLink(window.location.href)) {
      return;
    }

    const pendingIdentity = getPendingBlogIdentity();
    setName(pendingIdentity.name);
    setEmail(pendingIdentity.email);

    if (!pendingIdentity.name || !pendingIdentity.email) {
      setNeedsConfirmation(true);
      return;
    }

    completeSignIn(pendingIdentity.email, pendingIdentity.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function completeSignIn(emailValue = email, nameValue = name) {
    if (typeof window === "undefined") {
      return;
    }

    try {
      setWorking(true);
      setError("");
      await completeBlogEmailSignIn(emailValue, nameValue, window.location.href);
      setNeedsConfirmation(false);
      setSuccess("You are signed in. You can submit your story now.");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Could not complete sign-in.",
      );
    } finally {
      setWorking(false);
    }
  }

  async function handleSendLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setWorking(true);
      setError("");
      setSuccess("");
      await sendBlogSignInLink(name, email);
      setLinkSent(true);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Could not send sign-in link.",
      );
    } finally {
      setWorking(false);
    }
  }

  async function handleSubmitStory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      setError("Please sign in before submitting a story.");
      return;
    }

    if (overWordLimit || titleTooLong) {
      setError("Please fix the title or word count before submitting.");
      return;
    }

    try {
      setWorking(true);
      setError("");
      setSuccess("");
      await createBlogPost({
        title,
        content,
        authorId: user.uid,
        authorName: name,
        authorEmail: email,
      });
      setTitle("");
      setContent("");
      setSuccess("Your story was submitted for review with status: pending.");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Could not submit story.",
      );
    } finally {
      setWorking(false);
    }
  }

  if (!isFirebaseConfigured) {
    return (
      <BlogState
        title="Firebase environment variables are missing"
        description="Add the values from .env.example to your local environment and restart the dev server to enable passwordless story submissions."
        tone="error"
      />
    );
  }

  if (authLoading) {
    return (
      <BlogState
        title="Checking sign-in"
        description="Preparing the passwordless story submission flow."
      />
    );
  }

  if (!user || needsConfirmation) {
    return (
      <div className="mx-auto max-w-3xl">
        <form
          onSubmit={needsConfirmation ? (event) => {
            event.preventDefault();
            completeSignIn();
          } : handleSendLink}
          className="space-y-6 rounded-lg border border-emerald-950/10 bg-[#f7f5ef] p-6 dark:border-white/10 dark:bg-white/[0.07]"
        >
          <div>
            <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50">
              {needsConfirmation ? "Confirm your email" : "Sign in with email link"}
            </h2>
            <p className="mt-2 leading-7 text-stone-700 dark:text-emerald-50/75">
              Enter your name and email. We will send a secure link, no password needed.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="name"
              label="Name"
              value={name}
              onChange={setName}
              placeholder="Your name"
              required
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              required
            />
          </div>

          {linkSent ? (
            <BlogState
              title="Check your inbox"
              description="Open the sign-in link from the same browser to continue writing your story."
              tone="success"
            />
          ) : null}
          {error ? <BlogState title="Something went wrong" description={error} tone="error" /> : null}

          <button
            type="submit"
            disabled={working}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-500 dark:text-emerald-950 dark:hover:bg-teal-400"
          >
            {working
              ? "Working..."
              : needsConfirmation
                ? "Finish sign-in"
                : "Send sign-in link"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <form
        onSubmit={handleSubmitStory}
        className="space-y-6 rounded-lg border border-emerald-950/10 bg-[#f7f5ef] p-6 dark:border-white/10 dark:bg-white/[0.07]"
      >
        <div>
          <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50">
            Submit a short story
          </h2>
          <p className="mt-2 text-stone-700 dark:text-emerald-50/75">
            Signed in as {name || email}. New stories are saved as pending.
          </p>
        </div>

        <TextField
          id="title"
          label="Title"
          value={title}
          onChange={setTitle}
          maxLength={maxStoryTitleLength}
          placeholder="A clear title in 80 characters or fewer"
          required
        />
        <div className="flex justify-between gap-4 text-sm">
          <span
            className={
              titleTooLong
                ? "font-semibold text-red-700 dark:text-red-200"
                : "text-stone-500 dark:text-emerald-50/55"
            }
          >
            {title.length}/{maxStoryTitleLength} characters
          </span>
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-semibold text-emerald-950 dark:text-emerald-50"
          >
            Story
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={14}
            className="mt-2 w-full rounded-md border border-emerald-950/15 bg-white px-4 py-3 text-emerald-950 outline-none transition focus:border-teal-700 dark:border-white/15 dark:bg-[#071412] dark:text-emerald-50 dark:placeholder:text-emerald-50/40"
            placeholder="Write a complete short story in 500 words or fewer."
            required
          />
          <p
            className={`mt-2 text-sm font-medium ${
              overWordLimit
                ? "text-red-700 dark:text-red-200"
                : "text-stone-500 dark:text-emerald-50/55"
            }`}
          >
            {wordCount}/{maxStoryWords} words
          </p>
        </div>

        {success ? <BlogState title="Submitted" description={success} tone="success" /> : null}
        {error ? <BlogState title="Could not submit" description={error} tone="error" /> : null}

        <button
          type="submit"
          disabled={working || overWordLimit || titleTooLong}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-500 dark:text-emerald-950 dark:hover:bg-teal-400"
        >
          {working ? "Submitting..." : "Submit for review"}
        </button>
      </form>
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  maxLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-emerald-950 dark:text-emerald-50">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-emerald-950/15 bg-white px-4 py-3 text-emerald-950 outline-none transition focus:border-teal-700 dark:border-white/15 dark:bg-[#071412] dark:text-emerald-50 dark:placeholder:text-emerald-50/40"
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
      />
    </div>
  );
}
