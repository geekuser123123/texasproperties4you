import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Texas Properties 4 You privacy policy to learn how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updated="September 2026">
      <p>
        This Privacy Policy explains how {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects,
        uses, and protects information when you visit {siteConfig.domain} or contact us about a property.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">Information We Collect</h2>
      <p>We collect information you provide directly to us, including when you:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Submit a property application</li>
        <li>Join the buyer list or backup list</li>
        <li>Submit a contact form</li>
        <li>Text or call us</li>
      </ul>
      <p>
        This may include your name, phone number, email address, mailing address, financing preferences, and any notes
        or documents you choose to provide.
      </p>
      <p>
        We also automatically collect certain information when you browse our site, such as pages visited, the property
        you viewed, how you arrived at our site (for example, from Facebook, a text message link, or an advertisement),
        and general device information. This helps us understand which properties and marketing efforts are working.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">How We Use Your Information</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>To respond to your questions and process applications</li>
        <li>To send you information about properties that match what you are looking for</li>
        <li>To contact you by phone, text, or email about your inquiry or application</li>
        <li>To improve our website and marketing</li>
        <li>To maintain records in our customer relationship management (CRM) system</li>
      </ul>

      <h2 className="font-heading text-xl font-semibold pt-2">Analytics and Tracking</h2>
      <p>
        We may use tools such as Google Analytics and Meta (Facebook) Pixel to understand how visitors use our site and
        to measure the effectiveness of our advertising. These tools may use cookies or similar technology. You can
        control cookies through your browser settings.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">How We Share Information</h2>
      <p>
        We do not sell your personal information. We may share your information with service providers who help us
        operate our business, such as our CRM provider, text/call service, or hosting provider, solely for the purpose
        of assisting us in serving you.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">Your Choices</h2>
      <p>
        You may ask us to remove you from our buyer list or marketing communications at any time by texting, calling, or
        emailing us using the contact information below.
      </p>

      <h2 className="font-heading text-xl font-semibold pt-2">Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, contact us at{" "}
        <a href={`mailto:${siteConfig.email}`} className="text-brand-green underline">
          {siteConfig.email}
        </a>{" "}
        or {siteConfig.phoneDisplay}.
      </p>
    </LegalPageLayout>
  );
}
