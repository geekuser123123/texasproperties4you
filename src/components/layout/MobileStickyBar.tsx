"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { PropertyStatus } from "@/types/property";
import { TextUsLink } from "@/components/ContactLinks";

interface MobileStickyBarProps {
  status?: PropertyStatus;
  propertyTitle?: string;
  applyHref?: string;
  backupListHref?: string;
}

// The generic bar (no `status`) is rendered globally in the root layout and
// hides itself on pages that already have their own primary CTA — including
// property detail pages, which render their own status-aware bar directly.
const HIDDEN_PATHS = ["/apply", "/buyer-list", "/contact", "/properties/"];

export function MobileStickyBar({
  status,
  propertyTitle,
  applyHref = "/apply",
  backupListHref = "/buyer-list",
}: MobileStickyBarProps) {
  const pathname = usePathname();
  const isGenericGlobalBar = status === undefined;
  if (isGenericGlobalBar && HIDDEN_PATHS.some((p) => pathname.startsWith(p))) return null;

  let primary = { href: applyHref, label: "Apply Online" };
  if (status === "pending") primary = { href: backupListHref, label: "Join Backup List" };
  if (status === "sold") primary = { href: "/available-properties", label: "View Available Properties" };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-brand-sand bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <TextUsLink
          propertyTitle={propertyTitle}
          className="flex min-h-[52px] items-center justify-center rounded-[8px] border-2 border-brand-green font-body font-semibold text-brand-green"
        >
          Text Us
        </TextUsLink>
        <Link
          href={primary.href}
          className="flex min-h-[52px] items-center justify-center rounded-[8px] bg-brand-green font-body font-semibold text-white"
        >
          {primary.label}
        </Link>
      </div>
    </div>
  );
}
