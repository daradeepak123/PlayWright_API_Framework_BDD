import { test, expect } from '../src/fixtures/fixtures';
import { UIHelper } from '../src/utils/uiHelpers';

/**
 * MIGRATION GUIDE: Converting tests to use Fixtures
 * 
 * This file shows side-by-side comparisons of old vs new test patterns
 */

// ============================================================================
// MIGRATION EXAMPLE 1: Simple Login and Dashboard Verification
// ============================================================================

/*
// OLD WAY - Without Fixtures
test.describe('OrangeHRM Dashboard - Old Style', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { 
      waitUntil: 'domcontentloaded' 
    });
    await page.waitForSelector('input[placeholder="Username"]', { timeout: 10000 });
    await page.fill('input[placeholder="Username"]', 'Admin');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('.orangehrm-login-button');
    await page.waitForURL(/.*dashboard\/index/, { timeout: 30000 });
  });

  test('TC001: Dashboard loads successfully', async ({ page }) => {
    expect(page.url()).toContain('/dashboard/index');
  });

  test('TC002: Dashboard heading is visible', async ({ page }) => {
    const heading = await page.locator('h6:has-text("Dashboard")').isVisible();
    expect(heading).toBeTruthy();
  });
});
*/

// NEW WAY - With Fixtures
test.describe('OrangeHRM Dashboard - New Style with Fixtures', () => {
  
  test('TC001: Dashboard loads successfully', async ({ authenticatedPage }) => {
    // No beforeEach needed! Page is already authenticated
    expect(authenticatedPage.url()).toContain('/dashboard/index');
  });

  test('TC002: Dashboard heading is visible', async ({ authenticatedPage }) => {
    const heading = await authenticatedPage.locator('h6:has-text("Dashboard")').isVisible();
    expect(heading).toBeTruthy();
  });
});

// ============================================================================
// MIGRATION EXAMPLE 2: Using Page Objects with Manual Login
// ============================================================================

/*
// OLD WAY - Manually creating page objects
test.describe('Login with Page Objects - Old Style', () => {
  test('User login flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('Admin', 'admin123');
    const isLoggedIn = await loginPage.verifyDashboard();
    expect(isLoggedIn).toBeTruthy();
  });
});
*/

// NEW WAY - Using fixture-provided page objects
test.describe('Login with Page Objects - New Style', () => {
  test('User login flow', async ({ loginPage }) => {
    // loginPage is automatically provided by fixture
    await loginPage.open();
    await loginPage.login('Admin', 'admin123');
    const isLoggedIn = await loginPage.verifyDashboard();
    expect(isLoggedIn).toBeTruthy();
  });
});

// ============================================================================
// MIGRATION EXAMPLE 3: Dashboard Navigation Tests
// ============================================================================

/*
// OLD WAY - With beforeEach and manual page object initialization
test.describe('Dashboard Navigation - Old Style', () => {
  let dashboardPage: DashBoardPage;

  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.fill('input[placeholder="Username"]', 'Admin');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('.orangehrm-login-button');
    await page.waitForURL(/.*dashboard\/index/);

    // Initialize page object
    dashboardPage = new DashBoardPage(page);
  });

  test('TC001: Navigate to Admin menu', async () => {
    await dashboardPage.navigateToAdmin();
    // verify admin page loaded
  });

  test('TC002: Navigate to Leave menu', async () => {
    await dashboardPage.navigateToLeave();
    // verify leave page loaded
  });
});
*/

// NEW WAY - Using fixtures with multiple resources
test.describe('Dashboard Navigation - New Style with Fixtures', () => {
  
  test('TC001: Navigate to Admin menu', async ({ authenticatedPage, dashboardPage }) => {
    // Page is already authenticated via fixture
    // dashboardPage is automatically provided
    await dashboardPage.navigateToAdmin();
    // verify admin page loaded
  });

  test('TC002: Navigate to Leave menu', async ({ authenticatedPage, dashboardPage }) => {
    // Reuse same fixtures
    await dashboardPage.navigateToLeave();
    // verify leave page loaded
  });
});

// ============================================================================
// MIGRATION EXAMPLE 4: Complex Test with Multiple Fixtures
// ============================================================================

test.describe('Complex Workflow - Demonstrating Multiple Fixtures', () => {
  
  test('Complete user journey', async ({ 
    authenticatedPage,  // Pre-authenticated page
    dashboardPage,      // Dashboard operations
    uiHelper,           // UI utilities
    page                // Raw page for additional operations
  }) => {
    // Already logged in via authenticatedPage
    expect(authenticatedPage.url()).toContain('/dashboard/index');
    
    // Use dashboardPage for dashboard-specific operations
    // Example: await dashboardPage.navigateToAdmin();
    
    // Use uiHelper for common operations
    const isVisible = await UIHelper.isReady(page.locator('h6:has-text("Dashboard")'));
    expect(isVisible).toBeTruthy();
  });
});

// ============================================================================
// MIGRATION EXAMPLE 5: Test Group with Shared Setup
// ============================================================================

test.describe('Login and Verification Tests', () => {
  // All tests in this group use the same fixtures
  // No need for individual beforeEach - fixtures handle setup
  
  test('Verify dashboard URL', async ({ authenticatedPage }) => {
    expect(authenticatedPage.url()).toContain('/dashboard/index');
  });

  test('Verify dashboard title', async ({ authenticatedPage }) => {
    expect(await authenticatedPage.title()).toBe('OrangeHRM');
  });

  test('Verify dashboard heading', async ({ authenticatedPage }) => {
    const heading = await authenticatedPage.locator('h6:has-text("Dashboard")').isVisible();
    expect(heading).toBeTruthy();
  });

  test('Verify Time at Work card', async ({ authenticatedPage }) => {
    const card = authenticatedPage.locator('text=Time at Work').first();
    expect(await card.isVisible()).toBeTruthy();
  });
});

// ============================================================================
// KEY BENEFITS OF MIGRATION
// ============================================================================

/*
1. CLEANER CODE
   - No beforeEach blocks
   - No manual page object instantiation
   - Fixtures are injected automatically

2. REDUCED DUPLICATION
   - Login logic in one place (fixtures.ts)
   - Not repeated in every test file

3. BETTER REUSABILITY
   - Share fixtures across entire test suite
   - Consistent setup across all tests

4. TYPE SAFETY
   - Full TypeScript auto-completion
   - IDE can suggest available fixtures

5. EASIER MAINTENANCE
   - Change login logic? Update fixtures.ts only
   - Change test setup? One place to update

6. FLEXIBLE COMPOSITION
   - Use only the fixtures you need
   - Combine fixtures as required
   - No wasted setup for unused resources
*/

// ============================================================================
// STEP-BY-STEP MIGRATION CHECKLIST
// ============================================================================

/*
1. Import fixtures in your test file:
   ✓ import { test, expect } from '../fixtures/fixtures';

2. Remove beforeEach login blocks:
   ✓ Delete test.beforeEach() blocks

3. Remove manual page object initialization:
   ✓ Delete: const loginPage = new LoginPage(page);

4. Update test signatures to request needed fixtures:
   ✓ test('name', async ({ authenticatedPage, dashboardPage }) => {

5. Use fixtures instead of page directly:
   ✓ Replace: await page.goto(...) with fixture methods
   ✓ Replace: const dashboardPage = new DashBoardPage(page)
      with: async ({ dashboardPage })

6. Test your migrated tests:
   ✓ npx playwright test tests/your-migrated-test.spec.ts

7. Verify all tests pass
   ✓ Check if output matches expected behavior
   ✓ Update assertions if needed
*/
