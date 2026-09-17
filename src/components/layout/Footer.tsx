import Link from "next/link";
import { footerNav, siteConfig, disclaimers } from "@/data/site-config";
import { Logo } from "@/components/logo/Logo";
import { formatPhoneDisplay } from "@/lib/format";
import { TextUsLink } from "@/components/ContactLinks";

export function Footer() {
  return (
    <footer className="bg-brand-green-dark text-white">
      <div className="container-brand py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo layout="stacked" variant="white" size={46} className="mb-4" />
          <p className="text-sm text-brand-sand/90 leading-relaxed">
            Affordable properties with simple terms, across Texas.
          </p>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-brand-gold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2.5">
            {footerNav.quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[15px] text-white/90 hover:text-brand-gold transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-brand-gold mb-4">
            Legal
          </h3>
          <ul className="space-y-2.5">
            {footerNav.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[15px] text-white/90 hover:text-brand-gold transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-brand-gold mb-4">
            Contact
          </h3>
          <ul className="space-y-2.5 text-[15px] text-white/90">
            <li>
              <a href={`tel:${siteConfig.phoneTel}`} className="hover:text-brand-gold transition-colors">
                {formatPhoneDisplay(siteConfig.phoneDisplay)}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-gold transition-colors">
                {siteConfig.email}
              </a>
            </li>
            <li className="pt-2">
              <TextUsLink className="inline-flex min-h-[44px] items-center rounded-[8px] bg-brand-gold px-5 font-body font-semibold text-brand-green-dark">
                Text Us
              </TextUsLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-brand py-6 text-xs leading-relaxed text-white/70 space-y-2">
          <p>{disclaimers.general}</p>
          <p>{disclaimers.financing}</p>
          <p className="pt-2 text-white/50">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
