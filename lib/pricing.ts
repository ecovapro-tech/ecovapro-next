// Canonical pricing model. Edit ONLY here.
// The booking modal, service pages, API, and admin all read from this file.

export const SERVICE_KEYS = ["eot", "regular", "deep", "airbnb", "office"] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const SIZE_KEYS = ["studio", "1bed", "2bed", "3bed", "4bed+"] as const;
export type SizeKey = (typeof SIZE_KEYS)[number];

export const SERVICE_LABELS: Record<ServiceKey, string> = {
  eot: "End of Tenancy",
  regular: "Regular Cleaning",
  deep: "Deep Cleaning",
  airbnb: "Airbnb & Short-Let",
  office: "Office Cleaning",
};

export const SIZE_LABELS: Record<SizeKey, string> = {
  studio: "Studio",
  "1bed": "1 Bed",
  "2bed": "2 Bed",
  "3bed": "3 Bed",
  "4bed+": "4 Bed+",
};

// Base price (£) for each service, set at the smallest size (studio).
const BASE_PRICE: Record<ServiceKey, number> = {
  eot: 180,
  regular: 75,
  deep: 140,
  airbnb: 65,
  office: 90,
};

// Multipliers per property size.
const SIZE_MULTIPLIER: Record<SizeKey, number> = {
  studio: 1,
  "1bed": 1.2,
  "2bed": 1.5,
  "3bed": 1.9,
  "4bed+": 2.4,
};

export function estimatePrice(service: ServiceKey | "", size: SizeKey | ""): number | null {
  if (!service || !size) return null;
  return Math.round(BASE_PRICE[service] * SIZE_MULTIPLIER[size]);
}

export function startingPrice(service: ServiceKey): number {
  return BASE_PRICE[service];
}

export function formatGBP(amount: number): string {
  return `£${amount.toLocaleString("en-GB")}`;
}
