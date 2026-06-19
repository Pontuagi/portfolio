import type { Project } from "@/types/portfolio";

export const projects: readonly Project[] = [
  {
    slug: "solamtaa",
    title: "SolaMtaa",
    category: "Solar marketplace",
    summary:
      "A solar product marketplace empowering Kenyan and East African communities to browse, compare, and request quotes on clean energy solutions via WhatsApp.",
    image: "/images/solarmtaa.png",
    link: {
      label: "Visit SolaMtaa",
      href: "https://solar.anozen.org/",
    },
    problem:
      "Households and communities across Kenya lacked a simple, trustworthy way to discover affordable solar panels, batteries, inverters, and accessories without visiting physical shops.",
    solution:
      "I built a clean web marketplace where users can browse solar products by category and request quotes directly through WhatsApp, reducing friction between buyer interest and seller contact.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Firebase"],
    impact:
      "The platform makes clean energy more accessible by meeting buyers where they are — online and on WhatsApp — rather than requiring them to navigate complex procurement processes.",
  },
  {
    slug: "grandmark-website",
    title: "GrandMark Website",
    category: "Company website",
    summary:
      "A modern web presence for a geospatial company, built to explain services clearly and support future content growth.",
    image: "/images/grandmark.png",
    link: {
      label: "Visit GrandMark",
      href: "https://www.grandmarksolutionsltd.org/",
    },
    problem:
      "GrandMark needed a professional digital home that could communicate technical geospatial services without overwhelming visitors.",
    solution:
      "I built a Next.js experience with structured sections, reusable UI patterns, styled components, and Storybook-supported components for consistency.",
    technologies: ["Next.js", "React", "Styled Components", "Storybook"],
    impact:
      "The project sharpened my approach to translating specialized technical services into a clear marketing and information experience.",
  },
  {
    slug: "bible-app",
    title: "Bible App",
    category: "Mobile app",
    summary:
      "A Flutter Bible application with multilingual support and a read-aloud experience for more accessible reading.",
    image: "/images/bible-screenshot.jpeg",
    link: {
      label: "View on Play Store",
      href: "https://play.google.com/store/apps/details?id=com.world.bible_app",
    },
    problem:
      "Readers needed a mobile Bible experience that could support different languages and make scripture easier to follow through audio.",
    solution:
      "I worked with Flutter and Dart to shape a cross-platform app interface, pairing reading flows with multilingual and read-aloud features.",
    technologies: ["Flutter", "Dart", "Mobile UI", "Audio features"],
    impact:
      "The work deepened my mobile product thinking, especially around accessibility, performance, and designing for daily-use habits.",
  },
  {
    slug: "github-pages-portfolio",
    title: "GitHub Pages Portfolio",
    category: "Portfolio site",
    summary:
      "A Jekyll-powered portfolio hosted on GitHub Pages to help a developer present work, skills, and credibility online.",
    image: "/images/victor-screenshot.jpeg",
    link: {
      label: "Visit portfolio",
      href: "https://victorkorir1.github.io/",
    },
    problem:
      "A developer needed a lightweight portfolio that could be hosted reliably and updated without a complex deployment pipeline.",
    solution:
      "I used Jekyll and GitHub Pages to create a simple, fast, maintainable site focused on projects, technical skills, and contact paths.",
    technologies: ["Jekyll", "GitHub Pages", "HTML", "CSS"],
    impact:
      "This project reinforced the value of choosing the simplest stack that solves the real publishing problem well.",
  },
  {
    slug: "servicehub",
    title: "ServiceHub",
    category: "Service platform",
    summary:
      "A service-oriented interface concept focused on connecting people to helpful digital services with a clean user journey.",
    image: "/images/servicehub.png",
    problem:
      "Service discovery can become messy when users cannot quickly understand what is offered or how to take action.",
    solution:
      "I explored a cleaner product structure with clear service categories, visual hierarchy, and conversion-focused user flows.",
    technologies: ["React", "Tailwind CSS", "Product UI", "Responsive design"],
    impact:
      "The project helped me practice turning broad service ideas into focused screens that users can scan and act on quickly.",
  },
  {
    slug: "wizverse",
    title: "Wizverse Home",
    category: "Web app interface",
    summary:
      "A polished web interface exploration for presenting a digital product in a way that feels simple and trustworthy.",
    image: "/images/wizverse-home.png",
    problem:
      "Early product interfaces often need to make a strong first impression while still explaining what the product helps users do.",
    solution:
      "I shaped a responsive home experience around clear positioning, direct navigation, and visual product cues.",
    technologies: ["Next.js", "React", "Tailwind CSS", "UI design"],
    impact:
      "The work improved my sense for balancing visual polish with useful information architecture.",
  },
];
