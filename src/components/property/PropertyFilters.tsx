"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { PROPERTY_TYPE_LABELS, PropertyType } from "@/types/property";

interface PropertyFiltersProps {
  counties: string[];
  towns: string[];
}

const PROPERTY_TYPES = Object.keys(PROPERTY_TYPE_LABELS) as PropertyType[];

export function PropertyFilters({ counties, towns }: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [form, setForm] = useState({
    type: searchParams.get("type") || "",
    county: searchParams.get("county") || "",
    town: searchParams.get("town") || "",
    priceMax: searchParams.get("priceMax") || "",
    paymentMax: searchParams.get("paymentMax") || "",
    acreageMin: searchParams.get("acreageMin") || "",
    financing: searchParams.get("financing") || "",
    status: searchParams.get("status") || "",
    q: searchParams.get("q") || "",
  });

  function applyFilters(next: typeof form) {
    setForm(next);
    const params = new URLSearchParams();
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function handleChange<K extends keyof typeof form>(key: K, value: string) {
    applyFilters({ ...form, [key]: value });
  }

  function clearFilters() {
    applyFilters({
      type: "",
      county: "",
      town: "",
      priceMax: "",
      paymentMax: "",
      acreageMin: "",
      financing: "",
      status: "",
      q: form.q,
    });
  }

  function resetFilters() {
    applyFilters({
      type: "",
      county: "",
      town: "",
      priceMax: "",
      paymentMax: "",
      acreageMin: "",
      financing: "",
      status: "",
      q: "",
    });
  }

  const selectClass =
    "w-full min-h-[48px] rounded-[8px] border border-brand-sand bg-white px-3 text-[15px] text-brand-charcoal focus:border-brand-green";
  const labelClass = "block text-xs font-semibold uppercase tracking-wide text-brand-gray mb-1.5";

  return (
    <div className="bg-white rounded-[10px] border border-brand-sand p-5">
      <div className="mb-4">
        <label className={labelClass} htmlFor="keyword-search">
          Search
        </label>
        <input
          id="keyword-search"
          type="search"
          placeholder="Search by town, county, or keyword"
          value={form.q}
          onChange={(e) => handleChange("q", e.target.value)}
          className={selectClass}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className={labelClass} htmlFor="filter-type">
            Property Type
          </label>
          <select id="filter-type" className={selectClass} value={form.type} onChange={(e) => handleChange("type", e.target.value)}>
            <option value="">All Types</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {PROPERTY_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="filter-county">
            County
          </label>
          <select id="filter-county" className={selectClass} value={form.county} onChange={(e) => handleChange("county", e.target.value)}>
            <option value="">All Counties</option>
            {counties.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="filter-town">
            Nearest Town
          </label>
          <select id="filter-town" className={selectClass} value={form.town} onChange={(e) => handleChange("town", e.target.value)}>
            <option value="">All Towns</option>
            {towns.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="filter-financing">
            Financing
          </label>
          <select
            id="filter-financing"
            className={selectClass}
            value={form.financing}
            onChange={(e) => handleChange("financing", e.target.value)}
          >
            <option value="">Cash or Owner Financing</option>
            <option value="cash">Cash Purchase</option>
            <option value="owner-financing">Owner Financing Available</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="filter-price">
            Max Cash Price
          </label>
          <select id="filter-price" className={selectClass} value={form.priceMax} onChange={(e) => handleChange("priceMax", e.target.value)}>
            <option value="">Any Price</option>
            <option value="30000">Under $30,000</option>
            <option value="60000">Under $60,000</option>
            <option value="100000">Under $100,000</option>
            <option value="200000">Under $200,000</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="filter-payment">
            Max Monthly Payment
          </label>
          <select id="filter-payment" className={selectClass} value={form.paymentMax} onChange={(e) => handleChange("paymentMax", e.target.value)}>
            <option value="">Any Payment</option>
            <option value="450">$450 / month</option>
            <option value="600">$600 / month</option>
            <option value="900">$900 / month</option>
            <option value="1500">$1,500 / month</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="filter-acreage">
            Minimum Size
          </label>
          <select id="filter-acreage" className={selectClass} value={form.acreageMin} onChange={(e) => handleChange("acreageMin", e.target.value)}>
            <option value="">Any Size</option>
            <option value="1">1+ acres</option>
            <option value="3">3+ acres</option>
            <option value="5">5+ acres</option>
            <option value="10">10+ acres</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="filter-status">
            Status
          </label>
          <select id="filter-status" className={selectClass} value={form.status} onChange={(e) => handleChange("status", e.target.value)}>
            <option value="">Available &amp; Pending</option>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm font-semibold text-brand-green underline underline-offset-2"
        >
          Clear Filters
        </button>
        <button
          type="button"
          onClick={resetFilters}
          className="text-sm font-semibold text-brand-gray underline underline-offset-2"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
