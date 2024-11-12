import { test, expect } from '@playwright/test';

test.describe('Amazon Website Tests', () => {
  
  test('Homepage loads correctly', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await expect(page).toHaveTitle(/Amazon/);
  });

  test('Search functionality works', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await page.fill('#twotabsearchtextbox', 'laptop');
    await page.click('#nav-search-submit-button');
    await expect(page).toHaveURL(/s?k=laptop/);
    await expect(page.locator('.s-main-slot')).toBeVisible();
  });


  // fails
  test('Navigate to a product page', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await page.fill('#twotabsearchtextbox', 'laptop');
    await page.click('#nav-search-submit-button');
    await page.click('.s-main-slot .s-result-item h2 a');
    await expect(page.locator('#productTitle')).toBeVisible();
  });

  test('Add a product to the cart', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await page.fill('#twotabsearchtextbox', 'laptop');
    await page.click('#nav-search-submit-button');
    await page.click('.s-main-slot .s-result-item h2 a');
    await page.click('#add-to-cart-button');
    await expect(page.locator('#huc-v2-order-row-confirm-text')).toBeVisible();
  });

  test('Remove a product from the cart', async ({ page }) => {
    await page.goto('https://www.amazon.com/gp/cart/view.html');
    await page.click('.sc-action-delete input');
    await expect(page.locator('.sc-your-amazon-cart-is-empty')).toBeVisible();
  });

  test('Cart updates quantity correctly', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await page.fill('#twotabsearchtextbox', 'headphones');
    await page.click('#nav-search-submit-button');
    await page.click('.s-main-slot .s-result-item h2 a');
    await page.click('#add-to-cart-button');
    await page.goto('https://www.amazon.com/gp/cart/view.html');
    await page.selectOption('select[name="quantity"]', '2');
    await expect(page.locator('#sc-subtotal-label-activecart')).toContainText('2 items');
  });

  test('Sign-in page loads correctly', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await page.click('#nav-link-accountList');
    await expect(page).toHaveURL(/ap\/signin/);
  });

  test('Today\'s Deals page loads correctly', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await page.click('a[href*="/gp/goldbox"]');
    await expect(page).toHaveURL(/goldbox/);
  });

  test('Customer Service page loads correctly', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await page.click('a[href*="/gp/help/customer"]');
    await expect(page).toHaveURL(/customer\/homepage/);
  });

  test('Best Sellers page loads correctly', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await page.click('a[href*="/gp/bestsellers"]');
    await expect(page).toHaveURL(/bestsellers/);
  });

  test('Footer links are clickable', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    const footerLinks = page.locator('div.navFooterVerticalRow.navAccessibility a');
    const count = await footerLinks.count();
    for (let i = 0; i < count; ++i) {
      const link = footerLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).not.toBeNull();
    }
  });

  test('Language change functionality', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await page.click('#icp-nav-flyout');
    await page.click('a[href*="language=en_US"]');
    await expect(page.locator('#nav-link-accountList')).toContainText('Hello');
  });

  test('Location change functionality', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await page.click('#nav-global-location-popover-link');
    await page.fill('#GLUXZipUpdateInput', '10001');
    await page.click('#GLUXZipUpdate');
    await page.click('.a-popover-footer .a-button-primary');
    await expect(page.locator('#nav-global-location-popover-link')).toContainText('New York');
  });

  test('Returns & Orders page loads correctly', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await page.click('#nav-orders');
    await expect(page).toHaveURL(/gp\/css\/order-history/);
  });

  test('Gift Cards page loads correctly', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await page.click('a[href*="/gift-cards"]');
    await expect(page).toHaveURL(/gift-cards/);
  });

});
