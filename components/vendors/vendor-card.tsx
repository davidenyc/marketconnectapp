import Image from "next/image";
import Link from "next/link";
import { Clock3, MapPin, Package } from "lucide-react";
import { Vendor } from "@/lib/types";
import { formatCurrency, formatRelativeTime, isOpenNow, statusLabel } from "@/lib/utils";
import { Chip } from "@/components/ui/chip";

type VendorCardProps = {
  vendor: Vendor;
  highlighted?: boolean;
  cardId?: string;
  from?: string;
};

export function VendorCard({ vendor, highlighted = false, cardId, from }: VendorCardProps) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todaysHours = vendor.openDays.includes(today) ? `${vendor.openTime} - ${vendor.closeTime}` : "Closed today";
  const lastUpdated = formatRelativeTime(vendor.location.updatedAt);
  const currencyCode = vendor.currencyCode ?? "USD";

  return (
    <Link
      id={cardId}
      href={`/vendors/${vendor.slug}${from ? `?from=${from}` : ""}`}
      className={`block rounded-[1.5rem] border bg-[#fffaf0] p-3 shadow-soft transition hover:-translate-y-0.5 sm:rounded-3xl sm:p-4 ${
        highlighted ? "border-leaf ring-2 ring-leaf/40" : "border-clay"
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-clay sm:h-16 sm:w-16">
          {vendor.profilePhotoUrl ? (
            <Image src={vendor.profilePhotoUrl} alt={vendor.name} fill className="object-cover" unoptimized />
          ) : (
            <div className="flex h-full items-center justify-center bg-soil text-lg font-bold text-white sm:text-xl">
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
            <h2 className="text-sm font-semibold text-ink sm:text-base">{vendor.name}</h2>
            <Chip tone={vendor.isActiveToday ? "green" : "amber"}>{statusLabel(vendor.isActiveToday)}</Chip>
          </div>
          <p className="mt-1.5 line-clamp-2 text-xs text-ink/70 sm:mt-2 sm:text-sm">{vendor.description}</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-ink/75 sm:mt-3 sm:text-sm">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{vendor.location.placeLabel}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-xs text-ink/75 sm:mt-2 sm:text-sm">
            <Clock3 className="h-4 w-4" />
            <span>Updated {lastUpdated}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-xs text-ink/75 sm:mt-2 sm:text-sm">
            <Clock3 className="h-4 w-4" />
            <span>
              {todaysHours}
              {vendor.isActiveToday ? ` · ${isOpenNow(vendor) ? "Open now" : "Closed now"}` : ""}
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-xs text-ink/75 sm:mt-2 sm:text-sm">
            <Package className="h-4 w-4" />
            <span>
              {vendor.products[0]?.name
                ? `${vendor.products[0].name} from ${formatCurrency(vendor.products[0].price, currencyCode)}`
                : "No produce listed"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
