# BDD Cucumber Setup - OrangeHRM PIM Module

## Overview

This document provides complete setup and usage instructions for Behavior-Driven Development (BDD) using Cucumber and Playwright for the OrangeHRM PIM module.

**Status:** Production Ready ✅  
**Date:** August 14, 2026  
**Version:** 1.0  

## Directory Structure

```
PlayWrightsetUp/
├── features/
│   ├── PIM_EmployeeList.feature       # Employee list scenarios
│   ├── PIM_AddEmployee.feature        # Add employee scenarios
│   ├── PIM_EmployeeDetails.feature    # Employee details scenarios
│   └── PIM_Reports.feature            # Reports scenarios
├── stepDefinitions/
│   └── PIM_StepDefinitions.ts         # Step implementations
├── cucumber.js                        # Cucumber configuration
├── package.json                       # Updated with Cucumber deps
└── src/                               # (Existing) Page objects
```

## Installation

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `@cucumber/cucumber` - Cucumber framework
- `cucumber-html-reporter` - HTML report generation
- All existing dependencies (Playwright, TypeScript, etc.)

### 2. Verify Installation

```bash
npx cucumber-js --version
```

## Quick Start

### Run All BDD Tests

```bash
npm run bdd
```

### Run Specific Feature File

```bash
npx cucumber-js features/PIM_EmployeeList.feature
```

### Run by Tags

```bash
# Smoke tests only
npm run bdd:smoke

# Regression tests
npm run bdd:regression
```

### Run in Specific Browser

```bash
# Chrome only
npm run bdd:chrome

# Firefox only
npm run bdd:firefox
```

### Run with Report

```bash
npm run bdd:report
```

View HTML report:
```bash
open cucumber-report.html
```

## Feature Files

### 1. PIM_EmployeeList.feature

**Location:** `features/PIM_EmployeeList.feature`  
**Scenarios:** 12  
**Coverage:** Employee list operations - search, filter, sort, pagination

**Scenarios:**
- TC001: View Employee List
- TC002: Search Employee by Name
- TC003: Search Employee by ID
- TC004: Filter Employees by Employment Status
- TC005: Reset Filters
- TC006: Sort Employee Table by Column
- TC007: Select Single Employee
- TC008: Select Multiple Employees
- TC009: Navigate to Next Page
- TC010: Get Employee Data from Table
- TC011: Employee Exists in List
- TC012: Navigate to Employee Details

**Example Usage:**
```gherkin
Scenario: TC002 - Search Employee by Name
  When User navigates to PIM module
  And User searches for employee with name "John"
  Then Employee list should display matching results
  And Results should contain employee "John"
```

### 2. PIM_AddEmployee.feature

**Location:** `features/PIM_AddEmployee.feature`  
**Scenarios:** 10  
**Coverage:** Add employee form - validation, form filling, login creation

**Scenarios:**
- TC001: Add Employee with Minimum Required Data
- TC002: Add Employee with Full Details
- TC003: Validation Error for Empty First Name
- TC004: Validation Error for Empty Last Name
- TC005: Create Login Credentials for New Employee
- TC006: Cancel Add Employee
- TC007: Duplicate Employee ID Error
- TC008: Delete Uploaded Profile Picture
- TC009: Required Fields Note Displayed
- TC010: Add Employee with Special Characters in Name

### 3. PIM_EmployeeDetails.feature

**Location:** `features/PIM_EmployeeDetails.feature`  
**Scenarios:** 10  
**Coverage:** View/edit employee details - tabs, fields, updates

**Scenarios:**
- TC001: View Employee Personal Details
- TC002: Navigate Between Tabs
- TC003: Edit Employee First Name
- TC004: Edit Employee Mobile Number
- TC005: Cancel Employee Details Edit
- TC006: View Job Details Tab
- TC007: View Contact Details Tab
- TC008: View Education Tab
- TC009: View Skills Tab
- TC010: View Work Experience Tab

### 4. PIM_Reports.feature

**Location:** `features/PIM_Reports.feature`  
**Scenarios:** 8  
**Coverage:** Reports management - search, create, edit, delete, download

**Scenarios:**
- TC001: View All Employee Reports
- TC002: Search Report by Name
- TC003: Verify All Predefined Reports Exist
- TC004: Open Employee Report
- TC005: Download Report
- TC006: Edit Report
- TC007: Delete Report
- TC008: Create Custom Report

## Step Definitions

**Location:** `stepDefinitions/PIM_StepDefinitions.ts`  
**Total Steps:** 150+  

### Step Categories

#### Background Steps
- `Given User is logged into OrangeHRM application`

#### Navigation Steps
- `When User navigates to PIM module`
- `When User clicks on Add Employee button`
- `When User clicks on Reports menu`

#### Employee List Steps
- `Then Employee list page should be displayed`
- `Then Employee table should contain columns`
- `When User searches for employee with name`
- `When User filters employees by employment status`
- etc. (40+ steps)

#### Add Employee Steps
- `Then Add Employee form should be displayed`
- `When User enters employee first name`
- `When User enters employee last name`
- `Then Employee should be added successfully`
- etc. (35+ steps)

#### Employee Details Steps
- `Then Employee details page should be displayed`
- `When User clicks on {string} tab`
- `When User clicks Edit button`
- `When User updates first name to`
- etc. (30+ steps)

#### Reports Steps
- `Then Reports page should be displayed`
- `When User searches for report`
- `When User clicks download button`
- etc. (25+ steps)

### Step Implementation Pattern

```typescript
When('User searches for employee with name {string}', async function (name: string) {
  await testContext.pimPage!.searchEmployeeByName(name);
  await testContext.page!.waitForLoadState('networkidle');
});

Then('Employee list should display matching results', async function () {
  expect(testContext.searchResults).toBeDefined();
  expect(testContext.searchResults!.length).toBeGreaterThan(0);
});
```

## Cucumber Configuration

**File:** `cucumber.js`

### Profiles

#### Default Profile
```bash
npm run bdd
```
- Runs all features
- Uses parallel execution (2 workers)
- Generates: progress bar, HTML, JSON, JUnit reports

#### Smoke Profile
```bash
npm run bdd:smoke
```
- Runs only @smoke tagged scenarios
- Parallel execution (2 workers)
- Quick validation tests

#### Regression Profile
```bash
npm run bdd:regression
```
- Runs all non-manual, non-skip scenarios
- Parallel execution (4 workers)
- Comprehensive test coverage

#### Browser Profiles
```bash
npm run bdd:chrome    # Chrome only
npm run bdd:firefox   # Firefox only
```

### Configuration Options

| Option | Value | Description |
|--------|-------|-------------|
| require | stepDefinitions/**/*.ts | Step definition files |
| requireModule | ts-node/register | TypeScript support |
| format | progress-bar, html, json, junit | Output formats |
| parallel | 2-4 | Number of parallel workers |
| dryRun | false | Execute tests or just show steps |
| strict | true | Treat warnings as errors |
| tags | not @skip | Filter scenarios by tags |

## Test Tags

### Available Tags

```gherkin
@smoke              # Quick smoke tests
@regression         # Full regression suite
@manual             # Manual tests (excluded from automation)
@skip               # Skip these scenarios
@ui                 # UI-focused tests
@integration        # Integration tests
@chrome             # Chrome-specific tests
@firefox            # Firefox-specific tests
```

### Using Tags

```bash
# Run only smoke tests
npx cucumber-js --tags "@smoke"

# Run smoke AND regression
npx cucumber-js --tags "@smoke or @regression"

# Run regression but NOT manual
npx cucumber-js --tags "@regression and not @manual"
```

## Context Management

The step definitions use a `TestContext` object to manage test state:

```typescript
interface TestContext {
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
}
```

### Before Hook
- Launches browser
- Creates new context
- Initializes all page objects
- Runs before each scenario

### After Hook
- Closes context
- Closes browser
- Cleanup after each scenario

## Reports

### Report Formats

#### 1. HTML Report
**File:** `cucumber-report.html`

```bash
npm run bdd:report
```

Features:
- Visual scenario results
- Detailed step-by-step logs
- Screenshots on failure
- Filter by status

#### 2. JSON Report
**File:** `cucumber-report.json`

Use for:
- CI/CD integration
- Custom report generation
- Test analytics

#### 3. JUnit Report
**File:** `cucumber-report.xml`

Use for:
- Jenkins integration
- Azure DevOps
- GitLab CI

## Examples

### Example 1: Simple Search Scenario

**Feature File:**
```gherkin
Scenario: TC002 - Search Employee by Name
  When User navigates to PIM module
  And User searches for employee with name "John"
  Then Employee list should display matching results
  And Results should contain employee "John"
```

**Execution:**
```bash
npx cucumber-js features/PIM_EmployeeList.feature --name "TC002"
```

### Example 2: Add Employee Scenario

**Feature File:**
```gherkin
Scenario: TC001 - Add Employee with Minimum Required Data
  When User clicks on Add Employee button
  And User enters employee first name "John"
  And User enters employee last name "Smith"
  And User clicks Save button
  Then Employee should be added successfully
  And Success message should be displayed
```

### Example 3: Filter with Verification

**Feature File:**
```gherkin
Scenario: TC004 - Filter Employees by Employment Status
  When User navigates to PIM module
  And User filters employees by employment status "Full-Time"
  Then Only full-time employees should be displayed
  And Filter should remain active
```

## Best Practices

### 1. Writing Feature Files

✅ **DO:**
- Use clear, business-readable language
- One assertion per Then step
- Use Given-When-Then structure
- Use meaningful scenario names
- Add tags for filtering

❌ **DON'T:**
- Use technical jargon
- Mix multiple concepts in one step
- Skip the Given (Background) section
- Make steps too specific

### 2. Writing Step Definitions

✅ **DO:**
- Keep steps generic and reusable
- Use meaningful parameter names
- Add appropriate waits
- Capture results in context
- Use descriptive comments

❌ **DON'T:**
- Hardcode values
- Mix UI and business logic
- Skip error handling
- Create dependencies between steps

### 3. Test Data

Store test data in:
```typescript
// Use fixtures for reusable data
const testUser = { username: 'Admin', password: 'admin123' };
const testEmployee = { firstName: 'John', lastName: 'Doe' };
```

### 4. Waits and Timeouts

```typescript
// Use explicit waits
await testContext.page!.waitForLoadState('networkidle');
await UIHelper.isReady(locator);

// Avoid hard-coded delays
// await testContext.page!.waitForTimeout(5000); // ❌ AVOID
```

## Troubleshooting

### Issue 1: Steps not found
```
Undefined step: "User navigates to PIM module"
```

**Solution:**
```bash
# Generate step definitions
npx cucumber-js --dry-run
```

### Issue 2: Browser not starting
```
Error: browser is not defined
```

**Solution:** Check that Before hook runs first:
```typescript
Before(async function () {
  testContext.browser = await chromium.launch();
});
```

### Issue 3: Timeout errors
```
Error: Timeout 30000ms exceeded
```

**Solution:** Increase timeout in step definitions:
```typescript
setDefaultTimeout(60 * 1000); // 60 seconds
```

### Issue 4: Import errors
```
Cannot find module '../src/pages/PIMPage'
```

**Solution:** Ensure path is correct:
```typescript
import { PIMPage } from '../src/pages/PIMPage'; // ✅ Correct
```

## Coexistence with Playwright Tests

Both BDD and Playwright tests can coexist:

**Playwright Tests:**
```bash
npm run test          # Run all Playwright tests
npm run test:pim      # Run PIM Playwright tests
```

**BDD Tests:**
```bash
npm run bdd           # Run all BDD tests
npm run bdd:smoke     # Run smoke BDD tests
```

**Both:**
```bash
npm run test && npm run bdd
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: BDD Tests
on: [push, pull_request]
jobs:
  bdd:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run bdd:report
      - uses: actions/upload-artifact@v2
        with:
          name: cucumber-report
          path: cucumber-report.html
```

### Jenkins Example

```groovy
stage('BDD Tests') {
  steps {
    sh 'npm install'
    sh 'npm run bdd:report'
    publishHTML([
      reportDir: '.',
      reportFiles: 'cucumber-report.html',
      reportName: 'Cucumber Report'
    ])
  }
}
```

## Advanced Topics

### Custom Hooks

Add custom hooks in step definitions:

```typescript
Before('@screenshot', async function () {
  // Take screenshot before scenario
});

AfterStep(async function ({ pickle, result }) {
  if (result?.status === 'FAILED') {
    await testContext.page!.screenshot({ path: `failure-${pickle.name}.png` });
  }
});
```

### Data Tables

Use data tables in scenarios:

```gherkin
Scenario: Verify Multiple Reports Exist
  Then Following reports should exist:
    | Report Name                    |
    | Employee Sales Report          |
    | Employee Expense Report        |
    | Employee Salary Report         |
```

Access in step:
```typescript
Then('Following reports should exist:', async function (dataTable) {
  const reports = dataTable.hashes();
  for (let report of reports) {
    // Verify each report
  }
});
```

## Files Summary

| File | Lines | Purpose |
|------|-------|---------|
| features/PIM_EmployeeList.feature | 110 | Employee list scenarios |
| features/PIM_AddEmployee.feature | 120 | Add employee scenarios |
| features/PIM_EmployeeDetails.feature | 115 | Employee details scenarios |
| features/PIM_Reports.feature | 95 | Reports scenarios |
| stepDefinitions/PIM_StepDefinitions.ts | 850 | Step implementations |
| cucumber.js | 50 | Cucumber configuration |
| package.json | Updated | Cucumber dependencies + scripts |

## Statistics

- **Feature Files:** 4
- **Total Scenarios:** 40+
- **Step Definitions:** 150+
- **Lines of Code:** 1,200+
- **Coverage:** All PIM module functionality

## Next Steps

1. ✅ **Install dependencies:** `npm install`
2. ✅ **Run basic BDD test:** `npm run bdd`
3. ✅ **View report:** Open `cucumber-report.html`
4. ✅ **Add more scenarios:** Update feature files
5. ✅ **Integrate with CI/CD:** Configure pipeline

## Support & Resources

- **Cucumber Docs:** https://cucumber.io/docs/cucumber/
- **Playwright Docs:** https://playwright.dev/
- **TypeScript Docs:** https://www.typescriptlang.org/

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Aug 14, 2026 | Initial setup with 40+ scenarios |

---

**Status: Production Ready ✅**

For quick start, see the Quick Start section above. For detailed feature descriptions, see individual feature file documentation.

**Last Updated:** August 14, 2026  
**Maintained By:** QA Automation Team
