import { test, expect } from '@playwright/test';

function generateUniqueUsername() {
  return `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

test.describe('Parabank Registration Tests', () => {
  test('should register a new user with unique credentials', async ({ page }) => {
    // Navigate to the registration page
    await page.goto('https://parabank.parasoft.com/parabank/register.htm');

    // Generate unique credentials
    const uniqueUsername = generateUniqueUsername();
    const password = 'Test@123';

    // Fill out the form
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

    // Submit the form
    await page.screenshot({ path: 'screenshots/before_submission.png' });
    await page.click('input[type="submit"]');
    await page.screenshot({ path: 'screenshots/after_submission.png' });

    // Debugging: Log page content
    const pageContent = await page.content();
    console.log(pageContent);

    // Wait for the success message or redirection
    await page.waitForURL('**/accountoverview.htm', { timeout: 15000 });
    const successMessage = page.locator('p:has-text("Your account was created successfully.")');
    await expect(successMessage).toBeVisible({ timeout: 10000 });

    console.log(`Successfully registered with username: ${uniqueUsername}`);
  });
});
