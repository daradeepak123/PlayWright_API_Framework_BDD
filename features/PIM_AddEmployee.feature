Feature: OrangeHRM PIM - Add Employee
  As an HR Manager
  I want to add new employees to the system
  So that I can maintain an updated employee database

  Background:
    Given User is logged into OrangeHRM application
    And User navigates to PIM module

  Scenario: TC001 - Add Employee with Minimum Required Data
    When User clicks on Add Employee button
    Then Add Employee form should be displayed
    When User enters employee first name "John"
    And User enters employee last name "Smith"
    And User clicks Save button
    Then Employee should be added successfully
    And Success message should be displayed

  Scenario: TC002 - Add Employee with Full Details
    When User clicks on Add Employee button
    And User enters employee first name "Jane"
    And User enters employee last name "Doe"
    And User enters employee ID "0999"
    And User uploads profile picture "/path/to/image.jpg"
    And User clicks Save button
    Then Employee should be added successfully
    And Employee should appear in the list

  Scenario: TC003 - Validation Error for Empty First Name
    When User clicks on Add Employee button
    And User leaves first name empty
    And User enters employee last name "Doe"
    And User clicks Save button
    Then Validation error "First Name is required" should be displayed
    And Employee should not be added

  Scenario: TC004 - Validation Error for Empty Last Name
    When User clicks on Add Employee button
    And User enters employee first name "John"
    And User leaves last name empty
    And User clicks Save button
    Then Validation error "Last Name is required" should be displayed
    And Employee should not be added

  Scenario: TC005 - Create Login Credentials for New Employee
    When User clicks on Add Employee button
    And User enters employee first name "Robert"
    And User enters employee last name "Johnson"
    And User checks "Create Login Details" checkbox
    Then Login fields should appear
    When User enters username "robert.johnson"
    And User enters password "Pass@123"
    And User confirms password "Pass@123"
    And User clicks Save button
    Then Employee should be added with login credentials
    And Login account should be created

  Scenario: TC006 - Cancel Add Employee
    When User clicks on Add Employee button
    And User enters employee first name "Test"
    And User enters employee last name "User"
    And User clicks Cancel button
    Then Add Employee form should close
    And No employee should be added

  Scenario: TC007 - Duplicate Employee ID Error
    When User clicks on Add Employee button
    And User enters employee first name "John"
    And User enters employee last name "Duplicate"
    And User enters employee ID "0001"
    And User clicks Save button
    Then Validation error "Employee ID already exists" should be displayed

  Scenario: TC008 - Delete Uploaded Profile Picture
    When User clicks on Add Employee button
    And User uploads profile picture "/path/to/image.jpg"
    And User clicks delete picture button
    Then Profile picture should be removed
    And Upload field should be empty

  Scenario: TC009 - Required Fields Note Displayed
    When User clicks on Add Employee button
    Then Required fields note should be visible
    And Fields marked with asterisk should be highlighted

  Scenario: TC010 - Add Employee with Special Characters in Name
    When User clicks on Add Employee button
    And User enters employee first name "José"
    And User enters employee last name "García-López"
    And User clicks Save button
    Then Employee should be added successfully
    And Special characters should be preserved in name
