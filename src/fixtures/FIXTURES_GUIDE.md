# Playwright Fixtures - Usage Guide

## Overview
This project includes custom Playwright fixtures that provide pre-initialized page objects and utilities for all tests. Fixtures centralize setup logic and make tests more readable and maintainable.

## Available Fixtures

### 1. `loginPage` - LoginPage Object
Provides all login-related operations.

**Example:**
```typescript
test('Login test', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login('Admin', 'admin123');
  const isValid = await loginPage.verifyDashboard();
  expect(isValid).toBeTruthy();
});
```

### 2. `dashboardPage` - DashboardPage Object
Provides all dashboard page operations and navigation.

**Example:**
```typescript
test('Dashboard navigation', async ({ authenticatedPage, dashboardPage }) => {
  // Page is already logged in via authenticatedPage fixture
  // Now use dashboardPage methods
  await dashboardPage.navigateToAdmin();
});
```

### 3. `pimPage` - PIMPage Object
Provides PIM module operations (currently empty, can be extended).

**Example:**
```typescript
test('PIM operations', async ({ authenticatedPage, pimPage }) => {
  // Use pimPage methods for PIM operations
});
```

### 4. `uiHelper` - UIHelper Utility
Provides common UI element operations (click, fill, verify, etc.).

**Example:**
```typescript
test('UI operations', async ({ page, uiHelper }) => {
  await uiHelper.fillTextBox(locator, 'text');
  await uiHelper.clickElement(locator);
  const isReady = await uiHelper.isReady(locator);
});
```

### 5. `authenticatedPage` - Pre-Authenticated Page
A page fixture that automatically logs in before the test runs. Use this when you need to start tests already logged into the system.

**Example:**
```typescript
test('Dashboard after login', async ({ authenticatedPage }) => {
  // Page is already authenticated
  expect(authenticatedPage.url()).toContain('/dashboard/index');
  
  // Navigate directly to operations
  await authenticatedPage.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
});
```

## Usage Patterns

### Pattern 1: Login and Perform Actions
```typescript
test('User login workflow', async ({ loginPage, dashboardPage }) => {
  await loginPage.open();
  await loginPage.login('Admin', 'admin123');
  // Now use dashboardPage for subsequent operations
});
```

### Pattern 2: Start with Authenticated Session
```typescript
test('Direct dashboard test', async ({ authenticatedPage }) => {
  // Already logged in - skip login steps
  expect(authenticatedPage.url()).toContain('/dashboard/index');
});
```

### Pattern 3: Multiple Fixtures
```typescript
test('Complex workflow', async ({ 
  loginPage, 
  dashboardPage, 
  uiHelper,
  page 
}) => {
  // Use any combination of fixtures
  await loginPage.open();
  await loginPage.login('Admin', 'admin123');
  // Subsequent operations with other fixtures
});
```

## Migrating Existing Tests

### Before (Without Fixtures):
```typescript
test.describe('Old test style', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.fill('input[placeholder="Username"]', 'Admin');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('.orangehrm-login-button');
  });

  test('Dashboard test', async ({ page }) => {
    // Test logic
  });
});
```

### After (With Fixtures):
```typescript
import { test, expect } from '../fixtures/fixtures';

test.describe('New test with fixtures', () => {
  test('Dashboard test', async ({ authenticatedPage }) => {
    // Test logic - page is already authenticated
    expect(authenticatedPage.url()).toContain('/dashboard/index');
  });
});
```

## Benefits

1. **Reduced Code Duplication** - No need to repeat login logic in every test
2. **Better Readability** - Fixtures clearly indicate what resources the test needs
3. **Easy Maintenance** - Centralized page objects and setup logic
4. **Type Safety** - Full TypeScript support with auto-completion
5. **Reusability** - Share fixtures across entire test suite
6. **Flexibility** - Combine fixtures as needed for different test scenarios

## Creating Additional Fixtures

To add more fixtures, extend the `TestFixtures` type and add them to the test extend call in `src/fixtures/fixtures.ts`:

```typescript
type TestFixtures = {
  // ... existing fixtures
  myNewFixture: MyNewClass;
};

export const test = base.extend<TestFixtures>({
  // ... existing fixtures
  myNewFixture: async ({ page }, use) => {
    const myFixture = new MyNewClass(page);
    await use(myFixture);
  },
});
```

## File Location
- Fixtures definition: `src/fixtures/fixtures.ts`
- Example usage: `tests/fixtures.example.spec.ts`

## Best Practices

1. Use `authenticatedPage` when you need to start tests logged in
2. Use `loginPage` when testing login flows
3. Combine fixtures based on test requirements
4. Keep fixture setup logic in `src/fixtures/fixtures.ts`
5. Import fixtures from `src/fixtures/fixtures.ts` in all test files
