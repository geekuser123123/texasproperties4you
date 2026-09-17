import type { HiddenTrackingValues } from "@/lib/tracking";

export type LeadType = "application" | "buyer-list" | "contact" | "backup-list";

export interface LeadPayload {
  type: LeadType;
  submittedAt: string;
  name: string;
  phone: string;
  email: string;
  propertyId?: string;
  propertyTitle?: string;
  propertyUrl?: string;
  financingPreference?: string;
  desiredDownPayment?: string;
  desiredMonthlyPayment?: string;
  notes?: string;
  fields: Record<string, unknown>;
  tracking: Partial<HiddenTrackingValues>;
}

/**
 * Sends a captured lead to (1) a CRM webhook and (2) a notification
 * webhook (Slack, email service, GoHighLevel, HubSpot, Zapier/Make, etc.),
 * whichever are configured via environment variables. Every submission is
 * also logged server-side as a guaranteed fallback so no lead is lost
 * while integrations are being connected.
 *
 * To go live: set CRM_WEBHOOK_URL and/or LEAD_NOTIFICATION_WEBHOOK_URL in
 * your environment (see .env.example). No code changes are required.
 */
export async function submitLead(lead: LeadPayload): Promise<{ ok: true }> {
  console.log("[lead:new]", JSON.stringify(lead));

  const tasks: Promise<unknown>[] = [];

  const crmUrl = process.env.CRM_WEBHOOK_URL;
  if (crmUrl) {
    tasks.push(
      fetch(crmUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).catch((err) => console.error("[lead:crm-error]", err))
    );
  }

  const notifyUrl = process.env.LEAD_NOTIFICATION_WEBHOOK_URL;
  if (notifyUrl) {
    tasks.push(
      fetch(notifyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `New ${lead.type} lead: ${lead.name} (${lead.phone}) — ${lead.propertyTitle ?? "no property selected"}`,
          lead,
        }),
      }).catch((err) => console.error("[lead:notify-error]", err))
    );
  }

  await Promise.all(tasks);
  return { ok: true };
}
