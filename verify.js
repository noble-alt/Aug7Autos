import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080');

  // Wait for the footer to be visible
  await page.waitForSelector('footer', { state: 'visible' });

  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();