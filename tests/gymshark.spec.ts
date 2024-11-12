import { test, expect } from '@playwright/test';

test.describe('Gymshark Website Tests', () => {

  test('Homepage loads correctly', async ({ page }) => {
    await page.goto('https://www.gymshark.com/');
    await expect(page).toHaveTitle(/Gymshark/);
  });

  test('Navigate to Men\'s section', async ({ page }) => {
    await page.goto('https://www.gymshark.com/');
    await page.click('a[href="/collections/mens"]');
    await expect(page).toHaveURL(/collections\/mens/);
  });

  test('Navigate to Women\'s section', async ({ page }) => {
    await page.goto('https://www.gymshark.com/');
    await page.click('a[href="/collections/womens"]');
    await expect(page).toHaveURL(/collections\/womens/);
  });

  test('Search functionality works', async ({ page }) => {
    await page.goto('https://www.gymshark.com/');
    await page.click('button[aria-label="Search"]');
    await page.fill('input[placeholder="Search"]', 'leggings');
    await page.press('input[placeholder="Search"]', 'Enter');
    await expect(page).toHaveURL(/search.*leggings/);
  });

  test('Add product to cart', async ({ page }) => {
    await page.goto('https://www.gymshark.com/');
    await page.click('a[href="/collections/womens"]');
    await page.click('.product-card a');
    await page.click('button[data-testid="add-to-cart"]');
    await expect(page.locator('div[data-testid="mini-cart"]')).toBeVisible();
  });

  test('View cart', async ({ page }) => {
    await page.goto('https://www.gymshark.com/');
    await page.click('button[aria-label="Cart"]');
    await expect(page).toHaveURL(/cart/);
  });

  test('Remove product from cart', async ({ page }) => {
    // Add a product first
    await page.goto('https://www.gymshark.com/');
    await page.click('a[href="/collections/womens"]');
    await page.click('.product-card a');
    await page.click('button[data-testid="add-to-cart"]');
    // Go to cart and remove item
    await page.click('button[aria-label="Cart"]');
    await page.click('button[data-testid="remove-item"]');
    await expect(page.locator('p:has-text("Your cart is empty")')).toBeVisible();
  });

  test('Check customer service page', async ({ page }) => {
    await page.goto('https://www.gymshark.com/');
    await page.click('footer a[href="/pages/contact-us"]');
    await expect(page).toHaveURL(/contact-us/);
  });

  test('Check store locator page', async ({ page }) => {
    await page.goto('https://www.gymshark.com/');
    await page.click('footer a[href="/pages/stores"]');
    await expect(page).toHaveURL(/stores/);
  });

  test('Sign-in page loads correctly', async ({ page }) => {
    await page.goto('https://www.gymshark.com/');
    await page.click('button[aria-label="Account"]');
    await expect(page).toHaveURL(/account\/login/);
  });

  test('Check gift cards page', async ({ page }) => {
    await page.goto('https://www.gymshark.com/');
    await page.click('a[href="/products/gift-card"]');
    await expect(page).toHaveURL(/gift-card/);
  });

  test('Check blog page', async ({ page }) => {
    await page.goto('https://www.gymshark.com/');
    await page.click('footer a[href="/blogs/news"]');
    await expect(page).toHaveURL(/blogs\/news/);
  });

  test('Footer links are clickable', async ({ page }) => {
    await page.goto('https://www.gymshark.com/');
    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();
    for (let i = 0; i < count; ++i) {
      const link = footerLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).not.toBeNull();
    }
  });

  test('Check FAQs page', async ({ page }) => {
    await page.goto('https://www.gymshark.com/');
    await page.click('footer a[href="/pages/help"]');
    await expect(page).toHaveURL(/help/);
  });

  test('Check terms and conditions page', async ({ page }) => {
    await page.goto('https://www.gymshark.com/');
    await page.click('footer a[href="/pages/terms-conditions"]');
    await expect(page).toHaveURL(/terms-conditions/);
  });

});
