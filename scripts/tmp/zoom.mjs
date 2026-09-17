import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
const el = await page.locator('text=Owner Financing May Be Available').first();
await el.scrollIntoViewIfNeeded();
await page.screenshot({ path: 'scripts/tmp/owner-financing-zoom.png', clip: { x: 0, y: (await el.boundingBox()).y - 100, width: 1440, height: 400 } });
await browser.close();
