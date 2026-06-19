import type { BlogPost } from "@/types/portfolio";

type StoryLinkTarget = Pick<BlogPost, "id" | "slug">;

export function getStoryRouteId(post: StoryLinkTarget) {
  return post.slug ?? post.id;
}

export function getStoryPath(post: StoryLinkTarget) {
  return `/stories/story/${encodeURIComponent(getStoryRouteId(post))}`;
}

export function getAbsoluteStoryUrl(post: StoryLinkTarget) {
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    (typeof window !== "undefined" ? window.location.origin : "");

  return `${appUrl}${getStoryPath(post)}`;
}
