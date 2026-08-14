import { test, expect } from '../src/fixtures/fixtures';

/**
 * Example tests demonstrating how to use custom fixtures
 * 
 * Available fixtures:
 * - loginPage: LoginPage object for login operations
 * - dashboardPage: DashboardPage object for dashboard operations
 * - pimPage: PIMPage object for PIM operations
 * - uiHelper: UIHelper utility for common UI operations
 * - authenticatedPage: Pre-authenticated page (auto-login)
 */

test.describe('Example: Using Custom Fixtures', () => {
  
  /**
   * Example 1: Using loginPage fixture
   */
  test('TC001: Login using fixture', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('Admin', 'admin123');
    const isLoggedIn = await loginPage.verifyDashboard();
    expect(isLoggedIn).toBeTruthy();
  });

  /**
   * Example 2: Using authenticatedPage fixture (already logged in)
   */
  test('TC002: Dashboard with authenticated fixture', async ({ authenticatedPage }) => {
    // Page is already logged in, navigate directly to dashboard
    expect(authenticatedPage.url()).toContain('/dashboard/index');
  });

  /**
   * Example 3: Using multiple fixtures together
   */
  test('TC003: Dashboard verification with multiple fixtures', async ({ 
    authenticatedPage, 
    dashboardPage,
    uiHelper 
  }) => {
    // Page is authenticated
    expect(authenticatedPage.url()).toContain('/dashboard/index');
    
    // Can use uiHelper for common operations
    console.log('Test executed successfully with multiple fixtures');
  });

  /**
   * Example 4: Using loginPage and uiHelper together
   */
  test('TC004: Login flow with UI helper', async ({ loginPage, uiHelper }) => {
    await loginPage.open();
    await loginPage.login('Admin', 'admin123');
    expect(await loginPage.verifyDashboard()).toBeTruthy();
  });

  /**
   * Example 5: Using authenticatedPage with dashboardPage
   */
  test('TC005: Navigate using dashboard page fixture', async ({ 
    authenticatedPage, 
    dashboardPage 
  }) => {
    // Already logged in via authenticatedPage fixture
    expect(authenticatedPage.url()).toContain('/dashboard/index');
    
    // Can interact with dashboard page object methods
    // Example: await dashboardPage.navigateToAdmin();
  });
});
