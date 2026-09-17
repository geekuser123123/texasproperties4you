import { NextRequest, NextResponse } from "next/server";
import { submitLead } from "@/lib/leads";

export async function POST(req: NextRequest) {
  const body = await req.json();

  await submitLead({
    type: "backup-list",
    submittedAt: new Date().toISOString(),
    name: body.name ?? "",
    phone: body.phone ?? "",
    email: body.email ?? "",
    propertyId: body.propertyId,
    propertyTitle: body.propertyTitle,
    propertyUrl: body.propertyUrl,
    desiredDownPayment: body.desiredDownPayment,
    notes: body.notes,
    fields: body,
    tracking: body.tracking ?? {},
  });

  return NextResponse.json({ ok: true });
}
