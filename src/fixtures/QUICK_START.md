# Playwright Fixtures - Quick Start Guide

## What Are Fixtures?

Fixtures are pre-configured resources automatically injected into tests. They eliminate repetitive setup code and provide reusable components.

## 5-Second Quick Start

### Import Fixtures in Your Test
```typescript
import { test, expect } from '../fixtures/fixtures';
```

### Use Pre-Authenticated Page
```typescript
test('My test', async ({ authenticatedPage }) => {
  // Page is already logged in - start testing immediately
  expect(authenticatedPage.url()).toContain('/dashboard/index');
});
```

That's it! No login setup needed.

---

## All Available Fixtures

| Fixture | Purpose | When to Use |
|---------|---------|------------|
| `authenticatedPage` | Pre-logged-in page | Start tests already logged in |
| `loginPage` | LoginPage object | Test login flows |
| `dashboardPage` | DashboardPage object | Dashboard operations |
| `pimPage` | PIMPage object | PIM module operations |
| `uiHelper` | UI utilities | Common element operations |
| `page` | Raw Playwright page | Direct page operations |

---

## Common Patterns

### Pattern 1: Dashboard Test (Most Common)
```typescript
test('Verify dashboard', async ({ authenticatedPage }) => {
  expect(authenticatedPage.url()).toContain('/dashboard/index');
});
```

### Pattern 2: Login Flow Test
```typescript
test('User login', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login('Admin', 'admin123');
  expect(await loginPage.verifyDashboard()).toBeTruthy();
});
```

### Pattern 3: Multiple Operations
```typescript
test('Complex flow', async ({ authenticatedPage, dashboardPage, uiHelper }) => {
  // Use all three fixtures
  await dashboardPage.navigateToAdmin();
  const isReady = await uiHelper.isReady(authenticatedPage.locator('h6'));
  expect(isReady).toBeTruthy();
});
```

---

## Converting Your Tests

### Before
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('https://...');
  await page.fill('input', 'Admin');
  // 20 lines of setup...
});

test('my test', async ({ page }) => {
  // test code
});
```

### After
```typescript
test('my test', async ({ authenticatedPage }) => {
  // test code - page already logged in!
});
```

---

## File Structure

```
src/
├── fixtures/
│   ├── fixtures.ts              ← Main fixture definitions
│   ├── FIXTURES_GUIDE.md         ← Detailed documentation
│   └── QUICK_START.md            ← This file
├── pages/
│   ├── LoginPage.ts
│   ├── DashBoardPage.ts
│   └── PIMPage.ts
├── utils/
│   └── uiHelpers.ts
└── ...

tests/
├── fixtures.example.spec.ts     ← Usage examples
├── MIGRATION_GUIDE.spec.ts      ← Migration examples
└── your-tests.spec.ts           ← Your tests here
```

---

## Real Test Example

```typescript
import { test, expect } from '../fixtures/fixtures';

test.describe('Dashboard Tests', () => {
  
  // Simple authenticated test
  test('Load dashboard', async ({ authenticatedPage }) => {
    expect(authenticatedPage.url()).toContain('/dashboard/index');
  });

  // Using page objects
  test('Navigate menu', async ({ authenticatedPage, dashboardPage }) => {
    await dashboardPage.navigateToAdmin();
    expect(authenticatedPage.url()).toContain('/admin');
  });

  // Using UI helper
  test('Verify element', async ({ authenticatedPage, uiHelper }) => {
    const isReady = await uiHelper.isReady(
      authenticatedPage.locator('h6:has-text("Dashboard")')
    );
    expect(isReady).toBeTruthy();
  });
});
```

---

## Key Takeaways

✅ **No More Repetitive Login Code**
- Write once in fixtures.ts
- Use everywhere

✅ **Clean Test Code**
- Request only what you need
- No beforeEach blocks

✅ **Type Safe**
- Full TypeScript support
- IDE auto-completion

✅ **Reusable**
- Share across all tests
- Consistent setup

---

## Next Steps

1. **See Examples**: Check `tests/fixtures.example.spec.ts`
2. **Learn Migration**: Read `tests/MIGRATION_GUIDE.spec.ts`
3. **Full Guide**: See `src/fixtures/FIXTURES_GUIDE.md`
4. **Migrate Tests**: Convert your tests one by one
5. **Customize**: Add more fixtures as needed

---

## Need Help?

- **Examples**: `tests/fixtures.example.spec.ts`
- **Migration Help**: `tests/MIGRATION_GUIDE.spec.ts`
- **Full Docs**: `src/fixtures/FIXTURES_GUIDE.md`
- **Fixture Code**: `src/fixtures/fixtures.ts`

## Quick Commands

```bash
# Run example fixture tests
npx playwright test tests/fixtures.example.spec.ts

# Run all tests
npx playwright test

# Run specific test
npx playwright test tests/your-test.spec.ts

# Debug mode
npx playwright test --debug
```

---

**Happy Testing! 🎭**
