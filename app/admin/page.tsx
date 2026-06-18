import { AdminHomeClient } from "@/components/admin/AdminHomeClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export default function AdminPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Admin"
        title="Simple admin tools for Blog story submissions."
        description="Admin access is checked with Firebase Auth and the admins collection. This section remains hidden from the public navbar."
      />
      <Section className="bg-white">
        <AdminLayout>
          <AdminHomeClient />
        </AdminLayout>
      </Section>
    </main>
  );
}
