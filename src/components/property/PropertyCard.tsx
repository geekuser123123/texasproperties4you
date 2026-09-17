import Image from "next/image";
import Link from "next/link";
import { Property, PROPERTY_TYPE_LABELS } from "@/types/property";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";
import { siteConfig } from "@/data/site-config";

export function PropertyCard({ property }: { property: Property }) {
  const isSold = property.status === "sold";
  const isPending = property.status === "pending";

  return (
    <div className="flex flex-col rounded-[10px] bg-white border border-brand-sand overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/properties/${property.slug}`} className="relative block aspect-[4/3] bg-brand-sand">
        <Image
          src={property.mainPhoto}
          alt={`Main photo of ${property.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <StatusBadge status={property.status} className="absolute top-3 left-3" />
        {property.featured && !isSold && (
          <span className="absolute top-3 right-3 rounded-[6px] bg-brand-gold px-2.5 py-1 text-xs font-heading font-semibold uppercase tracking-wide text-brand-green-dark">
            Featured
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-gray mb-1">
          {PROPERTY_TYPE_LABELS[property.propertyType]}
        </p>
        <Link href={`/properties/${property.slug}`}>
          <h3 className="font-heading text-[22px] font-semibold text-brand-charcoal leading-snug mb-1 hover:text-brand-green transition-colors">
            {property.title}
          </h3>
        </Link>
        <p className="text-sm text-brand-gray mb-3">
          {property.nearestTown} · {property.county} · {property.acreage}
        </p>

        {!isSold ? (
          <div className="mb-3">
            <p className="font-heading text-xl font-semibold text-brand-green">
              {formatCurrency(property.cashPrice)}
              <span className="text-sm font-body font-normal text-brand-gray"> cash</span>
            </p>
            {property.ownerFinancing && (
              <p className="text-sm text-brand-charcoal mt-0.5">
                Owner Financing Available
                {property.minMonthlyPayment !== undefined || property.termMonths ? (
                  <> — Starting at {formatCurrency(property.minMonthlyPayment ?? siteConfig.minMonthlyPayment)}/mo</>
                ) : null}
              </p>
            )}
          </div>
        ) : (
          <div className="mb-3">
            <p className="font-heading text-lg font-semibold text-status-sold">This property has sold.</p>
            {property.soldNote && <p className="text-sm text-brand-gray mt-0.5">{property.soldNote}</p>}
          </div>
        )}

        <p className="text-[15px] text-brand-charcoal/90 leading-relaxed mb-4 line-clamp-2">
          {property.description}
        </p>

        <div className="mt-auto flex flex-col gap-2">
          <Button href={`/properties/${property.slug}`} variant="primary" size="sm" fullWidth>
            View Property
          </Button>
          <div className="grid grid-cols-2 gap-2">
            {isSold ? (
              <Button href="/available-properties" variant="secondary" size="sm" fullWidth className="col-span-2">
                View Available Properties
              </Button>
            ) : (
              <>
                <Button
                  href={isPending ? `/buyer-list?property=${property.id}&backup=1` : `/apply?property=${property.id}`}
                  variant="secondary"
                  size="sm"
                  fullWidth
                >
                  {isPending ? "Join Backup List" : "Apply Online"}
                </Button>
                {property.googleMapsUrl ? (
                  <Button href={property.googleMapsUrl} variant="outline" size="sm" fullWidth target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </Button>
                ) : (
                  <Button href={`/properties/${property.slug}#location`} variant="outline" size="sm" fullWidth>
                    Get Directions
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
