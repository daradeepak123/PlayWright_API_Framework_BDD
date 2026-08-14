Feature: OrangeHRM PIM - Employee Details
  As an HR Manager
  I want to view and edit employee details
  So that I can maintain accurate employee information

  Background:
    Given User is logged into OrangeHRM application
    And User navigates to PIM module

  Scenario: TC001 - View Employee Personal Details
    When User searches for employee with name "John"
    And User clicks on first employee
    Then Employee details page should be displayed
    And Personal details tab should be selected
    And Employee details should include: First Name, Last Name, Date of Birth

  Scenario: TC002 - Navigate Between Tabs
    When User searches for employee with name "John"
    And User clicks on first employee
    And User clicks on "Job Details" tab
    Then Job Details tab should be active
    When User clicks on "Contact Details" tab
    Then Contact Details tab should be active

  Scenario: TC003 - Edit Employee First Name
    When User searches for employee with name "John"
    And User clicks on first employee
    And User clicks Edit button
    And User updates first name to "Johnny"
    And User clicks Save button
    Then Success message should be displayed
    And First name should be updated to "Johnny"

  Scenario: TC004 - Edit Employee Mobile Number
    When User searches for employee with name "John"
    And User clicks on first employee
    And User clicks on "Contact Details" tab
    And User clicks Edit button
    And User updates mobile number to "+1234567890"
    And User clicks Save button
    Then Success message should be displayed
    And Mobile number should be updated

  Scenario: TC005 - Cancel Employee Details Edit
    When User searches for employee with name "John"
    And User clicks on first employee
    And User clicks Edit button
    And User updates first name to "Cancel Test"
    And User clicks Cancel button from employee details
    Then Edit mode should exit
    And First name should remain unchanged

  Scenario: TC006 - View Job Details Tab
    When User searches for employee with name "John"
    And User clicks on first employee
    And User clicks on "Job Details" tab
    Then Job title should be displayed
    And Employment status should be displayed
    And Hire date should be displayed

  Scenario: TC007 - View Contact Details Tab
    When User searches for employee with name "John"
    And User clicks on first employee
    And User clicks on "Contact Details" tab
    Then Email should be displayed
    And Mobile number field should be visible
    And Address fields should be visible

  Scenario: TC008 - View Education Tab
    When User searches for employee with name "John"
    And User clicks on first employee
    And User clicks on "Education" tab
    Then Education section should be displayed
    And Add education button should be available

  Scenario: TC009 - View Skills Tab
    When User searches for employee with name "John"
    And User clicks on first employee
    And User clicks on "Skills" tab
    Then Skills section should be displayed
    And Skill list should be visible

  Scenario: TC010 - View Work Experience Tab
    When User searches for employee with name "John"
    And User clicks on first employee
    And User clicks on "Work Experience" tab
    Then Work experience section should be displayed
    And Add work experience button should be available
