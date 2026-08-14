import { expect, test,Locator } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import {DashBoardPage} from '../src/pages/DashBoardPage'
import {UIHelper} from '../src/utils/uiHelpers';


test('functional flow',async ({page})=>{

 const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('Admin', 'admin123');    
    // validation
    
    let dashBordHeading:Locator=page.getByRole('heading',{name:'Dashboard'})
    let data=await UIHelper.verifyHeading(dashBordHeading,'Dashboard')
    console.log('this is returned data: '+data)

    let quickLaunchText=page.locator("//p[text()='Quick Launch']/../../..//button/following-sibling::div/p")

    let count =await quickLaunchText.count()
    let allTabSections:string[]=[]
    allTabSections.push('Assign Leave')
    allTabSections.push('Leave List')
    allTabSections.push('Quick Launch')
    allTabSections.push('Apply Leave')
    allTabSections.push('My Leave')
    allTabSections.push('My Timesheet')
    for(let i=0;i<count;i++)
    {
        let divHeading=await quickLaunchText.nth(i).innerHTML()
        expect(allTabSections.includes(divHeading)).toBeTruthy()
    }



    await page.pause()
})