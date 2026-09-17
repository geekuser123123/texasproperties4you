import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage();
let hasError = false;
page.on('console', msg => { if (msg.type() === 'error') { console.log('CONSOLE ERROR:', msg.text()); hasError = true; } });
page.on('pageerror', err => { console.log('PAGE ERROR:', err.message); hasError = true; });

await page.goto('http://localhost:3000/apply?property=TP-1001', { waitUntil: 'networkidle' });
await page.fill('#name', 'Jane Test Buyer');
await page.fill('#phone', '5551234567');
await page.fill('#email', 'jane@example.com');
await page.selectOption('#financing', 'owner-financing');
await page.selectOption('#timeline', 'asap');
await page.fill('#downPayment', '4000');
await page.fill('#monthlyPayment', '300');
await page.fill('#currentAddress', '123 Main St');
await page.click('button[type=submit]');
await page.waitForTimeout(500);
const errorText = await page.locator('text=minimum monthly payment').first().textContent().catch(() => null);
console.log('Validation message shown:', errorText);

await page.fill('#monthlyPayment', '500');
await page.click('button[type=submit]');
await page.waitForTimeout(1000);
const success = await page.locator('text=Thanks. We received your application.').count();
console.log('Success shown:', success > 0);

console.log('Had console/page errors:', hasError);
await browser.close();
