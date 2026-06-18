"use client";

import { useCallback, useEffect, useState } from "react";
import {
  approveBlogPost,
  deleteBlogPost,
  getAdminBlogPosts,
  rejectBlogPost,
} from "@/lib/adminService";
import type { BlogPost, BlogStatus } from "@/types/portfolio";
import { AdminStatusFilter } from "@/components/admin/AdminStatusFilter";
import { AdminStoryCard } from "@/components/admin/AdminStoryCard";
import { BlogState } from "@/components/blog/BlogState";

export function AdminStoriesClient() {
  const [status, setStatus] = useState<BlogStatus>("pending");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [workingPostId, setWorkingPostId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadPosts = useCallback(async (nextStatus: BlogStatus) => {
    try {
      setLoading(true);
      setError("");
      const nextPosts = await getAdminBlogPosts(nextStatus);
      setPosts(nextPosts);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Could not load story submissions.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts(status);
  }, [loadPosts, status]);

  async function runAction(post: BlogPost, action: "approve" | "reject" | "delete") {
    const confirmed =
      action !== "delete" ||
      window.confirm(`Delete "${post.title}" permanently? This cannot be undone.`);

    if (!confirmed) {
      return;
    }

    try {
      setWorkingPostId(post.id);
      setError("");
      setSuccess("");

      if (action === "approve") {
        await approveBlogPost(post.id);
        setSuccess(`Approved "${post.title}".`);
      }

      if (action === "reject") {
        await rejectBlogPost(post.id);
        setSuccess(`Rejected "${post.title}".`);
      }

      if (action === "delete") {
        await deleteBlogPost(post.id);
        setSuccess(`Deleted "${post.title}".`);
      }

      await loadPosts(status);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "The admin action could not be completed.",
      );
    } finally {
      setWorkingPostId("");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50">
            Blog story submissions
          </h2>
          <p className="mt-2 text-stone-600 dark:text-emerald-50/65">
            Pending stories are shown first by default. Review, approve, reject,
            or delete submissions from Firestore.
          </p>
        </div>
        <AdminStatusFilter value={status} onChange={setStatus} />
      </div>

      {success ? <BlogState title="Done" description={success} tone="success" /> : null}
      {error ? <BlogState title="Admin action failed" description={error} tone="error" /> : null}

      {loading ? (
        <BlogState
          title="Loading submissions"
          description={`Fetching ${status} stories from Firestore.`}
        />
      ) : posts.length === 0 ? (
        <BlogState
          title={`No ${status} stories`}
          description={`There are no ${status} blog submissions to review right now.`}
        />
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <AdminStoryCard
              key={post.id}
              post={post}
              working={workingPostId === post.id}
              onApprove={(selectedPost) => runAction(selectedPost, "approve")}
              onReject={(selectedPost) => runAction(selectedPost, "reject")}
              onDelete={(selectedPost) => runAction(selectedPost, "delete")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
