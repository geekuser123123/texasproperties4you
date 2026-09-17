import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { PROPERTY_TYPE_LABELS, PropertyType } from "@/types/property";

const TYPES: { type: PropertyType; blurb: string }[] = [
  { type: "land", blurb: "Raw land ready for your plans" },
  { type: "residential-lot", blurb: "Lots ready to build on" },
  { type: "house", blurb: "Move-in ready homes" },
  { type: "mobile-home", blurb: "Lots suited for mobile homes" },
  { type: "acreage", blurb: "Larger tracts and acreage" },
  { type: "investment", blurb: "Investment and commercial properties" },
];

function TypeIcon({ type }: { type: PropertyType }) {
  const common = { width: 32, height: 32, viewBox: "0 0 32 32", fill: "none", stroke: "#234D3C", strokeWidth: 2 } as const;
  switch (type) {
    case "land":
      return (
        <svg {...common}><path d="M4 24 L13 10 L18 17 L23 12 L28 24 Z" strokeLinejoin="round" /></svg>
      );
    case "residential-lot":
      return (
        <svg {...common}><rect x="6" y="10" width="20" height="14" rx="1" /><path d="M6 10 L16 4 L26 10" strokeLinejoin="round" /></svg>
      );
    case "house":
      return (
        <svg {...common}><path d="M6 16 L16 7 L26 16 V26 H6 Z" strokeLinejoin="round" /><rect x="13" y="18" width="6" height="8" /></svg>
      );
    case "mobile-home":
      return (
        <svg {...common}><rect x="5" y="12" width="22" height="10" rx="1.5" /><path d="M10 12 V22 M22 12 V22" /></svg>
      );
    case "acreage":
      return (
        <svg {...common}><path d="M4 22 Q 10 16 16 22 T 28 22" /><circle cx="22" cy="10" r="4" /></svg>
      );
    case "investment":
      return (
        <svg {...common}><path d="M5 24 L12 16 L17 20 L27 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      );
    default:
      return null;
  }
}

export function PropertyTypesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container-brand">
        <SectionHeading
          eyebrow="What We Sell"
          title="Properties For Every Plan"
          subtitle="From raw land to move-in ready homes, browse the type of property that fits what you're looking for."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TYPES.map(({ type, blurb }) => (
            <Link
              key={type}
              href={`/available-properties?type=${type}`}
              className="flex flex-col items-center text-center gap-2 rounded-[10px] border border-brand-sand bg-brand-cream p-5 hover:border-brand-green transition-colors"
            >
              <TypeIcon type={type} />
              <span className="font-heading font-semibold text-[15px] text-brand-charcoal">
                {PROPERTY_TYPE_LABELS[type]}
              </span>
              <span className="text-xs text-brand-gray">{blurb}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
