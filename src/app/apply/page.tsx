import type { Metadata } from "next";
import { getAvailableProperties } from "@/data/properties";
import { ApplicationForm } from "@/components/forms/ApplicationForm";

export const metadata: Metadata = {
  title: "Apply Online",
  description: "Apply online for a property from Texas Properties 4 You. Simple application, quick review, easy paperwork.",
};

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const propertyId = typeof params.property === "string" ? params.property : undefined;
  const properties = getAvailableProperties();

  return (
    <div className="container-brand py-10 md:py-14">
      <header className="mb-8 max-w-2xl">
        <h1 className="font-heading text-[30px] md:text-[40px] font-semibold mb-3">Apply Online</h1>
        <p className="text-[17px] text-brand-gray">
          Fill out the form below to apply. We will review your application and contact you soon.
        </p>
      </header>

      <div className="max-w-2xl">
        <ApplicationForm properties={properties} preselectedPropertyId={propertyId} />
      </div>
    </div>
  );
}
