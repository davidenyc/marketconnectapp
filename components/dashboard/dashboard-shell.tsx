"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { mockVendors } from "@/lib/data/mock";
import { Vendor } from "@/lib/types";
import { saveVendorProfile } from "@/app/dashboard/actions";
import { LogoutButton } from "@/components/dashboard/logout-button";
import { PhotoUpload } from "@/components/dashboard/photo-upload";
import { slugify, stockLabel } from "@/lib/utils";
import { validateVendorPayload, type ValidationErrors } from "@/lib/validation";

type DashboardShellProps = {
  initialVendor?: Vendor | null;
  authEnabled: boolean;
};

const emptyVendor: Vendor = {
  id: "draft-vendor",
  slug: "new-vendor",
  name: "",
  profilePhotoUrl: null,
  description: "",
  isActiveToday: false,
  coverageArea: "",
  phone: null,
  location: {
    id: "draft-location",
    vendorId: "draft-vendor",
    latitude: 14.5995,
    longitude: 120.9842,
    placeLabel: "",
    updatedAt: new Date().toISOString()
  },
  products: []
};

export function DashboardShell({ initialVendor, authEnabled }: DashboardShellProps) {
  const router = useRouter();
  const [vendor, setVendor] = useState<Vendor>(
    initialVendor ?? (authEnabled ? emptyVendor : mockVendors[0] ?? emptyVendor)
  );
  const [notice, setNotice] = useState(
    authEnabled
      ? initialVendor
        ? "Your vendor profile is loaded from Supabase."
        : "No vendor profile found yet. Fill this out and save to create one."
      : "Supabase env vars are not configured. You can explore the dashboard in demo mode."
  );
  const [isSaving, setIsSaving] = useState(false);
  const [deletedProductIds, setDeletedProductIds] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});

  function updateField<Key extends keyof Vendor>(key: Key, value: Vendor[Key]) {
    setVendor((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[key as string];
      return next;
    });
    setNotice("Changes updated locally.");
  }

  function updateLocation(field: "placeLabel" | "latitude" | "longitude", value: string) {
    setVendor((current) => ({
      ...current,
      location: {
        ...current.location,
        [field]: field === "placeLabel" ? value : Number(value),
        updatedAt: new Date().toISOString()
      }
    }));
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
    setNotice("Location updated locally.");
  }

  function updateProduct(productId: string, field: "name" | "price" | "quantityAvailable" | "unit", value: string) {
    setVendor((current) => ({
      ...current,
      products: current.products.map((product) =>
        product.id === productId
          ? {
              ...product,
              [field]: field === "name" || field === "unit" ? value : Number(value),
              stockStatus:
                field === "quantityAvailable"
                  ? Number(value) <= 0
                    ? "out_of_stock"
                    : Number(value) < 6
                      ? "low_stock"
                      : "in_stock"
                  : product.stockStatus
            }
          : product
      )
    }));
    const errorKey = `products.${vendor.products.findIndex((product) => product.id === productId)}.${field}`;
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[errorKey];
      delete next.products;
      return next;
    });
    setNotice("Produce updated locally.");
  }

  function addProduct() {
    setVendor((current) => ({
      ...current,
      products: [
        ...current.products,
        {
          id: `temp-${Date.now()}`,
          vendorId: current.id,
          name: "New produce",
          price: 0,
          quantityAvailable: 0,
          unit: "kg",
          stockStatus: "out_of_stock"
        }
      ]
    }));
    setFieldErrors((current) => {
      const next = { ...current };
      delete next.products;
      return next;
    });
    setNotice("New produce row added.");
  }

  function removeProduct(productId: string) {
    if (!productId.startsWith("temp-")) {
      setDeletedProductIds((current) => [...current, productId]);
    }

    setVendor((current) => ({
      ...current,
      products: current.products.filter((product) => product.id !== productId)
    }));
    setFieldErrors((current) => {
      const next = { ...current };
      delete next.products;
      return next;
    });
    setNotice("Produce removed locally.");
  }

  async function saveAllChanges() {
    if (!authEnabled) {
      setNotice("Supabase env vars are not configured. Changes remain in local demo mode.");
      return;
    }

    const clientErrors = validateVendorPayload({
      vendorId: vendor.id,
      slug: vendor.slug,
      name: vendor.name,
      description: vendor.description,
      coverageArea: vendor.coverageArea,
      phone: vendor.phone,
      profilePhotoUrl: vendor.profilePhotoUrl,
      isActiveToday: vendor.isActiveToday,
      location: {
        id: vendor.location.id,
        placeLabel: vendor.location.placeLabel,
        latitude: vendor.location.latitude,
        longitude: vendor.location.longitude
      },
      products: vendor.products,
      deletedProductIds
    });

    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setNotice("Please fix the highlighted fields.");
      return;
    }

    setIsSaving(true);
    const result = await saveVendorProfile({
      vendorId: vendor.id,
      slug: vendor.slug,
      name: vendor.name,
      description: vendor.description,
      coverageArea: vendor.coverageArea,
      phone: vendor.phone,
      profilePhotoUrl: vendor.profilePhotoUrl,
      isActiveToday: vendor.isActiveToday,
      location: {
        id: vendor.location.id,
        placeLabel: vendor.location.placeLabel,
        latitude: vendor.location.latitude,
        longitude: vendor.location.longitude
      },
      products: vendor.products,
      deletedProductIds
    });

    startTransition(() => {
      setNotice(result.message);
      setFieldErrors(result.fieldErrors ?? {});
      if (result.success) {
        setDeletedProductIds([]);
        router.refresh();
      }
      setIsSaving(false);
    });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-4 rounded-[2rem] border border-clay bg-[#fffaf0] p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-ink">Vendor dashboard</h1>
            <p className="text-sm text-ink/65">Quick daily updates for profile, stock, and current location.</p>
          </div>
          <div className="flex gap-2">
            {authEnabled ? <LogoutButton /> : null}
            <button
              type="button"
              onClick={() => updateField("isActiveToday", !vendor.isActiveToday)}
              className={`rounded-2xl px-5 py-4 text-sm font-semibold text-white ${
                vendor.isActiveToday ? "bg-leaf" : "bg-soil"
              }`}
            >
              {vendor.isActiveToday ? "Mark inactive" : "Mark active today"}
            </button>
            <button
              type="button"
              onClick={() => void saveAllChanges()}
              disabled={isSaving}
              className="rounded-2xl bg-ink px-5 py-4 text-sm font-semibold text-white disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>

        <PhotoUpload
          authEnabled={authEnabled}
          vendorId={vendor.id}
          photoUrl={vendor.profilePhotoUrl}
          error={fieldErrors.profilePhotoUrl}
          onUploaded={(url, message) => {
            if (url !== undefined) {
              updateField("profilePhotoUrl", url);
            }
            setNotice(message);
          }}
        />

        <div className="grid gap-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-ink">Vendor name</span>
            <input
              value={vendor.name}
              onChange={(event) => updateField("name", event.target.value)}
              className={`w-full rounded-2xl bg-white px-4 py-4 ${fieldErrors.name ? "border border-red-400" : "border border-clay"}`}
            />
            {fieldErrors.name ? <span className="mt-2 block text-sm text-red-600">{fieldErrors.name}</span> : null}
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-ink">Short description</span>
            <textarea
              value={vendor.description}
              onChange={(event) => updateField("description", event.target.value)}
              className={`min-h-28 w-full rounded-2xl bg-white px-4 py-4 ${fieldErrors.description ? "border border-red-400" : "border border-clay"}`}
            />
            {fieldErrors.description ? <span className="mt-2 block text-sm text-red-600">{fieldErrors.description}</span> : null}
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-ink">Coverage area</span>
            <input
              value={vendor.coverageArea}
              onChange={(event) => updateField("coverageArea", event.target.value)}
              className={`w-full rounded-2xl bg-white px-4 py-4 ${fieldErrors.coverageArea ? "border border-red-400" : "border border-clay"}`}
            />
            {fieldErrors.coverageArea ? <span className="mt-2 block text-sm text-red-600">{fieldErrors.coverageArea}</span> : null}
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-ink">Phone</span>
            <input
              value={vendor.phone ?? ""}
              onChange={(event) => updateField("phone", event.target.value)}
              className={`w-full rounded-2xl bg-white px-4 py-4 ${fieldErrors.phone ? "border border-red-400" : "border border-clay"}`}
              placeholder="+84 93 555 2109"
            />
            {fieldErrors.phone ? <span className="mt-2 block text-sm text-red-600">{fieldErrors.phone}</span> : null}
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-ink">Public profile slug</span>
            <input
              value={vendor.slug}
              onChange={(event) => updateField("slug", slugify(event.target.value))}
              className={`w-full rounded-2xl bg-white px-4 py-4 ${fieldErrors.slug ? "border border-red-400" : "border border-clay"}`}
              placeholder="my-market-stall"
            />
            {fieldErrors.slug ? <span className="mt-2 block text-sm text-red-600">{fieldErrors.slug}</span> : null}
          </label>
        </div>
      </section>

      <aside className="space-y-4">
        <section className="rounded-[2rem] border border-clay bg-[#fffaf0] p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-ink">Current location</h2>
          <div className="mt-4 grid gap-3">
            <input
              value={vendor.location.placeLabel}
              onChange={(event) => updateLocation("placeLabel", event.target.value)}
              className={`w-full rounded-2xl bg-white px-4 py-4 ${fieldErrors.placeLabel ? "border border-red-400" : "border border-clay"}`}
              placeholder="Current location label"
            />
            {fieldErrors.placeLabel ? <span className="text-sm text-red-600">{fieldErrors.placeLabel}</span> : null}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  step="any"
                  value={vendor.location.latitude}
                  onChange={(event) => updateLocation("latitude", event.target.value)}
                  className={`w-full rounded-2xl bg-white px-4 py-4 ${fieldErrors.latitude ? "border border-red-400" : "border border-clay"}`}
                  placeholder="Latitude"
                />
                {fieldErrors.latitude ? <span className="mt-2 block text-sm text-red-600">{fieldErrors.latitude}</span> : null}
              </div>
              <div>
                <input
                  type="number"
                  step="any"
                  value={vendor.location.longitude}
                  onChange={(event) => updateLocation("longitude", event.target.value)}
                  className={`w-full rounded-2xl bg-white px-4 py-4 ${fieldErrors.longitude ? "border border-red-400" : "border border-clay"}`}
                  placeholder="Longitude"
                />
                {fieldErrors.longitude ? <span className="mt-2 block text-sm text-red-600">{fieldErrors.longitude}</span> : null}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-clay bg-[#fffaf0] p-5 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-ink">Produce listings</h2>
            <button type="button" onClick={addProduct} className="rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white">
              Add produce
            </button>
          </div>
          {fieldErrors.products ? <p className="mt-3 text-sm text-red-600">{fieldErrors.products}</p> : null}
          <div className="mt-4 space-y-4">
            {vendor.products.map((product, index) => (
              <div key={product.id} className="rounded-3xl border border-clay bg-white p-4">
                <div className="grid gap-3">
                  <input
                    value={product.name}
                    onChange={(event) => updateProduct(product.id, "name", event.target.value)}
                    className={`w-full rounded-2xl bg-mist px-4 py-4 ${fieldErrors[`products.${index}.name`] ? "border border-red-400" : "border border-clay"}`}
                    placeholder="Product name"
                  />
                  {fieldErrors[`products.${index}.name`] ? (
                    <span className="text-sm text-red-600">{fieldErrors[`products.${index}.name`]}</span>
                  ) : null}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <input
                        type="number"
                        step="0.01"
                        value={product.price}
                        onChange={(event) => updateProduct(product.id, "price", event.target.value)}
                        className={`w-full rounded-2xl bg-mist px-4 py-4 ${fieldErrors[`products.${index}.price`] ? "border border-red-400" : "border border-clay"}`}
                        placeholder="Price"
                      />
                      {fieldErrors[`products.${index}.price`] ? (
                        <span className="mt-2 block text-sm text-red-600">{fieldErrors[`products.${index}.price`]}</span>
                      ) : null}
                    </div>
                    <div>
                      <input
                        type="number"
                        value={product.quantityAvailable}
                        onChange={(event) => updateProduct(product.id, "quantityAvailable", event.target.value)}
                        className={`w-full rounded-2xl bg-mist px-4 py-4 ${fieldErrors[`products.${index}.quantityAvailable`] ? "border border-red-400" : "border border-clay"}`}
                        placeholder="Qty"
                      />
                      {fieldErrors[`products.${index}.quantityAvailable`] ? (
                        <span className="mt-2 block text-sm text-red-600">{fieldErrors[`products.${index}.quantityAvailable`]}</span>
                      ) : null}
                    </div>
                    <div>
                      <input
                        value={product.unit}
                        onChange={(event) => updateProduct(product.id, "unit", event.target.value)}
                        className={`w-full rounded-2xl bg-mist px-4 py-4 ${fieldErrors[`products.${index}.unit`] ? "border border-red-400" : "border border-clay"}`}
                        placeholder="Unit"
                      />
                      {fieldErrors[`products.${index}.unit`] ? (
                        <span className="mt-2 block text-sm text-red-600">{fieldErrors[`products.${index}.unit`]}</span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-ink/65">{stockLabel(product.quantityAvailable)}</span>
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className="rounded-2xl border border-clay px-4 py-2 text-sm font-semibold text-ink"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-clay bg-mist px-4 py-4 text-sm text-ink/75 shadow-soft">
          <p>{notice}</p>
        </section>
      </aside>
    </div>
  );
}
