import { expect, test, Locator } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { DashBoardPage } from '../src/pages/DashBoardPage'
import { UIHelper } from '../src/utils/uiHelpers';


test('functional flow', async ({ page }) => {


    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.waitForLoadState()
    let unameTB = page.locator("//input[@name='username']")
    let passwordTB = page.locator("//input[@name='password']")
    let loginBTN = page.locator("//button[@type='submit']")
    await page.waitForTimeout(3000)
    await UIHelper.fillTextBox(unameTB, 'Admin')
    await UIHelper.fillTextBox(passwordTB, 'admin123')
    await UIHelper.clickElement(loginBTN)


    let dashboardH6=page.locator("//h6[text()='Dashboard']")
    await page.waitForLoadState()
    await page.waitForTimeout(3000)
    let headingText= await dashboardH6.innerText()
    expect(headingText).toBe('Dashboard')


    let allDivisions=page.locator("//p[text()='Time at Work']/../../../../../div//i/following-sibling::p")
    let data:string[]=[]
    data.push('Time at Work')
    data.push('8h 45m')
    data.push('My Actions')
    data.push('Quick Launch')
    data.push('Buzz Latest Posts')
    data.push('Employee Distribution by Sub Unit')
    data.push('Employee Distribution by Location')
    data.push('')
    let count=await allDivisions.count()
    for(let i=0;i<count;i++)
    {
        let text=await allDivisions.nth(i).innerText()  
        expect(data.includes(text)).toBeTruthy()
    }
})