import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { properties } from "@/data/properties";
import { BuyerListForm } from "@/components/forms/BuyerListForm";
import { BackupListForm } from "@/components/forms/BackupListForm";

export const metadata: Metadata = {
  title: "Buyer List",
  description: "Join the Texas Properties 4 You buyer list and be the first to know when new land, houses, and acreage become available.",
};

function getPropertyById(id: string) {
  return properties.find((p) => p.id === id);
}

export default async function BuyerListPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const propertyId = typeof params.property === "string" ? params.property : undefined;
  const isBackup = params.backup === "1";

  if (isBackup && propertyId) {
    const property = getPropertyById(propertyId);
    if (!property) notFound();

    return (
      <div className="container-brand py-10 md:py-14">
        <header className="mb-8 max-w-2xl">
          <h1 className="font-heading text-[30px] md:text-[40px] font-semibold mb-3">Join The Backup List</h1>
          <p className="text-[17px] text-brand-gray">
            This property is currently pending. Join the backup list to be notified right away if it becomes available.
          </p>
        </header>
        <div className="max-w-2xl">
          <BackupListForm property={property} />
        </div>
      </div>
    );
  }

  return (
    <div className="container-brand py-10 md:py-14">
      <header className="mb-8 max-w-2xl">
        <h1 className="font-heading text-[30px] md:text-[40px] font-semibold mb-3">See New Properties First</h1>
        <p className="text-[17px] text-brand-gray">
          We sell properties regularly. Join the list and we will send you new deals when they become available.
        </p>
      </header>
      <div className="max-w-2xl">
        <BuyerListForm />
      </div>
    </div>
  );
}
