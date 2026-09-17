import { Property } from "@/types/property";

export interface PropertyFilterValues {
  type?: string;
  county?: string;
  town?: string;
  priceMax?: string;
  paymentMax?: string;
  acreageMin?: string;
  financing?: string; // "cash" | "owner-financing"
  status?: string; // "available" | "pending" | "sold" | "" (all non-sold by default)
  q?: string;
}

export function filterProperties(properties: Property[], filters: PropertyFilterValues): Property[] {
  return properties.filter((p) => {
    if (p.status === "hidden") return false;

    if (filters.status) {
      if (p.status !== filters.status) return false;
    } else if (p.status === "sold") {
      return false; // default view excludes sold unless explicitly selected
    }

    if (filters.type && p.propertyType !== filters.type) return false;
    if (filters.county && p.county !== filters.county) return false;
    if (filters.town && p.nearestTown !== filters.town) return false;

    if (filters.priceMax) {
      const max = Number(filters.priceMax);
      if (!Number.isNaN(max) && p.cashPrice > max) return false;
    }

    if (filters.paymentMax) {
      const max = Number(filters.paymentMax);
      const payment = p.minMonthlyPayment ?? 450;
      if (!Number.isNaN(max) && p.ownerFinancing && payment > max) return false;
    }

    if (filters.acreageMin) {
      const min = Number(filters.acreageMin);
      if (!Number.isNaN(min) && (p.acreageNumeric ?? 0) < min) return false;
    }

    if (filters.financing === "cash" && p.status !== "sold") {
      // all properties can be purchased with cash; no filtering needed
    }
    if (filters.financing === "owner-financing" && !p.ownerFinancing) return false;

    if (filters.q) {
      const q = filters.q.toLowerCase();
      const haystack = `${p.title} ${p.county} ${p.nearestTown} ${p.description}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}
