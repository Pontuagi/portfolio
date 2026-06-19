import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getApprovedBlogPostByStoryId } from "@/lib/blogService";
import { getAbsoluteStoryUrl } from "@/lib/storyLinks";
import { ShareStoryButton } from "@/components/blog/ShareStoryButton";
import { Section } from "@/components/ui/Section";

type StoryPageProps = {
  params: Promise<{
    storyId: string;
  }>;
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { storyId } = await params;
  const post = await getPublicStory(storyId);

  if (!post) {
    return {
      title: "Story not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${post.title} | Short Stories`;
  const description = `${post.preview} By ${post.authorName}.`;
  const url = getAbsoluteStoryUrl(post);

  return {
    title,
    description,
    authors: [{ name: post.authorName }],
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      url: url || undefined,
      authors: [post.authorName],
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { storyId } = await params;
  const post = await getPublicStory(storyId);

  if (!post) {
    notFound();
  }

  const displayDate = post.publishedAt ?? post.createdAt ?? post.updatedAt;

  return (
    <main>
      <Section className="bg-white pt-32 dark:bg-[#071412]" animate={false}>
        <article className="mx-auto max-w-3xl">
          <Link
            href="/stories"
            className="text-sm font-semibold text-teal-800 transition hover:text-teal-950 dark:text-teal-200 dark:hover:text-teal-100"
          >
            Back to short stories
          </Link>

          <div className="mt-8 rounded-lg border border-emerald-950/10 bg-white/80 p-6 shadow-sm shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.07] sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-teal-800 dark:text-teal-200">
                  Short Story
                </p>
                <h1 className="mt-4 text-3xl font-bold leading-tight text-emerald-950 dark:text-emerald-50 sm:text-4xl">
                  {post.title}
                </h1>
                <p className="mt-3 text-sm text-stone-600 dark:text-emerald-50/65">
                  By {post.authorName}
                  {displayDate ? ` on ${formatDate(displayDate)}` : ""}
                </p>
              </div>
              <ShareStoryButton
                post={{
                  id: post.id,
                  slug: post.slug,
                  title: post.title,
                  preview: post.preview,
                }}
              />
            </div>

            <p className="mt-8 whitespace-pre-line text-lg leading-8 text-stone-700 dark:text-emerald-50/75">
              {post.content}
            </p>

            <p className="mt-8 text-sm font-medium text-stone-500 dark:text-emerald-50/55">
              {post.wordCount} words
            </p>
          </div>
        </article>
      </Section>
    </main>
  );
}

async function getPublicStory(storyId: string) {
  try {
    return await getApprovedBlogPostByStoryId(storyId);
  } catch {
    return null;
  }
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
}
