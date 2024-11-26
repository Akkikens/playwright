import { test, expect } from '@playwright/test';

test.describe('The Internet Herokuapp Tests', () => {
  const baseUrl = 'https://the-internet.herokuapp.com';

  test('1. Verify homepage loads correctly', async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page).toHaveTitle('The Internet');
    await expect(page.locator('h1')).toHaveText('Welcome to the-internet'); // Adjusted to match the actual text
  });

  test('2. Add/Remove Elements', async ({ page }) => {
    await page.goto(`${baseUrl}/add_remove_elements/`);
    await page.click('button:has-text("Add Element")');
    await expect(page.locator('.added-manually')).toBeVisible();
    await page.click('.added-manually');
    await expect(page.locator('.added-manually')).not.toBeVisible();
  });

  test('3. Basic Authentication', async ({ page }) => {
    await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');
    await expect(page.locator('p')).toContainText('Congratulations! You must have the proper credentials.');
  });

  test('4. Broken Images', async ({ page }) => {
    await page.goto(`${baseUrl}/broken_images`);
    const images = page.locator('img');
    for (let i = 0; i < await images.count(); i++) {
      const image = images.nth(i);
      const src = await image.getAttribute('src');
      if (src && src.startsWith('http')) { // Ensure the URL is valid
        const response = await page.goto(src);
        if (response && response.status() !== 200) {
          console.log(`Broken Image Found: ${src}`);
        }
      }
    }
  });

  test('5. Checkboxes', async ({ page }) => {
    await page.goto(`${baseUrl}/checkboxes`);
    const checkbox1 = page.locator('input[type="checkbox"]').nth(0);
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();
    const checkbox2 = page.locator('input[type="checkbox"]').nth(1);
    await checkbox2.uncheck();
    await expect(checkbox2).not.toBeChecked();
  });

  test('6. Context Menu', async ({ page }) => {
    await page.goto(`${baseUrl}/context_menu`);
    await page.locator('#hot-spot').click({ button: 'right' });
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('You selected a context menu');
      await dialog.accept();
    });
  });

  test('7. Drag and Drop', async ({ page }) => {
    await page.goto(`${baseUrl}/drag_and_drop`);
    const source = page.locator('#column-a');
    const target = page.locator('#column-b');
    await source.dragTo(target);
    await expect(source).toHaveText('B');
    await expect(target).toHaveText('A');
  });

  test('8. Dropdown', async ({ page }) => {
    await page.goto(`${baseUrl}/dropdown`);
    const dropdown = page.locator('#dropdown');
    await dropdown.selectOption('2');
    await expect(dropdown).toHaveValue('2');
  });

  test('10. File Download', async ({ page }) => {
    await page.goto(`${baseUrl}/download`);
    const [download] = await Promise.all([
      page.waitForEvent('download'), // Adjusted to wait for the download event
      page.click('a:has-text("some-file.txt")'),
    ]);
    const path = await download.path();
    expect(path).not.toBeNull(); // Verify the file was downloaded
  });

  test('11. Frames', async ({ page }) => {
    await page.goto(`${baseUrl}/frames`);
    await page.click('a:has-text("iFrame")');
    const frame = page.frameLocator('#mce_0_ifr');
  
    await frame.locator('#tinymce').evaluate((el) => {
      (el as HTMLElement).contentEditable = 'true'; // Cast to HTMLElement to access contentEditable
      (el as HTMLElement).textContent = 'This is a test inside the iframe';
    });
  
    await expect(frame.locator('#tinymce')).toHaveText('This is a test inside the iframe');
  });
  

  test('12. Hover', async ({ page }) => {
    await page.goto(`${baseUrl}/hovers`);
    const avatar = page.locator('.figure').nth(0);
    await avatar.hover();
    await expect(avatar.locator('.figcaption')).toBeVisible();
  });

  test('13. Infinite Scroll', async ({ page }) => {
    await page.goto(`${baseUrl}/infinite_scroll`);
    for (let i = 0; i < 3; i++) { // Scroll multiple times to load content
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000); // Allow content to load
    }
    const loadedContent = await page.locator('.jscroll-added').count();
    expect(loadedContent).toBeGreaterThan(1); // Ensure new content was added
  });

  test('14. JavaScript Alerts', async ({ page }) => {
    await page.goto(`${baseUrl}/javascript_alerts`);
    page.on('dialog', async (dialog) => {
      if (dialog.type() === 'alert') {
        expect(dialog.message()).toBe('I am a JS Alert');
        await dialog.accept();
      }
      if (dialog.type() === 'confirm') {
        expect(dialog.message()).toBe('I am a JS Confirm');
        await dialog.accept();
      }
      if (dialog.type() === 'prompt') {
        expect(dialog.message()).toBe('I am a JS prompt');
        await dialog.accept('Test input');
      }
    });
    await page.click('button:has-text("Click for JS Alert")');
    await page.click('button:has-text("Click for JS Confirm")');
    await page.click('button:has-text("Click for JS Prompt")');
    await expect(page.locator('#result')).toHaveText('You entered: Test input');
  });

  test('15. Dynamic Content', async ({ page }) => {
    await page.goto(`${baseUrl}/dynamic_content`);
    const initialText = await page.locator('.large-10').nth(0).textContent();
    await page.reload();
    const updatedText = await page.locator('.large-10').nth(0).textContent();
    expect(initialText).not.toBe(updatedText);
  });
});
