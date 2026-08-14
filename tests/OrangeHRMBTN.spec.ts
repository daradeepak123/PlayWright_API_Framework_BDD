import { expect, test, Locator } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { DashBoardPage } from '../src/pages/DashBoardPage'
import { UIHelper } from '../src/utils/uiHelpers';
import { validUser } from '../src/testData/SampleInterface';


test('functional flow', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.waitForLoadState()
    let unameTB = page.locator("//input[@name='username']")
    let passwordTB = page.locator("//input[@name='password']")
    let loginBTN = page.locator("//button[@type='submit']")
    await page.waitForTimeout(3000)
    await UIHelper.fillTextBox(unameTB, validUser.userName)
    await UIHelper.fillTextBox(passwordTB, validUser.password)
    await UIHelper.clickElement(loginBTN)


    let dashboardH6=page.locator("//h6[text()='Dashboard']")
    await page.waitForLoadState()
    await page.waitForTimeout(3000)
    let headingText= await dashboardH6.innerText()
    expect(headingText).toBe('Dashboard')

    await page.waitForLoadState()
    await page.waitForTimeout(5000)
    
    let buttonsCheck=page.locator("//p[text()='Quick Launch']/../../..//button")
    let count=await buttonsCheck.count()
    console.log(count)
    for(let i=0;i<count;i++)
    {
        await page.waitForLoadState()
        await UIHelper.clickElement(buttonsCheck.nth(i))
        await page.waitForLoadState()
        expect(await page.title()).toBe('OrangeHRM')
        await page.waitForLoadState()
        await page.goBack()
        
    }

})