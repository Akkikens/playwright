import { test, expect } from '@playwright/test';

// Helper function to generate a unique username
function generateUniqueUsername() {
  return `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

test.describe('Parabank Tests', () => {
  let uniqueUsername: string;
  const password = 'Test@123';
  const baseUrl = 'https://parabank.parasoft.com/parabank';

  test('1. Register a new user', async ({ page }) => {
    uniqueUsername = generateUniqueUsername(); // Generate unique username
    await page.goto(`${baseUrl}/register.htm`);

    // Fill out the registration form
    await page.fill('input[name="customer.firstName"]', 'John');
    await page.fill('input[name="customer.lastName"]', 'Doe');
    await page.fill('input[name="customer.address.street"]', '123 Main St');
    await page.fill('input[name="customer.address.city"]', 'Springfield');
    await page.fill('input[name="customer.address.state"]', 'IL');
    await page.fill('input[name="customer.address.zipCode"]', '62701');
    await page.fill('input[name="customer.phoneNumber"]', '5551234567');
    await page.fill('input[name="customer.ssn"]', '123-45-6789');
    await page.fill('input[name="customer.username"]', uniqueUsername);
    await page.fill('input[name="customer.password"]', password);
    await page.fill('input[name="repeatedPassword"]', password);

    // Submit the registration form
    await page.click('input[type="submit"]');

    // Handle potential registration errors
    if (await page.locator('h1:has-text("Error!")').isVisible()) {
      throw new Error('Registration failed. Ensure form fields are valid.');
    }

    // Verify successful registration
    await expect(page.locator('h1')).toHaveText(`Welcome ${uniqueUsername}`);
  });

  test('2. Log in with the registered user', async ({ page }) => {
    if (!uniqueUsername) throw new Error('Unique username not set. Ensure the registration test runs first.');

    await page.goto(baseUrl);

    // Log in with the unique username and password
    await page.fill('input[name="username"]', uniqueUsername);
    await page.fill('input[name="password"]', password);
    await page.click('input[value="Log In"]');

    // Verify successful login
    await expect(page.locator('.smallText')).toContainText(`Welcome ${uniqueUsername}`);
  });

  test('3. Check account overview page', async ({ page }) => {
    await page.goto(baseUrl);

    // Log in with the unique username and password
    await page.fill('input[name="username"]', uniqueUsername);
    await page.fill('input[name="password"]', password);
    await page.click('input[value="Log In"]');

    // Navigate to Account Overview
    await page.click('a:has-text("Accounts Overview")');

    // Verify account overview is displayed
    await expect(page.locator('h1')).toHaveText('Accounts Overview');
  });

  test('4. Transfer funds', async ({ page }) => {
    await page.goto(baseUrl);

    // Log in with the unique username and password
    await page.fill('input[name="username"]', uniqueUsername);
    await page.fill('input[name="password"]', password);
    await page.click('input[value="Log In"]');

    // Navigate to Transfer Funds page
    await page.click('a:has-text("Transfer Funds")');

    // Fill out transfer form
    await page.fill('input[name="amount"]', '100');
    await page.selectOption('select[name="fromAccountId"]', { index: 0 });
    await page.selectOption('select[name="toAccountId"]', { index: 1 });
    await page.click('input[value="Transfer"]');

    // Verify transfer success message
    await expect(page.locator('#rightPanel p')).toHaveText('Transfer Complete!');
  });

  test('5. Log out from Parabank', async ({ page }) => {
    await page.goto(baseUrl);

    // Log in with the unique username and password
    await page.fill('input[name="username"]', uniqueUsername);
    await page.fill('input[name="password"]', password);
    await page.click('input[value="Log In"]');

    // Log out
    await page.click('a:has-text("Log Out")');

    // Verify redirection to login page
    await expect(page.locator('h2')).toHaveText('Customer Login');
  });
});
