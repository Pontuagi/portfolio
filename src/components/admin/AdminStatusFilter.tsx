"use client";

import type { BlogStatus } from "@/types/portfolio";

type AdminStatusFilterProps = {
  value: BlogStatus;
  onChange: (status: BlogStatus) => void;
  counts?: Partial<Record<BlogStatus, number>>;
};

const statuses: BlogStatus[] = ["pending", "approved", "rejected"];

export function AdminStatusFilter({
  value,
  onChange,
  counts,
}: AdminStatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Story status">
      {statuses.map((status) => {
        const active = value === status;

        return (
          <button
            key={status}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(status)}
            className={`min-h-11 rounded-md px-4 py-2 text-sm font-semibold capitalize transition ${
              active
                ? "bg-teal-700 text-white"
                : "border border-emerald-950/15 text-teal-800 hover:border-teal-700 hover:bg-teal-50"
            }`}
          >
            {status}
            {typeof counts?.[status] === "number" ? ` (${counts[status]})` : ""}
          </button>
        );
      })}
    </div>
  );
}
