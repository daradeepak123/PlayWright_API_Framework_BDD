import { test, expect } from '@playwright/test';

test('Handle new tab in Playwright', async ({ page }) => {

  // Navigate to the application
  await page.goto('https://the-internet.herokuapp.com/');

  // Wait for the new tab (popup)
  const popupPromise = page.waitForEvent('popup');

  // Click on Elemental Selenium
  await page.locator('text=Elemental Selenium').click();

  // Get the new tab
  const newTab = await popupPromise;

  // Wait for the new tab to load
  await newTab.waitForLoadState();

  // Get and print the title
  const title = await newTab.title();
  console.log('New Tab Title:', title);

  // Close the new tab
  await newTab.close();

  // Back to the parent page
  console.log('Parent Page Title:', await page.title());

  // Verify parent page title
  await expect(page).toHaveTitle('The Internet');
});