import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function ProfileSummary() {
  return (
    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      <Image
        src="/images/office.jpeg"
        alt="Workspace"
        width={900}
        height={700}
        className="h-full max-h-[520px] rounded-lg object-cover"
      />
      <div className="space-y-5 text-lg leading-8 text-stone-700 dark:text-emerald-50/75">
        <p>
          As a full-stack software engineer, I bring front-end and back-end
          development together with curiosity, lifelong learning, and a practical
          eye for systems that make work easier.
        </p>
        <p>
          ALX Africa gave me a strong foundation in C, Python, JavaScript,
          Django, Node.js, and backend development. My mechatronics background
          keeps me attentive to real-world constraints, automation, and the
          connection between tools and human routines.
        </p>
        <p>
          I am especially interested in automation companies, mobility products,
          and local household technology: software and systems that simplify
          processes and improve life for future generations.
        </p>
        <Button href={site.cvHref} target="_blank" rel="noreferrer">
          Download CV
        </Button>
      </div>
    </div>
  );
}
