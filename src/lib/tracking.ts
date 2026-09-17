"use client";

/**
 * Lead + traffic source tracking.
 *
 * This captures the hidden fields required across all forms (see brand
 * spec sections 25-27): original traffic source, current traffic source,
 * campaign/ad names, first/last page visited, referral URL, device type,
 * and timestamps. Values persist in localStorage so the ORIGINAL source
 * survives even after the buyer browses multiple pages, per spec.
 *
 * Analytics + CRM integration points (Google Analytics, Meta Pixel, and a
 * CRM webhook) are wired through `trackEvent()` / `submitLead()` below.
 * Add the real measurement IDs and CRM endpoint via environment variables
 * (see .env.example) to activate them — with no keys configured these
 * calls safely no-op.
 */

const ORIGINAL_SOURCE_KEY = "tp4y_original_source";
const FIRST_PAGE_KEY = "tp4y_first_page";

export interface TrafficSource {
  source: string;
  medium: string;
  campaign: string;
  adName: string;
  fbAdId: string;
  referralUrl: string;
}

function readUtm(): TrafficSource {
  if (typeof window === "undefined") {
    return { source: "direct", medium: "", campaign: "", adName: "", fbAdId: "", referralUrl: "" };
  }
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  const gclid = params.get("gclid");

  let source = params.get("utm_source") || "";
  if (!source) {
    if (fbclid) source = "facebook";
    else if (gclid) source = "google-ads";
    else if (document.referrer) {
      try {
        source = new URL(document.referrer).hostname;
      } catch {
        source = "referral";
      }
    } else {
      source = "direct";
    }
  }

  return {
    source,
    medium: params.get("utm_medium") || (fbclid ? "paid-social" : gclid ? "cpc" : "none"),
    campaign: params.get("utm_campaign") || "",
    adName: params.get("utm_content") || "",
    fbAdId: fbclid || params.get("ad_id") || "",
    referralUrl: document.referrer || "",
  };
}

function getDeviceType(): string {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/tablet|ipad/i.test(ua)) return "tablet";
  if (/mobile|iphone|android/i.test(ua)) return "mobile";
  return "desktop";
}

/** Call once on app load (see TrackingProvider) to persist source data. */
export function captureTrafficSource() {
  if (typeof window === "undefined") return;
  const current = readUtm();
  window.sessionStorage.setItem("tp4y_current_source", JSON.stringify(current));

  if (!window.localStorage.getItem(ORIGINAL_SOURCE_KEY)) {
    window.localStorage.setItem(ORIGINAL_SOURCE_KEY, JSON.stringify(current));
  }
  if (!window.localStorage.getItem(FIRST_PAGE_KEY)) {
    window.localStorage.setItem(FIRST_PAGE_KEY, window.location.pathname);
  }
  window.sessionStorage.setItem("tp4y_last_page", window.location.pathname);
}

export function recordPageVisit(pathname: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem("tp4y_last_page", pathname);
  if (!window.localStorage.getItem(FIRST_PAGE_KEY)) {
    window.localStorage.setItem(FIRST_PAGE_KEY, pathname);
  }
}

export interface HiddenTrackingValues {
  original_source: string;
  original_medium: string;
  current_source: string;
  current_medium: string;
  campaign_name: string;
  ad_name: string;
  fb_ad_id: string;
  first_page_visited: string;
  last_page_before_submission: string;
  referral_url: string;
  date_submitted: string;
  time_submitted: string;
  device_type: string;
  page_url: string;
}

export function getHiddenTrackingValues(): HiddenTrackingValues {
  const now = new Date();
  const fallback: TrafficSource = { source: "direct", medium: "none", campaign: "", adName: "", fbAdId: "", referralUrl: "" };

  if (typeof window === "undefined") {
    return {
      original_source: fallback.source,
      original_medium: fallback.medium,
      current_source: fallback.source,
      current_medium: fallback.medium,
      campaign_name: "",
      ad_name: "",
      fb_ad_id: "",
      first_page_visited: "",
      last_page_before_submission: "",
      referral_url: "",
      date_submitted: now.toISOString().slice(0, 10),
      time_submitted: now.toTimeString().slice(0, 8),
      device_type: "unknown",
      page_url: "",
    };
  }

  const original: TrafficSource = JSON.parse(
    window.localStorage.getItem(ORIGINAL_SOURCE_KEY) || JSON.stringify(fallback)
  );
  const current: TrafficSource = JSON.parse(
    window.sessionStorage.getItem("tp4y_current_source") || JSON.stringify(original)
  );

  return {
    original_source: original.source,
    original_medium: original.medium,
    current_source: current.source,
    current_medium: current.medium,
    campaign_name: current.campaign || original.campaign,
    ad_name: current.adName || original.adName,
    fb_ad_id: current.fbAdId || original.fbAdId,
    first_page_visited: window.localStorage.getItem(FIRST_PAGE_KEY) || window.location.pathname,
    last_page_before_submission: window.sessionStorage.getItem("tp4y_last_page") || window.location.pathname,
    referral_url: original.referralUrl,
    date_submitted: now.toISOString().slice(0, 10),
    time_submitted: now.toTimeString().slice(0, 8),
    device_type: getDeviceType(),
    page_url: window.location.href,
  };
}

type GtagFn = (...args: unknown[]) => void;
type FbqFn = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: GtagFn;
    fbq?: FbqFn;
  }
}

/** Conversion event names used across the site (see README "Tracking Setup"). */
export type ConversionEvent =
  | "application_submitted"
  | "buyer_list_submitted"
  | "backup_list_submitted"
  | "contact_form_submitted"
  | "text_button_clicked"
  | "call_button_clicked"
  | "directions_button_clicked"
  | "calculator_used"
  | "photo_gallery_viewed"
  | "video_played";

export function trackEvent(event: ConversionEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", event, params);
  }
  if (window.fbq) {
    window.fbq("trackCustom", event, params);
  }
  if (process.env.NODE_ENV !== "production") {
    console.debug("[track]", event, params);
  }
}
