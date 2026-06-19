import { FormEvent } from "react";
import { maxStoryTitleLength, maxStoryWords } from "@/services/blog";
import { BlogState } from "@/components/blog/BlogState";
import { TextField } from "@/components/forms/TextField";

type StorySubmissionFormProps = {
  content: string;
  error: string;
  overWordLimit: boolean;
  signedInLabel: string;
  success: string;
  title: string;
  titleTooLong: boolean;
  wordCount: number;
  working: boolean;
  onContentChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onTitleChange: (value: string) => void;
};

export function StorySubmissionForm({
  content,
  error,
  overWordLimit,
  signedInLabel,
  success,
  title,
  titleTooLong,
  wordCount,
  working,
  onContentChange,
  onSubmit,
  onTitleChange,
}: StorySubmissionFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-lg border border-emerald-950/10 bg-[#f7f5ef] p-6 dark:border-white/10 dark:bg-white/[0.07]"
    >
      <div>
        <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50">
          Submit a short story
        </h2>
        <p className="mt-2 text-stone-700 dark:text-emerald-50/75">
          Signed in as {signedInLabel}. New stories are saved as pending.
        </p>
      </div>

      <TextField
        id="title"
        label="Title"
        value={title}
        onChange={onTitleChange}
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
          onChange={(event) => onContentChange(event.target.value)}
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
  );
}
