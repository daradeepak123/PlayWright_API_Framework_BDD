import { test } from '@playwright/test';

test('Record video', async ({ browser }) => {
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/',
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();

  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=A/B Testing');
  await page.goBack();

  // Close the context to save the video
  await context.close();
});