import type { Metadata } from "next";
import { getPubliclyListedProperties, getAllCounties, getAllTowns } from "@/data/properties";
import { filterProperties, PropertyFilterValues } from "@/lib/filterProperties";
import { PropertyFilters } from "@/components/property/PropertyFilters";
import { PropertyCard } from "@/components/property/PropertyCard";

export const metadata: Metadata = {
  title: "Available Properties",
  description:
    "Browse available land, lots, houses, mobile homes, acreage, and investment properties for sale across Texas with clear pricing and owner financing options.",
};

export default async function AvailablePropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters: PropertyFilterValues = {
    type: typeof params.type === "string" ? params.type : undefined,
    county: typeof params.county === "string" ? params.county : undefined,
    town: typeof params.town === "string" ? params.town : undefined,
    priceMax: typeof params.priceMax === "string" ? params.priceMax : undefined,
    paymentMax: typeof params.paymentMax === "string" ? params.paymentMax : undefined,
    acreageMin: typeof params.acreageMin === "string" ? params.acreageMin : undefined,
    financing: typeof params.financing === "string" ? params.financing : undefined,
    status: typeof params.status === "string" ? params.status : undefined,
    q: typeof params.q === "string" ? params.q : undefined,
  };

  const allProperties = getPubliclyListedProperties();
  const results = filterProperties(allProperties, filters);
  const counties = getAllCounties();
  const towns = getAllTowns();

  return (
    <div className="container-brand py-10 md:py-14">
      <header className="mb-8">
        <h1 className="font-heading text-[30px] md:text-[40px] font-semibold mb-3">Available Properties</h1>
        <p className="text-[17px] text-brand-gray max-w-2xl">
          Browse our current properties. See pricing, estimated payments, photos, and location for each one, then apply
          online or text us with questions.
        </p>
      </header>

      <div className="mb-8">
        <PropertyFilters counties={counties} towns={towns} />
      </div>

      <p className="text-sm text-brand-gray mb-4">
        {results.length} {results.length === 1 ? "property" : "properties"} found
      </p>

      {results.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-brand-sand rounded-[10px] p-10 text-center">
          <p className="font-heading text-xl font-semibold mb-2">No properties match your filters.</p>
          <p className="text-brand-gray">Try clearing a filter or join the buyer list to hear about new properties.</p>
        </div>
      )}
    </div>
  );
}
