import { chromium } from 'playwright';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

const pages = [
  { path: '/', name: 'home' },
  { path: '/available-properties', name: 'available' },
  { path: '/properties/3-5-acres-near-bryan-brazos-county', name: 'property-detail' },
  { path: '/apply', name: 'apply' },
];

for (const viewport of [{ width: 1440, height: 900, tag: 'desktop' }, { width: 390, height: 844, tag: 'mobile' }]) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  for (const p of pages) {
    await page.goto(`http://localhost:3000${p.path}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `/tmp/claude-0/-home-user-texasproperties4you/78183561-3b4a-52b5-b88c-446a5e8cfa3d/scratchpad/${p.name}-${viewport.tag}.png`, fullPage: true });
  }
  await context.close();
}

await browser.close();
console.log('done');
