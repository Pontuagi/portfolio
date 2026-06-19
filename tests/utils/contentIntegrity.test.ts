import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { permanentBlogPosts, stories } from "@/data/stories";
import { site } from "@/lib/site";

describe("portfolio content integrity", () => {
  it("keeps project slugs unique and deployable images under public images", () => {
    const slugs = new Set(projects.map((project) => project.slug));

    expect(slugs.size).toBe(projects.length);
    expect(projects.every((project) => project.image.startsWith("/images/"))).toBe(true);
  });

  it("keeps permanent stories public and addressable", () => {
    expect(permanentBlogPosts.length).toBe(stories.length);
    expect(permanentBlogPosts.every((post) => post.status === "approved" && post.slug)).toBe(true);
  });

  it("documents the public contact and CV paths used by navigation", () => {
    expect(site.email).toContain("@");
    expect(site.cvHref).toMatch(/^\/images\/.+\.pdf$/);
    expect(site.socialLinks.every((link) => link.href.startsWith("https://"))).toBe(true);
  });
});
