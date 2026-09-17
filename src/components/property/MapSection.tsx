"use client";

import { useEffect, useRef, useState } from "react";
import { Property } from "@/types/property";
import { DirectionsLinks } from "@/components/ContactLinks";
import { disclaimers } from "@/data/site-config";

export function MapSection({ property }: { property: Property }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const query = property.address
    ? encodeURIComponent(property.address)
    : property.gps
    ? `${property.gps.lat},${property.gps.lng}`
    : encodeURIComponent(`${property.nearestTown}, ${property.county}, TX`);

  const embedSrc = `https://maps.google.com/maps?q=${query}&z=12&output=embed`;

  return (
    <div id="location">
      <h2 className="font-heading text-[30px] md:text-[30px] font-semibold mb-4">Maps and Location</h2>

      <div ref={containerRef} className="aspect-[16/9] rounded-[10px] overflow-hidden bg-brand-sand border border-brand-sand">
        {shouldLoad ? (
          <iframe
            title={`Map showing the location of ${property.title}`}
            src={embedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-gray text-sm">
            Map loads as you scroll into view
          </div>
        )}
      </div>

      <dl className="grid sm:grid-cols-2 gap-4 mt-5 text-[15px]">
        {property.address && (
          <div>
            <dt className="font-semibold text-brand-charcoal">Address</dt>
            <dd className="text-brand-gray">{property.address}</dd>
          </div>
        )}
        {property.gps && (
          <div>
            <dt className="font-semibold text-brand-charcoal">GPS Coordinates</dt>
            <dd className="text-brand-gray">
              {property.gps.lat}, {property.gps.lng}
            </dd>
          </div>
        )}
        <div>
          <dt className="font-semibold text-brand-charcoal">Nearest Town</dt>
          <dd className="text-brand-gray">{property.nearestTown}</dd>
        </div>
        <div>
          <dt className="font-semibold text-brand-charcoal">County</dt>
          <dd className="text-brand-gray">{property.county}</dd>
        </div>
        {property.nearbyRoads && property.nearbyRoads.length > 0 && (
          <div>
            <dt className="font-semibold text-brand-charcoal">Nearby Major Roads</dt>
            <dd className="text-brand-gray">{property.nearbyRoads.join(", ")}</dd>
          </div>
        )}
        {property.driveTimes && property.driveTimes.length > 0 && (
          <div>
            <dt className="font-semibold text-brand-charcoal">Drive Times</dt>
            <dd className="text-brand-gray">
              {property.driveTimes.map((d) => `${d.city}: ${d.minutes} min`).join(" · ")}
            </dd>
          </div>
        )}
      </dl>

      <DirectionsLinks
        googleMapsUrl={property.googleMapsUrl}
        appleMapsUrl={property.appleMapsUrl}
        wazeUrl={property.wazeUrl}
        className="flex flex-wrap gap-3 mt-5"
      />

      <p className="text-xs text-brand-gray mt-4">{disclaimers.map}</p>
    </div>
  );
}
