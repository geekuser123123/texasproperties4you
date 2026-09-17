import { HeroSection } from "@/components/home/HeroSection";
import { PropertyTypesSection } from "@/components/home/PropertyTypesSection";
import { SectionHeading } from "@/components/SectionHeading";
import { StepsList } from "@/components/StepsList";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";
import { TextUsLink, CallUsLink } from "@/components/ContactLinks";
import { getFeaturedProperties, getSoldProperties } from "@/data/properties";
import { formatPhoneDisplay } from "@/lib/format";
import { siteConfig } from "@/data/site-config";

const BUYING_STEPS = [
  { title: "Browse properties", description: "Look through available land, lots, houses, and more." },
  { title: "Choose a property", description: "Pick the property that fits your plans and budget." },
  { title: "Review the price and location", description: "Check pricing, maps, directions, and photos." },
  { title: "Estimate your payment", description: "Use the calculator on the property page." },
  { title: "Apply online or text us", description: "Send your application or reach out with questions." },
  { title: "Complete the paperwork", description: "We'll walk you through the simple paperwork." },
];

export default function HomePage() {
  const featured = getFeaturedProperties().slice(0, 6);
  const sold = getSoldProperties().slice(0, 3);

  return (
    <>
      <HeroSection />
      <PropertyTypesSection />

      <section className="py-16 bg-brand-cream">
        <div className="container-brand">
          <SectionHeading
            eyebrow="Featured Properties"
            title="Available Right Now"
            subtitle="Take a look at a few of our current properties. View the full list to see everything we have available."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/available-properties" variant="primary" size="lg">
              View Available Properties
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-brand">
          <SectionHeading
            eyebrow="How It Works"
            title="Buying A Property Is Simple"
            subtitle="Here is what to expect from browsing to closing."
          />
          <StepsList steps={BUYING_STEPS} />
        </div>
      </section>

      <section className="py-16 bg-brand-green-dark">
        <div className="container-brand text-center">
          <SectionHeading
            title="Owner Financing May Be Available"
            subtitle="Some properties may be purchased with simple owner financing terms. No bank may be needed when owner financing is offered. Review the property page or contact us for details."
            center
            light
          />
          <Button href="/available-properties?financing=owner-financing" variant="gold" size="lg">
            See Owner Financed Properties
          </Button>
        </div>
      </section>

      {sold.length > 0 && (
        <section className="py-16 bg-brand-cream">
          <div className="container-brand">
            <SectionHeading
              eyebrow="Proven Track Record"
              title="Recently Sold Properties"
              subtitle="We sell properties regularly. Here are a few that have recently sold."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sold.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button href="/sold-properties" variant="secondary" size="lg">
                View Sold Properties
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="container-brand text-center max-w-2xl mx-auto">
          <SectionHeading title="See New Properties First" subtitle="Join our buyer list and receive new property information when listings become available." center />
          <Button href="/buyer-list" variant="primary" size="lg">
            Join Buyer List
          </Button>
        </div>
      </section>

      <section className="py-16 bg-brand-sand">
        <div className="container-brand">
          <SectionHeading title="Questions? We're Easy To Reach." center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <TextUsLink className="flex min-h-[56px] items-center justify-center rounded-[8px] bg-brand-green text-white font-body font-semibold">
              Text Us
            </TextUsLink>
            <CallUsLink className="flex min-h-[56px] items-center justify-center rounded-[8px] border-2 border-brand-green text-brand-green font-body font-semibold">
              Call {formatPhoneDisplay(siteConfig.phoneDisplay)}
            </CallUsLink>
            <Button href="/apply" variant="secondary" fullWidth>
              Apply Online
            </Button>
            <Button href="/buyer-list" variant="secondary" fullWidth>
              Join Buyer List
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
