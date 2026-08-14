import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashBoardPage } from '../pages/DashBoardPage';
import { PIMPage } from '../pages/PIMPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { EmployeeDetailsPage } from '../pages/EmployeeDetailsPage';
import { ReportsPage } from '../pages/ReportsPage';
import { ConfigurationPage } from '../pages/ConfigurationPage';
import { UIHelper } from '../utils/uiHelpers';

/**
 * Extend basic test by providing page objects and common setup
 * Usage in tests:
 * test('My test', async ({ page, loginPage, dashboardPage, uiHelper }) => {
 *   await loginPage.open();
 *   await loginPage.login('Admin', 'admin123');
 * });
 */

type TestFixtures = {
  /**
   * Page object for login page operations
   */
  loginPage: LoginPage;
  
  /**
   * Page object for dashboard page operations
   */
  dashboardPage: DashBoardPage;
  
  /**
   * Page object for PIM Employee List operations
   */
  pimPage: PIMPage;
  
  /**
   * Page object for Add Employee operations
   */
  addEmployeePage: AddEmployeePage;
  
  /**
   * Page object for Employee Details operations
   */
  employeeDetailsPage: EmployeeDetailsPage;
  
  /**
   * Page object for Reports operations
   */
  reportsPage: ReportsPage;
  
  /**
   * Page object for Configuration operations
   */
  configurationPage: ConfigurationPage;
  
  /**
   * UI Helper utility for common element operations
   */
  uiHelper: UIHelper;
  
  /**
   * Authenticated page fixture - logs in before test
   */
  authenticatedPage: Page;
};

/**
 * Create custom test fixture with page objects
 */
export const test = base.extend<TestFixtures>({
  /**
   * Initialize LoginPage fixture
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /**
   * Initialize DashboardPage fixture
   */
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashBoardPage(page);
    await use(dashboardPage);
  },

  /**
   * Initialize PIMPage fixture
   * Note: PIMPage is currently empty. Extend it with PIM-specific methods as needed.
   */
  pimPage: async ({ page }, use) => {
    const pimPage = new PIMPage(page);
    await use(pimPage);
  },

  /**
   * Initialize AddEmployeePage fixture
   */
  addEmployeePage: async ({ page }, use) => {
    const addEmployeePage = new AddEmployeePage(page);
    await use(addEmployeePage);
  },

  /**
   * Initialize EmployeeDetailsPage fixture
   */
  employeeDetailsPage: async ({ page }, use) => {
    const employeeDetailsPage = new EmployeeDetailsPage(page);
    await use(employeeDetailsPage);
  },

  /**
   * Initialize ReportsPage fixture
   */
  reportsPage: async ({ page }, use) => {
    const reportsPage = new ReportsPage(page);
    await use(reportsPage);
  },

  /**
   * Initialize ConfigurationPage fixture
   */
  configurationPage: async ({ page }, use) => {
    const configurationPage = new ConfigurationPage(page);
    await use(configurationPage);
  },

  /**
   * Initialize UIHelper fixture
   */
  uiHelper: async ({ page }, use) => {
    const uiHelper = new UIHelper(page);
    await use(uiHelper);
  },

  /**
   * Provide an already authenticated page
   * Automatically logs in before test starts
   */
  authenticatedPage: async ({ page }, use) => {
    // Navigate to login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
      waitUntil: 'domcontentloaded',
    });

    // Wait for login form
    await page.waitForSelector('input[placeholder="Username"]', { timeout: 10000 });

    // Perform login
    await page.fill('input[placeholder="Username"]', 'Admin');
    await page.fill('input[type="password"]', 'admin123');

    // Click login and wait for dashboard
    await page.click('.orangehrm-login-button');
    await page.waitForURL(/.*dashboard\/index/, { timeout: 30000 });

    // Use the authenticated page in test
    await use(page);
  },
});

export { expect } from '@playwright/test';
