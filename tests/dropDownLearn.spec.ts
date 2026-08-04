import {test, expect, Locator} from '@playwright/test';
import { UIHelper } from '../src/utils/uiHelpers';

test('Drop down deal', async({page})=>{

await page.goto('https://the-internet.herokuapp.com/dropdown');
let abc: Locator = page.getByRole('combobox');

abc.selectOption('');

await page.pause()

})