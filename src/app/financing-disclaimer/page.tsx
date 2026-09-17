import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { disclaimers, siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Financing Disclaimer",
  description: "Read important information about owner financing offered on select Texas Properties 4 You properties.",
};

export default function FinancingDisclaimerPage() {
  return (
    <LegalPageLayout title="Financing Disclaimer" updated="September 2026">
      <p>{disclaimers.financing}</p>

      <h2 className="font-heading text-xl font-semibold pt-2">About Owner Financing</h2>
      <p>
        Owner financing, when offered, allows a qualified buyer to purchase a property directly from {siteConfig.name}
        with payments made over time, rather than obtaining a loan from a bank. Not every property offers owner
        financing — check the individual property page for details.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">Estimates Only</h2>
      <p>
        Any payment calculator, down payment amount, interest rate, or monthly payment shown on this website is an
        estimate only. These figures do not represent a final offer, approval, or agreement. All terms are subject to
        review and must be confirmed in writing before paperwork is completed.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">Minimum Monthly Payment</h2>
      <p>
        The minimum monthly payment accepted for any owner financed property on this website is $450. This minimum
        applies regardless of the calculated payment based on price, down payment, and term.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">No Guarantee of Approval</h2>
      <p>
        Submitting an application does not guarantee that owner financing will be approved for you or for any specific
        property. Every application is reviewed individually.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">Questions</h2>
      <p>
        If you have questions about financing terms for a specific property, please contact us at{" "}
        <a href={`mailto:${siteConfig.email}`} className="text-brand-green underline">
          {siteConfig.email}
        </a>{" "}
        or {siteConfig.phoneDisplay}.
      </p>
    </LegalPageLayout>
  );
}
