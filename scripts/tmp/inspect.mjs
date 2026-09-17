import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage();
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
const h2 = page.locator('h2', { hasText: 'Owner Financing May Be Available' });
console.log(await h2.getAttribute('class'));
console.log(await h2.evaluate(el => getComputedStyle(el).color));
await browser.close();
