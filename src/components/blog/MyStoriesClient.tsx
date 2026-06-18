"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "firebase/auth";
import { getUserBlogPosts } from "@/lib/blogService";
import { signOutBlogUser, subscribeToAuth } from "@/lib/auth";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { BlogPost, BlogStatus } from "@/types/portfolio";
import { BlogState } from "@/components/blog/BlogState";
import { ExpandableStoryCard } from "@/components/blog/ExpandableStoryCard";
import { Button } from "@/components/ui/Button";

const statuses: BlogStatus[] = ["pending", "approved", "rejected"];

export function MyStoriesClient() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setPosts([]);
      return;
    }

    let mounted = true;
    const currentUser = user;

    async function loadPosts() {
      try {
        setLoadingPosts(true);
        setError("");
        const userPosts = await getUserBlogPosts(currentUser.uid);
        if (mounted) {
          setPosts(userPosts);
        }
      } catch (caughtError) {
        if (mounted) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Could not load your stories.",
          );
        }
      } finally {
        if (mounted) {
          setLoadingPosts(false);
        }
      }
    }

    loadPosts();

    return () => {
      mounted = false;
    };
  }, [user]);

  const groupedPosts = useMemo(
    () =>
      statuses.map((status) => ({
        status,
        posts: posts.filter((post) => post.status === status),
      })),
    [posts],
  );

  if (!isFirebaseConfigured) {
    return (
      <BlogState
        title="Firebase environment variables are missing"
        description="Add your Firebase config to the environment before viewing submitted stories."
        tone="error"
      />
    );
  }

  if (authLoading) {
    return <BlogState title="Checking sign-in" description="Looking for your account." />;
  }

  if (!user) {
    return (
      <div className="space-y-5">
        <BlogState
          title="Sign in to view your stories"
          description="Use the passwordless email-link flow on the write page, then come back here to track pending, approved, and rejected submissions."
        />
        <Button href="/blog/write">Sign in and write</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-emerald-950">Your submitted stories</h2>
          <p className="mt-2 text-stone-600">
            Signed in as {user.email}. Approved stories appear publicly on the Blog.
          </p>
        </div>
        <button
          type="button"
          onClick={() => signOutBlogUser()}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-emerald-950/15 px-5 py-3 text-sm font-semibold text-teal-800 transition hover:border-teal-700 hover:bg-teal-50"
        >
          Sign out
        </button>
      </div>

      {loadingPosts ? (
        <BlogState title="Loading your stories" description="Fetching your submissions." />
      ) : error ? (
        <BlogState title="Could not load stories" description={error} tone="error" />
      ) : posts.length === 0 ? (
        <div className="space-y-5">
          <BlogState
            title="You have not submitted a story yet"
            description="Write a short story in 500 words or fewer and submit it for review."
          />
          <Button href="/blog/write">Write your first story</Button>
        </div>
      ) : (
        groupedPosts.map((group) => (
          <section key={group.status}>
            <h3 className="text-xl font-bold capitalize text-emerald-950">
              {group.status}
            </h3>
            <div className="mt-4 space-y-5">
              {group.posts.length === 0 ? (
                <BlogState
                  title={`No ${group.status} stories`}
                  description={`Stories with ${group.status} status will appear here.`}
                />
              ) : (
                group.posts.map((post) => (
                  <ExpandableStoryCard key={post.id} post={post} showStatus />
                ))
              )}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
