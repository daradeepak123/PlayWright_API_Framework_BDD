import {test, expect,Locator} from '@playwright/test';
import { UIHelper } from '../src/utils/uiHelpers';

test('TextBox and Heading button test', async({page})=>{

await page.goto('https://the-internet.herokuapp.com/forgot_password');
await page.waitForTimeout(2000);

let headingLocator: Locator = page.getByRole('heading', { name: 'Forgot Password' });
await UIHelper.verifyHeading(headingLocator, 'Forgot Password');

// let flag=   await headingLocator.isVisible();
// flag =    await headingLocator.isEnabled() && flag;
// if(flag){
// let headingText = await headingLocator.innerText();
// console.log('Heading Text:', headingText);
//  expect(headingText).toBe('Forgot Password');
// }
// else
// {
//     console.log('Heading is not visible or not enabled');
// }

let textBoxLocator: Locator = page.getByRole('textbox', { name: 'E-mail' });
await UIHelper.fillTextBox(textBoxLocator, 'hello@abc.com');
// let flag=   await textBoxLocator.isVisible()&& await textBoxLocator.isEnabled();
// if(flag){
// textBoxLocator.clear()
// textBoxLocator.fill('hello@abc.com')
// }
// else
// {
//     console.log('TextBox is not visible or not enabled');
// }

let btnLocator: Locator = page.getByRole('button', { name: 'Retrieve password' });
await UIHelper.clickElement(btnLocator);

let errorHeadingText:Locator = page.getByRole('heading', { name: 'Internal Server Error' })
await UIHelper.verifyHeading(errorHeadingText, 'Internal Server Error');

})