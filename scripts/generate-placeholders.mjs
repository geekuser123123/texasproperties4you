// Generates tasteful placeholder photography for sample properties and a
// social share fallback image. These stand in for real listing photos —
// replace files under public/properties/<slug>/ with actual photos when
// available (same filenames keep the site working with no code changes).
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public", "properties");

const GREEN = "#234D3C";
const GREEN_DARK = "#17372B";
const GOLD = "#C49A57";
const SAND = "#E5D8C4";
const CREAM = "#F6F2E9";

const ICONS = {
  land: `<path d="M40 210 L120 90 L170 150 L210 110 L260 210 Z" />`,
  acreage: `<path d="M30 200 Q 90 140 150 190 T 270 190 L 270 220 L 30 220 Z" /><circle cx="220" cy="110" r="26" />`,
  house: `<path d="M60 200 V120 L150 60 L240 120 V200 Z" /><rect x="130" y="150" width="40" height="50" fill="${CREAM}" />`,
  "mobile-home": `<rect x="50" y="120" width="200" height="80" rx="6" /><rect x="70" y="140" width="40" height="30" fill="${CREAM}" /><rect x="140" y="140" width="40" height="30" fill="${CREAM}" />`,
  "residential-lot": `<path d="M40 210 L 260 210 L 230 100 L 70 100 Z" fill="none" stroke="${GOLD}" stroke-width="6" />`,
  investment: `<path d="M40 200 L90 150 L130 175 L190 100 L260 140" fill="none" stroke="${GOLD}" stroke-width="8" stroke-linecap="round" />`,
  commercial: `<rect x="70" y="90" width="160" height="120" /><rect x="95" y="115" width="30" height="30" fill="${CREAM}" /><rect x="140" y="115" width="30" height="30" fill="${CREAM}" /><rect x="185" y="115" width="30" height="30" fill="${CREAM}" /><rect x="95" y="160" width="30" height="30" fill="${CREAM}" /><rect x="140" y="160" width="30" height="30" fill="${CREAM}" /><rect x="185" y="160" width="30" height="30" fill="${CREAM}" />`,
};

function placeholderSvg({ width, height, type, caption }) {
  const icon = ICONS[type] || ICONS.land;
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${SAND}" />
        <stop offset="100%" stop-color="${CREAM}" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <g transform="translate(${width / 2 - 150}, ${height / 2 - 170}) scale(${Math.min(width, height) / 420})" fill="${GREEN}" opacity="0.9">
      ${icon}
    </g>
    <rect x="0" y="${height - 64}" width="${width}" height="64" fill="${GREEN_DARK}" opacity="0.92" />
    <text x="${width / 2}" y="${height - 24}" font-family="Arial, sans-serif" font-size="${Math.round(height * 0.045)}" fill="#FFFFFF" text-anchor="middle">${caption}</text>
  </svg>`;
}

async function renderJpg(svg, outPath, width, height) {
  await sharp(Buffer.from(svg), { density: 150 })
    .resize(width, height)
    .jpeg({ quality: 78 })
    .toFile(outPath);
}

const properties = [
  { slug: "tp-1001", type: "land", captions: ["Front of the property", "Open, level building area", "Scattered oak trees", "Paved county road frontage"] },
  { slug: "tp-1002", type: "acreage", captions: ["Hill country view", "Native grasses and cedar", "Gravel road access"] },
  { slug: "tp-1003", type: "house", captions: ["Front exterior", "Living area", "Kitchen", "Backyard"] },
  { slug: "tp-1004", type: "mobile-home", captions: ["Cleared, level lot", "Gravel road access"] },
  { slug: "tp-1005", type: "residential-lot", captions: ["Wooded lot near Lake Fork", "Paved subdivision road"] },
  { slug: "tp-1006", type: "commercial", captions: ["Corner lot, highway frontage", "Frontage road view"] },
  { slug: "tp-1007", type: "investment", captions: ["Open pasture", "Light woods"] },
  { slug: "tp-1008", type: "house", captions: ["Front exterior", "Backyard with shade trees"] },
  { slug: "tp-1009", type: "acreage", captions: ["Sold — open land"] },
  { slug: "tp-1010", type: "house", captions: ["Sold — front of home"] },
  { slug: "tp-1011", type: "land", captions: ["Sold — cleared land"] },
  { slug: "tp-1012", type: "mobile-home", captions: ["Sold — cleared lot"] },
];

async function run() {
  for (const prop of properties) {
    const dir = path.join(OUT_DIR, prop.slug);
    await mkdir(dir, { recursive: true });

    // Main photo
    await renderJpg(
      placeholderSvg({ width: 1200, height: 800, type: prop.type, caption: prop.captions[0] }),
      path.join(dir, "main.jpg"),
      1200,
      800
    );

    // Gallery photos
    for (let i = 0; i < prop.captions.length; i++) {
      await renderJpg(
        placeholderSvg({ width: 1200, height: 800, type: prop.type, caption: prop.captions[i] }),
        path.join(dir, `${i + 1}.jpg`),
        1200,
        800
      );
    }

    // Map placeholder (used only if a real static map image isn't supplied)
    await renderJpg(
      placeholderSvg({ width: 1200, height: 700, type: prop.type, caption: "Map reference image" }),
      path.join(dir, "map.jpg"),
      1200,
      700
    );
  }

  console.log(`Generated placeholder photography for ${properties.length} properties.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
