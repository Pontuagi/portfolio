import type { SkillGroup } from "@/types/portfolio";

export const skillGroups: readonly SkillGroup[] = [
  {
    title: "Languages",
    description: "The core building blocks I use to reason through software.",
    skills: ["C", "JavaScript", "TypeScript", "Python", "Dart"],
  },
  {
    title: "Frontend and Mobile",
    description: "Interfaces that are responsive, clear, and comfortable to use.",
    skills: ["React", "Next.js", "Flutter", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Backend and Data",
    description: "Application foundations, APIs, and data persistence.",
    skills: ["Django", "Node.js", "Firebase", "MongoDB", "MySQL", "API integration"],
  },
  {
    title: "Engineering Practice",
    description: "The habits that help teams ship dependable software.",
    skills: ["Docker", "Git", "Linux", "Documentation", "Testing", "Project management"],
  },
  {
    title: "Professional Strengths",
    description: "How I work with teams and turn ambiguity into progress.",
    skills: [
      "Teamwork",
      "Collaboration",
      "Creativity",
      "Problem solving",
      "Time management",
    ],
  },
];
