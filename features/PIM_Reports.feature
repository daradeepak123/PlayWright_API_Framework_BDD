Feature: OrangeHRM PIM - Employee Reports
  As an HR Manager
  I want to generate and manage employee reports
  So that I can analyze employee data

  Background:
    Given User is logged into OrangeHRM application
    And User navigates to PIM module

  Scenario: TC001 - View All Employee Reports
    When User clicks on Reports menu
    Then Reports page should be displayed
    And Report list should contain predefined reports

  Scenario: TC002 - Search Report by Name
    When User clicks on Reports menu
    And User searches for report "Employee Sales Report"
    Then Report search results should be displayed
    And Report "Employee Sales Report" should be visible

  Scenario: TC003 - Verify All Predefined Reports Exist
    When User clicks on Reports menu
    Then Following reports should exist:
      | Report Name                    |
      | Employee Sales Report          |
      | Employee Expense Report        |
      | Employee Salary Report         |
      | Employee Attendance Report     |

  Scenario: TC004 - Open Employee Report
    When User clicks on Reports menu
    And User searches for report "Employee Sales Report"
    And User clicks to open report
    Then Report should be displayed
    And Report data should be visible

  Scenario: TC005 - Download Report
    When User clicks on Reports menu
    And User searches for report "Employee Sales Report"
    And User clicks download button
    Then Report file should be downloaded
    And File should be in PDF or Excel format

  Scenario: TC006 - Edit Report
    When User clicks on Reports menu
    And User searches for report "Employee Sales Report"
    And User clicks edit button
    Then Edit report form should be displayed
    And Report details should be editable

  Scenario: TC007 - Delete Report
    When User clicks on Reports menu
    And User selects report "Test Report"
    And User clicks delete button
    And User confirms deletion
    Then Report should be deleted
    And Success message should be displayed

  Scenario: TC008 - Create Custom Report
    When User clicks on Reports menu
    And User clicks "Create Report" button
    And User enters report name "Custom Sales Report"
    And User enters report description "Sales data for Q4"
    And User clicks Save button
    Then Custom report should be created
    And Report should appear in the list
