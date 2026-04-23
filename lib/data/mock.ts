import { Product, Vendor } from "@/lib/types";

function buildStockStatus(quantity: number): Product["stockStatus"] {
  if (quantity <= 0) return "out_of_stock";
  if (quantity < 6) return "low_stock";
  return "in_stock";
}

const sampleProducts = {
  mangoes: {
    id: "prod-mangoes",
    vendorId: "vendor-isla-fresh",
    name: "Mangoes",
    price: 2.5,
    quantityAvailable: 18,
    unit: "each",
    stockStatus: buildStockStatus(18)
  },
  bokChoy: {
    id: "prod-bokchoy",
    vendorId: "vendor-hanoi-green-basket",
    name: "Bok choy",
    price: 1.8,
    quantityAvailable: 10,
    unit: "bundle",
    stockStatus: buildStockStatus(10)
  },
  tomatoes: {
    id: "prod-tomatoes",
    vendorId: "vendor-hanoi-green-basket",
    name: "Tomatoes",
    price: 1.2,
    quantityAvailable: 4,
    unit: "kg",
    stockStatus: buildStockStatus(4)
  },
  bananas: {
    id: "prod-bananas",
    vendorId: "vendor-river-road-produce",
    name: "Bananas",
    price: 0.9,
    quantityAvailable: 24,
    unit: "kg",
    stockStatus: buildStockStatus(24)
  },
  cassava: {
    id: "prod-cassava",
    vendorId: "vendor-river-road-produce",
    name: "Cassava",
    price: 1.4,
    quantityAvailable: 0,
    unit: "kg",
    stockStatus: buildStockStatus(0)
  },
  chilies: {
    id: "prod-chilies",
    vendorId: "vendor-coastal-harvest",
    name: "Red chilies",
    price: 0.75,
    quantityAvailable: 5,
    unit: "bag",
    stockStatus: buildStockStatus(5)
  }
};

export const mockVendors: Vendor[] = [
  {
    id: "vendor-isla-fresh",
    slug: "isla-fresh",
    name: "Isla Fresh Cart",
    profilePhotoUrl: null,
    description: "Mobile fruit cart serving the ferry road and nearby neighborhoods in the morning.",
    isActiveToday: true,
    coverageArea: "Island ferry road",
    phone: "+63 917 100 4001",
    location: {
      id: "loc-isla-fresh",
      vendorId: "vendor-isla-fresh",
      latitude: 10.3157,
      longitude: 123.8854,
      placeLabel: "Near ferry road entrance",
      updatedAt: "2026-04-22T08:00:00.000Z"
    },
    products: [sampleProducts.mangoes]
  },
  {
    id: "vendor-hanoi-green-basket",
    slug: "hanoi-green-basket",
    name: "Hanoi Green Basket",
    profilePhotoUrl: null,
    description: "Neighborhood produce scooter with daily greens and quick updates from village suppliers.",
    isActiveToday: true,
    coverageArea: "Ba Dinh district",
    phone: "+84 93 555 2109",
    location: {
      id: "loc-hanoi-green-basket",
      vendorId: "vendor-hanoi-green-basket",
      latitude: 21.0338,
      longitude: 105.8142,
      placeLabel: "Corner of Van Cao and Doi Can",
      updatedAt: "2026-04-22T06:45:00.000Z"
    },
    products: [sampleProducts.bokChoy, sampleProducts.tomatoes]
  },
  {
    id: "vendor-river-road-produce",
    slug: "river-road-produce",
    name: "River Road Produce",
    profilePhotoUrl: null,
    description: "Rural roadside stall with roots, bananas, and market-day staples from nearby farms.",
    isActiveToday: false,
    coverageArea: "River Road village",
    phone: "+1 876 555 0193",
    location: {
      id: "loc-river-road-produce",
      vendorId: "vendor-river-road-produce",
      latitude: 18.0179,
      longitude: -76.8099,
      placeLabel: "Beside the yellow bus stop",
      updatedAt: "2026-04-21T17:10:00.000Z"
    },
    products: [sampleProducts.bananas, sampleProducts.cassava]
  },
  {
    id: "vendor-coastal-harvest",
    slug: "coastal-harvest",
    name: "Coastal Harvest",
    profilePhotoUrl: null,
    description: "Informal evening stand with vegetables sourced from inland growers and local gardens.",
    isActiveToday: true,
    coverageArea: "Port road",
    phone: "+1 758 555 8831",
    location: {
      id: "loc-coastal-harvest",
      vendorId: "vendor-coastal-harvest",
      latitude: 13.9094,
      longitude: -60.9789,
      placeLabel: "Outside the community center",
      updatedAt: "2026-04-22T12:20:00.000Z"
    },
    products: [sampleProducts.chilies]
  }
];
