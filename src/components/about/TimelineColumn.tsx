import type { TimelineItem } from "@/types/portfolio";

type TimelineColumnProps = {
  title: string;
  items: readonly TimelineItem[];
};

export function TimelineColumn({ title, items }: TimelineColumnProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50">
        {title}
      </h2>
      <div className="mt-8 space-y-5">
        {items.map((item) => (
          <article
            key={`${item.title}-${item.period}`}
            className="border-l-2 border-teal-700 bg-white/70 py-1 pl-5 dark:border-teal-300 dark:bg-white/[0.07]"
          >
            <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-50">
              {item.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-stone-500 dark:text-emerald-50/55">
              {item.organization} | {item.period}
            </p>
            <p className="mt-3 leading-7 text-stone-700 dark:text-emerald-50/75">
              {item.description}
            </p>
            {item.highlights ? (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-700 dark:text-emerald-50/75">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
