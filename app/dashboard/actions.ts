"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { type ActionResult, type SaveVendorPayload } from "@/lib/types";
import { validateVendorPayload } from "@/lib/validation";

function sanitizeProduct(product: SaveVendorPayload["products"][number]) {
  const quantity = Number(product.quantityAvailable);

  return {
    id: product.id.startsWith("temp-") ? undefined : product.id,
    name: product.name.trim(),
    price: Number(product.price),
    quantity_available: quantity,
    unit: product.unit.trim() || "kg",
    stock_status: quantity <= 0 ? "out_of_stock" : quantity < 6 ? "low_stock" : "in_stock"
  };
}

export async function saveVendorProfile(payload: SaveVendorPayload): Promise<ActionResult> {
  try {
    const { supabase, user } = await requireUser();
    const now = new Date().toISOString();
    const vendorId = payload.vendorId.startsWith("draft-") ? crypto.randomUUID() : payload.vendorId;
    const locationId = payload.location.id.startsWith("draft-") ? crypto.randomUUID() : payload.location.id;
    const slug = slugify(payload.slug || payload.name || `vendor-${user.id.slice(0, 8)}`);
    const normalizedPayload = {
      ...payload,
      slug
    };
    const fieldErrors = validateVendorPayload(normalizedPayload);

    if (Object.keys(fieldErrors).length > 0) {
      return {
        success: false,
        message: "Please fix the highlighted fields.",
        fieldErrors
      };
    }

    const { error: userError } = await supabase.from("users").upsert({
      id: user.id,
      email: user.email ?? "",
      updated_at: now
    });

    if (userError) {
      return { success: false, message: userError.message };
    }

    const { error: vendorError } = await supabase.from("vendors").upsert({
      id: vendorId,
      user_id: user.id,
      name: normalizedPayload.name.trim() || "My Market Stall",
      slug,
      profile_photo_url: normalizedPayload.profilePhotoUrl,
      description: normalizedPayload.description.trim(),
      coverage_area: normalizedPayload.coverageArea.trim(),
      phone: normalizedPayload.phone?.trim() || null,
      is_active_today: normalizedPayload.isActiveToday,
      updated_at: now
    });

    if (vendorError) {
      return { success: false, message: vendorError.message };
    }

    const { error: locationResetError } = await supabase
      .from("vendor_locations")
      .update({ is_current: false })
      .eq("vendor_id", vendorId)
      .eq("is_current", true)
      .neq("id", locationId);

    if (locationResetError) {
      return { success: false, message: locationResetError.message };
    }

    const { error: locationError } = await supabase.from("vendor_locations").upsert({
      id: locationId,
      vendor_id: vendorId,
      latitude: normalizedPayload.location.latitude,
      longitude: normalizedPayload.location.longitude,
      place_label: normalizedPayload.location.placeLabel.trim(),
      is_current: true,
      updated_at: now
    });

    if (locationError) {
      return { success: false, message: locationError.message };
    }

    if (normalizedPayload.deletedProductIds.length > 0) {
      const { error: deleteError } = await supabase.from("products").delete().in("id", normalizedPayload.deletedProductIds);

      if (deleteError) {
        return { success: false, message: deleteError.message };
      }
    }

    const normalizedProducts = normalizedPayload.products
      .map(sanitizeProduct)
      .filter((product) => product.name.length > 0)
      .map((product) => ({
        ...product,
        vendor_id: vendorId,
        updated_at: now
      }));

    if (normalizedProducts.length > 0) {
      const existing = normalizedProducts.filter((product) => product.id);
      const fresh = normalizedProducts.filter((product) => !product.id).map(({ id, ...product }) => product);

      if (existing.length > 0) {
        const { error: existingError } = await supabase.from("products").upsert(existing);

        if (existingError) {
          return { success: false, message: existingError.message };
        }
      }

      if (fresh.length > 0) {
        const { error: freshError } = await supabase.from("products").insert(fresh);

        if (freshError) {
          return { success: false, message: freshError.message };
        }
      }
    }

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath(`/vendors/${slug}`);

    return { success: true, message: "Changes saved to Supabase." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong while saving.";
    return { success: false, message };
  }
}
