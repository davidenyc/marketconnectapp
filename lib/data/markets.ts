import { Market } from "@/lib/types";

export const mockMarkets: Market[] = [
  // ----------------------------------------------------------------
  // New York City
  // ----------------------------------------------------------------
  {
    id: "market-union-square",
    name: "Union Square Greenmarket",
    slug: "union-square-greenmarket",
    location: {
      latitude: 40.7359,
      longitude: -73.9911
    },
    description:
      "New York City's most celebrated farmers market, running since 1976. Every Monday, Wednesday, Friday, and Saturday, over 140 regional farmers, fishers, and bakers take over the north end of Union Square Park. If it grows in the Northeast, you'll find it here.",
    coverageArea: "Union Square Park, 17th St & Broadway, Manhattan",
    openDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    openTime: "8:00 AM",
    closeTime: "6:00 PM",
    featuredItems: [
      "Honeycrisp apples",
      "Heirloom tomatoes",
      "Cave-aged cheddar",
      "Fresh-pressed cider",
      "Mesclun mix",
      "Seckel pears",
      "Chioggia beets"
    ],
    vendorIds: [
      "vendor-migliorelli-farm",
      "vendor-norwich-meadows",
      "vendor-lanis-farm",
      "vendor-bobolink-dairy",
      "vendor-windfall-farms",
      "vendor-samascott-orchards",
      "vendor-stoneledge-farm"
    ]
  },

  // ----------------------------------------------------------------
  // Grenada, Caribbean
  // ----------------------------------------------------------------
  {
    id: "market-st-georges-market",
    name: "St. George's Market",
    slug: "st-georges-market",
    location: {
      latitude: 12.0527,
      longitude: -61.7484
    },
    description: "The busy capital market for fresh island staples, fruit, spices, and everyday kitchen shopping.",
    coverageArea: "St. George's Market Square",
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    openTime: "6:00 AM",
    closeTime: "4:00 PM",
    featuredItems: ["dasheen", "scotch bonnet peppers", "cocoa", "breadfruit"],
    vendorIds: [
      "grenada-vendor-miss-ruby",
      "grenada-vendor-carenage-spice"
    ]
  },
  {
    id: "market-grand-anse-farmers-market",
    name: "Grand Anse Farmers Market",
    slug: "grand-anse-farmers-market",
    location: {
      latitude: 12.0172,
      longitude: -61.7618
    },
    description: "A beach-road produce stop serving shoppers, hotel workers, and families stocking up for supper.",
    coverageArea: "Grand Anse Beach Road",
    openDays: ["Wednesday", "Friday", "Saturday"],
    openTime: "7:00 AM",
    closeTime: "2:00 PM",
    featuredItems: ["nutmeg", "soursop", "plantain", "scotch bonnet peppers"],
    vendorIds: [
      "grenada-vendor-grand-anse-fresh-cart"
    ]
  },
  {
    id: "market-grenville-weekend-market",
    name: "Grenville Weekend Market",
    slug: "grenville-weekend-market",
    location: {
      latitude: 12.1232,
      longitude: -61.6243
    },
    description: "An east coast weekend market with roots, fruit, and village produce arriving early from nearby farms.",
    coverageArea: "Grenville Market",
    openDays: ["Friday", "Saturday", "Sunday"],
    openTime: "6:30 AM",
    closeTime: "1:30 PM",
    featuredItems: ["plantain", "christophene", "breadfruit", "cocoa"],
    vendorIds: [
      "grenada-vendor-gouyave-coop",
      "grenada-vendor-grenville-root-stall"
    ]
  }
];

export async function getMarkets() {
  return mockMarkets;
}

export function getMarketById(id: string): Market | undefined {
  return mockMarkets.find((m) => m.id === id);
}

export function getMarketBySlug(slug: string): Market | undefined {
  return mockMarkets.find((m) => m.slug === slug);
}
