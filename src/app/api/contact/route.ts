import { NextRequest, NextResponse } from "next/server";
import { submitLead } from "@/lib/leads";

export async function POST(req: NextRequest) {
  const body = await req.json();

  await submitLead({
    type: "contact",
    submittedAt: new Date().toISOString(),
    name: body.name ?? "",
    phone: body.phone ?? "",
    email: body.email ?? "",
    propertyTitle: body.propertyOfInterest,
    notes: body.message,
    fields: body,
    tracking: body.tracking ?? {},
  });

  return NextResponse.json({ ok: true });
}
