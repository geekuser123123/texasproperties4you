import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { disclaimers, siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read the terms of use for the Texas Properties 4 You website.",
};

export default function TermsOfUsePage() {
  return (
    <LegalPageLayout title="Terms of Use" updated="September 2026">
      <p>
        By using {siteConfig.domain}, you agree to these Terms of Use. If you do not agree, please do not use this
        website.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">Use of This Website</h2>
      <p>
        This website is provided to help you browse properties, review pricing and terms, and contact us or apply
        online. You agree to use this site only for lawful purposes.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">Property Information</h2>
      <p>{disclaimers.general}</p>
      <p>
        Photos, descriptions, maps, and pricing are provided for general reference. We encourage every buyer to
        independently verify property details, boundaries, restrictions, and utilities before purchasing.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">No Guarantee of Financing or Approval</h2>
      <p>{disclaimers.financing}</p>
      <p>Submitting an application does not guarantee approval or a final agreement.</p>

      <h2 className="font-heading text-xl font-semibold pt-2">Intellectual Property</h2>
      <p>
        The content on this site, including text, photos, and the {siteConfig.name} name and logo, belongs to{" "}
        {siteConfig.name} and may not be copied or used without permission.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">Limitation of Liability</h2>
      <p>
        {siteConfig.name} is not liable for any damages resulting from your use of this website or reliance on
        information provided here. Use of this site is at your own risk.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">Changes to These Terms</h2>
      <p>We may update these Terms of Use from time to time. Continued use of the site means you accept any changes.</p>

      <h2 className="font-heading text-xl font-semibold pt-2">Governing Law</h2>
      <p>These Terms of Use are governed by the laws of the State of Texas.</p>

      <h2 className="font-heading text-xl font-semibold pt-2">Contact Us</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href={`mailto:${siteConfig.email}`} className="text-brand-green underline">
          {siteConfig.email}
        </a>
        .
      </p>
    </LegalPageLayout>
  );
}
