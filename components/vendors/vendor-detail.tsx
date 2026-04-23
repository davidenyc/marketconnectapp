import Image from "next/image";
import { Clock3, MapPin, Package, Phone } from "lucide-react";
import { Vendor } from "@/lib/types";
import { formatCurrency, statusLabel } from "@/lib/utils";
import { Chip } from "@/components/ui/chip";

type VendorDetailProps = {
  vendor: Vendor;
};

export function VendorDetail({ vendor }: VendorDetailProps) {
  return (
    <section className="rounded-[2rem] border border-clay bg-[#fffaf0] p-5 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-3xl bg-clay">
          {vendor.profilePhotoUrl ? (
            <Image src={vendor.profilePhotoUrl} alt={vendor.name} fill className="object-cover" unoptimized />
          ) : (
            <div className="flex h-full items-center justify-center bg-soil text-2xl font-bold text-white">
              {vendor.name
                .split(" ")
                .slice(0, 2)
                .map((word) => word[0])
                .join("")}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold text-ink">{vendor.name}</h1>
            <Chip tone={vendor.isActiveToday ? "green" : "amber"}>{statusLabel(vendor.isActiveToday)}</Chip>
          </div>
          <p className="mt-2 text-sm leading-6 text-ink/70">{vendor.description}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 rounded-3xl bg-mist p-4 text-sm text-ink/75">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-leaf" />
          <span>{vendor.location.placeLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-leaf" />
          <span>Last updated {new Date(vendor.location.updatedAt).toLocaleString()}</span>
        </div>
        {vendor.phone ? (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-leaf" />
            <span>{vendor.phone}</span>
          </div>
        ) : null}
      </div>

      <div className="mt-5">
        <div className="mb-3 flex items-center gap-2">
          <Package className="h-4 w-4 text-leaf" />
          <h2 className="text-lg font-semibold text-ink">Produce available</h2>
        </div>
        <div className="grid gap-3">
          {vendor.products.map((product) => (
            <article key={product.id} className="rounded-3xl border border-clay bg-white p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-ink">{product.name}</h3>
                <Chip tone={product.stockStatus === "out_of_stock" ? "amber" : "green"}>
                  {product.stockStatus.replaceAll("_", " ")}
                </Chip>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-ink/70">
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink/45">Price</p>
                  <p className="mt-1 font-medium text-ink">{formatCurrency(product.price)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink/45">Quantity</p>
                  <p className="mt-1 font-medium text-ink">
                    {product.quantityAvailable} {product.unit}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
