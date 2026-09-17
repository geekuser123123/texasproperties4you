"use client";

import { useState } from "react";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/Button";
import { submitForm } from "@/lib/submitForm";
import { siteConfig } from "@/data/site-config";
import { inputClass, textareaClass, labelClass, fieldWrapClass } from "@/components/forms/formStyles";

export function BackupListForm({ property }: { property: Property }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("submitting");
    try {
      await submitForm("/api/backup-list", {
        name: form.get("name"),
        phone: form.get("phone"),
        email: form.get("email"),
        propertyId: property.id,
        propertyTitle: property.title,
        propertyUrl: `${siteConfig.url}/properties/${property.slug}`,
        desiredDownPayment: form.get("downPayment"),
        notes: form.get("notes"),
        source: "backup_list_form",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-brand-sand rounded-[10px] p-8 text-center">
        <h2 className="font-heading text-2xl font-semibold mb-2">Thanks. You are on the backup list.</h2>
        <p className="text-brand-gray">
          We will contact you if {property.title} becomes available again.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-brand-sand rounded-[10px] p-6 md:p-8">
      <div className={`${fieldWrapClass} bg-brand-cream border border-brand-sand rounded-[8px] p-4`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-gray mb-1">Backup List For</p>
        <p className="font-heading text-lg font-semibold">{property.title}</p>
        <p className="text-sm text-brand-gray mt-1">
          This property is currently pending. Join the backup list to be notified if it becomes available again.
        </p>
      </div>

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

      <div className={fieldWrapClass}>
        <label htmlFor="downPayment" className={labelClass}>Desired Down Payment</label>
        <input id="downPayment" name="downPayment" type="text" inputMode="numeric" placeholder="$" className={inputClass} />
      </div>

      <div className={fieldWrapClass}>
        <label htmlFor="notes" className={labelClass}>Questions or Notes</label>
        <textarea id="notes" name="notes" rows={3} className={textareaClass} />
      </div>

      {status === "error" && (
        <p className="text-status-sold text-sm mb-4">Something went wrong. Please text or call us directly.</p>
      )}

      <Button type="submit" variant="primary" fullWidth disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Join Backup List"}
      </Button>
    </form>
  );
}
