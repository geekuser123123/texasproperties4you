export type PropertyStatus = "available" | "pending" | "sold" | "hidden";

export type PropertyType =
  | "land"
  | "residential-lot"
  | "house"
  | "mobile-home"
  | "acreage"
  | "investment"
  | "commercial";

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  land: "Land",
  "residential-lot": "Residential Lot",
  house: "House",
  "mobile-home": "Mobile Home",
  acreage: "Acreage",
  investment: "Investment Property",
  commercial: "Commercial Property",
};

export interface DriveTime {
  city: string;
  minutes: number;
}

export interface PropertyPhoto {
  src: string;
  alt: string;
  caption?: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  status: PropertyStatus;
  featured?: boolean;
  propertyType: PropertyType;

  // Location
  county: string;
  nearestTown: string;
  address?: string;
  gps?: { lat: number; lng: number };
  parcelId?: string;
  nearbyRoads?: string[];
  driveTimes?: DriveTime[];
  googleMapsUrl?: string;
  appleMapsUrl?: string;
  wazeUrl?: string;
  mapEmbedUrl?: string;

  // Size
  acreage: string;
  acreageNumeric?: number;

  // Pricing
  cashPrice: number;
  ownerFinancing: boolean;
  downPayment?: number;
  interestRate?: number; // annual percent, e.g. 8.5
  termMonths?: number;
  minMonthlyPayment?: number; // defaults to 450 site-wide
  documentFee?: number;
  closingFee?: number;

  // Sold-only
  soldPriceVisible?: boolean;
  soldPrice?: number;
  soldNote?: string;
  soldDate?: string;

  // Details
  roadAccess?: string;
  utilities?: string[];
  restrictions?: string;
  terrain?: string;
  description: string;

  // Media
  mainPhoto: string;
  photos: PropertyPhoto[];
  video?: string;
  droneVideo?: string;
  mapImage?: string;
  surveyImage?: string;
  platImage?: string;

  // SEO
  searchDescription?: string;
  socialImage?: string;

  createdAt: string;
}

export const SITE_MIN_MONTHLY_PAYMENT = 450;
