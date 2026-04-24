"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Building2, ChevronDown, MapPin, Palmtree, Search, Sprout, Store } from "lucide-react";
import { VendorMap } from "@/components/map/vendor-map";
import { MarketCard } from "@/components/markets/market-card";
import { Chip } from "@/components/ui/chip";
import { VendorCard } from "@/components/vendors/vendor-card";
import { produceEmojiMap } from "@/lib/data/mock";
import { Market, Vendor } from "@/lib/types";
import { cn, formatCurrency, isOpenNow } from "@/lib/utils";

type HomeContentProps = {
  vendors: Vendor[];
  markets: Market[];
  locationLabel: string;
  locationHref?: string;
  regionTagline?: string;
  regionType?: "city" | "island";
  heroTitle?: string;
  heroCopy?: string;
  picksHeading?: string;
  marketsHeading?: string;
  vendorBannerTitle?: string;
  vendorBannerCopy?: string;
};

type TodaysPick = {
  name: string;
  emoji: string;
  price: number;
  vendorId: string;
  vendorName: string;
};

type SortOption = "default" | "open-first" | "a-z" | "most-produce";

const badgeRow = [
  "Real farmers, real produce",
  "Live map & vendor updates",
  "Reserve before you go",
  "Direct from the farm"
];

function normalizeProduceName(name: string) {
  return name.trim().toLowerCase();
}

export function HomeContent({
  vendors,
  markets,
  locationLabel,
  locationHref = "/",
  regionTagline = "Fresh produce finder",
  regionType,
  heroTitle = "See who is selling produce near you today.",
  heroCopy = "MarketConnect helps customers in informal, mobile, and rural markets quickly find vendors, locations, and current stock.",
  picksHeading = "Today’s best fresh finds",
  marketsHeading = "Featured markets nearby",
  vendorBannerTitle = "Are you a vendor?",
  vendorBannerCopy = "Sign up to share today’s location, stock, and market updates."
}: HomeContentProps) {
  const [highlightedVendorId, setHighlightedVendorId] = useState<string | null>(null);
  const [openMarketIds, setOpenMarketIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [activeTodayOnly, setActiveTodayOnly] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredVendors = useMemo(() => {
    let nextVendors = vendors.filter((vendor) => {
      if (!normalizedQuery) {
        return true;
      }

      const vendorMatch = vendor.name.toLowerCase().includes(normalizedQuery);
      const produceMatch = vendor.products.some((product) => product.name.toLowerCase().includes(normalizedQuery));
      return vendorMatch || produceMatch;
    });

    if (openNowOnly) {
      nextVendors = nextVendors.filter((vendor) => isOpenNow(vendor));
    }

    if (activeTodayOnly) {
      nextVendors = nextVendors.filter((vendor) => vendor.isActiveToday);
    }

    return nextVendors;
  }, [activeTodayOnly, normalizedQuery, openNowOnly, vendors]);

  const sortedVendors = useMemo(() => {
    const nextVendors = [...filteredVendors];

    switch (sortOption) {
      case "open-first":
        return nextVendors.sort((a, b) => Number(isOpenNow(b)) - Number(isOpenNow(a)));
      case "a-z":
        return nextVendors.sort((a, b) => a.name.localeCompare(b.name));
      case "most-produce":
        return nextVendors.sort((a, b) => b.products.length - a.products.length);
      default:
        return nextVendors;
    }
  }, [filteredVendors, sortOption]);

  const filteredMarkets = useMemo(
    () => markets.filter((market) => sortedVendors.some((vendor) => vendor.marketId === market.id)),
    [markets, sortedVendors]
  );

  const todaysPicks = useMemo(() => {
    const lowestByProduct = new Map<string, TodaysPick>();

    for (const vendor of sortedVendors) {
      for (const product of vendor.products) {
        if (product.stockStatus === "out_of_stock" || product.quantityAvailable <= 0) {
          continue;
        }

        const normalizedName = normalizeProduceName(product.name);
        const current = lowestByProduct.get(normalizedName);

        if (!current || product.price < current.price) {
          lowestByProduct.set(normalizedName, {
            name: product.name,
            emoji: produceEmojiMap[normalizedName] ?? "🥬",
            price: product.price,
            vendorId: vendor.id,
            vendorName: vendor.name
          });
        }
      }
    }

    return Array.from(lowestByProduct.values())
      .sort((a, b) => a.price - b.price)
      .slice(0, 8);
  }, [sortedVendors]);

  const vendorsByMarket = useMemo(
    () =>
      filteredMarkets.map((market) => ({
        market,
        vendors: filteredVendors.filter((vendor) => vendor.marketId === market.id)
      })),
    [filteredMarkets, filteredVendors]
  );

  function focusVendor(vendorId: string) {
    setHighlightedVendorId(vendorId);

    const card = document.getElementById(`vendor-card-${vendorId}`);
    card?.scrollIntoView({ behavior: "smooth", block: "center" });

    window.setTimeout(() => {
      setHighlightedVendorId((current) => (current === vendorId ? null : current));
    }, 2400);
  }

  function toggleMarket(marketId: string) {
    setOpenMarketIds((current) =>
      current.includes(marketId) ? current.filter((id) => id !== marketId) : [...current, marketId]
    );
  }

  function clearFilters() {
    setQuery("");
    setOpenNowOnly(false);
    setActiveTodayOnly(false);
    setSortOption("default");
  }

  function getTopItems(vendor: Vendor) {
    return [...vendor.products]
      .sort((a, b) => {
        if (a.stockStatus === "out_of_stock" && b.stockStatus !== "out_of_stock") return 1;
        if (a.stockStatus !== "out_of_stock" && b.stockStatus === "out_of_stock") return -1;
        return a.price - b.price;
      })
      .slice(0, 2);
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="sticky top-0 z-30 rounded-[1.5rem] border border-clay/90 bg-white/95 px-3 py-2.5 shadow-soft backdrop-blur sm:rounded-[1.75rem] sm:px-4 sm:py-3">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Link
              href={locationHref}
              aria-label={`Go to ${locationLabel}`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-leaf text-white transition hover:scale-[1.02]"
            >
              <Sprout className="h-5 w-5" />
            </Link>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink sm:text-base">MarketConnect</p>
              <p className="truncate text-[11px] text-ink/60 sm:text-xs">{regionTagline}</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <label className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/45" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search vendors or produce"
                className="w-full rounded-2xl border border-clay bg-[#fffaf0] py-3 pl-11 pr-4 text-sm text-ink outline-none transition focus:border-leaf"
              />
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOpenNowOnly((current) => !current)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                  openNowOnly ? "border-leaf bg-leaf text-white" : "border-clay bg-white text-ink/70"
                }`}
              >
                Open now
              </button>
              <button
                type="button"
                onClick={() => setActiveTodayOnly((current) => !current)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                  activeTodayOnly ? "border-leaf bg-leaf text-white" : "border-clay bg-white text-ink/70"
                }`}
              >
                Active today
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={locationHref}
              className="inline-flex items-center gap-2 rounded-full border border-clay bg-[#fffaf0] px-3 py-2 text-sm font-medium text-ink transition hover:border-leaf/50 hover:text-leaf sm:px-4"
            >
              <MapPin className="h-4 w-4 text-leaf" />
              <span className="truncate max-w-[120px]">{locationLabel}</span>
            </Link>
            {regionType && (
              <div className="flex items-center gap-1 rounded-full border border-clay bg-[#fffaf0] p-1">
                <Link
                  href="/city/select"
                  title="City Markets"
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
                    regionType === "city" ? "bg-leaf text-white shadow-sm" : "text-ink/50 hover:text-ink"
                  }`}
                >
                  <Building2 className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/island"
                  title="Island Markets"
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
                    regionType === "island" ? "bg-soil text-white shadow-sm" : "text-ink/50 hover:text-ink"
                  }`}
                >
                  <Palmtree className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {normalizedQuery ? (
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-clay bg-mist px-3 py-1.5 text-sm text-ink">
              🔍 &quot;{query.trim()}&quot; · {filteredVendors.length} result{filteredVendors.length === 1 ? "" : "s"}
              <button type="button" onClick={() => setQuery("")} className="ml-1 text-ink/50 hover:text-ink">
                ×
              </button>
            </span>
          </div>
        ) : null}
      </div>

      <section className="rounded-[1.75rem] border border-clay bg-[#fffaf0] p-4 shadow-soft sm:rounded-[2rem] sm:p-5">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf sm:text-sm">Find fresh vendors</p>
          <h1 className="mt-2 text-2xl font-semibold leading-tight text-ink sm:text-4xl">{heroTitle}</h1>
          <p className="mt-2 text-sm leading-6 text-ink/70">{heroCopy}</p>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:mt-5 sm:flex-wrap sm:overflow-visible sm:pb-0">
          {badgeRow.map((badge, index) => (
            <span
              key={badge}
              className={cn(
                "whitespace-nowrap rounded-full border border-clay bg-white px-3 py-2 text-xs font-medium text-ink shadow-soft sm:px-4 sm:text-sm",
                "animate-[pulse_3.6s_ease-in-out_infinite]",
                index % 2 === 1 ? "[animation-delay:400ms]" : "",
                index % 3 === 2 ? "[animation-delay:800ms]" : ""
              )}
            >
              {badge}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-clay bg-white shadow-soft">
        <VendorMap vendors={sortedVendors} markets={filteredMarkets} />
      </section>

      {sortedVendors.length > 0 ? (
        <>
          <section className="rounded-[1.75rem] border border-clay bg-white p-4 shadow-soft sm:rounded-[2rem]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">Today&apos;s Picks</p>
              <h2 className="mt-1 text-xl font-semibold text-ink">{picksHeading}</h2>
            </div>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {todaysPicks.map((pick) => (
                <button
                  key={`${pick.name}-${pick.vendorId}`}
                  type="button"
                  onClick={() => focusVendor(pick.vendorId)}
                  className="min-w-[220px] rounded-[1.75rem] border border-clay bg-[#fffaf0] p-4 text-left shadow-soft"
                >
                  <div className="text-2xl">{pick.emoji}</div>
                  <p className="mt-3 text-base font-semibold text-ink">{pick.name}</p>
                  <p className="mt-1 text-sm font-medium text-leaf">
                    {formatCurrency(pick.price, sortedVendors.find((vendor) => vendor.id === pick.vendorId)?.currencyCode ?? "USD")}
                  </p>
                  <p className="mt-2 text-sm text-ink/70">{pick.vendorName}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-clay bg-white p-4 shadow-soft sm:rounded-[2rem]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">Featured Markets</p>
                <h2 className="mt-1 text-xl font-semibold text-ink">{marketsHeading}</h2>
              </div>
            </div>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {filteredMarkets.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
            <div className="mt-5 space-y-3">
              {vendorsByMarket.map(({ market, vendors: marketVendors }) => {
                const isOpen = openMarketIds.includes(market.id);

                return (
                  <div key={market.id} className="rounded-[1.75rem] border border-clay bg-[#fffaf0]">
                    <button
                      type="button"
                      onClick={() => toggleMarket(market.id)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                    >
                      <div>
                        <p className="text-base font-semibold text-ink">Vendors at {market.name}</p>
                        <p className="mt-1 text-sm text-ink/65">
                          {marketVendors.length} vendor{marketVendors.length === 1 ? "" : "s"} in this market
                        </p>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-ink/65 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-70"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-3 border-t border-clay/80 px-4 py-4">
                          {marketVendors.map((vendor) => (
                            <button
                              key={vendor.id}
                              type="button"
                              onClick={() => focusVendor(vendor.id)}
                              className="flex w-full items-start gap-3 rounded-2xl border border-clay bg-white px-4 py-3 text-left shadow-soft"
                            >
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-soil text-sm font-bold text-white">
                                {vendor.name
                                  .split(" ")
                                  .slice(0, 2)
                                  .map((word) => word[0])
                                  .join("")}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <p className="text-sm font-semibold text-ink">{vendor.name}</p>
                                  <Chip tone={vendor.isActiveToday ? "green" : "amber"}>
                                    {vendor.isActiveToday ? "Active" : "Offline"}
                                  </Chip>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {getTopItems(vendor).map((product) => (
                                    <span
                                      key={product.id}
                                      className="rounded-full border border-clay bg-mist px-3 py-1 text-xs font-medium text-ink/75"
                                    >
                                      {produceEmojiMap[normalizeProduceName(product.name)] ?? "🥬"} {product.name}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      ) : null}

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">Vendors</p>
            <div className="mt-3">
              <select
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value as SortOption)}
                className="cursor-pointer rounded-2xl border border-clay bg-[#fffaf0] px-4 py-2.5 text-sm font-medium text-ink outline-none"
              >
                <option value="default">Default order</option>
                <option value="open-first">Open now first</option>
                <option value="a-z">A → Z</option>
                <option value="most-produce">Most produce</option>
              </select>
            </div>
            <h2 className="mt-1 text-xl font-semibold text-ink">
              {normalizedQuery
                ? `${sortedVendors.length} vendor${sortedVendors.length === 1 ? "" : "s"} matching your search`
                : `${sortedVendors.length} vendor${sortedVendors.length === 1 ? "" : "s"} at this market`}
            </h2>
          </div>
        </div>
        {sortedVendors.length > 0 ? (
          <div className="grid gap-3">
            {sortedVendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                cardId={`vendor-card-${vendor.id}`}
                highlighted={highlightedVendorId === vendor.id}
                from={regionType}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-clay bg-[#fffaf0] p-8 text-center shadow-soft">
            <div className="text-4xl">🌿</div>
            <h3 className="mt-4 text-lg font-semibold text-ink">No vendors found</h3>
            <p className="mt-2 text-sm text-ink/65">Try a different search or clear your filters.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-2xl bg-leaf px-5 py-2.5 text-sm font-semibold text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <Link
        href="/auth"
        className="flex w-full items-center justify-between rounded-[1.75rem] border border-clay bg-[#f0b35a] px-4 py-4 text-ink shadow-soft sm:rounded-[2rem] sm:px-5 sm:py-5"
      >
        <div>
          <p className="text-base font-semibold sm:text-lg">{vendorBannerTitle}</p>
          <p className="mt-1 text-sm text-ink/75">{vendorBannerCopy}</p>
        </div>
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
