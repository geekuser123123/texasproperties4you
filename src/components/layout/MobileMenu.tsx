"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { mainNav, siteConfig } from "@/data/site-config";
import { Logo } from "@/components/logo/Logo";
import { Button, getButtonClasses } from "@/components/ui/Button";
import { TextUsLink } from "@/components/ContactLinks";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-[8px] text-brand-green"
      >
        {open ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M6 6 L18 18 M18 6 L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 top-[64px] z-40 flex flex-col bg-white overflow-y-auto">
          <div className="p-5 border-b border-brand-sand">
            <TextUsLink onClick={close} className={getButtonClasses({ variant: "gold", fullWidth: true })}>
              Text Us: {siteConfig.phoneDisplay}
            </TextUsLink>
          </div>
          <nav className="flex flex-col p-5 gap-1" aria-label="Mobile">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="py-3.5 text-lg font-heading font-semibold text-brand-charcoal border-b border-brand-sand/70 last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-5 flex flex-col gap-3">
            <Button href="/available-properties" variant="primary" fullWidth onClick={close}>
              View Available Properties
            </Button>
            <div className="flex justify-center pt-2">
              <Logo layout="stacked" variant="dark-green" size={44} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
