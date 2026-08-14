Feature: OrangeHRM PIM - Employee Management
  As an HR Manager
  I want to manage employee information
  So that I can maintain accurate employee records

  Background:
    Given User is logged into OrangeHRM application

  Scenario: TC001 - View Employee List
    When User navigates to PIM module
    Then Employee list page should be displayed
    And Employee table should contain columns: "First Name", "Last Name", "Employee Id"

  Scenario: TC002 - Search Employee by Name
    When User navigates to PIM module
    And User searches for employee with name "John"
    Then Employee list should display matching results
    And Results should contain employee "John"

  Scenario: TC003 - Search Employee by ID
    When User navigates to PIM module
    And User searches for employee with ID "0001"
    Then Employee list should display the employee
    And Employee ID should be "0001"

  Scenario: TC004 - Filter Employees by Employment Status
    When User navigates to PIM module
    And User filters employees by employment status "Full-Time"
    Then Only full-time employees should be displayed
    And Filter should remain active

  Scenario: TC005 - Reset Filters
    When User navigates to PIM module
    And User filters employees by employment status "Full-Time"
    And User resets all filters
    Then All employees should be displayed again
    And No filters should be active

  Scenario: TC006 - Sort Employee Table by Column
    When User navigates to PIM module
    And User sorts table by "First Name" in ascending order
    Then Table should be sorted by "First Name"
    And First employee should appear at top

  Scenario: TC007 - Select Single Employee
    When User navigates to PIM module
    And User selects employee at row 1
    Then Employee should be highlighted
    And Delete button should be enabled

  Scenario: TC008 - Select Multiple Employees
    When User navigates to PIM module
    And User selects employees at rows 1, 2, 3
    Then All selected employees should be highlighted
    And Delete button should be enabled

  Scenario: TC009 - Navigate to Next Page
    When User navigates to PIM module
    And Employee list has multiple pages
    And User clicks next page button
    Then Next page of employees should be displayed
    And Previous page button should be enabled

  Scenario: TC010 - Get Employee Data from Table
    When User navigates to PIM module
    And User gets employee data from row 1
    Then Employee data should include First Name, Last Name, and Employee ID
    And Data should not be empty

  Scenario: TC011 - Employee Exists in List
    When User navigates to PIM module
    And User searches for employee "John" "Doe"
    Then Employee "John Doe" should exist in the list

  Scenario: TC012 - Navigate to Employee Details
    When User navigates to PIM module
    And User searches for employee with name "John"
    And User clicks on first employee
    Then Employee details page should be displayed
    And Employee personal details should be visible
