import { test, expect } from '@playwright/test';

test.describe('YouTube Website Tests', () => {

  test('Homepage loads correctly', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    await expect(page).toHaveTitle(/YouTube/);
  });

  test('Search functionality works', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    await page.fill('input#search', 'Playwright testing');
    await page.click('button#search-icon-legacy');
    await expect(page).toHaveURL(/search_query=Playwright\+testing/);
  });

  test('Video playback works', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    await page.fill('input#search', 'Playwright testing');
    await page.click('button#search-icon-legacy');
    await page.click('a#video-title');
    await expect(page.locator('.html5-video-player')).toBeVisible();
  });

  test('Check Trending page', async ({ page }) => {
    await page.goto('https://www.youtube.com/feed/trending');
    await expect(page).toHaveURL(/feed\/trending/);
  });

  test('Check Music page', async ({ page }) => {
    await page.goto('https://www.youtube.com/feed/music');
    await expect(page).toHaveURL(/feed\/music/);
  });

  test('Check Movies & Shows page', async ({ page }) => {
    await page.goto('https://www.youtube.com/feed/storefront');
    await expect(page).toHaveURL(/feed\/storefront/);
  });

  test('Check Live page', async ({ page }) => {
    await page.goto('https://www.youtube.com/live');
    await expect(page).toHaveURL(/live/);
  });

  test('Check Gaming page', async ({ page }) => {
    await page.goto('https://www.youtube.com/gaming');
    await expect(page).toHaveURL(/gaming/);
  });

  test('Check News page', async ({ page }) => {
    await page.goto('https://www.youtube.com/news');
    await expect(page).toHaveURL(/news/);
  });

  test('Footer links are clickable', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();
    for (let i = 0; i < count; ++i) {
      const link = footerLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).not.toBeNull();
    }
  });

  test('Check About page', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    await page.click('a[href="/about/"]');
    await expect(page).toHaveURL(/about/);
  });

  test('Check Press page', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    await page.click('a[href="/t/press"]');
    await expect(page).toHaveURL(/press/);
  });

  test('Check Creators page', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    await page.click('a[href="/creators"]');
    await expect(page).toHaveURL(/creators/);
  });

  test('Check Advertise page', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    await page.click('a[href="/ads"]');
    await expect(page).toHaveURL(/ads/);
  });

  test('Check Developers page', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    await page.click('a[href="/yt/dev/"]');
    await expect(page).toHaveURL(/dev/);
  });

  test('Sign-in page loads correctly', async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    await page.click('button[aria-label="Sign in"]');
    await expect(page).toHaveURL(/accounts\.google\.com/);
  });

});
