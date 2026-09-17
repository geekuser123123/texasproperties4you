import { NextRequest, NextResponse } from "next/server";
import { submitLead } from "@/lib/leads";

export async function POST(req: NextRequest) {
  const body = await req.json();

  await submitLead({
    type: "buyer-list",
    submittedAt: new Date().toISOString(),
    name: body.name ?? "",
    phone: body.phone ?? "",
    email: body.email ?? "",
    financingPreference: body.financingPreference,
    desiredDownPayment: body.budget,
    notes: `Area: ${body.areaWanted ?? "-"}, County: ${body.countyWanted ?? "-"}, Type: ${body.propertyTypeWanted ?? "-"}, Payment range: ${body.monthlyPaymentRange ?? "-"}, Acreage: ${body.acreageWanted ?? "-"}, Timeline: ${body.timeline ?? "-"}`,
    fields: body,
    tracking: body.tracking ?? {},
  });

  return NextResponse.json({ ok: true });
}
