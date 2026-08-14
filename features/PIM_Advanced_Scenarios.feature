Feature: OrangeHRM PIM - Advanced Scenarios
  Complete BDD examples demonstrating all features and best practices

  # ==================== SMOKE TEST SCENARIOS ====================
  @smoke @pim
  Scenario: SMOKE001 - Verify OrangeHRM Loads Successfully
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    Then Employee list page should be displayed

  @smoke @pim
  Scenario: SMOKE002 - Employee Search Works
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    And User searches for employee with name "John"
    Then Employee list should display matching results

  # ==================== REGRESSION TEST SCENARIOS ====================
  @regression @pim @ui
  Scenario: REG001 - Complete Employee Search Workflow
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    And User searches for employee with name "John"
    Then Employee list should display matching results
    And Results should contain employee "John"

  @regression @pim @critical
  Scenario: REG002 - Add New Employee with All Details
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    And User clicks on Add Employee button
    Then Add Employee form should be displayed
    When User enters employee first name "TestEmployee"
    And User enters employee last name "Automation"
    And User enters employee ID "9999"
    And User clicks Save button
    Then Employee should be added successfully
    And Success message should be displayed

  @regression @pim @critical
  Scenario: REG003 - Filter and Verify Employee Status
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    And User filters employees by employment status "Full-Time"
    Then Only full-time employees should be displayed
    When User resets all filters
    Then All employees should be displayed again

  @regression @pim @ui
  Scenario: REG004 - Navigate and View Employee Tabs
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    And User searches for employee with name "John"
    And User clicks on first employee
    Then Employee details page should be displayed
    When User clicks on "Job Details" tab
    Then "Job Details" tab should be active
    When User clicks on "Contact Details" tab
    Then "Contact Details" tab should be active

  # ==================== INTEGRATION TEST SCENARIOS ====================
  @integration @pim @workflow
  Scenario: INT001 - End-to-End Add Employee and View Details
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    And User clicks on Add Employee button
    And User enters employee first name "Integration"
    And User enters employee last name "Test"
    And User clicks Save button
    Then Employee should be added successfully
    When User searches for employee with name "Integration"
    And User clicks on first employee
    Then Employee details page should be displayed

  @integration @pim @reports
  Scenario: INT002 - Access Reports from PIM
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    And User clicks on Reports menu
    Then Reports page should be displayed
    And Report list should contain predefined reports

  # ==================== EDGE CASE SCENARIOS ====================
  @edge-case @pim @validation
  Scenario: EDGE001 - Validation Error for Missing First Name
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    And User clicks on Add Employee button
    And User leaves first name empty
    And User enters employee last name "Doe"
    And User clicks Save button
    Then Validation error "First Name is required" should be displayed

  @edge-case @pim @validation
  Scenario: EDGE002 - Special Characters in Employee Name
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    And User clicks on Add Employee button
    And User enters employee first name "José"
    And User enters employee last name "García-López"
    And User clicks Save button
    Then Employee should be added successfully

  @edge-case @pim @search
  Scenario: EDGE003 - Search with No Results
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    And User searches for employee with name "NonExistentEmployee123XYZ"
    Then Employee list should display matching results

  # ==================== PERFORMANCE TEST SCENARIOS ====================
  @performance @pim
  Scenario: PERF001 - Large Data Set Navigation
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    And Employee list has multiple pages
    And User clicks next page button
    Then Next page of employees should be displayed

  # ==================== SKIP AND MANUAL SCENARIOS ====================
  @manual @pim
  Scenario: MANUAL001 - Manual Verification of UI Elements
    # This scenario requires manual testing
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    Then Visual elements should be properly aligned

  @skip
  Scenario: SKIP001 - Disabled Test Scenario
    # This test is currently skipped due to known issues
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    Then This test will not run

  # ==================== DATA VALIDATION SCENARIOS ====================
  @data-validation @pim @critical
  Scenario: DATA001 - Employee Data Persistence
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    And User gets employee data from row 1
    Then Employee data should include First Name, Last Name, and Employee ID
    And Data should not be empty

  # ==================== COMBINATION TAG SCENARIOS ====================
  @regression @pim @critical @ui
  Scenario: MULTI001 - Multiple Tag Test
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    Then Employee list page should be displayed

  # ==================== BROWSER-SPECIFIC SCENARIOS ====================
  @chrome @pim
  Scenario: CHROME001 - Chrome Browser Test
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    Then Employee list page should be displayed

  @firefox @pim @skip
  Scenario: FIREFOX001 - Firefox Browser Test
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    Then Employee list page should be displayed

  # ==================== EXTENDED SCENARIOS ====================
  @regression @pim @extended
  Scenario: EXT001 - Full Employee Management Workflow
    Given User is logged into OrangeHRM application
    When User navigates to PIM module
    Then Employee list page should be displayed
    When User searches for employee with name "John"
    And User clicks on first employee
    Then Employee details page should be displayed
    When User clicks on "Job Details" tab
    Then "Job Details" tab should be active
    When User clicks on "Personal Details" tab
    Then Employee personal details should be visible
