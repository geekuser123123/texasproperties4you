import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { properties, getPropertyBySlug } from "@/data/properties";
import { PROPERTY_TYPE_LABELS } from "@/types/property";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { TextUsLink, CallUsLink } from "@/components/ContactLinks";
import { PhotoGallery } from "@/components/property/PhotoGallery";
import { PaymentCalculator } from "@/components/property/PaymentCalculator";
import { MapSection } from "@/components/property/MapSection";
import { QuickFacts } from "@/components/property/QuickFacts";
import { ShareButtons } from "@/components/property/ShareButtons";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { formatCurrency } from "@/lib/format";
import { siteConfig, disclaimers } from "@/data/site-config";

export function generateStaticParams() {
  return properties.filter((p) => p.status !== "hidden").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};

  const title = property.status === "sold" ? `${property.title} (Sold)` : property.title;
  const description =
    property.searchDescription ??
    `${PROPERTY_TYPE_LABELS[property.propertyType]} near ${property.nearestTown}, ${property.county}. ${
      property.status === "sold" ? "This property has sold." : `Cash price ${formatCurrency(property.cashPrice)}.`
    }`;
  const image = property.socialImage ?? property.mainPhoto;

  return {
    title,
    description,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/properties/${property.slug}`,
      images: [{ url: image, width: 1200, height: 800, alt: property.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const isSold = property.status === "sold";
  const isPending = property.status === "pending";
  const isAvailable = property.status === "available";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${siteConfig.url}/properties/${property.slug}`,
    image: property.photos.map((p) => `${siteConfig.url}${p.src}`),
    address: {
      "@type": "PostalAddress",
      addressLocality: property.nearestTown,
      addressRegion: "TX",
      addressCountry: "US",
    },
    ...(property.gps
      ? { geo: { "@type": "GeoCoordinates", latitude: property.gps.lat, longitude: property.gps.lng } }
      : {}),
    ...(!isSold
      ? {
          offers: {
            "@type": "Offer",
            price: property.cashPrice,
            priceCurrency: "USD",
            availability: isAvailable ? "https://schema.org/InStock" : "https://schema.org/LimitedAvailability",
          },
        }
      : {}),
  };

  return (
    <div className="pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-brand py-8">
        <nav className="text-sm text-brand-gray mb-4">
          <a href="/available-properties" className="hover:text-brand-green">Available Properties</a> / {property.title}
        </nav>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <PhotoGallery photos={property.photos} title={property.title} />

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <StatusBadge status={property.status} large />
              <span className="text-sm font-semibold uppercase tracking-wide text-brand-gray">
                {PROPERTY_TYPE_LABELS[property.propertyType]}
              </span>
            </div>

            <h1 className="font-heading text-[30px] md:text-[40px] font-semibold mt-2 mb-1">{property.title}</h1>
            <p className="text-brand-gray text-[17px] mb-5">
              {property.nearestTown} · {property.county} · {property.acreage}
            </p>

            {!isSold ? (
              <div className="mb-6">
                <p className="font-heading text-3xl font-semibold text-brand-green">
                  {formatCurrency(property.cashPrice)} <span className="text-base font-body font-normal text-brand-gray">cash price</span>
                </p>
                {property.ownerFinancing && property.downPayment !== undefined && (
                  <p className="text-brand-charcoal mt-1">
                    Down payment as low as {formatCurrency(property.downPayment)} — owner financing available
                  </p>
                )}
              </div>
            ) : (
              <div className="mb-6 bg-brand-sand/60 border border-brand-sand rounded-[10px] p-5">
                <p className="font-heading text-xl font-semibold text-status-sold mb-1">This property has sold.</p>
                {property.soldPriceVisible && property.soldPrice && (
                  <p className="text-brand-charcoal">Sold price: {formatCurrency(property.soldPrice)}</p>
                )}
                {property.soldNote && <p className="text-brand-gray mt-1">{property.soldNote}</p>}
              </div>
            )}

            <div className="hidden md:flex flex-wrap gap-3 mb-10">
              <TextUsLink
                propertyTitle={property.title}
                className="inline-flex min-h-[48px] items-center justify-center rounded-[8px] border-2 border-brand-green px-6 font-body font-semibold text-brand-green"
              >
                Text Us About This Property
              </TextUsLink>
              {isSold ? (
                <Button href="/available-properties" variant="primary">View Available Properties</Button>
              ) : isPending ? (
                <Button href={`/buyer-list?property=${property.id}&backup=1`} variant="primary">Join Backup List</Button>
              ) : (
                <Button href={`/apply?property=${property.id}`} variant="primary">Apply Online</Button>
              )}
              {property.googleMapsUrl && (
                <Button href={property.googleMapsUrl} variant="outline" target="_blank" rel="noopener noreferrer">
                  Get Directions
                </Button>
              )}
            </div>

            <section className="mb-10">
              <h2 className="font-heading text-[30px] font-semibold mb-4">Property Description</h2>
              <p className="text-[17px] leading-relaxed text-brand-charcoal whitespace-pre-line">{property.description}</p>
            </section>

            {!isSold && property.ownerFinancing && property.downPayment !== undefined && property.interestRate !== undefined && property.termMonths && (
              <section className="mb-10">
                <PaymentCalculator
                  purchasePrice={property.cashPrice}
                  suggestedDownPayment={property.downPayment}
                  interestRate={property.interestRate}
                  termMonths={property.termMonths}
                  minMonthlyPayment={property.minMonthlyPayment ?? siteConfig.minMonthlyPayment}
                  propertyId={property.id}
                  propertyTitle={property.title}
                />
              </section>
            )}

            {!isSold && (
              <section className="mb-10">
                <MapSection property={property} />
              </section>
            )}

            <section className="mb-10">
              <h2 className="font-heading text-xl font-semibold mb-3">Share This Property</h2>
              <ShareButtons
                propertyUrlPath={`/properties/${property.slug}`}
                title={property.title}
                priceLabel={isSold ? "Sold" : formatCurrency(property.cashPrice)}
              />
            </section>

            <p className="text-xs text-brand-gray border-t border-brand-sand pt-4">{disclaimers.general}</p>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <QuickFacts property={property} />
              <div className="bg-brand-green text-white rounded-[10px] p-5 text-center">
                <p className="font-heading font-semibold mb-3">Have a question?</p>
                <div className="flex flex-col gap-2">
                  <TextUsLink
                    propertyTitle={property.title}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-[8px] bg-brand-gold text-brand-green-dark font-semibold"
                  >
                    Text Us
                  </TextUsLink>
                  <CallUsLink className="inline-flex min-h-[44px] items-center justify-center rounded-[8px] border border-white/50 font-semibold">
                    Call Us
                  </CallUsLink>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <MobileStickyBar status={property.status} propertyTitle={property.title} applyHref={`/apply?property=${property.id}`} backupListHref={`/buyer-list?property=${property.id}&backup=1`} />
    </div>
  );
}
