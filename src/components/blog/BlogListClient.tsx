"use client";

import { useEffect, useMemo, useState } from "react";
import { permanentBlogPosts } from "@/data/stories";
import { getApprovedBlogPosts } from "@/lib/blogService";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { BlogPost } from "@/types/portfolio";
import { BlogState } from "@/components/blog/BlogState";
import { ExpandableStoryCard } from "@/components/blog/ExpandableStoryCard";
import { Button } from "@/components/ui/Button";

export function BlogListClient() {
  const [posts, setPosts] = useState<BlogPost[]>([...permanentBlogPosts]);
  const [authorFilter, setAuthorFilter] = useState("");
  const [firebaseAccessible, setFirebaseAccessible] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setFirebaseAccessible(false);
      return;
    }

    let mounted = true;

    async function loadPosts() {
      try {
        const approvedPosts = await getApprovedBlogPosts();
        if (mounted) {
          setPosts([...permanentBlogPosts, ...approvedPosts]);
          setFirebaseAccessible(true);
        }
      } catch {
        if (mounted) {
          setPosts([...permanentBlogPosts]);
          setFirebaseAccessible(false);
        }
      }
    }

    loadPosts();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredPosts = useMemo(() => {
    const normalizedFilter = authorFilter.trim().toLowerCase();
    if (!normalizedFilter) {
      return posts;
    }

    return posts.filter((post) =>
      post.authorName.toLowerCase().includes(normalizedFilter),
    );
  }, [authorFilter, posts]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50">
            Short stories
          </h2>
          <p className="mt-2 text-stone-600 dark:text-emerald-50/65">
            Browse permanent stories and approved community submissions.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/stories/write" variant="secondary">
            Submit a story
          </Button>
          <Button href="/stories/my-stories">My stories</Button>
        </div>
      </div>

      <label
        htmlFor="authorFilter"
        className="block text-sm font-semibold text-emerald-950 dark:text-emerald-50"
      >
        Filter by author name
      </label>
      <input
        id="authorFilter"
        type="search"
        value={authorFilter}
        onChange={(event) => setAuthorFilter(event.target.value)}
        className="mt-2 w-full max-w-xl rounded-md border border-emerald-950/15 bg-white px-4 py-3 text-emerald-950 outline-none transition focus:border-teal-700 dark:border-white/15 dark:bg-[#071412] dark:text-emerald-50 dark:placeholder:text-emerald-50/40"
        placeholder="Type an author name"
      />

      <div className="mt-8">
        {posts.length === 0 ? (
          <BlogState
            title="No approved stories yet"
            description="Submitted stories will appear here after they are reviewed and approved."
          />
        ) : filteredPosts.length === 0 ? (
          <BlogState
            title="No stories match that author"
            description="Try another author name or clear the filter to see all approved stories."
          />
        ) : (
          <div className="mt-5 grid gap-5">
            {filteredPosts.map((post) => (
              <ExpandableStoryCard
                key={post.id}
                post={post}
                actionTone={firebaseAccessible ? "default" : "blue"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
