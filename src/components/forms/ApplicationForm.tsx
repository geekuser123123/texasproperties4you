"use client";

import { useState } from "react";
import { Property } from "@/types/property";
import { Button, getButtonClasses } from "@/components/ui/Button";
import { TextUsLink } from "@/components/ContactLinks";
import { siteConfig } from "@/data/site-config";
import { submitForm } from "@/lib/submitForm";
import { inputClass, textareaClass, labelClass, helpTextClass, fieldWrapClass } from "@/components/forms/formStyles";

interface ApplicationFormProps {
  properties: Property[];
  preselectedPropertyId?: string;
}

export function ApplicationForm({ properties, preselectedPropertyId }: ApplicationFormProps) {
  const preselected = properties.find((p) => p.id === preselectedPropertyId);
  const [propertyId, setPropertyId] = useState(preselected?.id ?? "");
  const [financing, setFinancing] = useState<"cash" | "owner-financing" | "">("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [paymentError, setPaymentError] = useState("");

  const selectedProperty = properties.find((p) => p.id === propertyId);

  function validatePayment(value: string) {
    if (financing === "owner-financing" && value) {
      const num = Number(value);
      if (!Number.isNaN(num) && num < siteConfig.minMonthlyPayment) {
        setPaymentError(`The minimum monthly payment for owner financing is $${siteConfig.minMonthlyPayment}.`);
        return false;
      }
    }
    setPaymentError("");
    return true;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validatePayment(monthlyPayment)) return;

    const form = new FormData(e.currentTarget);
    setStatus("submitting");

    try {
      await submitForm("/api/applications", {
        name: form.get("name"),
        phone: form.get("phone"),
        email: form.get("email"),
        propertyId: propertyId || "none",
        propertyTitle: selectedProperty?.title ?? "I have not selected a property yet",
        propertyUrl: selectedProperty ? `${siteConfig.url}/properties/${selectedProperty.slug}` : undefined,
        cashPrice: selectedProperty?.cashPrice,
        financingPreference: financing,
        desiredDownPayment: form.get("downPayment"),
        desiredMonthlyPayment: monthlyPayment,
        closingTimeline: form.get("timeline"),
        currentAddress: form.get("currentAddress"),
        notes: form.get("notes"),
        employmentStatus: form.get("employmentStatus"),
        monthlyIncome: form.get("monthlyIncome"),
        intendedUse: form.get("intendedUse"),
        referralSource: form.get("referralSource"),
        source: "application_form",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-brand-sand rounded-[10px] p-8 text-center">
        <h2 className="font-heading text-2xl font-semibold mb-2">Thanks. We received your application.</h2>
        <p className="text-brand-gray mb-6">We will review it and contact you soon.</p>
        <TextUsLink className={getButtonClasses({ variant: "primary" })}>Text Us Now</TextUsLink>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-brand-sand rounded-[10px] p-6 md:p-8">
      {preselected ? (
        <div className={`${fieldWrapClass} bg-brand-cream border border-brand-sand rounded-[8px] p-4`}>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-gray mb-1">Applying For</p>
          <p className="font-heading text-lg font-semibold">{preselected.title}</p>
        </div>
      ) : (
        <div className={fieldWrapClass}>
          <label htmlFor="property" className={labelClass}>
            Property You Are Applying For
          </label>
          <select
            id="property"
            className={inputClass}
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
          >
            <option value="">I have not selected a property yet</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div className={fieldWrapClass}>
          <label htmlFor="name" className={labelClass}>
            Full Name
          </label>
          <input id="name" name="name" required className={inputClass} autoComplete="name" />
        </div>
        <div className={fieldWrapClass}>
          <label htmlFor="phone" className={labelClass}>
            Phone Number
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} autoComplete="tel" />
        </div>
      </div>

      <div className={fieldWrapClass}>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" required className={inputClass} autoComplete="email" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className={fieldWrapClass}>
          <label htmlFor="financing" className={labelClass}>
            Cash or Owner Financing
          </label>
          <select
            id="financing"
            name="financing"
            required
            className={inputClass}
            value={financing}
            onChange={(e) => {
              setFinancing(e.target.value as typeof financing);
              validatePayment(monthlyPayment);
            }}
          >
            <option value="">Select One</option>
            <option value="cash">Cash</option>
            <option value="owner-financing">Owner Financing</option>
          </select>
        </div>
        <div className={fieldWrapClass}>
          <label htmlFor="timeline" className={labelClass}>
            Preferred Closing Timeline
          </label>
          <select id="timeline" name="timeline" required className={inputClass}>
            <option value="">Select One</option>
            <option value="asap">As soon as possible</option>
            <option value="30-days">Within 30 days</option>
            <option value="60-days">Within 60 days</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className={fieldWrapClass}>
          <label htmlFor="downPayment" className={labelClass}>
            Desired Down Payment
          </label>
          <input id="downPayment" name="downPayment" type="text" inputMode="numeric" placeholder="$" className={inputClass} />
        </div>
        <div className={fieldWrapClass}>
          <label htmlFor="monthlyPayment" className={labelClass}>
            Desired Monthly Payment
          </label>
          <input
            id="monthlyPayment"
            name="monthlyPayment"
            type="text"
            inputMode="numeric"
            placeholder="$"
            className={inputClass}
            value={monthlyPayment}
            onChange={(e) => {
              setMonthlyPayment(e.target.value);
              validatePayment(e.target.value);
            }}
            onBlur={(e) => validatePayment(e.target.value)}
          />
          {paymentError && <p className="text-sm text-status-sold mt-1">{paymentError}</p>}
        </div>
      </div>

      <div className={fieldWrapClass}>
        <label htmlFor="currentAddress" className={labelClass}>
          Current Address
        </label>
        <input id="currentAddress" name="currentAddress" className={inputClass} autoComplete="address-line1" />
      </div>

      <div className={fieldWrapClass}>
        <label htmlFor="notes" className={labelClass}>
          Questions or Notes
        </label>
        <textarea id="notes" name="notes" rows={4} className={textareaClass} />
      </div>

      <details className="mb-5">
        <summary className="cursor-pointer font-semibold text-brand-green text-[15px]">
          Optional Information
        </summary>
        <div className="mt-4 space-y-5">
          <div>
            <label htmlFor="employmentStatus" className={labelClass}>
              Employment Status
            </label>
            <input id="employmentStatus" name="employmentStatus" className={inputClass} />
          </div>
          <div>
            <label htmlFor="monthlyIncome" className={labelClass}>
              Monthly Income
            </label>
            <input id="monthlyIncome" name="monthlyIncome" type="text" inputMode="numeric" className={inputClass} />
          </div>
          <div>
            <label htmlFor="intendedUse" className={labelClass}>
              How Do You Plan To Use The Property?
            </label>
            <input id="intendedUse" name="intendedUse" className={inputClass} />
          </div>
          <div>
            <label htmlFor="idUpload" className={labelClass}>
              Upload Identification
            </label>
            <input id="idUpload" name="idUpload" type="file" className="text-sm" />
          </div>
          <div>
            <label htmlFor="docUpload" className={labelClass}>
              Upload Documents
            </label>
            <input id="docUpload" name="docUpload" type="file" multiple className="text-sm" />
          </div>
          <div>
            <label htmlFor="referralSource" className={labelClass}>
              How Did You Hear About Us?
            </label>
            <input id="referralSource" name="referralSource" className={inputClass} />
          </div>
        </div>
      </details>

      {status === "error" && (
        <p className="text-status-sold text-sm mb-4">
          Something went wrong sending your application. Please text or call us directly.
        </p>
      )}

      <p className={helpTextClass + " mb-4"}>
        The minimum monthly payment for owner financing is ${siteConfig.minMonthlyPayment}.
      </p>

      <Button type="submit" variant="primary" fullWidth disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
