"use client";

import { FormEvent, useState } from "react";
import {
  countWords,
  createBlogPost,
  maxStoryTitleLength,
  maxStoryWords,
} from "@/services/blog";
import { isFirebaseConfigured } from "@/config/firebase";
import { useStorySignIn } from "@/hooks/useStorySignIn";
import { BlogState } from "@/components/blog/BlogState";
import { StorySignInForm } from "@/components/blog/StorySignInForm";
import { StorySubmissionForm } from "@/components/blog/StorySubmissionForm";
import { ToastViewport, useToastNotifications } from "@/components/ui/Toast";

export function WriteStoryClient() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { dismissToast, showError, showSuccess, toasts } = useToastNotifications();
  const {
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
    setWorking,
    success,
    user,
    working,
  } = useStorySignIn({ showError, showSuccess });

  const wordCount = countWords(content);
  const overWordLimit = wordCount > maxStoryWords;
  const titleTooLong = title.length > maxStoryTitleLength;

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (needsConfirmation) {
      await completeSignIn();
      return;
    }

    await sendSignInLink();
  }

  async function handleSubmitStory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      const message = "Please sign in before submitting a story.";
      setError(message);
      showError(message, "Authentication required");
      return;
    }

    const storyAuthorEmail = user.email ?? email;
    const storyAuthorName = name || user.displayName || storyAuthorEmail;

    if (!storyAuthorEmail || !storyAuthorName) {
      const message = "Please sign in again so your story has a name and email.";
      setError(message);
      showError(message, "Authentication error");
      return;
    }

    if (overWordLimit || titleTooLong) {
      const message = "Please fix the title or word count before submitting.";
      setError(message);
      showError(message, "Could not submit");
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
        authorName: storyAuthorName,
        authorEmail: storyAuthorEmail,
      });
      setTitle("");
      setContent("");
      setSuccess("Your story was submitted for review with status: pending.");
      showSuccess("Story submitted for review.", "Submission successful");
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Could not submit story.";
      setError(message);
      showError(message, "Could not submit");
    } finally {
      setWorking(false);
    }
  }

  if (!isFirebaseConfigured) {
    return (
      <>
        <ToastViewport toasts={toasts} onDismiss={dismissToast} />
        <BlogState
          title="Firebase environment variables are missing"
          description="Add the values from .env.example to your local environment and restart the dev server to enable passwordless story submissions."
          tone="error"
        />
      </>
    );
  }

  if (authLoading) {
    return (
      <>
        <ToastViewport toasts={toasts} onDismiss={dismissToast} />
        <BlogState
          title="Checking sign-in"
          description="Preparing the passwordless story submission flow."
        />
      </>
    );
  }

  if (!user || needsConfirmation) {
    return (
      <div className="mx-auto max-w-3xl">
        <ToastViewport toasts={toasts} onDismiss={dismissToast} />
        <StorySignInForm
          email={email}
          error={error}
          linkSent={linkSent}
          name={name}
          needsConfirmation={needsConfirmation}
          working={working}
          onEmailChange={setEmail}
          onNameChange={setName}
          onSubmit={handleSignIn}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
      <StorySubmissionForm
        content={content}
        error={error}
        overWordLimit={overWordLimit}
        signedInLabel={name || email}
        success={success}
        title={title}
        titleTooLong={titleTooLong}
        wordCount={wordCount}
        working={working}
        onContentChange={setContent}
        onSubmit={handleSubmitStory}
        onTitleChange={setTitle}
      />
    </div>
  );
}
