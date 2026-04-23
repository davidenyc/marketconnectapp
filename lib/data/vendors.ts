import { mockVendors } from "@/lib/data/mock";
import { grenadaMockVendors } from "@/lib/data/grenada-mock";
import { Vendor } from "@/lib/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type VendorRow = {
  id: string;
  name: string;
  slug: string;
  profile_photo_url: string | null;
  description: string;
  is_active_today: boolean;
  coverage_area: string;
  phone: string | null;
  products: Array<{
    id: string;
    vendor_id: string;
    name: string;
    price: number;
    quantity_available: number;
    unit: string;
    stock_status: "in_stock" | "low_stock" | "out_of_stock";
  }>;
  vendor_locations: Array<{
    id: string;
    vendor_id: string;
    latitude: number;
    longitude: number;
    place_label: string;
    updated_at: string;
  }>;
};

function mapVendor(row: VendorRow): Vendor {
  const location = row.vendor_locations[0];

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    marketId: null,
    currencyCode: "USD",
    profilePhotoUrl: row.profile_photo_url,
    description: row.description,
    isActiveToday: row.is_active_today,
    coverageArea: row.coverage_area,
    phone: row.phone,
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    openTime: "6:00 AM",
    closeTime: "1:00 PM",
    products: row.products.map((product) => ({
      id: product.id,
      vendorId: product.vendor_id,
      name: product.name,
      price: product.price,
      quantityAvailable: product.quantity_available,
      unit: product.unit,
      stockStatus: product.stock_status
    })),
    location: {
      id: location.id,
      vendorId: location.vendor_id,
      latitude: location.latitude,
      longitude: location.longitude,
      placeLabel: location.place_label,
      updatedAt: location.updated_at
    }
  };
}

export async function getVendors() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return mockVendors;
  }

  const { data, error } = await supabase
    .from("vendors")
    .select(
      `
        id,
        name,
        slug,
        profile_photo_url,
        description,
        is_active_today,
        coverage_area,
        phone,
        products (
          id,
          vendor_id,
          name,
          price,
          quantity_available,
          unit,
          stock_status
        ),
        vendor_locations (
          id,
          vendor_id,
          latitude,
          longitude,
          place_label,
          updated_at
        )
      `
    )
    .order("name", { ascending: true });

  if (error || !data?.length) {
    return mockVendors;
  }

  return (data as VendorRow[])
    .filter((vendor) => vendor.vendor_locations.length > 0)
    .map(mapVendor);
}

export async function getVendorBySlug(slug: string) {
  const vendors = await getVendors();
  const match = vendors.find((vendor) => vendor.slug === slug);
  if (match) {
    return match;
  }

  return grenadaMockVendors.find((vendor) => vendor.slug === slug) ?? null;
}

export async function getVendorForCurrentUser(userId: string) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("vendors")
    .select(
      `
        id,
        name,
        slug,
        profile_photo_url,
        description,
        is_active_today,
        coverage_area,
        phone,
        products (
          id,
          vendor_id,
          name,
          price,
          quantity_available,
          unit,
          stock_status
        ),
        vendor_locations (
          id,
          vendor_id,
          latitude,
          longitude,
          place_label,
          updated_at
        )
      `
    )
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (error || !data || !data.vendor_locations?.length) {
    return null;
  }

  return mapVendor(data as VendorRow);
}
