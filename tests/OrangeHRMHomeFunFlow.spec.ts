import TDJson from '../src/testData/testData.json';
import { expect, test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { validUser}  from '../src/testData/SampleInterface';


test('functional flow', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('Admin','admin123');

    const data = await loginPage.verifyDashboard();
    console.log('this is returned data: ' + data);

    const subHeadings = page.locator("//p[text()='Time at Work']/../../../../..//i/following-sibling::p");
    const count = await subHeadings.count();
    const allTabSections: string[] = [
        'Time at Work',
        'My Actions',
        'Quick Launch',
        'Buzz Latest Posts',
        'Employee Distribution by Sub Unit',
        'Employee Distribution by Location',
        ''
    ];

    for (let i = 0; i < count; i++) {
        const divHeading = await subHeadings.nth(i).innerHTML();
        console.log(divHeading);
        expect(allTabSections.includes(divHeading)).toBeTruthy();
    }

    await page.pause();
});
