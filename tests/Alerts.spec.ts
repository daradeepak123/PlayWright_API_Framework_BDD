import { test, expect } from '@playwright/test';

test('Handle JS Alert', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('I am a JS Alert');
    await dialog.accept();
  });

  await page.getByText('Click for JS Alert').click();

  await expect(page.locator('#result'))
    .toHaveText('You successfully clicked an alert');
    await page.pause()
});

test('Handle JS Confirm - Dismiss', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.on('dialog', async dialog => {
    await dialog.dismiss();
  });

  await page.getByText('Click for JS Confirm').click();

  await expect(page.locator('#result'))
    .toHaveText('You clicked: Cancel');
});

test('Handle JS Prompt', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    await dialog.accept('Playwright');
  });

  await page.getByText('Click for JS Prompt').click();

  await expect(page.locator('#result'))
    .toHaveText('You entered: Playwright');
});


