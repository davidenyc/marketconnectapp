import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Store } from "lucide-react";
import { VendorDetail } from "@/components/vendors/vendor-detail";
import { getVendorBySlug } from "@/lib/data/vendors";
import { getMarketById } from "@/lib/data/markets";

type VendorPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
};

const backRoutes: Record<string, { href: string; label: string }> = {
  city: { href: "/city", label: "NYC Greenmarket" },
  island: { href: "/island/grenada", label: "Grenada Markets" }
};

export default async function VendorPage({ params, searchParams }: VendorPageProps) {
  const [{ slug }, { from }] = await Promise.all([params, searchParams]);
  const vendor = await getVendorBySlug(slug);

  if (!vendor) {
    notFound();
  }

  const back = (from ? backRoutes[from] : undefined) ?? { href: "/", label: "Back" };
  const market = vendor.marketId ? getMarketById(vendor.marketId) : undefined;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Link
        href={back.href}
        className="inline-flex items-center gap-2 rounded-full border border-clay bg-mist px-4 py-2 text-sm font-semibold text-ink transition hover:border-leaf/50"
      >
        <ChevronLeft className="h-4 w-4" />
        {back.label}
      </Link>
      {market ? (
        <div className="flex items-center gap-2 text-xs text-ink/55">
          <Store className="h-3.5 w-3.5" />
          <span>Part of {market.name}</span>
        </div>
      ) : null}
      <VendorDetail vendor={vendor} />
    </div>
  );
}
