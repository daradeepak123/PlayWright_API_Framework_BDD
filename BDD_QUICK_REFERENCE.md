# BDD Quick Reference - OrangeHRM PIM

## 🚀 Quick Start (2 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run First BDD Test
```bash
npm run bdd
```

### 3. View Report
```bash
open cucumber-report.html
```

---

## 📁 File Locations

```
features/
├── PIM_EmployeeList.feature          # 12 scenarios
├── PIM_AddEmployee.feature           # 10 scenarios
├── PIM_EmployeeDetails.feature       # 10 scenarios
├── PIM_Reports.feature               # 8 scenarios
└── PIM_Advanced_Scenarios.feature    # 20 scenarios

stepDefinitions/
├── PIM_StepDefinitions.ts            # 150+ steps
└── Hooks.ts                          # Before/After hooks

cucumber.js                           # Configuration
```

---

## 🎯 Common Commands

| Command | Purpose |
|---------|---------|
| `npm run bdd` | Run all BDD tests |
| `npm run bdd:smoke` | Quick smoke tests |
| `npm run bdd:regression` | Full regression |
| `npm run bdd:chrome` | Chrome only |
| `npm run bdd:firefox` | Firefox only |
| `npm run bdd:report` | Run & generate report |

---

## 🔖 Test Tags Quick Reference

| Tag | Purpose | Run |
|-----|---------|-----|
| @smoke | Quick validation | `npm run bdd:smoke` |
| @regression | Full suite | `npm run bdd:regression` |
| @critical | Must pass | `npx cucumber-js --tags "@critical"` |
| @ui | UI tests | `npx cucumber-js --tags "@ui"` |
| @manual | Manual tests | NOT automated |
| @skip | Disabled tests | NOT run |

---

## 📝 Feature File Structure

### Basic Template
```gherkin
Feature: Module - Functionality Description
  As a user role
  I want to do something
  So that I achieve a goal

  Background:
    Given User is logged into OrangeHRM application

  Scenario: TC001 - Description
    When User performs action
    Then Result should be expected
```

### Example
```gherkin
Feature: OrangeHRM PIM - Employee Management

  Scenario: TC002 - Search Employee by Name
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    And User searches for employee with name "John"
    Then Results should contain employee "John"
```

---

## 🔧 Step Definition Patterns

### Common Step Patterns

**Navigation:**
```typescript
When('User navigates to PIM module', async function () {
  await testContext.dashboardPage!.navigateToPIM();
});
```

**Input:**
```typescript
When('User enters employee first name {string}', async function (name: string) {
  await testContext.addEmployeePage!.fillEmployeeName(name, '', '');
});
```

**Assertion:**
```typescript
Then('Employee should be added successfully', async function () {
  const successMsg = testContext.page!.locator('.oxd-notification--success');
  expect(await successMsg.isVisible()).toBeTruthy();
});
```

**Table Data:**
```typescript
Then('Following reports should exist:', async function (dataTable: any) {
  const reports = dataTable.hashes();
  for (let report of reports) {
    const exists = await testContext.page!.locator(`text=${report['Report Name']}`).isVisible();
    expect(exists).toBeTruthy();
  }
});
```

---

## 📊 Available Step Definitions

### Employee List Steps (40+)
- Navigate to PIM
- Search by name/ID
- Filter by status/title/supervisor
- Sort table
- Select employees
- Pagination
- Get employee data

### Add Employee Steps (35+)
- Open form
- Enter names
- Upload picture
- Create login
- Validation errors
- Submit/Cancel

### Employee Details Steps (30+)
- View details
- Navigate tabs
- Edit fields
- Update data
- View different tabs

### Reports Steps (25+)
- View reports
- Search reports
- Create report
- Download report
- Delete report

---

## 🎬 Running Specific Tests

### By Feature File
```bash
npx cucumber-js features/PIM_EmployeeList.feature
```

### By Scenario Name
```bash
npx cucumber-js --name "Search Employee by Name"
```

### By Tag
```bash
npx cucumber-js --tags "@smoke"
```

### Multiple Conditions
```bash
# Smoke AND regression tests
npx cucumber-js --tags "@smoke or @regression"

# Regression but NOT manual
npx cucumber-js --tags "@regression and not @manual"
```

---

## 🐛 Debugging

### Run in Debug Mode
```bash
node --inspect-brk node_modules/.bin/cucumber-js --require-module ts-node/register
```

### Run Single Scenario
```bash
npx cucumber-js features/PIM_EmployeeList.feature --name "TC002"
```

### Check Step Availability
```bash
npx cucumber-js --dry-run
```

### View Generated HTML Report
```bash
# After running tests
start cucumber-report.html      # Windows
open cucumber-report.html       # Mac
xdg-open cucumber-report.html   # Linux
```

---

## 🌳 Test Context Management

### Access Page Objects
```typescript
// In step definitions, use testContext
testContext.page!              // Playwright page
testContext.pimPage!           // PIM page object
testContext.addEmployeePage!   // Add employee page
testContext.employeeDetailsPage! // Employee details

// Store data
testContext.searchResults = results;
testContext.selectedEmployee = employee;
testContext.validationErrors = errors;
```

---

## ✅ Best Practices

### Feature Files
✅ Use business language  
✅ Clear scenario names  
✅ Use Given-When-Then  
✅ One assertion per Then  
✅ Add relevant tags  

❌ Don't use technical jargon  
❌ Don't skip Background  
❌ Don't hardcode values  

### Step Definitions
✅ Generic, reusable steps  
✅ Proper error handling  
✅ Wait for elements properly  
✅ Use UIHelper for common ops  

❌ Don't hardcode selectors  
❌ Don't mix UI and business logic  
❌ Don't use hard timeouts  

---

## 📈 Reports

### HTML Report
```bash
npm run bdd:report
```
Then open `cucumber-report.html`

### JSON Report
```bash
npm run bdd
# Creates cucumber-report.json
```

### Report Features
- ✅ Visual pass/fail indicators
- ✅ Step-by-step details
- ✅ Execution timing
- ✅ Status filtering
- ✅ Tags display

---

## 🔗 Common Gherkin Keywords

| Keyword | Usage | Example |
|---------|-------|---------|
| Feature | Test suite | Feature: PIM Module |
| Background | Setup for all scenarios | Background: User login |
| Scenario | Test case | Scenario: Search employee |
| Given | Initial state | Given User is logged in |
| When | Action performed | When User searches |
| Then | Expected result | Then Results displayed |
| And | Additional condition | And Filter active |
| But | Negative condition | But Not empty |

---

## 🎯 Quick Tag Combinations

### Run Different Test Suites
```bash
# Smoke tests only
npm run bdd:smoke

# Full regression
npm run bdd:regression

# Critical tests only
npx cucumber-js --tags "@critical"

# Smoke + Critical
npx cucumber-js --tags "@smoke or @critical"

# All except manual
npx cucumber-js --tags "not @manual"

# UI tests for Chrome
npx cucumber-js --tags "@ui and @chrome"
```

---

## 📚 Scenario Templates (Copy-Paste)

### Template 1: Simple Verification
```gherkin
@regression
Scenario: TC-XXX - Description
  Given User is logged into OrangeHRM application
  When User navigates to PIM module
  Then Verification should pass
```

### Template 2: Search & Filter
```gherkin
@regression @ui
Scenario: TC-XXX - Search with Filter
  Given User is logged into OrangeHRM application
  When User navigates to PIM module
  And User filters employees by employment status "Full-Time"
  Then Filtered results should display
```

### Template 3: Add Data
```gherkin
@regression @critical
Scenario: TC-XXX - Add New Record
  Given User is logged into OrangeHRM application
  When User navigates to PIM module
  And User clicks on Add Employee button
  And User enters required details
  And User clicks Save button
  Then Success message should display
```

---

## ⚡ Performance Tips

### Parallel Execution
```bash
# Already configured in cucumber.js
# Default: 2 parallel workers
npm run bdd
```

### Smoke Tests (Fast)
```bash
npm run bdd:smoke
# Only critical @smoke tests
```

### Single Worker (Debugging)
Update `cucumber.js`:
```javascript
parallel: 1  // Disable parallelism
```

---

## 🚨 Troubleshooting Quick Fixes

| Issue | Solution |
|-------|----------|
| Steps not found | Run `npx cucumber-js --dry-run` |
| Browser not starting | Check chromium installed: `npx playwright install` |
| Timeout error | Increase in `Hooks.ts`: `setDefaultTimeout(60 * 1000)` |
| Import error | Check path: `import { Page } from '../src/pages/...'` |
| Report not generated | Check file permissions in project root |

---

## 🔄 Workflow

1. **Write Feature**
   ```bash
   # Edit features/*.feature
   # Use Gherkin syntax
   ```

2. **Run Steps Discovery**
   ```bash
   npx cucumber-js --dry-run
   ```

3. **Implement Steps**
   ```bash
   # Edit stepDefinitions/PIM_StepDefinitions.ts
   # Use discovered undefined steps
   ```

4. **Run Tests**
   ```bash
   npm run bdd
   ```

5. **Review Report**
   ```bash
   open cucumber-report.html
   ```

---

## 📊 Test Statistics

- **Feature Files:** 5
- **Total Scenarios:** 50+
- **Step Definitions:** 150+
- **Browser Support:** Chrome, Firefox
- **Execution Time:** ~2-5 min per suite

---

## 🎓 Learning Path

1. **Beginner** - Read this guide
2. **Intermediate** - Run `npm run bdd` and check reports
3. **Advanced** - Add custom scenarios to feature files
4. **Expert** - Extend step definitions with new functionality

---

## 📞 Quick Help

- **Setup issues?** See `BDD_SETUP_GUIDE.md`
- **Feature file help?** Check `features/*.feature`
- **Step definition help?** Check `stepDefinitions/PIM_StepDefinitions.ts`
- **Cucumber docs?** Visit https://cucumber.io/docs/cucumber/

---

**Happy BDD Testing! 🎭**

*Last Updated: August 14, 2026*
