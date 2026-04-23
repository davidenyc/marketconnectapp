"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import Link from "next/link";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/mapbox";
import { MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { Vendor } from "@/lib/types";
import { Chip } from "@/components/ui/chip";

type VendorMapProps = {
  vendors: Vendor[];
};

const defaultCenter = {
  latitude: 14.5995,
  longitude: 120.9842,
  zoom: 3.2
};

export function VendorMap({ vendors }: VendorMapProps) {
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(vendors[0]?.id ?? null);
  const selectedVendor = useMemo(
    () => vendors.find((vendor) => vendor.id === selectedVendorId) ?? null,
    [selectedVendorId, vendors]
  );

  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  if (!token) {
    return (
      <div className="rounded-[2rem] border border-dashed border-clay bg-[#fffaf0] p-5 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay">
            <MapPin className="h-5 w-5 text-ink" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">Map ready</h2>
            <p className="text-sm text-ink/70">Add a Mapbox token to enable the live interactive map.</p>
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          {vendors.map((vendor) => (
            <Link key={vendor.id} href={`/vendors/${vendor.slug}`} className="rounded-2xl border border-clay bg-mist p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-ink">{vendor.name}</span>
                <Chip tone={vendor.isActiveToday ? "green" : "amber"}>
                  {vendor.isActiveToday ? "Active" : "Offline"}
                </Chip>
              </div>
              <p className="mt-2 text-sm text-ink/70">{vendor.location.placeLabel}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-clay bg-white shadow-soft">
      <Map
        initialViewState={{
          latitude: selectedVendor?.location.latitude ?? defaultCenter.latitude,
          longitude: selectedVendor?.location.longitude ?? defaultCenter.longitude,
          zoom: selectedVendor ? 11 : defaultCenter.zoom
        }}
        mapboxAccessToken={token}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: "100%", height: 420 }}
      >
        <NavigationControl position="top-right" />
        {vendors.map((vendor) => (
          <Marker key={vendor.id} latitude={vendor.location.latitude} longitude={vendor.location.longitude} anchor="bottom">
            <button
              type="button"
              onClick={() => setSelectedVendorId(vendor.id)}
              className="rounded-full border-2 border-white bg-leaf p-2 text-white shadow-lg"
              aria-label={`Open details for ${vendor.name}`}
            >
              <MapPin className="h-5 w-5" />
            </button>
          </Marker>
        ))}

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
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-ink">{selectedVendor.name}</h3>
                <Chip tone={selectedVendor.isActiveToday ? "green" : "amber"}>
                  {selectedVendor.isActiveToday ? "Today" : "Away"}
                </Chip>
              </div>
              <p className="mt-2 text-sm text-ink/70">{selectedVendor.location.placeLabel}</p>
              <p className="mt-2 text-sm text-ink/70">{selectedVendor.products.length} produce listing(s)</p>
            </Link>
          </Popup>
        ) : null}
      </Map>
    </div>
  );
}
