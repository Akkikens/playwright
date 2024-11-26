import { test, expect } from '@playwright/test';

// Helper function to generate unique emails for testing
function generateUniqueEmail() {
  return `user_${Date.now()}@example.com`;
}

test.describe('Uber Eats Tests', () => {
  const baseUrl = 'https://www.ubereats.com/';
  const email = generateUniqueEmail();
  const password = 'Test@1234';

  test('1. Verify homepage loads correctly', async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page).toHaveTitle(/Uber Eats/);
  });

  test('2. Sign up with a new user', async ({ page }) => {
    await page.goto(`${baseUrl}signup`);
    await page.fill('[name="email"]', email);
    await page.fill('[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page.locator('h1')).toContainText('Let’s get started');
  });

  test('3. Log in with valid credentials', async ({ page }) => {
    await page.goto(`${baseUrl}login`);
    await page.fill('[name="email"]', email);
    await page.fill('[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page.locator('h1')).toContainText('Order food you love');
  });

  test('4. Search for a restaurant', async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill('[placeholder="What are you craving?"]', 'Pizza');
    await page.press('[placeholder="What are you craving?"]', 'Enter');
    await expect(page).toHaveURL(/search/);
    await expect(page.locator('h1')).toContainText('Pizza');
  });

  test('5. View a restaurant page', async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill('[placeholder="What are you craving?"]', 'Pizza');
    await page.press('[placeholder="What are you craving?"]', 'Enter');
    await page.click('a:has-text("Pizza Hut")');
    await expect(page.locator('h1')).toContainText('Pizza Hut');
  });

  test('6. Add an item to the cart', async ({ page }) => {
    await page.goto(`${baseUrl}store/pizza-hut`);
    await page.click('button:has-text("Add to Cart")');
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');
  });

  test('7. View cart details', async ({ page }) => {
    await page.goto(`${baseUrl}store/pizza-hut`);
    await page.click('button:has-text("Add to Cart")');
    await page.click('[data-testid="cart-icon"]');
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('h1')).toContainText('Your Cart');
  });

  test('8. Remove an item from the cart', async ({ page }) => {
    await page.goto(`${baseUrl}store/pizza-hut`);
    await page.click('button:has-text("Add to Cart")');
    await page.click('[data-testid="cart-icon"]');
    await page.click('button:has-text("Remove")');
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('0');
  });

  test('9. Apply a promo code', async ({ page }) => {
    await page.goto(`${baseUrl}cart`);
    await page.click('button:has-text("Add Promo Code")');
    await page.fill('[name="promoCode"]', 'PROMO123');
    await page.click('button:has-text("Apply")');
    await expect(page.locator('.promo-code-applied')).toContainText('PROMO123');
  });

  test('10. Proceed to checkout', async ({ page }) => {
    await page.goto(`${baseUrl}cart`);
    await page.click('button:has-text("Checkout")');
    await expect(page).toHaveURL(/checkout/);
    await expect(page.locator('h1')).toContainText('Checkout');
  });

  test('11. Add a new delivery address', async ({ page }) => {
    await page.goto(`${baseUrl}account/addresses`);
    await page.click('button:has-text("Add Address")');
    await page.fill('[name="streetAddress"]', '123 Main St');
    await page.fill('[name="city"]', 'Springfield');
    await page.fill('[name="zipCode"]', '62701');
    await page.click('button:has-text("Save")');
    await expect(page.locator('.address-list')).toContainText('123 Main St');
  });

  test('12. View past orders', async ({ page }) => {
    await page.goto(`${baseUrl}account/orders`);
    await expect(page.locator('h1')).toContainText('Your Orders');
  });

  test('13. Rate a restaurant', async ({ page }) => {
    await page.goto(`${baseUrl}account/orders`);
    await page.click('button:has-text("Rate Order")');
    await page.click('[aria-label="5 stars"]');
    await page.click('button:has-text("Submit")');
    await expect(page.locator('.rating-success')).toBeVisible();
  });

  test('14. Log out from Uber Eats', async ({ page }) => {
    await page.goto(baseUrl);
    await page.click('[data-testid="profile-menu"]');
    await page.click('button:has-text("Log Out")');
    await expect(page).toHaveURL(`${baseUrl}login`);
  });

  test('15. Validate footer links', async ({ page }) => {
    await page.goto(baseUrl);
    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();
    for (let i = 0; i < count; ++i) {
      const link = footerLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).not.toBeNull();
    }
  });
});
