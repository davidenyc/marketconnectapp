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

export type Market = {
  id: string;
  name: string;
  slug: string;
  location: {
    latitude: number;
    longitude: number;
  };
  description: string;
  coverageArea: string;
  openDays: string[];
  openTime: string;
  closeTime: string;
  featuredItems: string[];
  vendorIds?: string[];
};

export type Vendor = {
  id: string;
  name: string;
  slug: string;
  marketId?: string | null;
  currencyCode?: string;
  profilePhotoUrl?: string | null;
  description: string;
  isActiveToday: boolean;
  coverageArea: string;
  phone?: string | null;
  openDays: string[];
  openTime: string;
  closeTime: string;
  products: Product[];
  location: VendorLocation;
};

export type Reservation = {
  id: string;
  vendorId: string;
  productId: string;
  productName: string;
  quantity: number;
  customerName: string;
  phone: string;
  createdAt: string;
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
