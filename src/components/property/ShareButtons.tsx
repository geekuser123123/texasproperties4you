"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site-config";

export function ShareButtons({
  propertyUrlPath,
  title,
  priceLabel,
}: {
  propertyUrlPath: string;
  title: string;
  priceLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `${siteConfig.url}${propertyUrlPath}`;
  const smsBody = `Check out this property: ${title} — ${priceLabel}. ${fullUrl}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fall back silently, link is still visible in the address bar.
    }
  }

  const buttonClass =
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[8px] border border-brand-sand bg-white px-4 text-sm font-semibold text-brand-charcoal hover:border-brand-green transition-colors";

  return (
    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={copyLink} className={buttonClass}>
        {copied ? "Link Copied" : "Copy Property Link"}
      </button>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        Share On Facebook
      </a>
      <a href={`sms:?body=${encodeURIComponent(smsBody)}`} className={buttonClass}>
        Send By Text
      </a>
    </div>
  );
}
