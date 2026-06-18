type BlogStateProps = {
  title: string;
  description: string;
  tone?: "neutral" | "success" | "error";
};

const tones = {
  neutral: "border-emerald-950/10 bg-[#f7f5ef] text-stone-700",
  success: "border-teal-700/20 bg-teal-50 text-teal-950",
  error: "border-red-200 bg-red-50 text-red-950",
};

export function BlogState({ title, description, tone = "neutral" }: BlogStateProps) {
  return (
    <div className={`rounded-lg border p-5 ${tones[tone]}`}>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-2 leading-7">{description}</p>
    </div>
  );
}
