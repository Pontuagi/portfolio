import { afterEach, describe, expect, it, vi } from "vitest";
import { getAbsoluteStoryUrl, getStoryPath, getStoryRouteId } from "@/lib/storyLinks";

describe("story links", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("prefers slugs for public story routes", () => {
    expect(getStoryRouteId({ id: "firestore-id", slug: "story-slug" })).toBe("story-slug");
    expect(getStoryPath({ id: "firestore-id", slug: "story slug" })).toBe(
      "/stories/story/story%20slug",
    );
  });

  it("falls back to Firestore ids when no slug exists", () => {
    expect(getStoryPath({ id: "post/id" })).toBe("/stories/story/post%2Fid");
  });

  it("builds absolute URLs from APP_URL without duplicating slashes", () => {
    vi.stubEnv("APP_URL", "https://example.com/");

    expect(getAbsoluteStoryUrl({ id: "post-id" })).toBe(
      "https://example.com/stories/story/post-id",
    );
  });
});
