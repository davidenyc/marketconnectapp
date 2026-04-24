"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import Link from "next/link";
import Map, { Marker, NavigationControl, Popup, type MapRef } from "react-map-gl/mapbox";
import { Loader2, LocateFixed, MapPin, Store } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Market, Vendor } from "@/lib/types";
import { formatCurrency, formatDistanceKm, haversineDistanceKm } from "@/lib/utils";
import { Chip } from "@/components/ui/chip";
import { produceEmojiMap } from "@/lib/data/mock";

type VendorMapProps = {
  vendors: Vendor[];
  markets: Market[];
};

type UserLocation = {
  latitude: number;
  longitude: number;
};

type MarketStyle = {
  ring: string;
  border: string;
  dot: string;
  chip: string;
};

const radiusOptions = [
  { label: "All", value: "all" as const },
  { label: "< 1 km", value: 1 as const },
  { label: "< 5 km", value: 5 as const },
  { label: "< 10 km", value: 10 as const }
];

const marketStyles: Record<string, MarketStyle> = {
  "market-union-square": {
    ring: "ring-violet-300",
    border: "border-violet-400",
    dot: "bg-violet-500",
    chip: "border-violet-200 bg-violet-50 text-violet-700"
  },
  "market-st-georges-market": {
    ring: "ring-rose-300",
    border: "border-rose-400",
    dot: "bg-rose-500",
    chip: "border-rose-200 bg-rose-50 text-rose-700"
  },
  "market-grand-anse-farmers-market": {
    ring: "ring-emerald-300",
    border: "border-emerald-400",
    dot: "bg-emerald-500",
    chip: "border-emerald-200 bg-emerald-50 text-emerald-700"
  },
  "market-grenville-weekend-market": {
    ring: "ring-sky-300",
    border: "border-sky-400",
    dot: "bg-sky-500",
    chip: "border-sky-200 bg-sky-50 text-sky-700"
  }
};

const defaultMarketStyle: MarketStyle = {
  ring: "ring-amber-300",
  border: "border-amber-400",
  dot: "bg-amber-500",
  chip: "border-amber-200 bg-amber-50 text-amber-700"
};

const defaultMapCenter = {
  latitude: 40.7359,
  longitude: -73.9911,
  zoom: 15.5
};

const nycView = {
  latitude: 40.7359,
  longitude: -73.9911,
  zoom: 15.5
};

const grenadaView = {
  latitude: 12.0527,
  longitude: -61.7484,
  zoom: 11
};

function formatOpenDays(days: string[]) {
  return days
    .map((day) => day.slice(0, 3))
    .join(" · ");
}

function getMarketStyle(marketId?: string | null) {
  if (!marketId) {
    return defaultMarketStyle;
  }

  return marketStyles[marketId] ?? defaultMarketStyle;
}

export function VendorMap({ vendors, markets }: VendorMapProps) {
  const mapRef = useRef<MapRef | null>(null);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(vendors[0]?.id ?? null);
  const [selectedMarketId, setSelectedMarketId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<(typeof radiusOptions)[number]["value"]>("all");
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [mapHeight, setMapHeight] = useState(420);

  const vendorsWithDistance = useMemo(
    () =>
      vendors.map((vendor) => ({
        vendor,
        distanceKm: userLocation
          ? haversineDistanceKm(userLocation, {
              latitude: vendor.location.latitude,
              longitude: vendor.location.longitude
            })
          : null
      })),
    [userLocation, vendors]
  );

  const filteredVendors = useMemo(() => {
    if (!userLocation || selectedRadius === "all") {
      return vendorsWithDistance;
    }

    return vendorsWithDistance.filter((entry) => entry.distanceKm !== null && entry.distanceKm < selectedRadius);
  }, [selectedRadius, userLocation, vendorsWithDistance]);

  const selectedVendor = useMemo(
    () => filteredVendors.find((entry) => entry.vendor.id === selectedVendorId)?.vendor ?? null,
    [filteredVendors, selectedVendorId]
  );

  const selectedMarket = useMemo(
    () => markets.find((market) => market.id === selectedMarketId) ?? null,
    [markets, selectedMarketId]
  );

  const vendorsByMarket = useMemo(
    () =>
      markets.map((market) => ({
        market,
        vendors: filteredVendors
          .filter((entry) => entry.vendor.marketId === market.id)
          .map((entry) => ({ vendor: entry.vendor, distanceKm: entry.distanceKm }))
      })),
    [filteredVendors, markets]
  );

  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const activeRegion = useMemo(() => {
    const hasGrenadaVendors = filteredVendors.some((entry) => entry.vendor.marketId?.startsWith("market-st-georges") || entry.vendor.marketId?.startsWith("market-grand-anse") || entry.vendor.marketId?.startsWith("market-grenville"));
    return hasGrenadaVendors ? "grenada" : "nyc";
  }, [filteredVendors]);

  useEffect(() => {
    if (!filteredVendors.some((entry) => entry.vendor.id === selectedVendorId)) {
      setSelectedVendorId(filteredVendors[0]?.vendor.id ?? null);
    }
  }, [filteredVendors, selectedVendorId]);

  useEffect(() => {
    function updateMapHeight() {
      setMapHeight(window.innerWidth < 640 ? 280 : 420);
    }

    updateMapHeight();
    window.addEventListener("resize", updateMapHeight);
    return () => window.removeEventListener("resize", updateMapHeight);
  }, []);

  function flyToPosition(position: UserLocation, zoom = 13, duration = 1400) {
    mapRef.current?.flyTo({
      center: [position.longitude, position.latitude],
      zoom,
      duration
    });
  }

  function flyToVendor(vendor: Vendor) {
    mapRef.current?.flyTo({
      center: [vendor.location.longitude, vendor.location.latitude],
      zoom: 13,
      duration: 1000
    });
  }

  function handleUseMyLocation() {
    if (!navigator.geolocation) {
      setLocationError("Location is not available on this device.");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        setUserLocation(nextLocation);
        setIsLocating(false);
        flyToPosition(nextLocation);
      },
      () => {
        setIsLocating(false);
        setLocationError("We couldn’t get your location. Check browser permissions and try again.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000
      }
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-clay bg-white shadow-soft sm:rounded-[2rem]">
      <div className="border-b border-clay bg-[#fffaf0] p-3 sm:p-4">
        <div className="flex flex-wrap gap-2">
          {radiusOptions.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => setSelectedRadius(option.value)}
              className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition sm:py-2 ${
                selectedRadius === option.value
                  ? "border-leaf bg-leaf text-white"
                  : "border-clay bg-white text-ink"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="inline-flex items-center gap-2 rounded-2xl border border-clay bg-white px-3 py-2.5 text-sm font-semibold text-ink disabled:opacity-60 sm:px-4 sm:py-3"
          >
            {isLocating ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
            {isLocating ? "Finding you..." : "Use my location"}
          </button>
          {userLocation ? (
            <span className="text-sm text-ink/70">
              Showing {filteredVendors.length} nearby vendor{filteredVendors.length === 1 ? "" : "s"}
            </span>
          ) : (
            <span className="text-sm text-ink/70">Enable location to filter by nearby distance.</span>
          )}
        </div>
        {locationError ? <p className="mt-2 text-sm text-red-600">{locationError}</p> : null}
      </div>

      {token ? (
        <div className="relative">
          <div className="absolute left-3 top-3 z-10 flex gap-2">
            <button
              type="button"
              onClick={() => flyToPosition(nycView, nycView.zoom, 1200)}
              className={`rounded-full border bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-soft backdrop-blur transition ${
                activeRegion === "nyc" ? "border-leaf bg-leaf/10 text-leaf" : "border-clay text-ink"
              }`}
            >
              🗽 NYC
            </button>
            <button
              type="button"
              onClick={() => flyToPosition(grenadaView, grenadaView.zoom, 1200)}
              className={`rounded-full border bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-soft backdrop-blur transition ${
                activeRegion === "grenada" ? "border-leaf bg-leaf/10 text-leaf" : "border-clay text-ink"
              }`}
            >
              🇬🇩 Grenada
            </button>
          </div>

          <Map
            ref={mapRef}
            initialViewState={{
              latitude: vendors[0]?.location.latitude ?? defaultMapCenter.latitude,
              longitude: vendors[0]?.location.longitude ?? defaultMapCenter.longitude,
              zoom: vendors.length ? 15.5 : defaultMapCenter.zoom
            }}
            mapboxAccessToken={token}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            style={{ width: "100%", height: mapHeight }}
          >
            <NavigationControl position="top-right" />

            {userLocation ? (
              <Marker latitude={userLocation.latitude} longitude={userLocation.longitude} anchor="center">
                <div className="relative h-5 w-5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-sky-400/40" />
                  <span className="absolute inset-[3px] rounded-full border-2 border-white bg-sky-500" />
                </div>
              </Marker>
            ) : null}

            {vendorsByMarket.map(({ market, vendors: marketVendors }) => {
              const style = getMarketStyle(market.id);

              return (
                <Marker key={market.id} latitude={market.location.latitude} longitude={market.location.longitude} anchor="bottom">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMarketId(market.id);
                      setSelectedVendorId(null);
                    }}
                    className={`relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-white text-white shadow-lg ring-4 ${style.ring} ${
                      marketVendors.length === 0 ? "bg-slate-300 opacity-60" : "bg-orange-500"
                    }`}
                    aria-label={`Open details for ${market.name}`}
                  >
                    <Store className="h-6 w-6" />
                    <span className={`absolute right-1 top-1 h-3 w-3 rounded-full border border-white ${style.dot}`} />
                    <span className="absolute -bottom-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-bold text-black shadow">
                      {marketVendors.length}
                    </span>
                  </button>
                </Marker>
              );
            })}

            {filteredVendors.map(({ vendor }) => {
              const style = getMarketStyle(vendor.marketId);
              const isSelected = vendor.id === selectedVendorId;

              return (
                <Marker key={vendor.id} latitude={vendor.location.latitude} longitude={vendor.location.longitude} anchor="bottom">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVendorId(vendor.id);
                      setSelectedMarketId(null);
                    }}
                    className={`relative flex h-11 w-11 rotate-45 items-center justify-center rounded-[999px_999px_999px_0] border-2 border-white text-white shadow-lg ring-2 ${
                      vendor.isActiveToday ? "bg-leaf" : "bg-slate-400"
                    } ${style.ring} ${isSelected ? "scale-110" : ""}`}
                    aria-label={`Open details for ${vendor.name}`}
                  >
                    <MapPin className="-rotate-45 h-4 w-4" />
                    <span className={`absolute -right-0.5 -top-0.5 h-3.5 w-3.5 -rotate-45 rounded-full border border-white ${style.dot}`} />
                  </button>
                </Marker>
              );
            })}

            {selectedVendor ? (
              <Popup
                anchor="top"
                latitude={selectedVendor.location.latitude}
                longitude={selectedVendor.location.longitude}
                onClose={() => setSelectedVendorId(null)}
                closeButton
                maxWidth="260px"
              >
                <Link href={`/vendors/${selectedVendor.slug}`} className="block p-4">
                  {(() => {
                    const topProduct = selectedVendor.products.find((product) => product.stockStatus !== "out_of_stock");
                    const normalizedProductName = topProduct?.name.trim().toLowerCase() ?? "";
                    const currencyCode = selectedVendor.currencyCode ?? "USD";

                    return (
                      <>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-ink">{selectedVendor.name}</h3>
                    <Chip tone={selectedVendor.isActiveToday ? "green" : "amber"}>
                      {selectedVendor.isActiveToday ? "Today" : "Away"}
                    </Chip>
                  </div>
                  <p className="mt-2 text-sm text-ink/70">{selectedVendor.location.placeLabel}</p>
                  {topProduct ? (
                    <p className="mt-2 text-sm text-ink/70">
                      {produceEmojiMap[normalizedProductName] ?? "🥬"} {topProduct.name} · {formatCurrency(topProduct.price, currencyCode)}/{topProduct.unit}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm text-ink/70">{selectedVendor.products.length} produce listing(s)</p>
                  {userLocation ? (
                    <p className="mt-2 text-sm font-medium text-leaf">
                      {formatDistanceKm(
                        haversineDistanceKm(userLocation, {
                          latitude: selectedVendor.location.latitude,
                          longitude: selectedVendor.location.longitude
                        })
                      )}
                    </p>
                  ) : null}
                      </>
                    );
                  })()}
                </Link>
              </Popup>
            ) : null}

            {selectedMarket ? (
              <Popup
                anchor="top"
                latitude={selectedMarket.location.latitude}
                longitude={selectedMarket.location.longitude}
                onClose={() => setSelectedMarketId(null)}
                closeButton
                maxWidth="300px"
              >
                <div className="p-4">
                  <h3 className="text-base font-semibold text-ink">{selectedMarket.name}</h3>
                  <p className="mt-1 text-sm text-ink/70">
                    {selectedMarket.openTime} - {selectedMarket.closeTime}
                  </p>
                  <p className="mt-1 text-sm text-ink/70">{formatOpenDays(selectedMarket.openDays)}</p>
                  <p className="mt-1 text-sm text-ink/70">{selectedMarket.coverageArea}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {vendorsByMarket
                      .find((entry) => entry.market.id === selectedMarket.id)
                      ?.vendors.map(({ vendor }) => {
                        const style = getMarketStyle(vendor.marketId);

                        return (
                          <button
                            key={vendor.id}
                            type="button"
                            onClick={() => {
                              setSelectedVendorId(vendor.id);
                              setSelectedMarketId(null);
                              flyToVendor(vendor);
                            }}
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${style.chip}`}
                          >
                            {vendor.name}
                          </button>
                        );
                      })}
                  </div>
                </div>
              </Popup>
            ) : null}
          </Map>

          <div className="pointer-events-none absolute bottom-3 left-3 rounded-2xl border border-clay bg-white/95 p-2.5 shadow-soft sm:p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">Legend</p>
            <div className="mt-2 space-y-2 text-xs text-ink/75">
              <div className="flex items-center gap-2">
                <span className="block h-4 w-4 rotate-45 rounded-[999px_999px_999px_0] bg-leaf" />
                <span>Active vendor</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="block h-4 w-4 rotate-45 rounded-[999px_999px_999px_0] bg-slate-400" />
                <span>Inactive vendor</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
                  <Store className="h-3 w-3" />
                </span>
                <span>Market hub</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-sky-500" />
                <span>Your location</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-b border-clay bg-[#fffaf0] p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay">
              <MapPin className="h-5 w-5 text-ink" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink">Map ready</h2>
              <p className="text-sm text-ink/70">Add a Mapbox token to enable the live interactive map.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-2.5 p-3 sm:gap-3 sm:p-4">
        {filteredVendors.length > 0 ? (
          filteredVendors.map(({ vendor, distanceKm }) => (
            <Link key={vendor.id} href={`/vendors/${vendor.slug}`} className="rounded-2xl border border-clay bg-mist p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-ink sm:text-base">{vendor.name}</span>
                <Chip tone={vendor.isActiveToday ? "green" : "amber"}>
                  {vendor.isActiveToday ? "Active" : "Offline"}
                </Chip>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${getMarketStyle(vendor.marketId).dot}`} />
                <p className="text-xs text-ink/70 sm:text-sm">{vendor.location.placeLabel}</p>
              </div>
              {distanceKm !== null ? <p className="mt-2 text-sm font-medium text-leaf">{formatDistanceKm(distanceKm)}</p> : null}
            </Link>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-clay bg-[#fffaf0] p-4 text-sm text-ink/70">
            No vendors found for this distance yet. Try a wider radius.
          </div>
        )}
      </div>
    </div>
  );
}
