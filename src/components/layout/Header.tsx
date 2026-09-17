import Link from "next/link";
import { mainNav } from "@/data/site-config";
import { Logo } from "@/components/logo/Logo";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-brand-sand">
      <div className="container-brand flex h-16 items-center justify-between gap-4">
        <Link href="/" className="shrink-0" aria-label="Texas Properties 4 You home">
          <Logo layout="horizontal" variant="full-color" size={38} />
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-body font-semibold text-brand-charcoal hover:text-brand-green transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block shrink-0">
          <Button href="/available-properties" variant="primary" size="sm">
            View Available Properties
          </Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
