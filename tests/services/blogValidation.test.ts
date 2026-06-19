import { describe, expect, it } from "vitest";
import {
  countWords,
  createPreview,
  validateStoryDraft,
} from "@/services/blog/validation";
import { maxStoryTitleLength, maxStoryWords } from "@/services/blog/constants";

describe("story validation", () => {
  it("counts words across repeated whitespace", () => {
    expect(countWords("  one\n two\tthree  ")).toBe(3);
    expect(countWords("   ")).toBe(0);
  });

  it("creates a 34-word preview with an ellipsis when content is longer", () => {
    const content = Array.from({ length: 35 }, (_, index) => `word${index + 1}`).join(" ");

    expect(createPreview(content)).toBe(
      `${Array.from({ length: 34 }, (_, index) => `word${index + 1}`).join(" ")}...`,
    );
  });

  it("trims valid story drafts and returns derived metadata", () => {
    const draft = validateStoryDraft("  A title  ", "  One two three.  ");

    expect(draft).toEqual({
      title: "A title",
      content: "One two three.",
      preview: "One two three.",
      wordCount: 3,
    });
  });

  it("rejects missing titles, missing content, long titles, and long stories", () => {
    expect(() => validateStoryDraft("", "Story")).toThrow("Please add a story title.");
    expect(() => validateStoryDraft("Title", "")).toThrow("Please write your short story.");
    expect(() =>
      validateStoryDraft("x".repeat(maxStoryTitleLength + 1), "Story"),
    ).toThrow(`Titles must be ${maxStoryTitleLength} characters or fewer.`);
    expect(() =>
      validateStoryDraft("Title", Array.from({ length: maxStoryWords + 1 }, () => "word").join(" ")),
    ).toThrow(`Stories must be ${maxStoryWords} words or fewer.`);
  });
});
