"use client";

import { Banknote, CreditCard } from "lucide-react";
import { Product, Vendor } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type PaymentSheetProps = {
  product: Product;
  quantity: number;
  vendor: Vendor;
  onBack: () => void;
  onPayOnPickup: () => void;
};

export function PaymentSheet({ product, quantity, vendor, onBack, onPayOnPickup }: PaymentSheetProps) {
  const currencyCode = vendor.currencyCode ?? "USD";
  const total = product.price * quantity;

  return (
    <div className="mt-5 space-y-4">
      <button type="button" onClick={onBack} className="text-sm font-semibold text-leaf">
        Back
      </button>

      <div className="rounded-[1.75rem] border border-clay bg-white p-4">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-leaf">Order summary</p>
        <div className="mt-4 space-y-2 text-sm text-ink/75">
          <div className="flex items-center justify-between gap-3">
            <span>{product.name}</span>
            <span>{formatCurrency(product.price, currencyCode)}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>Quantity</span>
            <span>{quantity}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>Unit price</span>
            <span>{formatCurrency(product.price, currencyCode)}</span>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-clay pt-4 text-lg font-semibold text-ink">
            <span>Total</span>
            <span>{formatCurrency(total, currencyCode)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={onPayOnPickup}
          className="flex w-full items-start gap-3 rounded-[1.75rem] border border-clay bg-white p-4 text-left shadow-soft transition hover:border-leaf/50"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-leaf/10 text-leaf">
            <Banknote className="h-6 w-6" />
          </div>
          <div>
            <p className="text-base font-semibold text-ink">Pay on pickup</p>
            <p className="mt-1 text-sm leading-6 text-ink/70">
              Pay the vendor directly when you collect your order.
            </p>
          </div>
        </button>

        <div className="flex w-full items-start gap-3 rounded-[1.75rem] border border-clay bg-mist p-4 text-left opacity-60">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-ink/60">
            <CreditCard className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="text-base font-semibold text-ink">Pay now</p>
              <span className="rounded-full border border-clay bg-white px-3 py-1 text-xs font-semibold text-ink/70">
                Coming soon
              </span>
            </div>
            <p className="mt-1 text-sm leading-6 text-ink/70">
              Online checkout will be available in a future update.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
