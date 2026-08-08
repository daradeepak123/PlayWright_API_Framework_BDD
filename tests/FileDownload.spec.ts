import { test, expect } from '@playwright/test';

test('Download a file', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');

  // Wait for download
  const downloadPromise = page.waitForEvent('download');

  // Click the file
  await page.locator('text=some-file.txt').click();

  // Get download object
  const download = await downloadPromise;

  // Save file
  await download.saveAs('downloads/some-file.txt');

  console.log('Downloaded:', await download.suggestedFilename());
});