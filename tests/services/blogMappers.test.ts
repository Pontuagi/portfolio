import { describe, expect, it } from "vitest";
import { mapBlogPost, toDate } from "@/services/blog/mappers";

describe("blog post mappers", () => {
  it("maps Firestore-like document data into a stable blog post", () => {
    const createdAt = new Date("2026-06-18T00:00:00.000Z");

    expect(
      mapBlogPost("post-id", {
        slug: "story-slug",
        title: "Title",
        content: "Content",
        preview: "Preview",
        wordCount: "12",
        authorId: "author-id",
        authorName: "Author",
        authorEmail: "author@example.com",
        status: "approved",
        createdAt,
      }),
    ).toMatchObject({
      id: "post-id",
      slug: "story-slug",
      title: "Title",
      wordCount: 12,
      authorName: "Author",
      status: "approved",
      createdAt,
      updatedAt: null,
      publishedAt: null,
    });
  });

  it("defaults unsafe or missing optional fields", () => {
    const post = mapBlogPost("post-id", {
      status: "archived",
      slug: "   ",
    });

    expect(post.slug).toBeUndefined();
    expect(post.status).toBe("pending");
    expect(post.authorName).toBe("Unknown author");
    expect(post.wordCount).toBe(0);
  });

  it("normalizes supported date values only", () => {
    const date = new Date("2026-06-18T00:00:00.000Z");

    expect(toDate(date)).toBe(date);
    expect(toDate(null)).toBeNull();
    expect(toDate("2026-06-18")).toBeNull();
  });
});
