import { test, expect, Locator } from '@playwright/test';
import { UIHelper } from '../src/utils/uiHelpers';

test('TextBox and Heading button test', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/tables');

    // Locate all rows
    const rows = page.locator('xpath=//table[@id="table1"]/tbody/tr');

    const rowCount = await rows.count();

    // Print header
    console.log(
        "Last Name\tFirst Name\tEmail\t\t\t\tDue\tWebsite\t\t\t\tAction"
    );
    console.log("-".repeat(120));

    // Loop through rows
    // for (let i = 1; i <= rowCount; i++) {
    //   // Locate all columns in the current row
    //   const columns = page.locator(`xpath=//table[@id="table1"]/tbody/tr[${i}]/td`);

    //   const colCount = await columns.count();

    //   let rowData: string[] = [];

    //   for (let j = 1; j <= colCount; j++) {
    //     const text = await page
    //       .locator(`xpath=//table[@id="table1"]/tbody/tr`).nth(i - 1)
    //       .locator('td').nth(j - 1)
    //       .textContent();

    //     rowData.push(text?.trim().replace(/\s+/g, " ") || "");
    //   }

    //   console.log(rowData.join("\t"));
    // }


    for (let i = 0; i < rowCount; i++) {
        let columns = await rows.nth(i).locator('td').count();
       
        let row=""
        
        for (let j = 0; j < columns; j++) {
            let cellText = await rows.nth(i).locator('td').nth(j).textContent();
            row+= cellText?.trim().replace(/\s+/g, " ") + "\t";
        }
        console.log(row); // New line after each row
    }
}
)
