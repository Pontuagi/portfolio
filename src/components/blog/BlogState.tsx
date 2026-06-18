type BlogStateProps = {
  title: string;
  description: string;
  tone?: "neutral" | "success" | "error";
};

const tones = {
  neutral:
    "border-emerald-950/10 bg-[#f7f5ef] text-stone-700 dark:border-white/10 dark:bg-white/[0.07] dark:text-emerald-50/75",
  success:
    "border-teal-700/20 bg-teal-50 text-teal-950 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-50",
  error:
    "border-red-200 bg-red-50 text-red-950 dark:border-red-300/20 dark:bg-red-400/10 dark:text-red-100",
};

export function BlogState({ title, description, tone = "neutral" }: BlogStateProps) {
  return (
    <div className={`rounded-lg border p-5 ${tones[tone]}`}>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-2 leading-7">{description}</p>
    </div>
  );
}
