import { TextField } from "@/components/forms/TextField";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function ContactForm() {
  return (
    <form
      action={`mailto:${site.email}`}
      method="post"
      encType="text/plain"
      className="space-y-5 rounded-lg border border-emerald-950/10 bg-[#f7f5ef] p-6 dark:border-white/10 dark:bg-white/[0.07]"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" id="name" />
        <TextField label="Email address" id="email" type="email" />
      </div>
      <TextField label="Subject" id="subject" />
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
  );
}
