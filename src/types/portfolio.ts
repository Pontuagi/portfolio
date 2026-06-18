export type Link = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  link?: Link;
  problem: string;
  solution: string;
  technologies: readonly string[];
  impact: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: readonly string[];
};

export type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  type: "education" | "experience";
  description: string;
  highlights?: readonly string[];
};

export type Story = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  status: "draft" | "published";
};

export type BlogStatus = "pending" | "approved" | "rejected";

export type AdminRole = "owner" | "admin";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type BlogPost = {
  id: string;
  slug?: string;
  title: string;
  content: string;
  preview: string;
  wordCount: number;
  authorId: string;
  authorName: string;
  authorEmail: string;
  status: BlogStatus;
  createdAt: Date | null;
  updatedAt: Date | null;
  publishedAt: Date | null;
};

export type AdminProfile = {
  id: string;
  email: string;
  role: AdminRole;
  createdAt: Date | null;
};
