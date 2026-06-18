import type { Story } from "@/types/portfolio";

export const stories: readonly Story[] = [
  {
    slug: "from-mechatronics-to-software",
    title: "From Mechatronics to Software",
    category: "Journey",
    excerpt:
      "How engineering systems, curiosity, and ALX helped me move from machines to full-stack product building.",
    readTime: "4 min read",
    status: "published",
  },
  {
    slug: "building-for-clarity",
    title: "Building for Clarity",
    category: "Engineering",
    excerpt:
      "A reflection on why good interfaces make technical systems easier to trust, maintain, and explain.",
    readTime: "3 min read",
    status: "draft",
  },
  {
    slug: "tools-that-simplify-work",
    title: "Tools That Simplify Work",
    category: "Product thinking",
    excerpt:
      "Notes on automation, household tech ideas, and why useful software should reduce friction in daily life.",
    readTime: "5 min read",
    status: "draft",
  },
];
