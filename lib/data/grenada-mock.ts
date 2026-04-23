import { Product, Vendor } from "@/lib/types";

function buildStockStatus(quantity: number): Product["stockStatus"] {
  if (quantity <= 0) return "out_of_stock";
  if (quantity < 6) return "low_stock";
  return "in_stock";
}

const grenadaProducts = {
  rubyDasheen: {
    id: "grenada-prod-ruby-dasheen",
    vendorId: "grenada-vendor-miss-ruby",
    name: "Dasheen",
    price: 4.5,
    quantityAvailable: 18,
    unit: "kg",
    stockStatus: buildStockStatus(18)
  },
  rubyPlantain: {
    id: "grenada-prod-ruby-plantain",
    vendorId: "grenada-vendor-miss-ruby",
    name: "Plantain",
    price: 3.75,
    quantityAvailable: 12,
    unit: "kg",
    stockStatus: buildStockStatus(12)
  },
  carenageNutmeg: {
    id: "grenada-prod-carenage-nutmeg",
    vendorId: "grenada-vendor-carenage-spice",
    name: "Nutmeg",
    price: 8,
    quantityAvailable: 14,
    unit: "bag",
    stockStatus: buildStockStatus(14)
  },
  carenageCinnamon: {
    id: "grenada-prod-carenage-cinnamon",
    vendorId: "grenada-vendor-carenage-spice",
    name: "Cinnamon bark",
    price: 6.5,
    quantityAvailable: 9,
    unit: "bundle",
    stockStatus: buildStockStatus(9)
  },
  gouyaveCocoa: {
    id: "grenada-prod-gouyave-cocoa",
    vendorId: "grenada-vendor-gouyave-coop",
    name: "Cocoa",
    price: 10.5,
    quantityAvailable: 10,
    unit: "bag",
    stockStatus: buildStockStatus(10)
  },
  gouyaveGinger: {
    id: "grenada-prod-gouyave-ginger",
    vendorId: "grenada-vendor-gouyave-coop",
    name: "Ginger",
    price: 5.25,
    quantityAvailable: 7,
    unit: "lb",
    stockStatus: buildStockStatus(7)
  },
  grandAnseSoursop: {
    id: "grenada-prod-grand-anse-soursop",
    vendorId: "grenada-vendor-grand-anse-fresh-cart",
    name: "Soursop",
    price: 9,
    quantityAvailable: 5,
    unit: "each",
    stockStatus: buildStockStatus(5)
  },
  grandAnsePeppers: {
    id: "grenada-prod-grand-anse-peppers",
    vendorId: "grenada-vendor-grand-anse-fresh-cart",
    name: "Scotch bonnet peppers",
    price: 3.5,
    quantityAvailable: 11,
    unit: "bag",
    stockStatus: buildStockStatus(11)
  },
  grenvilleChristophene: {
    id: "grenada-prod-grenville-christophene",
    vendorId: "grenada-vendor-grenville-root-stall",
    name: "Christophene",
    price: 2.75,
    quantityAvailable: 16,
    unit: "kg",
    stockStatus: buildStockStatus(16)
  },
  grenvilleBreadfruit: {
    id: "grenada-prod-grenville-breadfruit",
    vendorId: "grenada-vendor-grenville-root-stall",
    name: "Breadfruit",
    price: 7.25,
    quantityAvailable: 4,
    unit: "each",
    stockStatus: buildStockStatus(4)
  }
};

export const grenadaMockVendors: Vendor[] = [
  {
    id: "grenada-vendor-miss-ruby",
    slug: "miss-rubys-ground-provisions",
    marketId: "market-st-georges-market",
    currencyCode: "XCD",
    name: "Miss Ruby's Ground Provisions",
    profilePhotoUrl: null,
    description:
      "Early-morning market regular with dasheen, plantain, and all the staples families pick up before the heat sets in.",
    isActiveToday: true,
    coverageArea: "St. George's Market Square",
    phone: "+1 473 420 1842",
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    openTime: "6:00 AM",
    closeTime: "1:00 PM",
    location: {
      id: "grenada-loc-miss-ruby",
      vendorId: "grenada-vendor-miss-ruby",
      latitude: 12.0526,
      longitude: -61.7485,
      placeLabel: "St. George's Market Square by the produce arcade",
      updatedAt: "2026-04-23T06:50:00.000Z"
    },
    products: [grenadaProducts.rubyDasheen, grenadaProducts.rubyPlantain]
  },
  {
    id: "grenada-vendor-carenage-spice",
    slug: "carenage-spice-corner",
    marketId: "market-st-georges-market",
    currencyCode: "XCD",
    name: "Carenage Spice Corner",
    profilePhotoUrl: null,
    description:
      "Harbour-side spice stall with nutmeg and cinnamon bark for cooks, visitors, and office workers heading home.",
    isActiveToday: true,
    coverageArea: "The Carenage",
    phone: "+1 473 439 2271",
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    openTime: "7:00 AM",
    closeTime: "2:00 PM",
    location: {
      id: "grenada-loc-carenage-spice",
      vendorId: "grenada-vendor-carenage-spice",
      latitude: 12.0519,
      longitude: -61.7497,
      placeLabel: "The Carenage near the harbour walk",
      updatedAt: "2026-04-23T08:15:00.000Z"
    },
    products: [grenadaProducts.carenageNutmeg, grenadaProducts.carenageCinnamon]
  },
  {
    id: "grenada-vendor-gouyave-coop",
    slug: "gouyave-nutmeg-coop-stand",
    marketId: "market-grenville-weekend-market",
    currencyCode: "XCD",
    name: "Gouyave Nutmeg Co-op Stand",
    profilePhotoUrl: null,
    description:
      "Village co-op stall bringing cocoa, ginger, and spice-island staples down from Gouyave growers before midday.",
    isActiveToday: true,
    coverageArea: "Gouyave Nutmeg Processing area",
    phone: "+1 473 442 3099",
    openDays: ["Thursday", "Friday", "Saturday"],
    openTime: "6:00 AM",
    closeTime: "12:30 PM",
    location: {
      id: "grenada-loc-gouyave-coop",
      vendorId: "grenada-vendor-gouyave-coop",
      latitude: 12.1648,
      longitude: -61.7289,
      placeLabel: "Near Gouyave Nutmeg Processing Station",
      updatedAt: "2026-04-23T07:25:00.000Z"
    },
    products: [grenadaProducts.gouyaveCocoa, grenadaProducts.gouyaveGinger]
  },
  {
    id: "grenada-vendor-grand-anse-fresh-cart",
    slug: "grand-anse-fresh-cart",
    marketId: "market-grand-anse-farmers-market",
    currencyCode: "XCD",
    name: "Grand Anse Fresh Cart",
    profilePhotoUrl: null,
    description:
      "Beach-road fruit cart with soursop and peppers for shoppers, hotel staff, and quick stop-offs on the coast road.",
    isActiveToday: true,
    coverageArea: "Grand Anse Beach Road",
    phone: "+1 473 415 6623",
    openDays: ["Wednesday", "Friday", "Saturday", "Sunday"],
    openTime: "6:30 AM",
    closeTime: "1:30 PM",
    location: {
      id: "grenada-loc-grand-anse-cart",
      vendorId: "grenada-vendor-grand-anse-fresh-cart",
      latitude: 12.0171,
      longitude: -61.7619,
      placeLabel: "Grand Anse Beach Road near the craft stalls",
      updatedAt: "2026-04-23T09:05:00.000Z"
    },
    products: [grenadaProducts.grandAnseSoursop, grenadaProducts.grandAnsePeppers]
  },
  {
    id: "grenada-vendor-grenville-root-stall",
    slug: "grenville-root-stall",
    marketId: "market-grenville-weekend-market",
    currencyCode: "XCD",
    name: "Grenville Root Stall",
    profilePhotoUrl: null,
    description:
      "East coast stall stacked with christophene, breadfruit, and market-day roots for families shopping before buses roll out.",
    isActiveToday: true,
    coverageArea: "Grenville Market",
    phone: "+1 473 458 3417",
    openDays: ["Friday", "Saturday", "Sunday"],
    openTime: "6:00 AM",
    closeTime: "1:00 PM",
    location: {
      id: "grenada-loc-grenville-root",
      vendorId: "grenada-vendor-grenville-root-stall",
      latitude: 12.1228,
      longitude: -61.6245,
      placeLabel: "Grenville Market main produce lane",
      updatedAt: "2026-04-23T07:40:00.000Z"
    },
    products: [grenadaProducts.grenvilleChristophene, grenadaProducts.grenvilleBreadfruit]
  }
];
