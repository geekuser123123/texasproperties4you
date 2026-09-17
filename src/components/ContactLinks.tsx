"use client";

import { siteConfig } from "@/data/site-config";
import { trackEvent } from "@/lib/tracking";

export function TextUsLink({
  className,
  children,
  propertyTitle,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  propertyTitle?: string;
  onClick?: () => void;
}) {
  const body = propertyTitle
    ? `Hi, I'm interested in ${propertyTitle}. `
    : "Hi, I have a question about a property. ";
  return (
    <a
      href={`sms:${siteConfig.smsNumber}?body=${encodeURIComponent(body)}`}
      className={className}
      onClick={() => {
        trackEvent("text_button_clicked", { propertyTitle });
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}

export function CallUsLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <a
      href={`tel:${siteConfig.phoneTel}`}
      className={className}
      onClick={() => trackEvent("call_button_clicked")}
    >
      {children}
    </a>
  );
}

export function DirectionsLinks({
  googleMapsUrl,
  appleMapsUrl,
  wazeUrl,
  className,
}: {
  googleMapsUrl?: string;
  appleMapsUrl?: string;
  wazeUrl?: string;
  className?: string;
}) {
  const track = (service: string) => trackEvent("directions_button_clicked", { service });
  return (
    <div className={className}>
      {googleMapsUrl && (
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("google_maps")}
          className="inline-flex min-h-[48px] items-center justify-center rounded-[8px] border-2 border-brand-green px-5 py-3 font-body font-semibold text-brand-green hover:bg-brand-green hover:text-white transition-colors"
        >
          Open In Google Maps
        </a>
      )}
      {appleMapsUrl && (
        <a
          href={appleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("apple_maps")}
          className="inline-flex min-h-[48px] items-center justify-center rounded-[8px] border-2 border-brand-green px-5 py-3 font-body font-semibold text-brand-green hover:bg-brand-green hover:text-white transition-colors"
        >
          Open In Apple Maps
        </a>
      )}
      {wazeUrl && (
        <a
          href={wazeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("waze")}
          className="inline-flex min-h-[48px] items-center justify-center rounded-[8px] border-2 border-brand-green px-5 py-3 font-body font-semibold text-brand-green hover:bg-brand-green hover:text-white transition-colors"
        >
          Open In Waze
        </a>
      )}
    </div>
  );
}
