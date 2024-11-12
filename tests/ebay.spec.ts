import { test, expect } from '@playwright/test';

test.describe('eBay Website Tests', () => {

  test('Homepage loads correctly', async ({ page }) => {
    await page.goto('https://www.ebay.com/');
    await expect(page).toHaveTitle(/Electronics, Cars, Fashion/);
  });

  test('Search functionality works', async ({ page }) => {
    await page.goto('https://www.ebay.com/');
    await page.fill('#gh-ac', 'camera');
    await page.click('#gh-btn');
    await expect(page).toHaveURL(/_nkw=camera/);
  });

  test('Navigate to a product page', async ({ page }) => {
    await page.goto('https://www.ebay.com/');
    await page.fill('#gh-ac', 'camera');
    await page.click('#gh-btn');
    await page.click('.s-item__link');
    await expect(page.locator('#itemTitle')).toBeVisible();
  });

  test('View cart', async ({ page }) => {
    await page.goto('https://www.ebay.com/');
    await page.click('#gh-cart');
    await expect(page).toHaveURL(/cart/);
  });

  test('Check daily deals page', async ({ page }) => {
    await page.goto('https://www.ebay.com/');
    await page.click('a[href*="deals"]');
    await expect(page).toHaveURL(/deals/);
  });

  test('Check help & contact page', async ({ page }) => {
    await page.goto('https://www.ebay.com/');
    await page.click('a[href*="help"]');
    await expect(page).toHaveURL(/help/);
  });

  test('Sign-in page loads correctly', async ({ page }) => {
    await page.goto('https://www.ebay.com/');
    await page.click('a[title="Sign in"]');
    await expect(page).toHaveURL(/signin/);
  });

  test('Check Sell page', async ({ page }) => {
    await page.goto('https://www.ebay.com/');
    await page.click('a[href*="/sl/sell"]');
    await expect(page).toHaveURL(/sl\/sell/);
  });

  test('Footer links are clickable', async ({ page }) => {
    await page.goto('https://www.ebay.com/');
    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();
    for (let i = 0; i < count; ++i) {
      const link = footerLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).not.toBeNull();
    }
  });

  test('Check Stores page', async ({ page }) => {
    await page.goto('https://www.ebay.com/');
    await page.click('a[href*="/stores"]');
    await expect(page).toHaveURL(/stores/);
  });

  test('Check Categories menu', async ({ page }) => {
    await page.goto('https://www.ebay.com/');
    await page.click('#gh-shop-a');
    await expect(page.locator('#gh-sbc-o')).toBeVisible();
  });

  test('Check About eBay page', async ({ page }) => {
    await page.goto('https://www.ebay.com/');
    await page.click('a[href*="/rpp/ebay-inc"]');
    await expect(page).toHaveURL(/ebay-inc/);
  });

  test('Check News page', async ({ page }) => {
    await page.goto('https://www.ebay.com/');
    await page.click('a[href*="/news"]');
    await expect(page).toHaveURL(/news/);
  });

  test('Check Announcements page', async ({ page }) => {
    await page.goto('https://www.ebay.com/');
    await page.click('a[href*="/announcements"]');
    await expect(page).toHaveURL(/announcements/);
  });

  test('Check Security Center page', async ({ page }) => {
    await page.goto('https://www.ebay.com/');
    await page.click('a[href*="/securitycenter"]');
    await expect(page).toHaveURL(/securitycenter/);
  });

});
