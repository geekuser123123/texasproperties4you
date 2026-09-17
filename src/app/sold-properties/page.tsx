import type { Metadata } from "next";
import { getSoldProperties } from "@/data/properties";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sold Properties",
  description:
    "See recently sold land, houses, and acreage from Texas Properties 4 You — proof that we sell properties regularly across Texas.",
};

export default function SoldPropertiesPage() {
  const sold = getSoldProperties();

  return (
    <div className="container-brand py-10 md:py-14">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-heading text-[30px] md:text-[40px] font-semibold mb-3">Sold Properties</h1>
        <p className="text-[17px] text-brand-gray">
          We sell properties regularly. Here are some of our recently sold properties. Congratulations to our buyers.
        </p>
      </header>

      {sold.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sold.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p className="text-brand-gray">Check back soon to see our sold properties.</p>
      )}

      <div className="mt-12 text-center">
        <Button href="/available-properties" variant="primary" size="lg">
          View Available Properties
        </Button>
      </div>
    </div>
  );
}
