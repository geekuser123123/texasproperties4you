// Generates the full logo deliverable package (section 4 of the brand
// spec): SVG source files, PNG rasters at required sizes, JPG proofs,
// favicons, and social profile/share images — all four color variants,
// horizontal + stacked + icon-only layouts. Also copies the working set
// used by the live website into /public.
import sharp from "sharp";
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const BRAND_DIR = path.join(process.cwd(), "brand-assets");
const PUBLIC_DIR = path.join(process.cwd(), "public");

const TEXAS_OUTLINE_PATH =
  "M57 0 L91 0 L91 56 L133 64 L167 72 L180 110 L177 144 L152 170 L124 190 L95 200 L72 180 L38 150 L15 120 L4 100 L19 80 L0 50 L29 35 L29 10 L57 10 Z";
const LAND_LINE_1 = "M50 150 C 75 138, 112 138, 142 150 C 150 154, 156 154, 162 149";
const LAND_LINE_2 = "M68 173 C 90 163, 118 163, 140 173 C 145 176, 148 176, 152 172";

const VARIANTS = {
  "full-color": { icon: "#234D3C", land: "#C49A57", textPrimary: "#234D3C", textSecondary: "#6B6B6B", bg: "none" },
  white: { icon: "#FFFFFF", land: "#C49A57", textPrimary: "#FFFFFF", textSecondary: "#E5D8C4", bg: "#17372B" },
  "dark-green": { icon: "#17372B", land: "#C49A57", textPrimary: "#17372B", textSecondary: "#6B6B6B", bg: "none" },
  black: { icon: "#000000", land: "#000000", textPrimary: "#000000", textSecondary: "#242424", bg: "none" },
};

function iconSvg(variant, { bg = false } = {}) {
  const c = VARIANTS[variant];
  const background = bg && c.bg !== "none" ? `<rect width="180" height="200" fill="${c.bg}" />` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="200" viewBox="0 0 180 200">
  ${background}
  <path d="${TEXAS_OUTLINE_PATH}" fill="${c.icon}" />
  <path d="${LAND_LINE_1}" stroke="${c.land}" stroke-width="7" stroke-linecap="round" fill="none" />
  <path d="${LAND_LINE_2}" stroke="${c.land}" stroke-width="7" stroke-linecap="round" fill="none" />
</svg>`;
}

function horizontalSvg(variant, { bg = false } = {}) {
  const c = VARIANTS[variant];
  const background = bg && c.bg !== "none" ? `<rect width="900" height="220" fill="${c.bg}" />` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="220" viewBox="0 0 900 220" font-family="Poppins, Arial, sans-serif">
  ${background}
  <g transform="translate(10,10) scale(1)">
    <path d="${TEXAS_OUTLINE_PATH}" fill="${c.icon}" />
    <path d="${LAND_LINE_1}" stroke="${c.land}" stroke-width="7" stroke-linecap="round" fill="none" />
    <path d="${LAND_LINE_2}" stroke="${c.land}" stroke-width="7" stroke-linecap="round" fill="none" />
  </g>
  <text x="230" y="110" font-size="64" font-weight="700" fill="${c.textPrimary}">Texas</text>
  <text x="230" y="155" font-size="30" font-weight="600" letter-spacing="2" fill="${c.textSecondary}">PROPERTIES 4 YOU</text>
</svg>`;
}

function stackedSvg(variant, { bg = false } = {}) {
  const c = VARIANTS[variant];
  const background = bg && c.bg !== "none" ? `<rect width="500" height="420" fill="${c.bg}" />` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="420" viewBox="0 0 500 420" font-family="Poppins, Arial, sans-serif">
  ${background}
  <g transform="translate(160,10) scale(1)">
    <path d="${TEXAS_OUTLINE_PATH}" fill="${c.icon}" />
    <path d="${LAND_LINE_1}" stroke="${c.land}" stroke-width="7" stroke-linecap="round" fill="none" />
    <path d="${LAND_LINE_2}" stroke="${c.land}" stroke-width="7" stroke-linecap="round" fill="none" />
  </g>
  <text x="250" y="270" font-size="60" font-weight="700" fill="${c.textPrimary}" text-anchor="middle">Texas</text>
  <text x="250" y="310" font-size="26" font-weight="600" letter-spacing="2" fill="${c.textSecondary}" text-anchor="middle">PROPERTIES 4 YOU</text>
</svg>`;
}

const PAD = 0.92; // leave a small margin so shapes never touch the canvas edge

async function renderPng(svg, outPath, width, height, background) {
  const bg = background ?? { r: 0, g: 0, b: 0, alpha: 0 };
  const inner = await sharp(Buffer.from(svg), { density: 300 })
    .resize(Math.round(width * PAD), Math.round(height * PAD), { fit: "contain", background: bg })
    .toBuffer();
  await sharp({ create: { width, height, channels: 4, background: bg } })
    .composite([{ input: inner, gravity: "center" }])
    .png()
    .toFile(outPath);
}

async function renderJpg(svg, outPath, width, height, background) {
  const bg = background ?? "#FFFFFF";
  const inner = await sharp(Buffer.from(svg), { density: 300 })
    .resize(Math.round(width * PAD), Math.round(height * PAD), { fit: "contain", background: bg })
    .toBuffer();
  await sharp({ create: { width, height, channels: 3, background: bg } })
    .composite([{ input: inner, gravity: "center" }])
    .jpeg({ quality: 92 })
    .toFile(outPath);
}

async function run() {
  await mkdir(path.join(BRAND_DIR, "svg"), { recursive: true });
  await mkdir(path.join(BRAND_DIR, "png"), { recursive: true });
  await mkdir(path.join(BRAND_DIR, "jpg"), { recursive: true });
  await mkdir(path.join(BRAND_DIR, "favicon"), { recursive: true });
  await mkdir(path.join(BRAND_DIR, "social"), { recursive: true });
  await mkdir(PUBLIC_DIR, { recursive: true });

  for (const variant of Object.keys(VARIANTS)) {
    const icon = iconSvg(variant);
    const horizontal = horizontalSvg(variant);
    const stacked = stackedSvg(variant);

    await writeFile(path.join(BRAND_DIR, "svg", `icon-${variant}.svg`), icon);
    await writeFile(path.join(BRAND_DIR, "svg", `horizontal-${variant}.svg`), horizontal);
    await writeFile(path.join(BRAND_DIR, "svg", `stacked-${variant}.svg`), stacked);

    // Main PNG logo >= 2000px wide (horizontal, transparent bg)
    await renderPng(horizontal, path.join(BRAND_DIR, "png", `horizontal-${variant}-2000w.png`), 2000, 489);
    await renderPng(stacked, path.join(BRAND_DIR, "png", `stacked-${variant}-1500w.png`), 1500, 1260);
    await renderPng(icon, path.join(BRAND_DIR, "png", `icon-${variant}-2000w.png`), 2000, 2000);

    // JPG proofs (flattened onto white or cream)
    const jpgBg = variant === "white" ? "#17372B" : "#FFFFFF";
    await renderJpg(horizontal, path.join(BRAND_DIR, "jpg", `horizontal-${variant}.jpg`), 2000, 489, jpgBg);
  }

  // Favicons (full color icon)
  const favIcon = iconSvg("full-color");
  for (const size of [32, 180, 512]) {
    await renderPng(favIcon, path.join(BRAND_DIR, "favicon", `favicon-${size}.png`), size, size, "#FFFFFF");
  }
  await copyFile(path.join(BRAND_DIR, "favicon", "favicon-32.png"), path.join(PUBLIC_DIR, "favicon-32.png"));
  await copyFile(path.join(BRAND_DIR, "favicon", "favicon-180.png"), path.join(PUBLIC_DIR, "apple-touch-icon.png"));
  await copyFile(path.join(BRAND_DIR, "favicon", "favicon-512.png"), path.join(PUBLIC_DIR, "icon-512.png"));

  // Social profile image (square, full color on cream)
  const profileSvg = stackedSvg("full-color", { bg: false });
  await renderPng(profileSvg, path.join(BRAND_DIR, "social", "profile-1200x1200.png"), 1200, 1200, "#F6F2E9");
  await copyFile(path.join(BRAND_DIR, "social", "profile-1200x1200.png"), path.join(PUBLIC_DIR, "social-profile.png"));

  // Social sharing / OG default image (1200x630, horizontal lockup on cream)
  const ogSvgSource = horizontalSvg("full-color");
  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: "#F6F2E9" },
  })
    .composite([
      {
        input: await sharp(Buffer.from(ogSvgSource), { density: 300 }).resize(760).toBuffer(),
        gravity: "center",
      },
    ])
    .png()
    .toFile(path.join(BRAND_DIR, "social", "og-default-1200x630.png"));
  await copyFile(
    path.join(BRAND_DIR, "social", "og-default-1200x630.png"),
    path.join(PUBLIC_DIR, "og-default.png")
  );

  // Working SVGs used directly by the website (header/footer/favicon)
  await writeFile(path.join(PUBLIC_DIR, "favicon.svg"), iconSvg("full-color"));

  console.log("Brand asset package generated in /brand-assets and copied into /public.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
