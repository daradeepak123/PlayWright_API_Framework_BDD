import { expect, test,Locator } from '@playwright/test';
import { validUser}  from '../src/testData/SampleInterface';
import { invalidvalidUser}  from '../src/testData/SampleInterface';
import { missingUserName } from '../src/testData/SampleInterface';
import { missingUserPassword } from '../src/testData/SampleInterface';
import { LoginPage } from '../src/pages/LoginPage';


test('valid Login',async ({page})=>{
    
    const loginPage = new LoginPage(page);

    loginPage.open()
    loginPage.login(validUser.userName,validUser.password)
    
    
})


test('invalid login',async ({page})=>{
    const loginPage = new LoginPage(page);
    loginPage.open()
    loginPage.login(invalidvalidUser.userName,invalidvalidUser.password)
    await page.waitForLoadState()
    // validation
})


test('missing uname login',async ({page})=>{
    const loginPage = new LoginPage(page);
    loginPage.open()
    loginPage.login(missingUserName.userName,missingUserName.password)
    await page.waitForLoadState()
    // validation
})

test('missing password login',async ({page})=>{
      const loginPage = new LoginPage(page);
    loginPage.open()
    loginPage.login(missingUserPassword.userName,missingUserPassword.password)
    await page.waitForLoadState()
    // validation
})