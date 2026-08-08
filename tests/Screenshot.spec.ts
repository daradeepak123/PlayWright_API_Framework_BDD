import { test } from '@playwright/test';
import { UIHelper } from '../src/utils/uiHelpers';

test('Take screenshot', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');

  await page.screenshot({path: 'screenshots/the-internet-homepage.png',fullPage: true});

await page.screenshot({path: `screenshots/the-internet-homepage+${UIHelper.generateRandomText()}.png`,fullPage: true});


});