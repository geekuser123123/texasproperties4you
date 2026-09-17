import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desktop.goto('http://localhost:3000/properties/3-5-acres-near-bryan-brazos-county', { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'scripts/tmp/desktop-property-full.png', fullPage: true });

await desktop.goto('http://localhost:3000/available-properties', { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'scripts/tmp/desktop-available.png', fullPage: true });

await desktop.goto('http://localhost:3000/apply', { waitUntil: 'networkidle' });
await desktop.screenshot({ path: 'scripts/tmp/desktop-apply.png', fullPage: true });

await browser.close();
