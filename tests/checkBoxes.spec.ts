import {expect, test,Locator} from '@playwright/test';



test('CheckBoxes test', async({page})=>{

await page.goto('https://the-internet.herokuapp.com/checkboxes');
await page.waitForTimeout(2000);    

let checkBox1Locator: Locator = page.getByRole('checkbox').nth(0);
let checkBox2Locator: Locator = page.getByRole('checkbox').nth(1);

let flag1=   await checkBox1Locator.isVisible();
flag1 =    await checkBox1Locator.isEnabled() && flag1; 
if(flag1){
let checkBox1Status = await checkBox1Locator.isChecked();
console.log('CheckBox 1 Status:', checkBox1Status);
if(!checkBox1Status){
    await checkBox1Locator.check();
}
}

let flag2=   await checkBox2Locator.isVisible();
flag2 =    await checkBox2Locator.isEnabled() && flag2; 
if(flag2){
let checkBox2Status = await checkBox2Locator.isChecked();
console.log('CheckBox 2 Status:', checkBox2Status);
 
}
await page.pause()

})