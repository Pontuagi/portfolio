import type { Story } from "@/types/portfolio";
import { Card } from "@/components/ui/Card";

type BlogCardProps = {
  story: Story;
};

export function BlogCard({ story }: BlogCardProps) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase text-teal-800">
        <span>{story.category}</span>
        <span className="text-stone-500">{story.readTime}</span>
      </div>
      <h3 className="mt-5 text-xl font-bold text-emerald-950">{story.title}</h3>
      <p className="mt-3 flex-1 leading-7 text-stone-700">{story.excerpt}</p>
      <p className="mt-6 text-sm font-semibold text-stone-500">
        {story.status === "published" ? "Published" : "Draft"}
      </p>
    </Card>
  );
}
