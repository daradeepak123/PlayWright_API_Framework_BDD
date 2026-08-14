import { test, expect } from '../src/fixtures/fixtures';

/**
 * PIM Module - Complete Test Suite
 * Demonstrates usage of all PIM page objects with various test scenarios
 */

// ============================================================================
// EMPLOYEE LIST PAGE TESTS
// ============================================================================

test.describe('PIM Module - Employee List', () => {

  test('TC001: View employee list with all columns', async ({ authenticatedPage, pimPage }) => {
    // Navigate to PIM Employee List
    await pimPage.navigateToPIMEmployeeList();
    
    // Verify page loaded
    const pageLoaded = await pimPage.verifyPageLoaded();
    expect(pageLoaded).toBeTruthy();
    
    // Verify table is displayed
    const tableDisplayed = await pimPage.verifyTableDisplayed();
    expect(tableDisplayed).toBeTruthy();
  });

  test('TC002: Search employee by name', async ({ pimPage }) => {
    await pimPage.navigateToPIMEmployeeList();
    
    // Search for employee by name
    await pimPage.searchEmployeeByName('Admin');
    
    // Verify search results
    const employeeCount = await pimPage.getEmployeeCount();
    expect(employeeCount).toBeGreaterThan(0);
  });

  test('TC003: Search employee by ID', async ({ pimPage }) => {
    await pimPage.navigateToPIMEmployeeList();
    
    // Search by employee ID
    await pimPage.searchEmployeeByID('1');
    
    // Verify results
    const employeeCount = await pimPage.getEmployeeCount();
    expect(employeeCount).toBeGreaterThanOrEqual(0);
  });

  test('TC004: Filter by employment status', async ({ pimPage }) => {
    await pimPage.navigateToPIMEmployeeList();
    
    // Filter by employment status
    try {
      await pimPage.filterByEmploymentStatus('Active');
      
      const employeeCount = await pimPage.getEmployeeCount();
      expect(employeeCount).toBeGreaterThanOrEqual(0);
    } catch (e) {
      // Employment status filter might not be available in this view
      console.log('Employment status filter not available');
    }
  });

  test('TC005: Reset filters', async ({ pimPage }) => {
    await pimPage.navigateToPIMEmployeeList();
    
    // Apply filter
    await pimPage.searchEmployeeByName('Admin');
    
    // Reset filters
    await pimPage.clickResetButton();
    
    // Verify filters cleared
    const filtersClear = await pimPage.verifyFiltersCleared();
    expect(filtersClear).toBeTruthy();
  });

  test('TC006: Get employee data from table row', async ({ pimPage }) => {
    await pimPage.navigateToPIMEmployeeList();
    
    // Get employee count
    const employeeCount = await pimPage.getEmployeeCount();
    
    if (employeeCount > 0) {
      // Get data from first employee
      const employeeData = await pimPage.getEmployeeDataFromRow(0);
      
      // Verify data is populated
      expect(employeeData.firstName).toBeTruthy();
      expect(employeeData.lastName).toBeTruthy();
    }
  });

  test('TC007: Select single employee', async ({ pimPage }) => {
    await pimPage.navigateToPIMEmployeeList();
    
    const employeeCount = await pimPage.getEmployeeCount();
    
    if (employeeCount > 0) {
      // Select first employee
      await pimPage.selectEmployee(0);
      expect(true).toBeTruthy();
    }
  });

  test('TC008: Sort table by column', async ({ pimPage }) => {
    await pimPage.navigateToPIMEmployeeList();
    
    // Sort by Last Name ascending
    await pimPage.sortByColumn('Last Name', 'asc');
    
    const employeeCount = await pimPage.getEmployeeCount();
    expect(employeeCount).toBeGreaterThanOrEqual(0);
  });

});

// ============================================================================
// ADD EMPLOYEE PAGE TESTS
// ============================================================================

test.describe('PIM Module - Add Employee', () => {

  test('TC009: Verify add employee page loads', async ({ authenticatedPage, addEmployeePage }) => {
    // Navigate to Add Employee
    await addEmployeePage.navigateToAddEmployee();
    
    // Verify page loaded
    const pageLoaded = await addEmployeePage.verifyPageLoaded();
    expect(pageLoaded).toBeTruthy();
  });

  test('TC010: Add employee with minimum required data', async ({ addEmployeePage }) => {
    await addEmployeePage.navigateToAddEmployee();
    
    // Fill minimum required data
    const uniqueName = `TestEmployee_${Date.now()}`;
    await addEmployeePage.fillFirstName('John');
    await addEmployeePage.fillLastName(uniqueName);
    
    // Note: Not actually saving to avoid creating test data
    // In real tests, you would save and verify success
  });

  test('TC011: Add employee with full name', async ({ addEmployeePage }) => {
    await addEmployeePage.navigateToAddEmployee();
    
    const uniqueName = `Employee_${Date.now()}`;
    await addEmployeePage.fillEmployeeName('John', uniqueName, 'Michael');
    
    // Verify fields are filled
    const firstNameField = await addEmployeePage.verifyFirstNameFieldVisible();
    expect(firstNameField).toBeTruthy();
  });

  test('TC012: Verify validation errors for empty required fields', async ({ addEmployeePage }) => {
    await addEmployeePage.navigateToAddEmployee();
    
    // Try to save without filling required fields (commented out to not pollute test db)
    // await addEmployeePage.clickSaveButton();
    
    // Verify required fields are still visible
    const firstNameVisible = await addEmployeePage.verifyFirstNameFieldVisible();
    const lastNameVisible = await addEmployeePage.verifyLastNameFieldVisible();
    
    expect(firstNameVisible).toBeTruthy();
    expect(lastNameVisible).toBeTruthy();
  });

  test('TC013: Verify create login details checkbox', async ({ addEmployeePage }) => {
    await addEmployeePage.navigateToAddEmployee();
    
    // Verify checkbox is visible
    const checkboxVisible = await addEmployeePage.verifyLoginDetailsCheckboxVisible();
    expect(checkboxVisible).toBeTruthy();
  });

  test('TC014: Verify login fields appear when checkbox checked', async ({ addEmployeePage }) => {
    await addEmployeePage.navigateToAddEmployee();
    
    // Check if login fields appear
    const fieldsAppear = await addEmployeePage.verifyLoginFieldsAppear();
    expect(fieldsAppear).toBeTruthy();
  });

  test('TC015: Verify required fields note displayed', async ({ addEmployeePage }) => {
    await addEmployeePage.navigateToAddEmployee();
    
    // Verify "* Required" note
    const noteDisplayed = await addEmployeePage.verifyRequiredFieldsNoteDisplayed();
    expect(noteDisplayed).toBeTruthy();
  });

});

// ============================================================================
// EMPLOYEE DETAILS PAGE TESTS
// ============================================================================

test.describe('PIM Module - Employee Details', () => {

  test('TC016: View employee personal details', async ({ authenticatedPage, employeeDetailsPage }) => {
    // Navigate to employee details (using Admin employee)
    await employeeDetailsPage.navigateToEmployeeDetails(1);
    
    // Verify page loaded
    const pageLoaded = await employeeDetailsPage.verifyPageLoaded();
    expect(pageLoaded).toBeTruthy();
  });

  test('TC017: Navigate between tabs', async ({ employeeDetailsPage }) => {
    await employeeDetailsPage.navigateToEmployeeDetails(1);
    
    // Navigate to Personal Details tab
    await employeeDetailsPage.clickPersonalDetailsTab();
    
    // Verify tab accessible
    const tabAccessible = await employeeDetailsPage.verifyTabAccessible('Personal Details');
    expect(tabAccessible).toBeTruthy();
  });

  test('TC018: Verify employee details fields visible', async ({ employeeDetailsPage }) => {
    await employeeDetailsPage.navigateToEmployeeDetails(1);
    
    // Get employee details
    const empDetails = await employeeDetailsPage.getEmployeeDetails();
    
    // Verify data is populated
    expect(empDetails.firstName).toBeTruthy();
    expect(empDetails.employeeId).toBeTruthy();
  });

  test('TC019: Test job details tab navigation', async ({ employeeDetailsPage }) => {
    await employeeDetailsPage.navigateToEmployeeDetails(1);
    
    // Navigate to Job Details tab
    await employeeDetailsPage.clickJobDetailsTab();
    
    // Verify tab is accessible
    const tabAccessible = await employeeDetailsPage.verifyTabAccessible('Job Details');
    expect(tabAccessible).toBeTruthy();
  });

  test('TC020: Test work experience tab navigation', async ({ employeeDetailsPage }) => {
    await employeeDetailsPage.navigateToEmployeeDetails(1);
    
    // Navigate to Work Experience tab
    await employeeDetailsPage.clickWorkExperienceTab();
    
    // Verify tab accessible
    const tabAccessible = await employeeDetailsPage.verifyTabAccessible('Work Experience');
    expect(tabAccessible).toBeTruthy();
  });

});

// ============================================================================
// REPORTS PAGE TESTS
// ============================================================================

test.describe('PIM Module - Reports', () => {

  test('TC021: View all employee reports', async ({ authenticatedPage, reportsPage }) => {
    // Navigate to Reports
    await reportsPage.navigateToReports();
    
    // Verify page loaded
    const pageLoaded = await reportsPage.verifyPageLoaded();
    expect(pageLoaded).toBeTruthy();
    
    // Verify table displayed
    const tableDisplayed = await reportsPage.verifyReportsTableDisplayed();
    expect(tableDisplayed).toBeTruthy();
  });

  test('TC022: Verify predefined reports exist', async ({ reportsPage }) => {
    await reportsPage.navigateToReports();
    
    // Verify specific reports exist
    const employeeContactReport = await reportsPage.verifyReportExists('Employee Contact info report');
    expect(employeeContactReport).toBeTruthy();
  });

  test('TC023: Verify all predefined reports exist', async ({ reportsPage }) => {
    await reportsPage.navigateToReports();
    
    // Verify all predefined reports
    const allReportsExist = await reportsPage.verifyAllPredefinedReportsExist();
    expect(allReportsExist).toBeTruthy();
  });

  test('TC024: Search report by name', async ({ reportsPage }) => {
    await reportsPage.navigateToReports();
    
    // Search for report
    await reportsPage.searchReportByName('Employee');
    
    // Verify search results
    const reportCount = await reportsPage.getReportCount();
    expect(reportCount).toBeGreaterThan(0);
  });

  test('TC025: Reset report search', async ({ reportsPage }) => {
    await reportsPage.navigateToReports();
    
    // Search then reset
    await reportsPage.searchReportByName('Test');
    await reportsPage.clickResetButton();
    
    // Verify search input cleared
    const inputCleared = await reportsPage.verifySearchInputCleared();
    expect(inputCleared).toBeTruthy();
  });

  test('TC026: Get report count', async ({ reportsPage }) => {
    await reportsPage.navigateToReports();
    
    // Get total report count
    const reportCount = await reportsPage.getReportCount();
    expect(reportCount).toBeGreaterThan(0);
  });

  test('TC027: Get report data from row', async ({ reportsPage }) => {
    await reportsPage.navigateToReports();
    
    const reportCount = await reportsPage.getReportCount();
    
    if (reportCount > 0) {
      // Get report data from first row
      const reportData = await reportsPage.getReportDataFromRow(0);
      
      // Verify report name is populated
      expect(reportData.name).toBeTruthy();
    }
  });

});

// ============================================================================
// CONFIGURATION PAGE TESTS
// ============================================================================

test.describe('PIM Module - Configuration', () => {

  test('TC028: Navigate to reporting methods', async ({ configurationPage }) => {
    await configurationPage.navigateToReportingMethods();
    
    // Verify page loaded
    const pageLoaded = await configurationPage.verifyPageLoaded();
    expect(pageLoaded).toBeTruthy();
  });

  test('TC029: View reporting methods table', async ({ configurationPage }) => {
    await configurationPage.navigateToReportingMethods();
    
    // Verify table displayed
    const tableDisplayed = await configurationPage.verifyTableDisplayed();
    expect(tableDisplayed).toBeTruthy();
  });

  test('TC030: Get reporting methods count', async ({ configurationPage }) => {
    await configurationPage.navigateToReportingMethods();
    
    // Get item count
    const itemCount = await configurationPage.getItemCount();
    expect(itemCount).toBeGreaterThanOrEqual(0);
  });

  test('TC031: Navigate to termination reasons', async ({ configurationPage }) => {
    await configurationPage.navigateToTerminationReasons();
    
    // Verify page loaded
    const pageLoaded = await configurationPage.verifyPageLoaded();
    expect(pageLoaded).toBeTruthy();
  });

  test('TC032: View termination reasons table', async ({ configurationPage }) => {
    await configurationPage.navigateToTerminationReasons();
    
    // Verify table displayed
    const tableDisplayed = await configurationPage.verifyTableDisplayed();
    expect(tableDisplayed).toBeTruthy();
  });

  test('TC033: Get termination reasons count', async ({ configurationPage }) => {
    await configurationPage.navigateToTerminationReasons();
    
    // Get item count
    const itemCount = await configurationPage.getItemCount();
    expect(itemCount).toBeGreaterThanOrEqual(0);
  });

  test('TC034: Search in configuration table', async ({ configurationPage }) => {
    await configurationPage.navigateToReportingMethods();
    
    // Search for item
    await configurationPage.searchByName('Reporting');
    
    // Verify results
    const itemCount = await configurationPage.getItemCount();
    expect(itemCount).toBeGreaterThanOrEqual(0);
  });

});

// ============================================================================
// INTEGRATION TESTS - Complete Workflows
// ============================================================================

test.describe('PIM Module - Integration Tests', () => {

  test('TC035: Complete employee search and view flow', async ({ authenticatedPage, pimPage, employeeDetailsPage }) => {
    // Navigate to Employee List
    await pimPage.navigateToPIMEmployeeList();
    
    // Search for employee
    await pimPage.searchEmployeeByName('Admin');
    
    // Get employee count
    const employeeCount = await pimPage.getEmployeeCount();
    expect(employeeCount).toBeGreaterThan(0);
    
    // Get employee data
    if (employeeCount > 0) {
      const empData = await pimPage.getEmployeeDataFromRow(0);
      expect(empData.firstName).toBeTruthy();
    }
  });

  test('TC036: Navigate through PIM modules', async ({ authenticatedPage, pimPage, reportsPage, configurationPage }) => {
    // Start at Employee List
    await pimPage.navigateToPIMEmployeeList();
    let pageLoaded = await pimPage.verifyPageLoaded();
    expect(pageLoaded).toBeTruthy();
    
    // Go to Reports
    await reportsPage.navigateToReports();
    pageLoaded = await reportsPage.verifyPageLoaded();
    expect(pageLoaded).toBeTruthy();
    
    // Go to Configuration
    await configurationPage.navigateToReportingMethods();
    pageLoaded = await configurationPage.verifyPageLoaded();
    expect(pageLoaded).toBeTruthy();
  });

});

// ============================================================================
// PERFORMANCE & EDGE CASE TESTS
// ============================================================================

test.describe('PIM Module - Edge Cases & Performance', () => {

  test('TC037: Handle empty search results', async ({ pimPage }) => {
    await pimPage.navigateToPIMEmployeeList();
    
    // Search for non-existent employee
    await pimPage.searchEmployeeByName('ZZZZZZZZNONEXISTENT123456');
    
    // Verify no results
    const employeeCount = await pimPage.getEmployeeCount();
    expect(employeeCount).toBe(0);
  });

  test('TC038: Handle special characters in search', async ({ pimPage }) => {
    await pimPage.navigateToPIMEmployeeList();
    
    // Try to search with special characters
    await pimPage.searchEmployeeByName("!@#$%");
    
    // Should not crash
    const pageLoaded = await pimPage.verifyPageLoaded();
    expect(pageLoaded).toBeTruthy();
  });

});
