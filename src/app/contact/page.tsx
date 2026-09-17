import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { TextUsLink, CallUsLink } from "@/components/ContactLinks";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";
import { formatPhoneDisplay } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Texas Properties 4 You by text, phone, or email. We're easy to reach with questions about any property.",
};

export default function ContactPage() {
  return (
    <div className="container-brand py-10 md:py-14">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-heading text-[30px] md:text-[40px] font-semibold mb-3">Contact Us</h1>
        <p className="text-[17px] text-brand-gray">
          Have a question about a property or the buying process? We&apos;re easy to reach.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        <aside className="space-y-3">
          <TextUsLink className="flex min-h-[52px] items-center justify-center rounded-[8px] bg-brand-green text-white font-body font-semibold">
            Text Us
          </TextUsLink>
          <CallUsLink className="flex min-h-[52px] items-center justify-center rounded-[8px] border-2 border-brand-green text-brand-green font-body font-semibold">
            Call {formatPhoneDisplay(siteConfig.phoneDisplay)}
          </CallUsLink>
          <Button href="/apply" variant="secondary" fullWidth>
            Apply Online
          </Button>
          <Button href="/buyer-list" variant="secondary" fullWidth>
            Join Buyer List
          </Button>
          <div className="pt-4 text-sm text-brand-gray">
            <p className="font-semibold text-brand-charcoal mb-1">Email</p>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-green">
              {siteConfig.email}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
