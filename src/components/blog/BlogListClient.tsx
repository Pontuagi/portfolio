"use client";

import { useEffect, useMemo, useState } from "react";
import { getApprovedBlogPosts } from "@/lib/blogService";
import type { BlogPost } from "@/types/portfolio";
import { BlogState } from "@/components/blog/BlogState";
import { ExpandableStoryCard } from "@/components/blog/ExpandableStoryCard";
import { Button } from "@/components/ui/Button";

export function BlogListClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [authorFilter, setAuthorFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadPosts() {
      try {
        setLoading(true);
        setError("");
        const approvedPosts = await getApprovedBlogPosts();
        if (mounted) {
          setPosts(approvedPosts);
        }
      } catch (caughtError) {
        if (mounted) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Could not load approved stories.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
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
          <h2 className="text-2xl font-bold text-emerald-950">Approved short stories</h2>
          <p className="mt-2 text-stone-600">
            Browse community stories, or filter them by author name.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/blog/write" variant="secondary">
            Submit a story
          </Button>
          <Button href="/blog/my-stories">My stories</Button>
        </div>
      </div>

      <label htmlFor="authorFilter" className="block text-sm font-semibold text-emerald-950">
        Filter by author name
      </label>
      <input
        id="authorFilter"
        type="search"
        value={authorFilter}
        onChange={(event) => setAuthorFilter(event.target.value)}
        className="mt-2 w-full max-w-xl rounded-md border border-emerald-950/15 bg-white px-4 py-3 outline-none focus:border-teal-700"
        placeholder="Type an author name"
      />

      <div className="mt-8">
        {loading ? (
          <BlogState
            title="Loading stories"
            description="Fetching approved stories from Firestore."
          />
        ) : error ? (
          <BlogState title="Blog is not ready yet" description={error} tone="error" />
        ) : posts.length === 0 ? (
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
          <div className="grid gap-5">
            {filteredPosts.map((post) => (
              <ExpandableStoryCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
