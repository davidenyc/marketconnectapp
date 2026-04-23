export type Product = {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  quantityAvailable: number;
  unit: string;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
};

export type VendorLocation = {
  id: string;
  vendorId: string;
  latitude: number;
  longitude: number;
  placeLabel: string;
  updatedAt: string;
};

export type Vendor = {
  id: string;
  name: string;
  slug: string;
  profilePhotoUrl?: string | null;
  description: string;
  isActiveToday: boolean;
  coverageArea: string;
  phone?: string | null;
  products: Product[];
  location: VendorLocation;
};

export type DashboardVendorForm = {
  name: string;
  description: string;
  coverageArea: string;
  isActiveToday: boolean;
  placeLabel: string;
  latitude: number;
  longitude: number;
};

export type DashboardProductInput = {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  quantityAvailable: number;
  unit: string;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
};

export type SaveVendorPayload = {
  vendorId: string;
  slug: string;
  name: string;
  description: string;
  coverageArea: string;
  phone?: string | null;
  profilePhotoUrl?: string | null;
  isActiveToday: boolean;
  location: {
    id: string;
    placeLabel: string;
    latitude: number;
    longitude: number;
  };
  products: DashboardProductInput[];
  deletedProductIds: string[];
};

export type ActionResult = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};
