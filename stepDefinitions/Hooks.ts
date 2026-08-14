import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { chromium } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { DashBoardPage } from '../src/pages/DashBoardPage';
import { PIMPage } from '../src/pages/PIMPage';
import { AddEmployeePage } from '../src/pages/AddEmployeePage';
import { EmployeeDetailsPage } from '../src/pages/EmployeeDetailsPage';
import { ReportsPage } from '../src/pages/ReportsPage';

// Set default timeout to 30 seconds
setDefaultTimeout(30 * 1000);

/**
 * Test Context Interface
 * Stores all browser, page, and page object instances during test execution
 */
export interface TestContext {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  loginPage?: LoginPage;
  dashboardPage?: DashBoardPage;
  pimPage?: PIMPage;
  addEmployeePage?: AddEmployeePage;
  employeeDetailsPage?: EmployeeDetailsPage;
  reportsPage?: ReportsPage;
  searchResults?: any[];
  selectedEmployee?: any;
  validationErrors?: string[];
  lastMessage?: string;
  pageTitle?: string;
  pageUrl?: string;
  startTime?: Date;
  endTime?: Date;
}

// Global test context
export let testContext: TestContext = {};

/**
 * Before Hook - Runs before each scenario
 * - Launches browser
 * - Creates new context
 * - Initializes all page objects
 * - Sets up test environment
 */
Before(async function () {
  console.log('🚀 Starting new test scenario...');
  
  // Reset context
  testContext = {};
  testContext.startTime = new Date();
  
  try {
    // Launch browser
    testContext.browser = await chromium.launch({
      headless: true, // Set to false for debugging
      args: ['--disable-blink-features=AutomationControlled']
    });
    
    // Create new context with options
    testContext.context = await testContext.browser.newContext({
      viewport: { width: 1920, height: 1080 },
      ignoreHTTPSErrors: true
    });
    
    // Create new page
    testContext.page = await testContext.context.newPage();
    
    // Set default navigation timeout
    testContext.page.setDefaultNavigationTimeout(30000);
    testContext.page.setDefaultTimeout(30000);
    
    // Initialize page objects
    testContext.loginPage = new LoginPage(testContext.page);
    testContext.dashboardPage = new DashBoardPage(testContext.page);
    testContext.pimPage = new PIMPage(testContext.page);
    testContext.addEmployeePage = new AddEmployeePage(testContext.page);
    testContext.employeeDetailsPage = new EmployeeDetailsPage(testContext.page);
    testContext.reportsPage = new ReportsPage(testContext.page);
    
    console.log('✅ Test environment setup complete');
  } catch (error) {
    console.error('❌ Error during Before hook:', error);
    throw error;
  }
});

/**
 * After Hook - Runs after each scenario
 * - Closes browser context
 * - Cleans up resources
 * - Logs test duration
 */
After(async function () {
  testContext.endTime = new Date();
  
  try {
    if (testContext.context) {
      await testContext.context.close();
      console.log('✅ Browser context closed');
    }
    
    if (testContext.browser) {
      await testContext.browser.close();
      console.log('✅ Browser closed');
    }
    
    // Log test duration
    if (testContext.startTime && testContext.endTime) {
      const duration = testContext.endTime.getTime() - testContext.startTime.getTime();
      console.log(`⏱️ Test duration: ${duration}ms`);
    }
  } catch (error) {
    console.error('❌ Error during After hook:', error);
  }
});

/**
 * Before Hook for failed scenarios
 * - Takes screenshot on failure
 * - Captures error details
 */
After(async function ({ result }) {
  if (result?.status === 'FAILED' && testContext.page) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const screenshotPath = `screenshots/failure-${timestamp}.png`;
      
      await testContext.page.screenshot({ path: screenshotPath });
      console.log(`📸 Screenshot saved: ${screenshotPath}`);
      
      // Capture page state
      const url = testContext.page.url();
      const title = await testContext.page.title();
      console.log(`❌ Failed on page: ${title} (${url})`);
    } catch (error) {
      console.error('Error taking screenshot:', error);
    }
  }
});
