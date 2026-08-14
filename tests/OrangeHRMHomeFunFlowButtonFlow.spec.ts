import { expect, test, Locator } from '@playwright/test';
import { validUser } from '../src/testData/SampleInterface';
import { UIHelper } from '../src/utils/uiHelpers';
import { LoginPage } from '../src/pages/LoginPage';

test('functional flow', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('Admin', 'admin123');

    let dashBordHeading: Locator = page.getByRole('heading', { name: 'Dashboard' })
    let data = await UIHelper.verifyHeading(dashBordHeading, 'Dashboard')
    console.log('this is returned data: ' + data)
    await page.waitForTimeout(2000)
    let quickLaunchBTNs = page.locator("//p[text()='Quick Launch']/../../..//button")

    let count = await quickLaunchBTNs.count()
    console.log(count)

    for (let i = 0; i < count; i++) {
        let divHeading = quickLaunchBTNs.nth(i)
        await UIHelper.clickElement(divHeading)
        await page.waitForLoadState()
        console.log(await page.title())
        let dashboardMenuItem = page.locator("//span[text()='Dashboard']")
        await UIHelper.clickElement(dashboardMenuItem)
        await page.reload()
        await page.waitForLoadState()
    }



    await page.pause()
})