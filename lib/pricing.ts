// Canonical pricing model. Edit ONLY here.
// All components, API routes and admin read from this file.

export const SERVICE_KEYS = ["eot", "regular", "deep", "airbnb", "office"] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const SIZE_KEYS = ["studio", "1bed", "2bed", "3bed", "4bed+"] as const;
export type SizeKey = (typeof SIZE_KEYS)[number];

export const ADDON_KEYS = ["oven", "fridge", "windows", "carpet", "ironing", "cupboards"] as const;
export type AddonKey = (typeof ADDON_KEYS)[number];

export const FREQUENCY_KEYS = ["once", "weekly", "fortnightly", "monthly"] as const;
export type FrequencyKey = (typeof FREQUENCY_KEYS)[number];

export const SERVICE_LABELS: Record<ServiceKey, string> = {
  eot:     "End of Tenancy",
  regular: "Regular Cleaning",
  deep:    "Deep Cleaning",
  airbnb:  "Airbnb & Short-Let",
  office:  "Office Cleaning",
};

export const SIZE_LABELS: Record<SizeKey, string> = {
  studio: "Studio",
  "1bed": "1 Bed",
  "2bed": "2 Bed",
  "3bed": "3 Bed",
  "4bed+": "4 Bed+",
};

export const ADDON_LABELS: Record<AddonKey, string> = {
  oven:      "Oven clean",
  fridge:    "Fridge clean",
  windows:   "Inside windows",
  carpet:    "Carpet (per room)",
  ironing:   "Ironing (1 hr)",
  cupboards: "Inside cupboards",
};

export const ADDON_PRICES: Record<AddonKey, number> = {
  oven:      40,
  fridge:    25,
  windows:   25,
  carpet:    15,
  ironing:   20,
  cupboards: 20,
};

export const FREQUENCY_LABELS: Record<FrequencyKey, string> = {
  once:        "One-off",
  weekly:      "Weekly",
  fortnightly: "Fortnightly",
  monthly:     "Monthly",
};

export const FREQUENCY_DISCOUNT: Record<FrequencyKey, number> = {
  once:        0,
  weekly:      0.15,
  fortnightly: 0.10,
  monthly:     0.05,
};

const BASE_PRICE: Record<ServiceKey, number> = {
  eot:     180,
  regular:  75,
  deep:    140,
  airbnb:   65,
  office:   90,
};

const SIZE_MULTIPLIER: Record<SizeKey, number> = {
  studio: 1,
  "1bed": 1.2,
  "2bed": 1.5,
  "3bed": 1.9,
  "4bed+": 2.4,
};

export function bedroomsToSize(bedrooms: number): SizeKey {
  if (bedrooms === 0) return "studio";
  if (bedrooms === 1) return "1bed";
  if (bedrooms === 2) return "2bed";
  if (bedrooms === 3) return "3bed";
  return "4bed+";
}

export function estimatePrice(
  service: ServiceKey | "",
  size: SizeKey | "",
  addons: AddonKey[] = [],
  frequency: FrequencyKey = "once",
  urgent = false,
): number | null {
  if (!service || !size) return null;
  const base = Math.round(BASE_PRICE[service] * SIZE_MULTIPLIER[size]);
  const addonTotal = addons.reduce((sum, k) => sum + ADDON_PRICES[k], 0);
  const subtotal = base + addonTotal;
  const discounted = Math.round(subtotal * (1 - FREQUENCY_DISCOUNT[frequency]));
  return discounted + (urgent ? 30 : 0);
}

export function startingPrice(service: ServiceKey): number {
  return BASE_PRICE[service];
}

export function formatGBP(amount: number): string {
  return `£${amount.toLocaleString("en-GB")}`;
}
