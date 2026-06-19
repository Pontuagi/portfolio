import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

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
          <div className="rounded-lg bg-emerald-950 p-6 text-white dark:bg-[#05100f]">
            <h2 className="text-2xl font-bold">Contact information</h2>
            <div className="mt-8 space-y-5 text-emerald-50/85">
              <ContactLine label="Email" value={site.email} href={`mailto:${site.email}`} />
              <ContactLine label="Phone" value={site.phone} href={site.phoneHref} />
              <ContactLine label="Location" value={site.location} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {site.socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <form
            action={`mailto:${site.email}`}
            method="post"
            encType="text/plain"
            className="space-y-5 rounded-lg border border-emerald-950/10 bg-[#f7f5ef] p-6 dark:border-white/10 dark:bg-white/[0.07]"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" id="name" />
              <Field label="Email address" id="email" type="email" />
            </div>
            <Field label="Subject" id="subject" />
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-emerald-950 dark:text-emerald-50"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={7}
                className="mt-2 w-full rounded-md border border-emerald-950/15 bg-white px-4 py-3 text-emerald-950 outline-none transition focus:border-teal-700 dark:border-white/15 dark:bg-[#071412] dark:text-emerald-50 dark:placeholder:text-emerald-50/40"
                placeholder="Tell me what you are building or trying to solve."
              />
            </div>
            <Button href={`mailto:${site.email}`}>Send message</Button>
          </form>
        </div>
      </Section>
    </main>
  );
}

function ContactLine({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase text-amber-200">
        {label}
      </p>
      {href ? (
        <a href={href} className="mt-1 block text-lg hover:text-white">
          {value}
        </a>
      ) : (
        <p className="mt-1 text-lg">{value}</p>
      )}
    </div>
  );
}

function Field({
  label,
  id,
  type = "text",
}: {
  label: string;
  id: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-emerald-950 dark:text-emerald-50">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="mt-2 w-full rounded-md border border-emerald-950/15 bg-white px-4 py-3 text-emerald-950 outline-none transition focus:border-teal-700 dark:border-white/15 dark:bg-[#071412] dark:text-emerald-50"
      />
    </div>
  );
}
