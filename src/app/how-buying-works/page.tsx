import type { Metadata } from "next";
import { StepsList } from "@/components/StepsList";
import { Button } from "@/components/ui/Button";
import { TextUsLink } from "@/components/ContactLinks";
import { getButtonClasses } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "How Buying Works",
  description:
    "See the simple, step by step process for buying a property from Texas Properties 4 You, from browsing listings to completing the paperwork.",
};

const STEPS = [
  { title: "Browse available properties.", description: "Look through our current land, lots, houses, mobile homes, and acreage." },
  { title: "Choose a property.", description: "Pick the property that fits your budget and plans." },
  { title: "Review the price, photos, and location.", description: "Check the price, payment, photos, and map on the property page." },
  { title: "Estimate your payment on the property page.", description: "Use the calculator to see an estimated monthly payment." },
  { title: "Apply online or text us.", description: "Submit an application or reach out with any questions." },
  { title: "We review the property details and proposed terms with you.", description: "We'll go over pricing, financing, and next steps together." },
  { title: "The paperwork is completed.", description: "We keep the paperwork simple and easy to understand." },
  { title: "You begin using or holding the property based on the completed agreement.", description: "Once everything is signed, the property is yours." },
];

export default function HowBuyingWorksPage() {
  return (
    <div className="container-brand py-10 md:py-14">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-heading text-[30px] md:text-[40px] font-semibold mb-3">How Buying Works</h1>
        <p className="text-[17px] text-brand-gray">
          Buying a property from us is simple and direct. Here is exactly what to expect, from browsing to closing.
        </p>
      </header>

      <StepsList steps={STEPS} />

      <div className="mt-10 bg-white border border-brand-sand rounded-[10px] p-6 max-w-2xl">
        <p className="text-[15px] text-brand-gray">
          Please note: submitting an application does not guarantee approval. Every application is reviewed individually,
          and final terms must be approved before paperwork is completed.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Button href="/available-properties" variant="primary" size="lg">
          View Available Properties
        </Button>
        <Button href="/apply" variant="secondary" size="lg">
          Apply Online
        </Button>
        <TextUsLink className={getButtonClasses({ variant: "outline", size: "lg" })}>Text Us With Questions</TextUsLink>
      </div>
    </div>
  );
}
