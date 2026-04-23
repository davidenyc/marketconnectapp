import Image from "next/image";
import Link from "next/link";
import { MapPin, Package } from "lucide-react";
import { Vendor } from "@/lib/types";
import { formatCurrency, statusLabel } from "@/lib/utils";
import { Chip } from "@/components/ui/chip";

type VendorCardProps = {
  vendor: Vendor;
};

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Link
      href={`/vendors/${vendor.slug}`}
      className="block rounded-3xl border border-clay bg-[#fffaf0] p-4 shadow-soft transition hover:-translate-y-0.5"
    >
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-clay">
          {vendor.profilePhotoUrl ? (
            <Image src={vendor.profilePhotoUrl} alt={vendor.name} fill className="object-cover" unoptimized />
          ) : (
            <div className="flex h-full items-center justify-center bg-soil text-xl font-bold text-white">
              {vendor.name
                .split(" ")
                .slice(0, 2)
                .map((word) => word[0])
                .join("")}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-semibold text-ink">{vendor.name}</h2>
            <Chip tone={vendor.isActiveToday ? "green" : "amber"}>{statusLabel(vendor.isActiveToday)}</Chip>
          </div>
          <p className="mt-2 text-sm text-ink/70">{vendor.description}</p>
          <div className="mt-3 flex items-center gap-2 text-sm text-ink/75">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{vendor.location.placeLabel}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-ink/75">
            <Package className="h-4 w-4" />
            <span>
              {vendor.products[0]?.name ? `${vendor.products[0].name} from ${formatCurrency(vendor.products[0].price)}` : "No produce listed"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
