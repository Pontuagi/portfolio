import { site } from "@/lib/site";

export function ContactInfo() {
  return (
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
