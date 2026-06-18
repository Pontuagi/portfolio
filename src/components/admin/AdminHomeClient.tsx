"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";

export function AdminHomeClient() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Link href="/admin/stories" className="block">
        <Card className="h-full p-6 transition hover:border-teal-700 hover:bg-teal-50/40">
          <p className="text-sm font-semibold uppercase text-teal-800">
            Blog moderation
          </p>
          <h2 className="mt-3 text-2xl font-bold text-emerald-950">
            Manage short stories
          </h2>
          <p className="mt-3 leading-7 text-stone-700">
            Review pending submissions, approve stories for the public Blog,
            reject submissions, or delete entries from Firestore.
          </p>
        </Card>
      </Link>
    </div>
  );
}
