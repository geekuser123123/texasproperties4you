import { getHiddenTrackingValues } from "@/lib/tracking";

export async function submitForm(endpoint: string, fields: Record<string, unknown>) {
  const tracking = getHiddenTrackingValues();
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...fields, tracking }),
  });
  if (!res.ok) {
    throw new Error("Submission failed");
  }
  return res.json();
}
