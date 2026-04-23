import { Product, Vendor } from "@/lib/types";

function buildStockStatus(quantity: number): Product["stockStatus"] {
  if (quantity <= 0) return "out_of_stock";
  if (quantity < 6) return "low_stock";
  return "in_stock";
}

// -------------------------------------------------------------------
// Union Square Greenmarket — NYC
// Open: Mon, Wed, Fri, Sat · 8am – 6pm
// Located at the north end of Union Square Park, 17th St & Broadway
// -------------------------------------------------------------------

const unionSquareProducts: Record<string, Product> = {
  // Migliorelli Farm
  appleCider: {
    id: "prod-apple-cider",
    vendorId: "vendor-migliorelli-farm",
    name: "Fresh-pressed apple cider",
    price: 9.0,
    quantityAvailable: 22,
    unit: "half-gallon",
    stockStatus: buildStockStatus(22)
  },
  honeycrispApples: {
    id: "prod-honeycrisp-apples",
    vendorId: "vendor-migliorelli-farm",
    name: "Honeycrisp apples",
    price: 3.5,
    quantityAvailable: 60,
    unit: "lb",
    stockStatus: buildStockStatus(60)
  },
  sugarSnapPeas: {
    id: "prod-sugar-snap-peas",
    vendorId: "vendor-migliorelli-farm",
    name: "Sugar snap peas",
    price: 4.0,
    quantityAvailable: 14,
    unit: "bag",
    stockStatus: buildStockStatus(14)
  },
  rainbowChard: {
    id: "prod-rainbow-chard",
    vendorId: "vendor-migliorelli-farm",
    name: "Rainbow chard",
    price: 3.0,
    quantityAvailable: 20,
    unit: "bunch",
    stockStatus: buildStockStatus(20)
  },

  // Norwich Meadows Farm
  heirloomTomatoes: {
    id: "prod-heirloom-tomatoes",
    vendorId: "vendor-norwich-meadows",
    name: "Heirloom tomatoes",
    price: 5.5,
    quantityAvailable: 30,
    unit: "lb",
    stockStatus: buildStockStatus(30)
  },
  jalapenos: {
    id: "prod-jalapenos",
    vendorId: "vendor-norwich-meadows",
    name: "Jalapeños",
    price: 2.5,
    quantityAvailable: 5,
    unit: "bag",
    stockStatus: buildStockStatus(5)
  },
  garlic: {
    id: "prod-garlic",
    vendorId: "vendor-norwich-meadows",
    name: "Hardneck garlic",
    price: 2.0,
    quantityAvailable: 40,
    unit: "head",
    stockStatus: buildStockStatus(40)
  },
  purplePotatoes: {
    id: "prod-purple-potatoes",
    vendorId: "vendor-norwich-meadows",
    name: "Purple potatoes",
    price: 4.0,
    quantityAvailable: 18,
    unit: "lb",
    stockStatus: buildStockStatus(18)
  },

  // Lani's Farm
  butternutSquash: {
    id: "prod-butternut-squash",
    vendorId: "vendor-lanis-farm",
    name: "Butternut squash",
    price: 3.5,
    quantityAvailable: 25,
    unit: "each",
    stockStatus: buildStockStatus(25)
  },
  delicataSquash: {
    id: "prod-delicata-squash",
    vendorId: "vendor-lanis-farm",
    name: "Delicata squash",
    price: 3.0,
    quantityAvailable: 3,
    unit: "each",
    stockStatus: buildStockStatus(3)
  },
  herbBundles: {
    id: "prod-herb-bundles",
    vendorId: "vendor-lanis-farm",
    name: "Mixed herb bundle",
    price: 2.5,
    quantityAvailable: 12,
    unit: "bundle",
    stockStatus: buildStockStatus(12)
  },

  // Bobolink Dairy
  farmhouseCheddar: {
    id: "prod-farmhouse-cheddar",
    vendorId: "vendor-bobolink-dairy",
    name: "Cave-aged farmhouse cheddar",
    price: 12.0,
    quantityAvailable: 8,
    unit: "wedge (~8 oz)",
    stockStatus: buildStockStatus(8)
  },
  freshRicotta: {
    id: "prod-fresh-ricotta",
    vendorId: "vendor-bobolink-dairy",
    name: "Fresh ricotta",
    price: 9.0,
    quantityAvailable: 10,
    unit: "tub",
    stockStatus: buildStockStatus(10)
  },
  butterMilk: {
    id: "prod-buttermilk",
    vendorId: "vendor-bobolink-dairy",
    name: "Fresh-cultured buttermilk",
    price: 6.0,
    quantityAvailable: 0,
    unit: "quart",
    stockStatus: buildStockStatus(0)
  },

  // Windfall Farms
  babyArugula: {
    id: "prod-baby-arugula",
    vendorId: "vendor-windfall-farms",
    name: "Baby arugula",
    price: 4.0,
    quantityAvailable: 20,
    unit: "bag",
    stockStatus: buildStockStatus(20)
  },
  mesclunMix: {
    id: "prod-mesclun-mix",
    vendorId: "vendor-windfall-farms",
    name: "Mesclun salad mix",
    price: 4.5,
    quantityAvailable: 16,
    unit: "bag",
    stockStatus: buildStockStatus(16)
  },
  microgreens: {
    id: "prod-microgreens",
    vendorId: "vendor-windfall-farms",
    name: "Sunflower microgreens",
    price: 5.0,
    quantityAvailable: 4,
    unit: "tray",
    stockStatus: buildStockStatus(4)
  },

  // Samascott Orchards
  seckelPears: {
    id: "prod-seckel-pears",
    vendorId: "vendor-samascott-orchards",
    name: "Seckel pears",
    price: 4.0,
    quantityAvailable: 28,
    unit: "lb",
    stockStatus: buildStockStatus(28)
  },
  plums: {
    id: "prod-plums",
    vendorId: "vendor-samascott-orchards",
    name: "Italian plums",
    price: 3.5,
    quantityAvailable: 2,
    unit: "lb",
    stockStatus: buildStockStatus(2)
  },
  appleButter: {
    id: "prod-apple-butter",
    vendorId: "vendor-samascott-orchards",
    name: "Apple butter",
    price: 7.0,
    quantityAvailable: 15,
    unit: "jar",
    stockStatus: buildStockStatus(15)
  },

  // Stoneledge Farm
  sweetCorn: {
    id: "prod-sweet-corn",
    vendorId: "vendor-stoneledge-farm",
    name: "Sweet corn",
    price: 1.0,
    quantityAvailable: 0,
    unit: "ear",
    stockStatus: buildStockStatus(0)
  },
  beets: {
    id: "prod-beets",
    vendorId: "vendor-stoneledge-farm",
    name: "Chioggia beets",
    price: 3.5,
    quantityAvailable: 22,
    unit: "bunch",
    stockStatus: buildStockStatus(22)
  },
  fennel: {
    id: "prod-fennel",
    vendorId: "vendor-stoneledge-farm",
    name: "Fennel bulb",
    price: 3.0,
    quantityAvailable: 9,
    unit: "each",
    stockStatus: buildStockStatus(9)
  }
};

// Produce name → emoji mapping for UI display
export const produceEmojiMap: Record<string, string> = {
  "fresh-pressed apple cider": "🍎",
  "honeycrisp apples": "🍎",
  "sugar snap peas": "🫛",
  "rainbow chard": "🌿",
  "heirloom tomatoes": "🍅",
  "jalapeños": "🌶️",
  "hardneck garlic": "🧄",
  "purple potatoes": "🥔",
  "butternut squash": "🎃",
  "delicata squash": "🎃",
  "mixed herb bundle": "🌿",
  "cave-aged farmhouse cheddar": "🧀",
  "fresh ricotta": "🧀",
  "fresh-cultured buttermilk": "🥛",
  "baby arugula": "🥬",
  "mesclun salad mix": "🥗",
  "sunflower microgreens": "🌱",
  "seckel pears": "🍐",
  "italian plums": "🍑",
  "apple butter": "🫙",
  "sweet corn": "🌽",
  "chioggia beets": "🫚",
  "fennel bulb": "🌿",
  // Caribbean produce
  "dasheen": "🌿",
  "scotch bonnet peppers": "🌶️",
  "cocoa": "🍫",
  "breadfruit": "🍈",
  "nutmeg": "✨",
  "soursop": "🍋",
  "plantain": "🍌",
  "christophene": "🥬",
  "mangoes": "🥭",
  "bananas": "🍌",
  "cassava": "🌿",
  "red chilies": "🌶️",
  "bok choy": "🥬",
  "tomatoes": "🍅"
};

export const mockVendors: Vendor[] = [
  {
    id: "vendor-migliorelli-farm",
    slug: "migliorelli-farm",
    marketId: "market-union-square",
    name: "Migliorelli Farm",
    profilePhotoUrl: null,
    description:
      "Family farm out of Tivoli, NY — four generations growing Hudson Valley apples, cider, and seasonal vegetables since the 1930s. Known at Union Square for their pressed ciders and heritage apple varieties you won't find anywhere else.",
    isActiveToday: true,
    coverageArea: "Tivoli, NY · Hudson Valley",
    phone: "+1 845 757 3276",
    openDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    openTime: "8:00 AM",
    closeTime: "6:00 PM",
    location: {
      id: "loc-migliorelli-farm",
      vendorId: "vendor-migliorelli-farm",
      latitude: 40.7359,
      longitude: -73.9913,
      placeLabel: "Union Square Greenmarket, NW corner near 17th St",
      updatedAt: "2026-04-23T07:45:00.000Z"
    },
    products: [
      unionSquareProducts.appleCider,
      unionSquareProducts.honeycrispApples,
      unionSquareProducts.sugarSnapPeas,
      unionSquareProducts.rainbowChard
    ]
  },
  {
    id: "vendor-norwich-meadows",
    slug: "norwich-meadows",
    marketId: "market-union-square",
    name: "Norwich Meadows Farm",
    profilePhotoUrl: null,
    description:
      "Certified organic farm from Chenango County serving Union Square for over 20 years. Zaid and Haifa Kurdieh grow more than 500 varieties of vegetables and herbs — their heirloom tomatoes sell out fast every Saturday.",
    isActiveToday: true,
    coverageArea: "Norwich, NY · Chenango County",
    phone: "+1 607 334 2481",
    openDays: ["Wednesday", "Saturday"],
    openTime: "8:00 AM",
    closeTime: "5:00 PM",
    location: {
      id: "loc-norwich-meadows",
      vendorId: "vendor-norwich-meadows",
      latitude: 40.7355,
      longitude: -73.9908,
      placeLabel: "Union Square Greenmarket, center row east side",
      updatedAt: "2026-04-23T07:30:00.000Z"
    },
    products: [
      unionSquareProducts.heirloomTomatoes,
      unionSquareProducts.garlic,
      unionSquareProducts.jalapenos,
      unionSquareProducts.purplePotatoes
    ]
  },
  {
    id: "vendor-lanis-farm",
    slug: "lanis-farm",
    marketId: "market-union-square",
    name: "Lani's Farm",
    profilePhotoUrl: null,
    description:
      "Alex Pincus runs this beloved small-scale farm in Southampton, NJ. Specializes in winter squash, fresh herbs, and unusual alliums. A Union Square regular every Wednesday and Saturday — regulars know to grab squash early before it walks.",
    isActiveToday: false,
    coverageArea: "Southampton, NJ",
    phone: "+1 609 859 0088",
    openDays: ["Wednesday", "Saturday"],
    openTime: "8:00 AM",
    closeTime: "4:00 PM",
    location: {
      id: "loc-lanis-farm",
      vendorId: "vendor-lanis-farm",
      latitude: 40.7357,
      longitude: -73.9921,
      placeLabel: "Union Square Greenmarket, south end near 14th St",
      updatedAt: "2026-04-22T16:00:00.000Z"
    },
    products: [
      unionSquareProducts.butternutSquash,
      unionSquareProducts.delicataSquash,
      unionSquareProducts.herbBundles
    ]
  },
  {
    id: "vendor-bobolink-dairy",
    slug: "bobolink-dairy",
    marketId: "market-union-square",
    name: "Bobolink Dairy & Bakehouse",
    profilePhotoUrl: null,
    description:
      "Jonathan and Nina White's grass-fed dairy and artisan bakehouse in Vernon, NJ. Their cave-aged farmhouse cheeses and wood-fired breads have a loyal following. Show up before 10am on Saturdays if you want the ricotta — it's gone by noon.",
    isActiveToday: true,
    coverageArea: "Vernon, NJ · Sussex County",
    phone: "+1 973 764 4888",
    openDays: ["Friday", "Saturday"],
    openTime: "8:00 AM",
    closeTime: "5:30 PM",
    location: {
      id: "loc-bobolink-dairy",
      vendorId: "vendor-bobolink-dairy",
      latitude: 40.7362,
      longitude: -73.9916,
      placeLabel: "Union Square Greenmarket, north end near 17th St & Union Sq W",
      updatedAt: "2026-04-23T08:00:00.000Z"
    },
    products: [
      unionSquareProducts.farmhouseCheddar,
      unionSquareProducts.freshRicotta,
      unionSquareProducts.butterMilk
    ]
  },
  {
    id: "vendor-windfall-farms",
    slug: "windfall-farms",
    marketId: "market-union-square",
    name: "Windfall Farms",
    profilePhotoUrl: null,
    description:
      "Montgomery, NY farm run by Morse Pitts. Grows over 150 varieties of salad greens, Asian greens, and edible flowers using organic practices. Their mesclun mix is a staple for half the restaurants in lower Manhattan — and now it can be yours.",
    isActiveToday: true,
    coverageArea: "Montgomery, NY · Orange County",
    phone: "+1 845 457 5570",
    openDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    openTime: "8:00 AM",
    closeTime: "6:00 PM",
    location: {
      id: "loc-windfall-farms",
      vendorId: "vendor-windfall-farms",
      latitude: 40.7361,
      longitude: -73.9905,
      placeLabel: "Union Square Greenmarket, east row near Broadway entrance",
      updatedAt: "2026-04-23T08:10:00.000Z"
    },
    products: [
      unionSquareProducts.babyArugula,
      unionSquareProducts.mesclunMix,
      unionSquareProducts.microgreens
    ]
  },
  {
    id: "vendor-samascott-orchards",
    slug: "samascott-orchards",
    marketId: "market-union-square",
    name: "Samascott Orchards",
    profilePhotoUrl: null,
    description:
      "Kinderhook, NY orchard with 200+ acres of apples, pears, and stone fruit. The Samascott family has been growing along the Hudson Valley since 1914. Expect rare pear varieties, small-batch preserves, and whatever fruit is at its absolute peak this week.",
    isActiveToday: true,
    coverageArea: "Kinderhook, NY · Columbia County",
    phone: "+1 518 758 7224",
    openDays: ["Monday", "Friday", "Saturday"],
    openTime: "8:00 AM",
    closeTime: "6:00 PM",
    location: {
      id: "loc-samascott-orchards",
      vendorId: "vendor-samascott-orchards",
      latitude: 40.7353,
      longitude: -73.9911,
      placeLabel: "Union Square Greenmarket, center row near 15th St",
      updatedAt: "2026-04-23T07:55:00.000Z"
    },
    products: [
      unionSquareProducts.seckelPears,
      unionSquareProducts.plums,
      unionSquareProducts.appleButter
    ]
  },
  {
    id: "vendor-stoneledge-farm",
    slug: "stoneledge-farm",
    marketId: "market-union-square",
    name: "Stoneledge Farm",
    profilePhotoUrl: null,
    description:
      "South Cairo, NY farm specializing in root vegetables, brassicas, and cool-weather crops. Run by the van Eck family using sustainable practices. Dependable every Monday — the beet and fennel selection is some of the best you'll find in the city.",
    isActiveToday: false,
    coverageArea: "South Cairo, NY · Greene County",
    phone: "+1 518 622 9290",
    openDays: ["Monday", "Wednesday"],
    openTime: "8:00 AM",
    closeTime: "4:30 PM",
    location: {
      id: "loc-stoneledge-farm",
      vendorId: "vendor-stoneledge-farm",
      latitude: 40.7365,
      longitude: -73.9919,
      placeLabel: "Union Square Greenmarket, northwest corner near 17th & Union Sq W",
      updatedAt: "2026-04-22T14:30:00.000Z"
    },
    products: [
      unionSquareProducts.sweetCorn,
      unionSquareProducts.beets,
      unionSquareProducts.fennel
    ]
  }
];
