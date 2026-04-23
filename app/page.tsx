import Link from "next/link";
import { ArrowRight, MapPinned, Sprout, Store } from "lucide-react";
import { VendorMap } from "@/components/map/vendor-map";
import { VendorCard } from "@/components/vendors/vendor-card";
import { getVendors } from "@/lib/data/vendors";

export default async function HomePage() {
  const vendors = await getVendors();

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="order-2 flex flex-col gap-4 lg:order-1">
        <div className="rounded-[2rem] border border-clay bg-[#fffaf0] p-5 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">Find fresh vendors</p>
              <h1 className="mt-2 text-3xl font-semibold leading-tight text-ink">
                See who is selling produce near you today.
              </h1>
              <p className="mt-3 text-sm leading-6 text-ink/70">
                MarketConnect helps customers in informal, mobile, and rural markets quickly find vendors, locations, and current stock.
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-mist p-4">
              <MapPinned className="h-5 w-5 text-leaf" />
              <p className="mt-3 text-sm font-semibold text-ink">Live locations</p>
            </div>
            <div className="rounded-3xl bg-mist p-4">
              <Sprout className="h-5 w-5 text-leaf" />
              <p className="mt-3 text-sm font-semibold text-ink">Daily produce lists</p>
            </div>
            <div className="rounded-3xl bg-mist p-4">
              <Store className="h-5 w-5 text-leaf" />
              <p className="mt-3 text-sm font-semibold text-ink">Simple vendor updates</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>

      <section className="order-1 space-y-4 lg:order-2">
        <VendorMap vendors={vendors} />
        <Link
          href="/auth"
          className="flex items-center justify-between rounded-[2rem] border border-clay bg-leaf px-5 py-4 text-white shadow-soft"
        >
          <div>
            <p className="text-base font-semibold">Are you a vendor?</p>
            <p className="text-sm text-white/80">Sign up to share your location and stock today.</p>
          </div>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </section>
    </div>
  );
}
