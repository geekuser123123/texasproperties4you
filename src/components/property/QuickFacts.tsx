import { Property, PROPERTY_TYPE_LABELS } from "@/types/property";
import { formatCurrency } from "@/lib/format";

function Fact({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="py-3 border-b border-brand-sand last:border-0 flex justify-between gap-4">
      <dt className="text-brand-gray text-sm">{label}</dt>
      <dd className="text-brand-charcoal text-sm font-semibold text-right">{value}</dd>
    </div>
  );
}

export function QuickFacts({ property }: { property: Property }) {
  const isSold = property.status === "sold";

  return (
    <dl className="bg-white rounded-[10px] border border-brand-sand p-5">
      <h3 className="font-heading text-lg font-semibold mb-1">Quick Facts</h3>
      <Fact label="Property Type" value={PROPERTY_TYPE_LABELS[property.propertyType]} />
      <Fact label="Size" value={property.acreage} />
      <Fact label="County" value={property.county} />
      <Fact label="Nearest Town" value={property.nearestTown} />
      <Fact label="Address" value={property.address} />
      <Fact label="GPS Coordinates" value={property.gps ? `${property.gps.lat}, ${property.gps.lng}` : undefined} />
      <Fact label="Parcel ID" value={property.parcelId} />
      <Fact label="Road Access" value={property.roadAccess} />
      <Fact label="Utilities" value={property.utilities?.join(", ")} />
      <Fact label="Terrain / Condition" value={property.terrain} />
      <Fact label="Restrictions" value={property.restrictions} />
      {!isSold && (
        <>
          <Fact label="Cash Price" value={formatCurrency(property.cashPrice)} />
          {property.ownerFinancing && (
            <>
              <Fact label="Down Payment" value={property.downPayment !== undefined ? formatCurrency(property.downPayment) : undefined} />
              <Fact label="Interest Rate" value={property.interestRate !== undefined ? `${property.interestRate}%` : undefined} />
              <Fact label="Term Length" value={property.termMonths ? `${property.termMonths} months` : undefined} />
              <Fact label="Minimum Monthly Payment" value={formatCurrency(property.minMonthlyPayment ?? 450)} />
            </>
          )}
          <Fact label="Document Fee" value={property.documentFee !== undefined ? formatCurrency(property.documentFee) : undefined} />
          <Fact label="Closing Fee" value={property.closingFee !== undefined ? formatCurrency(property.closingFee) : undefined} />
        </>
      )}
      <Fact label="Status" value={isSold ? "Sold" : property.status === "pending" ? "Pending" : "Available"} />
    </dl>
  );
}
