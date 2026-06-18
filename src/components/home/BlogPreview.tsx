import Link from "next/link";
import { stories } from "@/data/stories";
import { BlogCard } from "@/components/blog/BlogCard";
import { Section } from "@/components/ui/Section";

export function BlogPreview() {
  return (
    <Section className="bg-[#f7f5ef]">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-800">
            Blog preview
          </p>
          <h2 className="mt-4 text-3xl font-bold text-emerald-950 sm:text-4xl">
            Notes from the build process.
          </h2>
          <p className="mt-4 text-lg leading-8 text-stone-700">
            A small writing space for engineering reflections, product lessons, and
            short stories as the portfolio grows.
          </p>
        </div>
        <Link href="/blog" className="font-semibold text-teal-800 hover:text-teal-950">
          Read the blog
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {stories.slice(0, 3).map((story) => (
          <BlogCard key={story.slug} story={story} />
        ))}
      </div>
    </Section>
  );
}
