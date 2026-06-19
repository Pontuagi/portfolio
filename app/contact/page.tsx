import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title="Let us talk about the problem behind the product."
        description="Reach out for full-stack, backend, mobile, automation, or product-focused work. I am based in Nairobi and open to thoughtful collaborations."
      />
      <Section className="bg-white dark:bg-[#071412]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <ContactInfo />
          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
