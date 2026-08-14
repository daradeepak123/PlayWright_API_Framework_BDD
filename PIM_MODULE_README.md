# PIM Module - Complete Page Object Implementation Guide

## Overview

This document provides a comprehensive guide to the OrangeHRM PIM (Personnel Information Management) Module page objects and test specifications. All page objects are fully implemented and ready to use.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Page Objects Summary](#page-objects-summary)
3. [Detailed Implementation](#detailed-implementation)
4. [Usage Examples](#usage-examples)
5. [Test Scenarios](#test-scenarios)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### Project Structure

```
src/
├── fixtures/
│   ├── fixtures.ts                    # Main fixtures with all page objects
│   ├── PIM_PAGE_OBJECT_SPECS.md       # Detailed specifications
│   ├── FIXTURES_GUIDE.md              # Fixtures usage guide
│   └── QUICK_START.md                 # Quick reference
│
├── pages/
│   ├── LoginPage.ts                   # Login operations
│   ├── DashBoardPage.ts               # Dashboard operations
│   ├── PIMPage.ts                     # Employee List operations
│   ├── AddEmployeePage.ts             # Add Employee operations
│   ├── EmployeeDetailsPage.ts         # Employee Details operations
│   ├── ReportsPage.ts                 # Reports operations
│   └── ConfigurationPage.ts           # Configuration operations
│
├── utils/
│   └── uiHelpers.ts                   # Common UI utilities
│
└── testData/
    └── (test data files)

tests/
├── PIM_Module_Complete.spec.ts        # Complete test suite with 38+ test cases
├── fixtures.example.spec.ts           # Fixture usage examples
└── MIGRATION_GUIDE.spec.ts            # Migration guide with examples
```

---

## Page Objects Summary

### 1. PIMPage (Employee List)

**File:** `src/pages/PIMPage.ts`

**Purpose:** Manage all operations on the Employee List page

**Key Methods:**
- `navigateToPIMEmployeeList()` - Navigate to employee list
- `searchEmployeeByName(name)` - Search by employee name
- `searchEmployeeByID(id)` - Search by employee ID
- `filterByEmploymentStatus(status)` - Filter by status
- `filterByJobTitle(jobTitle)` - Filter by job title
- `filterBySupervisor(supervisorName)` - Filter by supervisor
- `getTableRows()` - Get all table rows
- `getEmployeeCount()` - Get total employees
- `getEmployeeDataFromRow(index)` - Extract employee data
- `viewEmployeeDetails(index)` - Navigate to employee details
- `selectEmployee(index)` - Select employee checkbox
- `sortByColumn(columnName, direction)` - Sort table
- `goToNextPage()` - Pagination
- `verifyPageLoaded()` - Verify page state
- `verifyEmployeeExists(firstName, lastName)` - Verify employee exists

**Usage Example:**
```typescript
test('Search employee', async ({ pimPage }) => {
  await pimPage.navigateToPIMEmployeeList();
  await pimPage.searchEmployeeByName('John Doe');
  
  const employeeCount = await pimPage.getEmployeeCount();
  expect(employeeCount).toBeGreaterThan(0);
  
  const empData = await pimPage.getEmployeeDataFromRow(0);
  console.log(empData); // { id, firstName, lastName, jobTitle, ... }
});
```

---

### 2. AddEmployeePage (Add Employee)

**File:** `src/pages/AddEmployeePage.ts`

**Purpose:** Manage all operations on the Add Employee form

**Key Methods:**
- `navigateToAddEmployee()` - Navigate to add employee page
- `fillFirstName(name)` - Fill first name
- `fillMiddleName(name)` - Fill middle name
- `fillLastName(name)` - Fill last name
- `fillEmployeeName(first, last, middle)` - Fill complete name
- `getEmployeeId()` - Get auto-generated employee ID
- `uploadProfilePicture(filePath)` - Upload profile picture
- `deleteProfilePicture()` - Delete uploaded picture
- `checkCreateLoginDetailsCheckbox()` - Enable login creation
- `fillLoginCredentials(username, password, confirmPassword)` - Fill login details
- `clickSaveButton()` - Save employee
- `clickCancelButton()` - Cancel operation
- `addEmployeeMinimal(firstName, lastName)` - Quick add with min data
- `addEmployeeFull(employeeData)` - Add with full data
- `verifyPageLoaded()` - Verify page is loaded
- `getValidationErrors()` - Get validation error messages
- `verifyValidationErrorExists(errorText)` - Check specific error
- `verifyProfilePictureUploaded()` - Verify picture upload

**Usage Example:**
```typescript
test('Add new employee', async ({ addEmployeePage }) => {
  await addEmployeePage.navigateToAddEmployee();
  
  // Add employee with minimal data
  await addEmployeePage.addEmployeeMinimal('John', 'Doe');
  
  // Or add with full data
  const empData = {
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'Michael',
    profilePicturePath: '/path/to/image.png',
    createLoginDetails: true,
    username: 'johndoe',
    password: 'SecurePass123',
    confirmPassword: 'SecurePass123'
  };
  
  await addEmployeePage.addEmployeeFull(empData);
  
  // Verify success
  const successMsg = await addEmployeePage.getSuccessMessage();
  expect(successMsg).toContain('Successfully');
});
```

---

### 3. EmployeeDetailsPage (Employee Details)

**File:** `src/pages/EmployeeDetailsPage.ts`

**Purpose:** Manage all operations on the Employee Details page

**Key Methods:**
- `navigateToEmployeeDetails(empId)` - Navigate to specific employee
- `clickPersonalDetailsTab()` - Navigate to Personal Details tab
- `clickContactDetailsTab()` - Navigate to Contact Details tab
- `clickJobDetailsTab()` - Navigate to Job Details tab
- `clickEducationTab()` - Navigate to Education tab
- `clickSkillsTab()` - Navigate to Skills tab
- `clickEditButton()` - Enter edit mode
- `updateFirstName(name)` - Update first name
- `updateLastName(name)` - Update last name
- `updateDateOfBirth(dob)` - Update DOB
- `selectGender(gender)` - Select gender
- `selectMaritalStatus(status)` - Select marital status
- `updateMobile(mobile)` - Update mobile number
- `updateWorkEmail(email)` - Update work email
- `clickSaveButton()` - Save changes
- `clickDeleteButton()` - Delete employee
- `confirmDelete()` - Confirm deletion
- `getEmployeeDetails()` - Get all details as object
- `verifyPageLoaded()` - Verify page loaded
- `isInEditMode()` - Check if in edit mode
- `verifyTabAccessible(tabName)` - Check tab accessibility

**Usage Example:**
```typescript
test('View and edit employee details', async ({ employeeDetailsPage }) => {
  // Navigate to employee details
  await employeeDetailsPage.navigateToEmployeeDetails(1);
  
  // Get employee details
  const details = await employeeDetailsPage.getEmployeeDetails();
  console.log(details);
  // { firstName, lastName, employeeId, pageUrl, ... }
  
  // Edit employee
  await employeeDetailsPage.clickEditButton();
  await employeeDetailsPage.updateFirstName('Jane');
  await employeeDetailsPage.updateMobile('+1234567890');
  await employeeDetailsPage.clickSaveButton();
  
  // Verify changes
  const changesSaved = await employeeDetailsPage.verifyChangesSavedSuccessfully();
  expect(changesSaved).toBeTruthy();
});
```

---

### 4. ReportsPage (Reports)

**File:** `src/pages/ReportsPage.ts`

**Purpose:** Manage all operations on the Reports page

**Key Methods:**
- `navigateToReports()` - Navigate to reports page
- `navigateToAddReport()` - Navigate to create new report
- `searchReportByName(name)` - Search for report
- `clickSearchButton()` - Apply search
- `clickResetButton()` - Clear search
- `getTableRows()` - Get all report rows
- `getReportCount()` - Get total reports
- `getReportNameFromRow(index)` - Get report name
- `getReportDataFromRow(index)` - Get complete row data
- `openReport(index)` - Open specific report
- `openReportByName(name)` - Open report by name
- `editReport(index)` - Edit report
- `deleteReport(index)` - Delete report
- `downloadReport(index)` - Download report
- `viewReport(index)` - View report
- `selectReport(index)` - Select report checkbox
- `createCustomReport(name, data)` - Create new report
- `verifyPageLoaded()` - Verify page loaded
- `verifyReportExists(name)` - Check if report exists
- `verifyAllPredefinedReportsExist()` - Verify all defaults exist

**Available Pre-defined Reports:**
- All Employee Sub Unit Hierarchy Report
- Employee Contact info report
- Employee Job Details
- PIM Sample Report

**Usage Example:**
```typescript
test('Work with reports', async ({ reportsPage }) => {
  await reportsPage.navigateToReports();
  
  // Verify predefined reports
  const allExist = await reportsPage.verifyAllPredefinedReportsExist();
  expect(allExist).toBeTruthy();
  
  // Search for specific report
  await reportsPage.searchReportByName('Employee Contact');
  
  // Get report count
  const count = await reportsPage.getReportCount();
  expect(count).toBeGreaterThan(0);
  
  // Open report
  await reportsPage.openReportByName('Employee Contact info report');
  
  // Download report
  await reportsPage.downloadReport(0);
});
```

---

### 5. ConfigurationPage (Configuration)

**File:** `src/pages/ConfigurationPage.ts`

**Purpose:** Manage all operations on Configuration pages

**Supported Pages:**
- Reporting Methods
- Termination Reasons
- Job Titles
- Employment Status

**Key Methods:**
- `navigateToReportingMethods()` - Navigate to reporting methods
- `navigateToTerminationReasons()` - Navigate to termination reasons
- `navigateToJobTitles()` - Navigate to job titles
- `navigateToEmploymentStatus()` - Navigate to employment status
- `searchByName(term)` - Search in configuration
- `getTableRows()` - Get all configuration items
- `getItemCount()` - Get total items
- `getNameFromRow(index)` - Get item name from row
- `getRowData(index)` - Get complete row data
- `selectItem(index)` - Select item checkbox
- `editItem(index)` - Edit configuration item
- `deleteItem(index)` - Delete configuration item
- `confirmDelete()` - Confirm deletion
- `addConfigurationItem(name, data)` - Add new item
- `updateConfigurationItem(index, name, data)` - Update item
- `verifyPageLoaded()` - Verify page loaded
- `verifyItemExists(name)` - Check if item exists
- `verifyItemCreatedSuccessfully()` - Verify success

**Usage Example:**
```typescript
test('Manage configuration', async ({ configurationPage }) => {
  // Navigate to Reporting Methods
  await configurationPage.navigateToReportingMethods();
  
  // Get total items
  const itemCount = await configurationPage.getItemCount();
  console.log('Total reporting methods:', itemCount);
  
  // Search for item
  await configurationPage.searchByName('Direct');
  
  // Add new reporting method (example)
  await configurationPage.addConfigurationItem('New Method', {
    description: 'Test reporting method'
  });
  
  // Verify creation
  const created = await configurationPage.verifyItemCreatedSuccessfully();
  expect(created).toBeTruthy();
});
```

---

## Detailed Implementation

### Using Fixtures in Tests

#### Import Fixtures
```typescript
import { test, expect } from '../src/fixtures/fixtures';
```

#### Access Page Objects
```typescript
test('Example test', async ({ 
  authenticatedPage,      // Pre-logged-in page
  pimPage,                // PIM Employee List
  addEmployeePage,        // Add Employee form
  employeeDetailsPage,    // Employee Details
  reportsPage,            // Reports
  configurationPage,      // Configuration
  uiHelper                // UI utilities
}) => {
  // Test code here
});
```

---

## Usage Examples

### Example 1: Complete Employee Lifecycle

```typescript
test('Complete employee lifecycle', async ({
  pimPage,
  addEmployeePage,
  employeeDetailsPage,
  uiHelper
}) => {
  // Step 1: Navigate to Add Employee
  await addEmployeePage.navigateToAddEmployee();
  
  // Step 2: Create new employee
  const empName = `Employee_${Date.now()}`;
  await addEmployeePage.fillEmployeeName('John', empName, 'Michael');
  await addEmployeePage.clickSaveButton();
  
  // Step 3: Verify employee created
  const created = await addEmployeePage.verifyEmployeeCreatedSuccessfully();
  expect(created).toBeTruthy();
  
  // Step 4: Navigate back to Employee List
  await pimPage.navigateToPIMEmployeeList();
  
  // Step 5: Search for created employee
  await pimPage.searchEmployeeByName(empName);
  
  // Step 6: Verify employee appears in list
  const exists = await pimPage.verifyEmployeeExists('John', empName);
  expect(exists).toBeTruthy();
  
  // Step 7: View employee details
  await pimPage.viewEmployeeDetails(0);
  
  // Step 8: Edit employee
  await employeeDetailsPage.clickEditButton();
  await employeeDetailsPage.updateMobile('+1234567890');
  await employeeDetailsPage.clickSaveButton();
  
  // Step 9: Verify changes saved
  const saved = await employeeDetailsPage.verifyChangesSavedSuccessfully();
  expect(saved).toBeTruthy();
});
```

### Example 2: Report Management

```typescript
test('Report management workflow', async ({
  reportsPage,
  configurationPage
}) => {
  // View all reports
  await reportsPage.navigateToReports();
  
  const reportCount = await reportsPage.getReportCount();
  console.log('Total reports:', reportCount);
  
  // Verify all predefined reports
  const allExist = await reportsPage.verifyAllPredefinedReportsExist();
  expect(allExist).toBeTruthy();
  
  // Search for specific report
  await reportsPage.searchReportByName('Employee Contact');
  
  // Get report details
  const reportData = await reportsPage.getReportDataFromRow(0);
  console.log('Report:', reportData);
  
  // View report
  await reportsPage.viewReport(0);
  
  // Download report
  await reportsPage.downloadReport(0);
});
```

### Example 3: Advanced Search and Filter

```typescript
test('Advanced employee search', async ({
  pimPage
}) => {
  await pimPage.navigateToPIMEmployeeList();
  
  // Search by name
  await pimPage.searchEmployeeByName('Admin');
  
  let empCount = await pimPage.getEmployeeCount();
  console.log('Results by name:', empCount);
  
  // Reset and try different filter
  await pimPage.clickResetButton();
  
  // Search by ID
  await pimPage.searchEmployeeByID('1');
  
  empCount = await pimPage.getEmployeeCount();
  console.log('Results by ID:', empCount);
  
  // Get employee data
  if (empCount > 0) {
    const empData = await pimPage.getEmployeeDataFromRow(0);
    console.log('Employee:', empData);
    
    // Verify specific fields
    expect(empData.firstName).toBeTruthy();
    expect(empData.lastName).toBeTruthy();
    expect(empData.jobTitle).toBeTruthy();
  }
});
```

---

## Test Scenarios

### Complete Test Coverage (38+ Test Cases)

See `tests/PIM_Module_Complete.spec.ts` for all test scenarios:

**Employee List Tests:**
- TC001: View employee list with all columns
- TC002: Search employee by name
- TC003: Search employee by ID
- TC004: Filter by employment status
- TC005: Reset filters
- TC006: Get employee data from table row
- TC007: Select single employee
- TC008: Sort table by column

**Add Employee Tests:**
- TC009: Verify add employee page loads
- TC010: Add employee with minimum required data
- TC011: Add employee with full name
- TC012: Verify validation errors
- TC013: Verify create login details checkbox
- TC014: Verify login fields appear
- TC015: Verify required fields note

**Employee Details Tests:**
- TC016: View employee personal details
- TC017: Navigate between tabs
- TC018: Verify employee details fields
- TC019: Test job details tab
- TC020: Test work experience tab

**Reports Tests:**
- TC021: View all employee reports
- TC022: Verify predefined reports
- TC023: Verify all predefined reports
- TC024: Search report by name
- TC025: Reset report search
- TC026: Get report count
- TC027: Get report data from row

**Configuration Tests:**
- TC028: Navigate to reporting methods
- TC029: View reporting methods table
- TC030: Get reporting methods count
- TC031: Navigate to termination reasons
- TC032: View termination reasons table
- TC033: Get termination reasons count
- TC034: Search in configuration table

**Integration Tests:**
- TC035: Complete employee search and view flow
- TC036: Navigate through PIM modules

**Performance & Edge Cases:**
- TC037: Handle empty search results
- TC038: Handle special characters in search

---

## Best Practices

### 1. Test Data Management

```typescript
// Use timestamps to ensure unique test data
const uniqueName = `TestEmployee_${Date.now()}`;

// Always clean up test data after tests
afterEach(async ({ page }) => {
  // Delete test data if created
});
```

### 2. Proper Wait Conditions

```typescript
// Always wait for page load after navigation
await pimPage.navigateToPIMEmployeeList();
await page.waitForLoadState('networkidle');

// Use UIHelper.isReady() for element visibility
const isReady = await UIHelper.isReady(locator);
```

### 3. Error Handling

```typescript
// Capture validation errors
const errors = await addEmployeePage.getValidationErrors();
console.log('Validation errors:', errors);

// Check specific error
const hasError = await addEmployeePage.verifyValidationErrorExists('Required');
```

### 4. Test Organization

```typescript
// Group related tests
test.describe('PIM Module - Employee List', () => {
  // Related tests here
});

test.describe('PIM Module - Add Employee', () => {
  // Related tests here
});
```

### 5. Assertion Best Practices

```typescript
// Use specific assertions
expect(employeeCount).toBeGreaterThan(0);
expect(firstName).toBeTruthy();
expect(savedSuccessfully).toBe(true);

// Avoid vague assertions
// ❌ expect(result).toBeTruthy(); // Too vague
// ✅ expect(pageLoaded).toBeTruthy(); // Clear intent
```

---

## Troubleshooting

### Issue: Element Not Found

**Solution:** Check selector in page object
```typescript
// Verify selector matches current page state
const element = this.page.locator('correct-selector');
console.log('Element visible:', await element.isVisible());
```

### Issue: Test Timeout

**Solution:** Increase wait timeout
```typescript
await page.waitForLoadState('networkidle');
await page.waitForTimeout(2000);
```

### Issue: Login Failed

**Solution:** Ensure using authenticatedPage fixture
```typescript
// Use this:
test('test', async ({ authenticatedPage }) => {
  // Already logged in
});

// Not this:
test('test', async ({ page }) => {
  // Need to log in manually
});
```

### Issue: Stale Elements

**Solution:** Re-fetch elements after navigation
```typescript
// Don't:
const row = await pimPage.getTableRows()[0];
await pimPage.clickSearchButton();
await row.click(); // Might be stale

// Do:
await pimPage.getTableRows(); // Re-fetch
const row = (await pimPage.getTableRows())[0];
await row.click();
```

---

## Running Tests

```bash
# Run all PIM tests
npx playwright test tests/PIM_Module_Complete.spec.ts

# Run specific test
npx playwright test tests/PIM_Module_Complete.spec.ts -g "TC001"

# Run with UI
npx playwright test --ui

# Run with debug
npx playwright test --debug

# Generate report
npx playwright test --reporter=html
```

---

## File Reference

| File | Purpose | Location |
|------|---------|----------|
| PIM_PAGE_OBJECT_SPECS.md | Detailed specifications | src/fixtures/ |
| PIMPage.ts | Employee List operations | src/pages/ |
| AddEmployeePage.ts | Add Employee operations | src/pages/ |
| EmployeeDetailsPage.ts | Employee Details operations | src/pages/ |
| ReportsPage.ts | Reports operations | src/pages/ |
| ConfigurationPage.ts | Configuration operations | src/pages/ |
| PIM_Module_Complete.spec.ts | Complete test suite | tests/ |
| fixtures.ts | Fixture definitions | src/fixtures/ |

---

## Summary

✅ **All PIM module page objects are fully implemented and ready to use**

✅ **38+ test scenarios covering all major workflows**

✅ **Complete fixture integration for easy test setup**

✅ **Comprehensive error handling and validation**

✅ **Best practices included for test maintenance**

---

**Happy Testing! 🎭**

For questions or issues, refer to the detailed specifications in `PIM_PAGE_OBJECT_SPECS.md` or review examples in `PIM_Module_Complete.spec.ts`.
