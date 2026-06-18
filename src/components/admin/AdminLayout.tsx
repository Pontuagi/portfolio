"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { getAdminProfile } from "@/lib/adminService";
import { subscribeToAuth, signOutBlogUser } from "@/lib/auth";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { AdminProfile } from "@/types/portfolio";
import { BlogState } from "@/components/blog/BlogState";
import { Button } from "@/components/ui/Button";

type AdminLayoutProps = {
  children: ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [checkingAdmin, setCheckingAdmin] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setAdmin(null);
      return;
    }

    let mounted = true;
    const currentUser = user;

    async function checkAdmin() {
      try {
        setCheckingAdmin(true);
        setError("");
        const profile = await getAdminProfile(currentUser.uid);
        if (mounted) {
          setAdmin(profile);
        }
      } catch (caughtError) {
        if (mounted) {
          setAdmin(null);
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Could not verify admin access.",
          );
        }
      } finally {
        if (mounted) {
          setCheckingAdmin(false);
        }
      }
    }

    checkAdmin();

    return () => {
      mounted = false;
    };
  }, [user]);

  if (!isFirebaseConfigured) {
    return (
      <BlogState
        title="Firebase is not configured"
        description="Add the Firebase environment variables from .env.example and restart the dev server before using admin tools."
        tone="error"
      />
    );
  }

  if (loadingAuth || checkingAdmin) {
    return (
      <BlogState
        title="Checking admin access"
        description="Verifying your Firebase Auth session and admin permissions."
      />
    );
  }

  if (!user) {
    return (
      <div className="space-y-5">
        <BlogState
          title="Admin sign-in required"
          description="Sign in once using the Blog email-link flow, then return here. Admin access is checked against the admins collection."
        />
        <Button href="/blog/write">Sign in with email link</Button>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="space-y-5">
        <BlogState
          title="You do not have admin access"
          description={
            error ||
            "Your account is signed in, but there is no matching admins/{userId} permission document."
          }
          tone="error"
        />
        <button
          type="button"
          onClick={() => signOutBlogUser()}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-emerald-950/15 px-5 py-3 text-sm font-semibold text-teal-800 transition hover:border-teal-700 hover:bg-teal-50 dark:border-white/15 dark:text-teal-200 dark:hover:border-teal-300 dark:hover:bg-white/10"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-emerald-950/10 pb-6 dark:border-white/10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-teal-800 dark:text-teal-200">
            {admin.role}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-emerald-950 dark:text-emerald-50">
            Admin tools
          </h2>
          <p className="mt-2 text-stone-600 dark:text-emerald-50/65">
            {admin.email || user.email}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-emerald-950/15 px-4 py-2 text-sm font-semibold text-teal-800 transition hover:border-teal-700 hover:bg-teal-50 dark:border-white/15 dark:text-teal-200 dark:hover:border-teal-300 dark:hover:bg-white/10"
          >
            Admin home
          </Link>
          <Link
            href="/admin/stories"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-emerald-950/15 px-4 py-2 text-sm font-semibold text-teal-800 transition hover:border-teal-700 hover:bg-teal-50 dark:border-white/15 dark:text-teal-200 dark:hover:border-teal-300 dark:hover:bg-white/10"
          >
            Stories
          </Link>
          <button
            type="button"
            onClick={() => signOutBlogUser()}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-emerald-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-900 dark:bg-teal-500 dark:text-emerald-950 dark:hover:bg-teal-400"
          >
            Sign out
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
