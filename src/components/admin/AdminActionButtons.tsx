"use client";

import type { BlogStatus } from "@/types/portfolio";

type AdminActionButtonsProps = {
  status: BlogStatus;
  working: boolean;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
};

export function AdminActionButtons({
  status,
  working,
  onApprove,
  onReject,
  onDelete,
}: AdminActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={working || status === "approved"}
        onClick={onApprove}
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-teal-500 dark:text-emerald-950 dark:hover:bg-teal-400"
      >
        Approve story
      </button>
      <button
        type="button"
        disabled={working || status === "rejected"}
        onClick={onReject}
        className="inline-flex min-h-11 items-center justify-center rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-950 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-amber-300/30 dark:bg-amber-300/10 dark:text-amber-100 dark:hover:bg-amber-300/15"
      >
        Reject story
      </button>
      <button
        type="button"
        disabled={working}
        onClick={onDelete}
        className="inline-flex min-h-11 items-center justify-center rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-800 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-300/30 dark:bg-red-400/10 dark:text-red-100 dark:hover:bg-red-400/15"
      >
        Delete story
      </button>
    </div>
  );
}
