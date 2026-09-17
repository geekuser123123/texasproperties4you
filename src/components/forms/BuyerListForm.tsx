"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { PROPERTY_TYPE_LABELS, PropertyType } from "@/types/property";
import { submitForm } from "@/lib/submitForm";
import { inputClass, labelClass, fieldWrapClass } from "@/components/forms/formStyles";

export function BuyerListForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("submitting");
    try {
      await submitForm("/api/buyer-list", {
        name: form.get("name"),
        phone: form.get("phone"),
        email: form.get("email"),
        areaWanted: form.get("areaWanted"),
        countyWanted: form.get("countyWanted"),
        budget: form.get("budget"),
        financingPreference: form.get("financing"),
        propertyTypeWanted: form.get("propertyType"),
        monthlyPaymentRange: form.get("paymentRange"),
        acreageWanted: form.get("acreage"),
        timeline: form.get("timeline"),
        source: "buyer_list_form",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-brand-sand rounded-[10px] p-8 text-center">
        <h2 className="font-heading text-2xl font-semibold mb-2">Thanks. You are on the buyer list.</h2>
        <p className="text-brand-gray">We will send new properties when they become available.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-brand-sand rounded-[10px] p-6 md:p-8">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className={fieldWrapClass}>
          <label htmlFor="name" className={labelClass}>Name</label>
          <input id="name" name="name" required className={inputClass} autoComplete="name" />
        </div>
        <div className={fieldWrapClass}>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input id="phone" name="phone" type="tel" required className={inputClass} autoComplete="tel" />
        </div>
      </div>

      <div className={fieldWrapClass}>
        <label htmlFor="email" className={labelClass}>Email</label>
        <input id="email" name="email" type="email" required className={inputClass} autoComplete="email" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className={fieldWrapClass}>
          <label htmlFor="areaWanted" className={labelClass}>Area Wanted</label>
          <input id="areaWanted" name="areaWanted" className={inputClass} placeholder="e.g. East Texas" />
        </div>
        <div className={fieldWrapClass}>
          <label htmlFor="countyWanted" className={labelClass}>County Wanted</label>
          <input id="countyWanted" name="countyWanted" className={inputClass} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className={fieldWrapClass}>
          <label htmlFor="budget" className={labelClass}>Budget</label>
          <input id="budget" name="budget" type="text" inputMode="numeric" placeholder="$" className={inputClass} />
        </div>
        <div className={fieldWrapClass}>
          <label htmlFor="financing" className={labelClass}>Cash or Owner Financing</label>
          <select id="financing" name="financing" className={inputClass}>
            <option value="">Select One</option>
            <option value="cash">Cash</option>
            <option value="owner-financing">Owner Financing</option>
            <option value="either">Either</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className={fieldWrapClass}>
          <label htmlFor="propertyType" className={labelClass}>Property Type Wanted</label>
          <select id="propertyType" name="propertyType" className={inputClass}>
            <option value="">Any Type</option>
            {(Object.keys(PROPERTY_TYPE_LABELS) as PropertyType[]).map((t) => (
              <option key={t} value={t}>{PROPERTY_TYPE_LABELS[t]}</option>
            ))}
          </select>
        </div>
        <div className={fieldWrapClass}>
          <label htmlFor="paymentRange" className={labelClass}>Monthly Payment Range</label>
          <select id="paymentRange" name="paymentRange" className={inputClass}>
            <option value="">Any</option>
            <option value="450-600">$450 - $600</option>
            <option value="600-900">$600 - $900</option>
            <option value="900-1500">$900 - $1,500</option>
            <option value="1500+">$1,500+</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className={fieldWrapClass}>
          <label htmlFor="acreage" className={labelClass}>Acreage or Size Wanted</label>
          <input id="acreage" name="acreage" className={inputClass} placeholder="e.g. 3-10 acres" />
        </div>
        <div className={fieldWrapClass}>
          <label htmlFor="timeline" className={labelClass}>How Soon Do You Want To Buy?</label>
          <select id="timeline" name="timeline" className={inputClass}>
            <option value="">Select One</option>
            <option value="asap">As soon as possible</option>
            <option value="1-3-months">1-3 months</option>
            <option value="3-6-months">3-6 months</option>
            <option value="just-looking">Just looking</option>
          </select>
        </div>
      </div>

      {status === "error" && (
        <p className="text-status-sold text-sm mb-4">Something went wrong. Please text or call us directly.</p>
      )}

      <Button type="submit" variant="primary" fullWidth disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Join Buyer List"}
      </Button>
    </form>
  );
}
