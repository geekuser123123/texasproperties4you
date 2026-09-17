import { ReactNode } from "react";

export function LegalPageLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="container-brand py-10 md:py-14">
      <div className="max-w-3xl">
        <h1 className="font-heading text-[30px] md:text-[40px] font-semibold mb-2">{title}</h1>
        <p className="text-sm text-brand-gray mb-8">Last updated: {updated}</p>
        <div className="prose-legal space-y-5 text-[16px] leading-relaxed text-brand-charcoal">
          {children}
        </div>
      </div>
    </div>
  );
}
