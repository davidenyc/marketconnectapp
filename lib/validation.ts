import { type SaveVendorPayload } from "@/lib/types";

export type ValidationErrors = Record<string, string>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+0-9()\-\s]{7,20}$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateEmail(email: string) {
  const normalized = email.trim();

  if (!normalized) return "Email is required.";
  if (!emailPattern.test(normalized)) return "Enter a valid email address.";
  return null;
}

export function validatePassword(password: string, mode: "login" | "signup") {
  if (!password) return "Password is required.";
  if (mode === "signup" && password.length < 8) return "Password must be at least 8 characters.";
  return null;
}

export function validateVendorPayload(payload: SaveVendorPayload): ValidationErrors {
  const errors: ValidationErrors = {};
  const slug = payload.slug.trim();
  const validProducts = payload.products.filter((product) => product.name.trim().length > 0);

  if (!payload.name.trim()) {
    errors.name = "Vendor name is required.";
  } else if (payload.name.trim().length < 3) {
    errors.name = "Vendor name must be at least 3 characters.";
  }

  if (!payload.description.trim()) {
    errors.description = "Short description is required.";
  } else if (payload.description.trim().length < 12) {
    errors.description = "Description should be at least 12 characters.";
  }

  if (!payload.coverageArea.trim()) {
    errors.coverageArea = "Coverage area is required.";
  }

  if (!slug) {
    errors.slug = "Public profile slug is required.";
  } else if (!slugPattern.test(slug)) {
    errors.slug = "Slug can use lowercase letters, numbers, and hyphens only.";
  }

  if (payload.phone?.trim() && !phonePattern.test(payload.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!payload.location.placeLabel.trim()) {
    errors.placeLabel = "Current location label is required.";
  }

  if (!Number.isFinite(payload.location.latitude) || payload.location.latitude < -90 || payload.location.latitude > 90) {
    errors.latitude = "Latitude must be between -90 and 90.";
  }

  if (!Number.isFinite(payload.location.longitude) || payload.location.longitude < -180 || payload.location.longitude > 180) {
    errors.longitude = "Longitude must be between -180 and 180.";
  }

  if (payload.profilePhotoUrl) {
    try {
      new URL(payload.profilePhotoUrl);
    } catch {
      errors.profilePhotoUrl = "Photo URL is invalid.";
    }
  }

  if (validProducts.length === 0) {
    errors.products = "Add at least one produce listing.";
  }

  payload.products.forEach((product, index) => {
    const base = `products.${index}`;

    if (!product.name.trim()) {
      errors[`${base}.name`] = "Product name is required.";
    }

    if (!Number.isFinite(product.price) || product.price < 0) {
      errors[`${base}.price`] = "Price must be 0 or more.";
    }

    if (!Number.isInteger(product.quantityAvailable) || product.quantityAvailable < 0) {
      errors[`${base}.quantityAvailable`] = "Quantity must be a whole number 0 or more.";
    }

    if (!product.unit.trim()) {
      errors[`${base}.unit`] = "Unit is required.";
    }
  });

  return errors;
}
