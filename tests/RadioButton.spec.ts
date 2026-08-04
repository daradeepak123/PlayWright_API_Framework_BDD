import {test, expect, Locator} from '@playwright/test';
import { UIHelper } from '../src/utils/uiHelpers';

test('Dealing with radio button',async({page})=>{

await page.goto('https://demo.automationtesting.in/Register.html');

let maleRadioBtnLocator: Locator = page.getByRole('radio', { name: /male/i });
await UIHelper.clickElement(maleRadioBtnLocator);
await page.pause()

})