import { test, expect } from '@playwright/test';
import { writeFileSync, unlinkSync } from 'fs';

test.describe('Demo QA Website Tests', () => {
  const baseUrl = 'https://demoqa.com';

  test('1. Verify homepage loads correctly', async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page).toHaveTitle('DEMOQA');
  });

  test('3. Fill text box form', async ({ page }) => {
    await page.goto(`${baseUrl}/text-box`);
    await page.fill('#userName', 'John Doe');
    await page.fill('#userEmail', 'johndoe@example.com');
    await page.fill('#currentAddress', '123 Main Street');
    await page.fill('#permanentAddress', '456 Another Street');
    await page.click('#submit');
    await expect(page.locator('#output')).toBeVisible();
  });

  test('4. Check box selection', async ({ page }) => {
    await page.goto(`${baseUrl}/checkbox`);
    await page.click('label[for="tree-node-home"]'); // Select Home checkbox
    await expect(page.locator('.text-success')).toContainText(['home']); // Adjusted to handle multiple matches
  });

  test('5. Radio button selection', async ({ page }) => {
    await page.goto(`${baseUrl}/radio-button`);
    await page.click('label[for="yesRadio"]');
    await expect(page.locator('.text-success')).toHaveText('Yes');
  });

  test('6. Web tables add record', async ({ page }) => {
    await page.goto(`${baseUrl}/webtables`);
    await page.click('#addNewRecordButton');
    await page.fill('#firstName', 'Jane');
    await page.fill('#lastName', 'Doe');
    await page.fill('#userEmail', 'janedoe@example.com');
    await page.fill('#age', '30');
    await page.fill('#salary', '50000');
    await page.fill('#department', 'HR');
    await page.click('#submit');
    await expect(page.locator('div[role="gridcell"]')).toContainText(['Jane', 'Doe']); // Modified to check for full name
  });

  test('7. Buttons double-click and right-click', async ({ page }) => {
    await page.goto(`${baseUrl}/buttons`);
    await page.dblclick('#doubleClickBtn');
    await expect(page.locator('#doubleClickMessage')).toHaveText('You have done a double click');
    await page.click('#rightClickBtn', { button: 'right' });
    await expect(page.locator('#rightClickMessage')).toHaveText('You have done a right click');
  });

  test('8. Upload file', async ({ page }) => {
    const filePath = './example.txt'; // Path to the temporary file
    writeFileSync(filePath, 'Sample file content'); // Create the file dynamically
  
    await page.goto('https://demoqa.com/upload-download');
    await page.setInputFiles('#uploadFile', filePath);
    await expect(page.locator('#uploadedFilePath')).toContainText('example.txt');
  
    unlinkSync(filePath); // Clean up the file after the test
  });

  test('9. Alerts handling', async ({ page }) => {
    await page.goto(`${baseUrl}/alerts`);
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    await page.click('#alertButton');
    await page.click('#confirmButton');
    await expect(page.locator('#confirmResult')).toHaveText('You selected Ok');
  });

  test('10. Date picker selection', async ({ page }) => {
    await page.goto(`${baseUrl}/date-picker`);
    await page.click('#datePickerMonthYearInput');
    await page.selectOption('.react-datepicker__month-select', '5'); // June
    await page.selectOption('.react-datepicker__year-select', '2025');
    await page.click('.react-datepicker__day--015'); // 15th
    await expect(page.locator('#datePickerMonthYearInput')).toHaveValue('06/15/2025');
  });

  test('11. Slider movement', async ({ page }) => {
    await page.goto(`${baseUrl}/slider`);
    const slider = page.locator('.range-slider');
    await slider.fill('75');
    await expect(page.locator('#sliderValue')).toHaveValue('75');
  });

  test('12. Progress bar interaction', async ({ page }) => {
    await page.goto(`${baseUrl}/progress-bar`);
    await page.click('#startStopButton'); // Start the progress bar
    await page.waitForTimeout(5200); // Slightly increase timeout to ensure progress > 50%
    await page.click('#startStopButton'); // Stop the progress bar
    const progressValue = await page.locator('.progress-bar').textContent();
    expect(parseInt(progressValue || '0')).toBeGreaterThan(50); // Validate progress exceeds 50
  });

  test('13. Tabs navigation', async ({ page }) => {
    await page.goto(`${baseUrl}/tabs`);
    await page.click('#demo-tab-origin');
    await expect(page.locator('#demo-tabpane-origin')).toBeVisible();
  });

  test('14. Widgets - Accordian interaction', async ({ page }) => {
    await page.goto(`${baseUrl}/accordian`);
    await page.click('#section2Heading');
    await expect(page.locator('#section2Content')).toBeVisible();
  });

  test('15. Dynamic properties validation', async ({ page }) => {
    await page.goto(`${baseUrl}/dynamic-properties`);
    await page.waitForSelector('#enableAfter', { timeout: 10000 });
    await expect(page.locator('#enableAfter')).toBeEnabled();
  });
});
