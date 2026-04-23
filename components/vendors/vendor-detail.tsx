"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Clock3, MapPin, Package, Phone, X } from "lucide-react";
import { Reservation, Vendor } from "@/lib/types";
import { formatCurrency, isOpenNow, statusLabel } from "@/lib/utils";
import { Chip } from "@/components/ui/chip";

type VendorDetailProps = {
  vendor: Vendor;
};

export function VendorDetail({ vendor }: VendorDetailProps) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todaysHours = vendor.openDays.includes(today) ? `${vendor.openTime} - ${vendor.closeTime}` : "Closed today";
  const currencyCode = vendor.currencyCode ?? "USD";
  const selectedProduct = useMemo(
    () => vendor.products.find((product) => product.id === selectedProductId) ?? null,
    [selectedProductId, vendor.products]
  );

  function openReservation(productId: string) {
    setSelectedProductId(productId);
    setQuantity(1);
    setCustomerName("");
    setPhone("");
    setConfirmationMessage(null);
  }

  function closeReservation() {
    setSelectedProductId(null);
    setQuantity(1);
    setCustomerName("");
    setPhone("");
    setConfirmationMessage(null);
  }

  function submitReservation() {
    if (!selectedProduct || !customerName.trim() || !phone.trim()) {
      return;
    }

    setReservations((current) => [
      {
        id: `reservation-${Date.now()}`,
        vendorId: vendor.id,
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        quantity,
        customerName: customerName.trim(),
        phone: phone.trim(),
        createdAt: new Date().toISOString()
      },
      ...current
    ]);
    setConfirmationMessage("Your reservation is placed — the vendor will confirm via WhatsApp.");
    setCustomerName("");
    setPhone("");
    setQuantity(1);
  }

  return (
    <>
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
                    <p className="mt-1 font-medium text-ink">{formatCurrency(product.price, currencyCode)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ink/45">Quantity</p>
                    <p className="mt-1 font-medium text-ink">
                      {product.quantityAvailable} {product.unit}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openReservation(product.id)}
                  className="mt-4 w-full rounded-2xl bg-leaf px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={product.stockStatus === "out_of_stock"}
                >
                  Reserve
                </button>
              </article>
            ))}
          </div>
        </div>

        {reservations.length > 0 ? (
          <div className="mt-5 rounded-3xl border border-clay bg-white p-4">
            <h2 className="text-base font-semibold text-ink">Recent reservations</h2>
            <div className="mt-3 space-y-2">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="rounded-2xl bg-mist px-3 py-2 text-sm text-ink/75">
                  {reservation.productName} x{reservation.quantity} for {reservation.customerName}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {selectedProduct ? (
        <div className="fixed inset-0 z-50 flex items-end bg-ink/35">
          <button type="button" aria-label="Close reservation drawer" className="absolute inset-0" onClick={closeReservation} />
          <div className="relative z-10 w-full rounded-t-[2rem] bg-white p-5 shadow-soft">
            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-clay" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">Reserve item</p>
                <h2 className="mt-1 text-xl font-semibold text-ink">{selectedProduct.name}</h2>
              </div>
              <button
                type="button"
                onClick={closeReservation}
                className="rounded-full border border-clay p-2 text-ink/70"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-sm font-medium text-ink">Quantity</p>
                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                    className="h-12 w-12 rounded-2xl border border-clay bg-mist text-xl font-semibold text-ink"
                  >
                    -
                  </button>
                  <div className="min-w-[72px] rounded-2xl border border-clay px-4 py-3 text-center text-base font-semibold text-ink">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => current + 1)}
                    className="h-12 w-12 rounded-2xl border border-clay bg-mist text-xl font-semibold text-ink"
                  >
                    +
                  </button>
                </div>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-ink">Your name</span>
                <input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  className="w-full rounded-2xl border border-clay bg-[#fffaf0] px-4 py-4 text-sm text-ink"
                  placeholder="Enter your name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-ink">Phone number</span>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="w-full rounded-2xl border border-clay bg-[#fffaf0] px-4 py-4 text-sm text-ink"
                  placeholder="+1 473 ..."
                />
              </label>

              {confirmationMessage ? (
                <div className="rounded-2xl bg-leaf/10 px-4 py-3 text-sm font-medium text-leaf">{confirmationMessage}</div>
              ) : null}

              <button
                type="button"
                onClick={submitReservation}
                disabled={!customerName.trim() || !phone.trim()}
                className="w-full rounded-2xl bg-leaf px-4 py-4 text-sm font-semibold text-white disabled:opacity-50"
              >
                Confirm reservation
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
