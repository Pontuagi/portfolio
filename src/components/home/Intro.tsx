import { Section } from "@/components/ui/Section";

const stats = [
  { value: "5+", label: "Years coding" },
  { value: "1+", label: "Projects shipped" },
  { value: "8+", label: "Languages" },
];

const stackChips = [
  "Next.js",
  "TypeScript",
  "Python",
  "Flutter",
  "Firebase",
  "Django",
];

export function Intro() {
  return (
    <Section id="intro" className="bg-white dark:bg-[#071412]">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">

        {/* Left — heading + stats + decorative chips */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-800 dark:text-teal-200">
            The throughline
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-emerald-950 dark:text-emerald-50 sm:text-4xl">
            Every useful product begins with a problem someone can feel.
          </h2>

          {/* Stats strip */}
          <div className="mt-8 grid grid-cols-3 divide-x divide-emerald-950/10 overflow-hidden rounded-xl border border-emerald-950/10 dark:divide-white/10 dark:border-white/10">
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-[#f7f5ef] px-4 py-5 text-center dark:bg-white/[0.05]">
                <p className="text-2xl font-bold text-teal-700 dark:text-teal-300">
                  {value}
                </p>
                <p className="mt-1 text-xs text-stone-500 dark:text-emerald-50/50">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Stack chips */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {stackChips.map((skill) => (
              <div
                key={skill}
                className="rounded-lg border border-emerald-950/8 bg-[#f7f5ef]/70 px-3 py-2 text-center text-xs font-medium text-stone-600 dark:border-white/8 dark:bg-white/[0.04] dark:text-emerald-50/55"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Right — body copy */}
        <div className="space-y-5 text-lg leading-8 text-stone-600 dark:text-emerald-50/70">
          <p>
            My path started in mechatronics, where every good solution had to
            respect hardware, software, constraints, and the people using the
            system. That mindset still shapes how I build.
          </p>
          <p>
            ALX Africa gave me the software foundation in C, Python,
            JavaScript, Django, Node.js, and modern web development. Since
            then, I have worked across backend systems, mobile apps, and
            Next.js products with a focus on maintainable code and clear
            user experiences.
          </p>
          <p>
            I am especially drawn to automation, mobility, and local
            technology: tools that simplify real work for teams, households,
            and communities.
          </p>
        </div>
      </div>
    </Section>
  );
}
