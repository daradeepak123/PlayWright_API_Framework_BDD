import { test, expect } from '@playwright/test';

test('Upload a file', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');

  await page.setInputFiles('#file-upload', 'RunningNotes/Arrays.txt');

  await page.click('#file-submit');

  await expect(page.locator('#uploaded-files')).toHaveText('Arrays.txt');
});