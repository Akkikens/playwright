import { test, expect } from '@playwright/test';

test.describe('Target Website Tests', () => {

  test('Homepage loads correctly', async ({ page }) => {
    await page.goto('https://www.target.com/');
    await expect(page).toHaveTitle(/Target/);
  });

  test('Search functionality works', async ({ page }) => {
    await page.goto('https://www.target.com/');
    await page.fill('[data-test="search-input"]', 'headphones');
    await page.press('[data-test="search-input"]', 'Enter');
    await expect(page).toHaveURL(/searchTerm=headphones/);
  });

  test('Navigate to a product page', async ({ page }) => {
    await page.goto('https://www.target.com/');
    await page.fill('[data-test="search-input"]', 'headphones');
    await page.press('[data-test="search-input"]', 'Enter');
    await page.click('[data-test="product-title"] a');
    await expect(page.locator('[data-test="product-title"]')).toBeVisible();
  });

  test('Add a product to the cart', async ({ page }) => {
    await page.goto('https://www.target.com/');
    await page.fill('[data-test="search-input"]', 'headphones');
    await page.press('[data-test="search-input"]', 'Enter');
    await page.click('[data-test="product-title"] a');
    await page.click('[data-test="addToCartButton"]');
    await expect(page.locator('[data-test="addToCartModal"]')).toBeVisible();
  });

  test('View cart', async ({ page }) => {
    await page.goto('https://www.target.com/');
    await page.click('[data-test="cart"]');
    await expect(page).toHaveURL(/cart/);
  });

  test('Remove a product from the cart', async ({ page }) => {
    // Add a product first
    await page.goto('https://www.target.com/');
    await page.fill('[data-test="search-input"]', 'headphones');
    await page.press('[data-test="search-input"]', 'Enter');
    await page.click('[data-test="product-title"] a');
    await page.click('[data-test="addToCartButton"]');
    // Go to cart and remove item
    await page.click('[data-test="cart"]');
    await page.click('[data-test="removeItem"]');
    await expect(page.locator('[data-test="emptyStateText"]')).toBeVisible();
  });

  test('Check store locator page', async ({ page }) => {
    await page.goto('https://www.target.com/store-locator/find-stores');
    await expect(page).toHaveTitle(/Find a Store/);
  });

  test('Check weekly ad page', async ({ page }) => {
    await page.goto('https://www.target.com/');
    await page.click('a[href*="/weekly-ad"]');
    await expect(page).toHaveURL(/weekly-ad/);
  });

  test('Sign-in page loads correctly', async ({ page }) => {
    await page.goto('https://www.target.com/');
    await page.click('[data-test="accountNav"]');
    await page.click('[data-test="accountNav-signIn"]');
    await expect(page).toHaveURL(/login/);
  });

  test('Gift cards page loads correctly', async ({ page }) => {
    await page.goto('https://www.target.com/gift-cards/');
    await expect(page).toHaveTitle(/Gift Cards/);
  });

  test('Categories menu works', async ({ page }) => {
    await page.goto('https://www.target.com/');
    await page.click('[data-test="categoryMenuButton"]');
    await expect(page.locator('[data-test="categoryMenu"]')).toBeVisible();
  });

  test('Footer links are clickable', async ({ page }) => {
    await page.goto('https://www.target.com/');
    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();
    for (let i = 0; i < count; ++i) {
      const link = footerLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).not.toBeNull();
    }
  });

  test('Check Target Circle page', async ({ page }) => {
    await page.goto('https://www.target.com/');
    await page.click('a[href*="/circle"]');
    await expect(page).toHaveURL(/circle/);
  });

  test('Check registries page', async ({ page }) => {
    await page.goto('https://www.target.com/');
    await page.click('a[href*="/gift-registry"]');
    await expect(page).toHaveURL(/gift-registry/);
  });

  test('Check order pickup page', async ({ page }) => {
    await page.goto('https://www.target.com/');
    await page.click('a[href*="/order-pickup"]');
    await expect(page).toHaveURL(/order-pickup/);
  });

});
