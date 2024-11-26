import { test, expect } from '@playwright/test';

test.describe('UI Testing Playground Tests', () => {
  const baseUrl = 'https://uitestingplayground.com';

  test.use({
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
  });

  test('1. Verify homepage loads correctly', async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page).toHaveTitle('UI Test Automation Playground');
    await expect(page.locator('h1')).toContainText('UI Test AutomationPlayground');
  });

  test('2. Click button test', async ({ page }) => {
    await page.goto(`${baseUrl}/click`);
    await page.click('button#badButton');
    await expect(page.locator('button#badButton')).toHaveClass(/btn-success/);
  });

  test('3. Text input test', async ({ page }) => {
    await page.goto(`${baseUrl}/textinput`);
    const inputText = 'Playwright Test';
    await page.fill('#newButtonName', inputText);
    await page.click('button#updatingButton');
    await expect(page.locator('button#updatingButton')).toHaveText(inputText);
  });

  test('4. Visibility test', async ({ page }) => {
    await page.goto(`${baseUrl}/visibility`);
    await page.click('button#hideButton');
    await expect(page.locator('button#removedButton')).toBeHidden();
    await expect(page.locator('button#zeroWidthButton')).toHaveCSS('width', '0px');
  });

  test('7. Dynamic table test', async ({ page }) => {
    await page.goto(`${baseUrl}/dynamictable`);
    const cpuValue = await page.locator('.bg-warning').textContent();
    await expect(cpuValue).not.toBeNull();
  });


  test('10. Mouse hover test', async ({ page }) => {
    await page.goto(`${baseUrl}/mouseover`);
    await page.hover('a:has-text("Click Me")');
    await page.click('a:has-text("Click Me")');
    await page.waitForTimeout(500);
    await page.click('a:has-text("Click Me")');
    await expect(page.locator('#clickCount')).toHaveText('2');
  });

  test('11. Non-breaking space test', async ({ page }) => {
    await page.goto(`${baseUrl}/nbsp`);
    await page.click('button:has-text("My Button")');
    await expect(page.locator('button:has-text("My Button")')).toBeVisible();
  });

  test('12. Scrollbars test', async ({ page }) => {
    await page.goto(`${baseUrl}/scrollbars`);
    await page.locator('#hidingButton').scrollIntoViewIfNeeded();
    await page.click('#hidingButton');
    await expect(page.locator('#hidingButton')).toBeVisible();
  });

  test('13. Load delay test', async ({ page }) => {
    await page.goto(`${baseUrl}/loaddelay`);
    await expect(page.locator('h3')).toHaveText('Load Delays');
  });

  test('15. Sample app login test', async ({ page }) => {
    await page.goto(`${baseUrl}/sampleapp`);
    await page.fill('input[name="UserName"]', 'test');
    await page.fill('input[name="Password"]', 'pwd');
    await page.click('button#login');
    await expect(page.locator('#loginstatus')).toHaveText('Welcome, test!');
  });
});
