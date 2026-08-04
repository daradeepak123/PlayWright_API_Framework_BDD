import {test, expect,Locator} from '@playwright/test';
import { UIHelper } from '../src/utils/uiHelpers';

test('TextBox and Heading button test', async({page})=>{

await page.goto('https://the-internet.herokuapp.com/forgot_password');
await page.waitForTimeout(2000);

let headingLocator: Locator = page.getByRole('heading', { name: 'Forgot Password' });
await UIHelper.verifyHeading(headingLocator, 'Forgot Password');

let textBoxLocator: Locator = page.getByRole('textbox', { name: 'E-mail' });
await UIHelper.fillTextBox(textBoxLocator, 'hello@abc.com');

let btnLocator: Locator = page.getByRole('button', { name: 'Retrieve password' });
await UIHelper.clickElement(btnLocator);

let errorHeadingText:Locator = page.getByRole('heading', { name: 'Internal Server Error' })
await UIHelper.verifyHeading(errorHeadingText, 'Internal Server Error');

})