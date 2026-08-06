import { test, expect } from '@playwright/test';

test('Handle Alert', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        console.log(dialog.type());     // alert
        console.log(dialog.message());  // I am a JS Alert

        await dialog.accept();
    });



    await page.pause();
});