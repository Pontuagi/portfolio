import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStoriesClient } from "@/components/admin/AdminStoriesClient";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export default function AdminStoriesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Admin stories"
        title="Review and moderate Blog short stories."
        description="Pending submissions are the default focus. Admins can approve, reject, or delete stories from Firestore."
      />
      <Section className="bg-white">
        <AdminLayout>
          <AdminStoriesClient />
        </AdminLayout>
      </Section>
    </main>
  );
}
