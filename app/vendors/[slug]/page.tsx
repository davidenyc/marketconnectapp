import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { VendorDetail } from "@/components/vendors/vendor-detail";
import { getVendorBySlug } from "@/lib/data/vendors";

type VendorPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function VendorPage({ params }: VendorPageProps) {
  const { slug } = await params;
  const vendor = await getVendorBySlug(slug);

  if (!vendor) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-clay bg-mist px-4 py-2 text-sm font-semibold text-ink">
        <ChevronLeft className="h-4 w-4" />
        Back to map
      </Link>
      <VendorDetail vendor={vendor} />
    </div>
  );
}
