"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { submitForm } from "@/lib/submitForm";
import { inputClass, textareaClass, labelClass, fieldWrapClass } from "@/components/forms/formStyles";

export function ContactForm({ defaultPropertyOfInterest }: { defaultPropertyOfInterest?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("submitting");
    try {
      await submitForm("/api/contact", {
        name: form.get("name"),
        phone: form.get("phone"),
        email: form.get("email"),
        propertyOfInterest: form.get("propertyOfInterest"),
        message: form.get("message"),
        preferredContact: form.get("preferredContact"),
        source: "contact_form",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-brand-sand rounded-[10px] p-8 text-center">
        <h2 className="font-heading text-2xl font-semibold mb-2">Thanks. We received your message.</h2>
        <p className="text-brand-gray mb-6">We will contact you soon.</p>
        <Button href="/available-properties" variant="primary">
          View Available Properties
        </Button>
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

      <div className={fieldWrapClass}>
        <label htmlFor="propertyOfInterest" className={labelClass}>Property of Interest</label>
        <input
          id="propertyOfInterest"
          name="propertyOfInterest"
          className={inputClass}
          defaultValue={defaultPropertyOfInterest}
          placeholder="Optional"
        />
      </div>

      <div className={fieldWrapClass}>
        <label htmlFor="preferredContact" className={labelClass}>Preferred Contact Method</label>
        <select id="preferredContact" name="preferredContact" className={inputClass}>
          <option value="text">Text</option>
          <option value="call">Call</option>
          <option value="email">Email</option>
        </select>
      </div>

      <div className={fieldWrapClass}>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea id="message" name="message" rows={5} required className={textareaClass} />
      </div>

      {status === "error" && (
        <p className="text-status-sold text-sm mb-4">Something went wrong. Please text or call us directly.</p>
      )}

      <Button type="submit" variant="primary" fullWidth disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Send Message"}
      </Button>
    </form>
  );
}
