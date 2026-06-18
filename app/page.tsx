import { BlogPreview } from "@/components/home/BlogPreview";
import { ContactCta } from "@/components/home/ContactCta";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Journey } from "@/components/home/Journey";
import { Skills } from "@/components/home/Skills";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Intro />
      <Journey />
      <FeaturedProjects />
      <Skills />
      <BlogPreview />
      <ContactCta />
    </main>
  );
}
