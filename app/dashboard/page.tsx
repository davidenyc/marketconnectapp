import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getCurrentUser } from "@/lib/auth";
import { getVendorForCurrentUser } from "@/lib/data/vendors";
import { mockVendors } from "@/lib/data/mock";

export default async function DashboardPage() {
  const authEnabled = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  if (!authEnabled) {
    return (
      <div className="py-2">
        <DashboardShell initialVendor={mockVendors[0]} authEnabled={false} />
      </div>
    );
  }

  const { user } = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  const vendor = await getVendorForCurrentUser(user.id);

  return (
    <div className="py-2">
      <DashboardShell initialVendor={vendor} authEnabled />
    </div>
  );
}
