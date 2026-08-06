import {test, expect} from '@playwright/test';

test('Web Table Learn', async ({page}) => {

await page.goto('https://the-internet.herokuapp.com/tables');



    // let data=await page.locator('xpath=//table[@id="table1"]/tbody/tr[2]/td[1]').textContent();
    // console.log("Frank's last name is: "+data?.trim().replace(/\s+/g, " "));

// data=await page.locator('xpath=//table[@id="table1"]/tbody/tr[2]/td[2]').textContent();
// console.log("Frank's last name is: "+data?.trim().replace(/\s+/g, " "));


// data=await page.locator('xpath=//table[@id="table1"]/tbody/tr[2]/td[3]').textContent();
// console.log("Frank's last name is: "+data?.trim().replace(/\s+/g, " "));


// data=await page.locator('xpath=//table[@id="table1"]/tbody/tr[2]/td[4]').textContent();
// console.log("Frank's last name is: "+data?.trim().replace(/\s+/g, " "));


// data=await page.locator('xpath=//table[@id="table1"]/tbody/tr[2]/td[5]').textContent();
// console.log("Frank's last name is: "+data?.trim().replace(/\s+/g, " "));


// data=await page.locator('xpath=//table[@id="table1"]/tbody/tr[2]/td[6]').textContent();
// console.log("Frank's last name is: "+data?.trim().replace(/\s+/g, " "));

let row=page.locator('xpath=//table[@id="table1"]/tbody/tr');
let rowCount=await row.count();
let cell= page.locator('xpath=//table[@id="table1"]/tbody/tr[2]/td');
let cellCount= await cell.count();
console.log("Cell Count: "+cellCount);
for (let j = 0; j < rowCount; j++) {
    let actualData:string=''
    for (let i = 0; i < cellCount; i++) {
        let cellText = await page.locator('xpath=//table[@id="table1"]/tbody/tr').nth(j).locator('td').nth(i).textContent();
        actualData += cellText?.trim().replace(/\s+/g, " ") + "\t";
    }
    console.log(actualData);
}


})