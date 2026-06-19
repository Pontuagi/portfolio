import { maxStoryTitleLength, maxStoryWords } from "@/services/blog/constants";

export function countWords(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function createPreview(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean);
  const previewWords = words.slice(0, 34).join(" ");
  return words.length > 34 ? `${previewWords}...` : previewWords;
}

/**
 * Normalizes and validates a story before it is written to Firestore.
 * Keeping this pure makes the submission rules easy to test and reuse.
 */
export function validateStoryDraft(title: string, content: string) {
  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();
  const wordCount = countWords(trimmedContent);

  if (!trimmedTitle) {
    throw new Error("Please add a story title.");
  }

  if (trimmedTitle.length > maxStoryTitleLength) {
    throw new Error(`Titles must be ${maxStoryTitleLength} characters or fewer.`);
  }

  if (!trimmedContent) {
    throw new Error("Please write your short story.");
  }

  if (wordCount > maxStoryWords) {
    throw new Error(`Stories must be ${maxStoryWords} words or fewer.`);
  }

  return {
    title: trimmedTitle,
    content: trimmedContent,
    preview: createPreview(trimmedContent),
    wordCount,
  };
}
