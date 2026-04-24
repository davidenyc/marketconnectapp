"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { Product, Reservation, Vendor } from "@/lib/types";
import { PaymentSheet } from "@/components/vendors/payment-sheet";

type ReservationDrawerProps = {
  product: Product | null;
  vendor: Vendor;
  onClose: () => void;
};

type ReservationStep = "form" | "payment" | "confirmed";

export function ReservationDrawer({ product, vendor, onClose }: ReservationDrawerProps) {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [step, setStep] = useState<ReservationStep>("form");

  useEffect(() => {
    setQuantity(1);
    setCustomerName("");
    setPhone("");
    setError(null);
    setConfirmedReservation(null);
    setStep("form");
  }, [product?.id]);

  function handleClose() {
    setQuantity(1);
    setCustomerName("");
    setPhone("");
    setError(null);
    setConfirmedReservation(null);
    setStep("form");
    onClose();
  }

  function handleSubmit() {
    if (!product) {
      return;
    }

    if (!customerName.trim() || !phone.trim()) {
      setError("Please add your name and phone number.");
      return;
    }

    setError(null);
    setStep("payment");
  }

  function handlePayOnPickup() {
    if (!product) {
      return;
    }

    const nextReservation: Reservation = {
      id: `reservation-${Date.now()}`,
      vendorId: vendor.id,
      productId: product.id,
      productName: product.name,
      quantity,
      customerName: customerName.trim(),
      phone: phone.trim(),
      createdAt: new Date().toISOString()
    };

    setConfirmedReservation(nextReservation);
    setStep("confirmed");
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-out ${
        product ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={product ? "false" : "true"}
    >
      <div className="mx-auto w-full max-w-md rounded-t-[2rem] border border-clay bg-[#fffaf0] p-5 shadow-soft">
        <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-clay" />
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">Reserve item</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">{product?.name ?? "Reservation"}</h2>
            <p className="mt-1 text-sm text-ink/70">{vendor.name}</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border border-clay p-2 text-ink/70"
            aria-label="Close reservation drawer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {step === "confirmed" && confirmedReservation ? (
          <div className="mt-6 rounded-[1.75rem] border border-leaf/20 bg-white p-5 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-leaf" />
            <h3 className="mt-4 text-xl font-semibold text-ink">Reservation placed!</h3>
            <p className="mt-2 text-sm font-medium text-ink">
              {confirmedReservation.quantity} x {confirmedReservation.productName} at {vendor.name}
            </p>
            <p className="mt-2 text-sm leading-6 text-ink/70">
              The vendor will confirm via WhatsApp. Check your messages.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-5 w-full rounded-2xl bg-leaf py-4 text-base font-semibold text-white"
            >
              Done
            </button>
          </div>
        ) : step === "payment" && product ? (
          <PaymentSheet
            product={product}
            quantity={quantity}
            vendor={vendor}
            onBack={() => setStep("form")}
            onPayOnPickup={handlePayOnPickup}
          />
        ) : (
          <div className="mt-5 space-y-4">
            <div>
              <p className="text-sm font-medium text-ink">Quantity</p>
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-clay bg-mist text-xl font-semibold text-ink"
                >
                  -
                </button>
                <div className="min-w-[72px] rounded-2xl border border-clay bg-white px-4 py-3 text-center text-base font-semibold text-ink">
                  {quantity}
                </div>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.min(product?.quantityAvailable ?? current, current + 1))}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-clay bg-mist text-xl font-semibold text-ink"
                  disabled={!product}
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
                className="w-full rounded-2xl border border-clay bg-white px-4 py-4 text-sm text-ink outline-none focus:border-leaf"
                placeholder="Enter your name"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">WhatsApp / phone number</span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-2xl border border-clay bg-white px-4 py-4 text-sm text-ink outline-none focus:border-leaf"
                placeholder="Enter your number"
              />
            </label>

            {error ? <p className="text-sm font-medium text-soil">{error}</p> : null}

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-2xl bg-leaf py-4 text-base font-semibold text-white"
              disabled={!product}
            >
              Confirm reservation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
