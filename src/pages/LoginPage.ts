import { Locator, Page } from '@playwright/test';
import { UIHelper } from '../utils/uiHelpers';
import { LoginTestData } from '../testData/SampleInterface';

export class LoginPage {
    private page: Page;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private dashboardHeading: Locator

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("//input[@name='username']");
        this.passwordInput = page.locator("//input[@name='password']");
        this.loginButton = page.locator("//button[@type='submit']");
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    }

    async open() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await this.page.waitForLoadState();
    }

    async login(username: string, password: string) {
        await UIHelper.fillTextBox(this.usernameInput, username);
        await UIHelper.fillTextBox(this.passwordInput, password);
        await UIHelper.clickElement(this.loginButton);
    }

    async verifyDashboard() {
        return UIHelper.verifyHeading(this.dashboardHeading, 'Dashboard');
    }
}
