import { Section } from "@/components/ui/Section";

export function Intro() {
  return (
    <Section className="bg-white dark:bg-[#071412]">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase text-teal-800 dark:text-teal-200">
            The throughline
          </p>
          <h2 className="mt-4 text-3xl font-bold text-emerald-950 dark:text-emerald-50 sm:text-4xl">
            Curiosity, systems thinking, and a bias toward practical software.
          </h2>
        </div>
        <div className="space-y-5 text-lg leading-8 text-stone-700 dark:text-emerald-50/75">
          <p>
            My path started in mechatronics, where every good solution had to respect
            hardware, software, constraints, and the people using the system. That
            mindset still shapes how I build.
          </p>
          <p>
            ALX Africa gave me the software foundation in C, Python, JavaScript,
            Django, Node.js, and modern web development. Since then, I have worked
            across backend systems, mobile apps, and Next.js products with a focus on
            maintainable code and clear user experiences.
          </p>
          <p>
            I am especially drawn to automation, mobility, and local technology that
            makes everyday work simpler for teams, households, and communities.
          </p>
        </div>
      </div>
    </Section>
  );
}
