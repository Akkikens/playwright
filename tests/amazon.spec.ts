import { test, expect } from '@playwright/test';

test.describe('Amazon Automation Test Suite', () => {
  const email = 'akshayhvingfun@gmail.com';
  const password = 'M@mudryk10';

  test('1. Login to Amazon', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    await page.click('#nav-link-accountList'); // Click on Sign-In
    await page.fill('input[name="email"]', email);
    await page.click('input#continue');
    await page.fill('input[name="password"]', password);
    await page.click('input#signInSubmit');
    // Verify login
    await expect(page.locator('#nav-link-accountList span.nav-line-1')).toContainText('Hello, Akshay');
  });

  test('2. Search for a product', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    await page.fill('input#twotabsearchtextbox', 'PlayStation 5');
    await page.click('input#nav-search-submit-button');
    // Ensure search results contain the query
    await expect(page).toHaveURL(/s\?k=PlayStation\+5/);
    await expect(page.locator('.s-main-slot')).toBeVisible(); // Ensure results are visible
  });

  test('3. Verify product details', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    await page.waitForSelector('input#twotabsearchtextbox', { timeout: 10000 });
    await page.fill('input#twotabsearchtextbox', 'MacBook Air');
    await page.click('input#nav-search-submit-button');
    await page.waitForSelector('.s-main-slot .s-result-item h2 a', { timeout: 10000 });
    await page.click('.s-main-slot .s-result-item h2 a'); // Click on the first product
    // Verify product details
    await page.waitForSelector('#productTitle', { timeout: 10000 });
    await expect(page.locator('#productTitle')).toBeVisible();
    await page.waitForSelector('#priceblock_ourprice, #priceblock_dealprice, #corePrice_feature_div', { timeout: 10000 });
    await expect(page.locator('#priceblock_ourprice, #priceblock_dealprice, #corePrice_feature_div')).toBeVisible();
  });

  test('4. Add a product to the cart', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    await page.waitForSelector('input#twotabsearchtextbox', { timeout: 10000 });
    await page.fill('input#twotabsearchtextbox', 'Headphones');
    await page.click('input#nav-search-submit-button');
    await page.waitForSelector('.s-main-slot .s-result-item h2 a', { timeout: 10000 });
    await page.click('.s-main-slot .s-result-item h2 a'); // Click the first product
    await page.waitForSelector('#add-to-cart-button', { timeout: 10000 });
    await page.click('#add-to-cart-button');
    // Verify cart count increases
    await page.waitForSelector('#nav-cart-count', { timeout: 10000 });
    const cartCount = await page.locator('#nav-cart-count').innerText();
    expect(parseInt(cartCount)).toBeGreaterThan(0);
  });

  test('6. Filter search results', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    await page.fill('input#twotabsearchtextbox', 'iPhone');
    await page.click('input#nav-search-submit-button');
    await page.waitForSelector('span:has-text("Apple")', { timeout: 10000 });
    await page.click('span:has-text("Apple")'); // Filter by brand
    // Ensure URL or results reflect the filter
    await expect(page.locator('.s-main-slot')).toBeVisible();
  });

  test('7. Validate customer reviews section', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    await page.fill('input#twotabsearchtextbox', 'Echo Dot');
    await page.click('input#nav-search-submit-button');
    await page.waitForSelector('.s-main-slot .s-result-item h2 a', { timeout: 10000 });
    await page.click('.s-main-slot .s-result-item h2 a'); // Click on the first product
    // Verify customer reviews
    await page.waitForSelector('#customerReviews', { timeout: 10000 });
    await expect(page.locator('#customerReviews')).toBeVisible();
  });

  test('9. Check category navigation', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    await page.waitForSelector('a:has-text("Books")', { timeout: 10000 });
    await page.click('a:has-text("Books")'); // Select "Books" category
    await page.waitForURL(/books/, { timeout: 10000 });
    await expect(page).toHaveURL(/books/);
  });

  test('10. Verify Help page navigation', async ({ page }) => {
    await page.goto('https://www.amazon.com');
    await page.waitForSelector('a:has-text("Help")', { timeout: 10000 }); // Wait for the Help link
    await page.locator('a:has-text("Help")').scrollIntoViewIfNeeded(); // Scroll into view if necessary
    await page.click('a:has-text("Help")'); // Click on "Help"
    
    // Wait for the URL and ensure the page has loaded
    await page.waitForURL(/help/, { timeout: 15000 });
    
    // Adjust the header text based on actual page structure
    await page.waitForSelector('h1:has-text("Amazon Customer Service")', { timeout: 10000 }); // Ensure the header is visible
    await expect(page.locator('h1:has-text("Amazon Customer Service")')).toBeVisible();
  });  
});