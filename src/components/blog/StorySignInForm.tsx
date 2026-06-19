import { FormEvent } from "react";
import { BlogState } from "@/components/blog/BlogState";
import { TextField } from "@/components/forms/TextField";

type StorySignInFormProps = {
  email: string;
  error: string;
  linkSent: boolean;
  name: string;
  needsConfirmation: boolean;
  working: boolean;
  onEmailChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function StorySignInForm({
  email,
  error,
  linkSent,
  name,
  needsConfirmation,
  working,
  onEmailChange,
  onNameChange,
  onSubmit,
}: StorySignInFormProps) {
  return (
    <form
      onSubmit={onSubmit}
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
          onChange={onNameChange}
          placeholder="Your name"
          required
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={onEmailChange}
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
  );
}
