import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Learn about the accessibility features of the Texas Properties 4 You website and how to report an issue.",
};

export default function AccessibilityStatementPage() {
  return (
    <LegalPageLayout title="Accessibility Statement" updated="September 2026">
      <p>
        {siteConfig.name} is committed to making our website usable for everyone, including people who use screen
        readers, keyboard navigation, or other assistive technology.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">What We Do</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Use clear text contrast between text and backgrounds</li>
        <li>Provide descriptions for property photos</li>
        <li>Use visible labels on all form fields</li>
        <li>Show property status with text and icons, not color alone</li>
        <li>Make buttons and links usable with a keyboard</li>
        <li>Avoid flashing or heavy moving content</li>
      </ul>

      <h2 className="font-heading text-xl font-semibold pt-2">Ongoing Effort</h2>
      <p>
        We are continuing to review and improve accessibility across the site. If you find a page or feature that is
        difficult to use, we want to know so we can fix it.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">Contact Us</h2>
      <p>
        If you experience any difficulty accessing content on this website, please contact us at{" "}
        <a href={`mailto:${siteConfig.email}`} className="text-brand-green underline">
          {siteConfig.email}
        </a>{" "}
        or {siteConfig.phoneDisplay}, and we will work with you to provide the information you need.
      </p>
    </LegalPageLayout>
  );
}
