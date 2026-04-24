"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock3, MapPin, MessageCircle, Package, Phone } from "lucide-react";
import { Product, Vendor } from "@/lib/types";
import { formatCurrency, isOpenNow, statusLabel } from "@/lib/utils";
import { Chip } from "@/components/ui/chip";
import { ReservationDrawer } from "@/components/vendors/reservation-drawer";
import { produceEmojiMap } from "@/lib/data/mock";

type VendorDetailProps = {
  vendor: Vendor;
};

export function VendorDetail({ vendor }: VendorDetailProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todaysHours = vendor.openDays.includes(today) ? `${vendor.openTime} - ${vendor.closeTime}` : "Closed today";
  const currencyCode = vendor.currencyCode ?? "USD";
  const openNow = isOpenNow(vendor);
  const initials = vendor.name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
  const marketGradient =
    vendor.marketId === "market-union-square"
      ? "bg-gradient-to-br from-violet-100 to-violet-50"
      : vendor.marketId === "market-st-georges-market" ||
          vendor.marketId === "market-grand-anse-farmers-market" ||
          vendor.marketId === "market-grenville-weekend-market"
        ? "bg-gradient-to-br from-emerald-100 to-emerald-50"
        : "bg-gradient-to-br from-amber-100 to-amber-50";
  const whatsappHref = vendor.phone ? `https://wa.me/${vendor.phone.replace(/\D/g, "")}` : null;

  function openReservation(product: Product) {
    setSelectedProduct(product);
  }

  function closeReservation() {
    setSelectedProduct(null);
  }

  return (
    <>
      <section className="rounded-[2rem] border border-clay bg-[#fffaf0] p-5 shadow-soft">
        <div className="relative overflow-hidden rounded-3xl border border-clay bg-white">
          <div className={`relative h-32 w-full sm:h-44 ${vendor.profilePhotoUrl ? "" : marketGradient}`}>
            {vendor.profilePhotoUrl ? (
              <Image src={vendor.profilePhotoUrl} alt={vendor.name} fill className="object-cover" unoptimized />
            ) : null}
          </div>
          <div className="absolute -bottom-6 left-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-[#fffaf0] bg-soil text-xl font-bold text-white shadow-soft">
              {initials}
            </div>
          </div>
        </div>

        <div className="mt-12 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold text-ink">{vendor.name}</h1>
            <Chip tone={vendor.isActiveToday ? "green" : "amber"}>{statusLabel(vendor.isActiveToday)}</Chip>
            <span className="inline-flex items-center gap-2 rounded-full border border-clay bg-white px-3 py-1 text-xs font-medium text-ink">
              <span className={`h-2.5 w-2.5 rounded-full ${openNow ? "animate-pulse bg-leaf" : "bg-slate-400"}`} />
              {openNow ? `Open now · closes at ${vendor.closeTime}` : `Closed · opens ${vendor.openTime}`}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-mist px-3 py-1 text-xs font-medium text-ink">
              <MapPin className="h-3.5 w-3.5 text-leaf" />
              {vendor.coverageArea}
            </span>
            <span className="text-sm font-medium text-ink">{today}&apos;s hours: {todaysHours}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-ink/70">{vendor.description}</p>
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

        <div className="mt-4 rounded-3xl border border-clay bg-white p-4">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-leaf" />
            <h2 className="text-base font-semibold text-ink">Hours</h2>
          </div>
          <p className="mt-3 text-sm font-medium text-ink">{todaysHours}</p>
          <p className="mt-1 text-sm text-ink/70">
            {today} · {vendor.openDays.join(", ")}
          </p>
          <p className="mt-2 text-sm text-ink/70">{isOpenNow(vendor) ? "Open right now" : "Closed right now"}</p>
        </div>

        <div className="mt-5">
          <div className="mb-3 flex items-center gap-2">
            <Package className="h-4 w-4 text-leaf" />
            <h2 className="text-lg font-semibold text-ink">Produce available</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {vendor.products.map((product) => (
              <article key={product.id} className="rounded-3xl border border-clay bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-2xl">{produceEmojiMap[product.name.trim().toLowerCase()] ?? "🥬"}</p>
                    <h3 className="mt-2 text-sm font-semibold text-ink sm:text-base">{product.name}</h3>
                  </div>
                  <Chip tone={product.stockStatus === "out_of_stock" ? "amber" : "green"}>
                    {product.stockStatus.replaceAll("_", " ")}
                  </Chip>
                </div>
                <div className="mt-3 space-y-2 text-sm text-ink/70">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ink/45">Price</p>
                    <p className="mt-1 font-medium text-ink">{formatCurrency(product.price, currencyCode)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ink/45">Quantity remaining</p>
                    <p className="mt-1 font-medium text-ink">
                      {product.quantityAvailable} {product.unit}
                    </p>
                  </div>
                </div>
                {product.stockStatus !== "out_of_stock" ? (
                  <button
                    type="button"
                    onClick={() => openReservation(product)}
                    className="mt-4 rounded-full bg-leaf px-4 py-1.5 text-xs font-semibold text-white"
                  >
                    Reserve
                  </button>
                ) : null}
              </article>
            ))}
          </div>
        </div>

        {vendor.phone ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href={`tel:${vendor.phone}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-clay bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-leaf/50"
            >
              <Phone className="h-4 w-4 text-leaf" />
              Call vendor
            </Link>
            {whatsappHref ? (
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-clay bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-leaf/50"
              >
                <MessageCircle className="h-4 w-4 text-leaf" />
                WhatsApp
              </Link>
            ) : null}
          </div>
        ) : null}
      </section>

      {selectedProduct ? (
        <button
          type="button"
          aria-label="Close reservation drawer"
          onClick={closeReservation}
          className="fixed inset-0 z-40 bg-black/30"
        />
      ) : null}
      <ReservationDrawer product={selectedProduct} vendor={vendor} onClose={closeReservation} />
    </>
  );
}
