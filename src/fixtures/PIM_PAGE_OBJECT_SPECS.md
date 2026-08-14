# OrangeHRM PIM Module - Page Object Specifications

## Overview
Complete specification of all PIM (Personnel Information Management) module pages, elements, and test scenarios in OrangeHRM.

---

## 1. PIM MAIN MENU STRUCTURE

### Menu Items
- **Employee List** - View all employees
- **Add Employee** - Create new employee
- **Reports** - View employee reports
- **Configuration** - System configuration (dropdown)
  - Reporting Methods
  - Termination Reasons

---

## 2. EMPLOYEE LIST PAGE

### URL
`https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList`

### Page Title
"Employee Information"

### Search/Filter Section

#### Filter Fields
1. **Employee Name**
   - Type: Text input with autocomplete
   - Placeholder: "Type for hints..."
   - Behavior: Searches by first name, middle name, or last name

2. **Employee Id**
   - Type: Text input
   - Placeholder: Text field
   - Behavior: Exact ID match

3. **Employment Status**
   - Type: Dropdown
   - Default: "-- Select --"
   - Values: Active, Inactive, Terminated, etc.

4. **Include**
   - Type: Dropdown with predefined option
   - Default: "Current Employees Only"
   - Options: Current Employees Only, Terminated Employees, etc.

5. **Supervisor Name**
   - Type: Text input with autocomplete
   - Placeholder: "Type for hints..."

6. **Job Title**
   - Type: Dropdown
   - Default: "-- Select --"
   - Behavior: Populated from Job Title master

### Action Buttons
- **Search** - Apply filters
- **Reset** - Clear all filters
- **Add** - Navigate to Add Employee page

### Data Table

#### Table Headers
| Header | Sortable | Filterable | Description |
|--------|----------|-----------|-------------|
| Checkbox | No | No | Bulk selection checkbox |
| Id | Yes | No | Employee ID |
| First (& Middle) Name | Yes | No | First and middle names |
| Last Name | Yes | No | Last name |
| Job Title | Yes | No | Current job title |
| Employment Status | Yes | No | Current employment status |
| Sub Unit | Yes | No | Department/Sub unit |
| Supervisor | Yes | No | Reporting manager |
| Actions | No | No | Edit, Delete, etc. |

#### Table Actions
- **Per Row**: Edit, Delete, View details
- **Bulk**: Select multiple rows with checkbox
- **Pagination**: Navigate through pages

### Test Scenarios

#### TC001: View Employee List
- **Steps:**
  1. Navigate to Employee List page
  2. Verify page loads successfully
  3. Verify table displays with headers
  4. Verify data is populated
- **Expected Result:** Page displays employee list with all columns

#### TC002: Search by Employee Name
- **Steps:**
  1. Enter employee name in "Employee Name" field
  2. Click Search
  3. Verify filtered results
- **Expected Result:** Table shows only employees matching the name

#### TC003: Filter by Employment Status
- **Steps:**
  1. Select employment status from dropdown
  2. Click Search
  3. Verify results
- **Expected Result:** Table shows only employees with selected status

#### TC004: Filter by Job Title
- **Steps:**
  1. Select job title from dropdown
  2. Click Search
  3. Verify results
- **Expected Result:** Table shows only employees with selected job title

#### TC005: Search by Employee ID
- **Steps:**
  1. Enter employee ID
  2. Click Search
  3. Verify result
- **Expected Result:** Table shows employee with matching ID or no results

#### TC006: Filter by Supervisor
- **Steps:**
  1. Enter supervisor name
  2. Click Search
  3. Verify results
- **Expected Result:** Table shows employees under that supervisor

#### TC007: Combined Filters
- **Steps:**
  1. Apply multiple filters together
  2. Click Search
  3. Verify results match all criteria
- **Expected Result:** Table shows results matching all applied filters

#### TC008: Reset Filters
- **Steps:**
  1. Apply multiple filters
  2. Click Reset
  3. Verify all fields cleared
- **Expected Result:** All filters cleared, table shows all employees

#### TC009: Sort Table by Column
- **Steps:**
  1. Click on sortable column header
  2. Verify sort order (ascending)
  3. Click again, verify sort order (descending)
- **Expected Result:** Table data sorted correctly

#### TC010: Select Multiple Employees
- **Steps:**
  1. Click checkboxes for multiple rows
  2. Verify checkbox state
  3. Verify bulk action options appear
- **Expected Result:** Multiple rows selected, bulk actions available

#### TC011: Pagination
- **Steps:**
  1. Navigate to next page
  2. Verify different data loads
  3. Go to previous page
  4. Verify original data displays
- **Expected Result:** Pagination works correctly

#### TC012: View Employee Details
- **Steps:**
  1. Click on employee row or "Edit" action
  2. Verify employee details page loads
- **Expected Result:** Employee details page displayed

---

## 3. ADD EMPLOYEE PAGE

### URL
`https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee`

### Page Title
"Add Employee"

### Form Sections

#### Section 1: Profile Picture
- **Upload Button:** "Choose File"
- **Accepted Formats:** .jpg, .png, .gif
- **Size Limit:** 1MB
- **Recommended Dimensions:** 200px X 200px
- **Default Image:** Placeholder avatar
- **Delete Button:** Remove uploaded picture

#### Section 2: Employee Information (Required*)

##### Employee Full Name* (Required)
- **First Name**
  - Type: Text input
  - Placeholder: "First Name"
  - Required: Yes
  - Behavior: Mandatory field

- **Middle Name**
  - Type: Text input
  - Placeholder: "Middle Name"
  - Required: No

- **Last Name**
  - Type: Text input
  - Placeholder: "Last Name"
  - Required: Yes
  - Behavior: Mandatory field

##### Employee Id
- Type: Text input
- Default: Auto-generated (e.g., "0448")
- Behavior: Read-only or pre-filled
- Required: No

#### Section 3: Login Details
- **Label:** "Create Login Details"
- **Type:** Checkbox
- **Default:** Unchecked
- **Behavior:** When checked, additional login fields appear

### Action Buttons
- **Cancel** - Discard and return
- **Save** - Save employee record

### Validation Rules
- First Name: Required
- Last Name: Required
- At least one name field must be filled
- Employee ID: Auto-generated if not provided
- Profile Picture: Optional, max 1MB

### Test Scenarios

#### TC013: Add Employee with Minimum Data
- **Steps:**
  1. Navigate to Add Employee
  2. Enter First Name: "John"
  3. Enter Last Name: "Doe"
  4. Click Save
- **Expected Result:** Employee created successfully, redirected to employee details

#### TC014: Add Employee with Full Name
- **Steps:**
  1. Enter First Name: "John"
  2. Enter Middle Name: "Michael"
  3. Enter Last Name: "Doe"
  4. Click Save
- **Expected Result:** Employee created with middle name

#### TC015: Add Employee with Picture
- **Steps:**
  1. Click "Choose File"
  2. Select .png image (max 1MB, 200x200px)
  3. Verify image appears in preview
  4. Enter First and Last Name
  5. Click Save
- **Expected Result:** Employee created with profile picture

#### TC016: Validation - First Name Required
- **Steps:**
  1. Leave First Name empty
  2. Enter Last Name: "Doe"
  3. Click Save
- **Expected Result:** Validation error displayed

#### TC017: Validation - Last Name Required
- **Steps:**
  1. Enter First Name: "John"
  2. Leave Last Name empty
  3. Click Save
- **Expected Result:** Validation error displayed

#### TC018: Create Login Details
- **Steps:**
  1. Enter employee name
  2. Check "Create Login Details"
  3. Verify login fields appear
  4. Fill login details
  5. Save
- **Expected Result:** Employee created with login credentials

#### TC019: Invalid Picture Format
- **Steps:**
  1. Try to upload .pdf or other non-image file
  2. Verify error message
- **Expected Result:** Error shown, file not uploaded

#### TC020: Picture Over Size Limit
- **Steps:**
  1. Try to upload image > 1MB
  2. Verify error message
- **Expected Result:** Error shown, file not uploaded

#### TC021: Remove Uploaded Picture
- **Steps:**
  1. Upload a picture
  2. Click delete button on picture
  3. Verify picture removed
- **Expected Result:** Picture removed, default placeholder shown

#### TC022: Cancel Add Employee
- **Steps:**
  1. Fill some data
  2. Click Cancel
  3. Verify navigation
- **Expected Result:** Data not saved, redirected to Employee List

---

## 4. EMPLOYEE DETAILS PAGE

### URL
`https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPersonalDetails/empNumber/{empId}`

### Page Sections

#### Personal Information Tab
- Employee Name
- Date of Birth
- Gender
- Marital Status
- Nationality
- Contact Details (Phone, Mobile, Email)

#### Job Information Tab
- Job Title
- Employment Status
- Department
- Job Category
- Supervisor
- Employment Date
- Contract Details (if applicable)

#### Contact Information Tab
- Address
- Phone
- Email
- Emergency Contacts

#### Test Scenarios

#### TC023: View Employee Personal Details
- **Steps:**
  1. Click on employee from list
  2. Navigate to Personal Information tab
  3. Verify all fields display correctly
- **Expected Result:** Employee details displayed correctly

#### TC024: Edit Employee Details
- **Steps:**
  1. Navigate to employee details
  2. Click Edit
  3. Modify a field
  4. Click Save
- **Expected Result:** Changes saved successfully

#### TC025: View Job Information
- **Steps:**
  1. Navigate to employee details
  2. Click Job Information tab
  3. Verify job details display
- **Expected Result:** Job information displayed correctly

---

## 5. REPORTS PAGE

### URL
`https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewDefinedPredefinedReports`

### Page Title
"Employee Reports"

### Search Section
- **Report Name**
  - Type: Text input with autocomplete
  - Placeholder: "Type for hints..."

### Action Buttons
- **Search** - Find reports
- **Reset** - Clear search
- **Add** - Create new report

### Reports Table

#### Table Headers
| Header | Description |
|--------|-------------|
| Checkbox | Bulk selection |
| Report Name | Name of the report |
| Actions | Edit, Delete, Download |

#### Available Pre-defined Reports
1. **All Employee Sub Unit Hierarchy Report**
   - Shows employees in sub-unit hierarchy structure

2. **Employee Contact Info Report**
   - Displays employee contact information

3. **Employee Job Details Report**
   - Shows job information for employees

4. **PIM Sample Report**
   - Sample report template

#### Row Actions
- Edit report
- Delete report
- Download/View report

### Test Scenarios

#### TC026: View All Reports
- **Steps:**
  1. Navigate to Reports page
  2. Verify all predefined reports display
- **Expected Result:** All reports listed in table

#### TC027: Search Report by Name
- **Steps:**
  1. Enter report name: "Employee Contact"
  2. Click Search
  3. Verify filtered results
- **Expected Result:** Only matching reports displayed

#### TC028: Open Report
- **Steps:**
  1. Click on report name
  2. Verify report opens/loads
- **Expected Result:** Report content displayed

#### TC029: Create Custom Report
- **Steps:**
  1. Click Add button
  2. Enter report name
  3. Select fields to include
  4. Configure filters
  5. Save
- **Expected Result:** Custom report created

#### TC030: Delete Report
- **Steps:**
  1. Select a report
  2. Click Delete
  3. Confirm deletion
- **Expected Result:** Report deleted from list

#### TC031: Download Report
- **Steps:**
  1. Open a report
  2. Click Download/Export
  3. Verify file downloaded
- **Expected Result:** Report file downloaded (PDF/CSV/Excel)

#### TC032: Bulk Select Reports
- **Steps:**
  1. Select multiple report checkboxes
  2. Verify bulk actions appear
  3. Perform bulk action
- **Expected Result:** Action applied to selected reports

---

## 6. CONFIGURATION - REPORTING METHODS PAGE

### Sections
- List of reporting methods
- Add/Edit/Delete reporting methods
- Define relationship between employees and supervisors

### Test Scenarios

#### TC033: Add Reporting Method
- **Steps:**
  1. Navigate to Reporting Methods
  2. Click Add
  3. Enter reporting method name
  4. Save
- **Expected Result:** Method added successfully

#### TC034: View Reporting Methods
- **Steps:**
  1. Navigate to Reporting Methods
  2. Verify list of methods displays
- **Expected Result:** All reporting methods listed

#### TC035: Edit Reporting Method
- **Steps:**
  1. Select a method
  2. Click Edit
  3. Modify details
  4. Save
- **Expected Result:** Changes saved

#### TC036: Delete Reporting Method
- **Steps:**
  1. Select a method
  2. Click Delete
  3. Confirm
- **Expected Result:** Method deleted

---

## 7. CONFIGURATION - TERMINATION REASONS PAGE

### Sections
- List of termination reasons
- Add/Edit/Delete termination reasons
- Used when terminating employees

### Available Reasons
- Resignation
- Retirement
- Termination
- Mutual Agreement
- etc.

### Test Scenarios

#### TC037: View Termination Reasons
- **Steps:**
  1. Navigate to Termination Reasons
  2. Verify list displays
- **Expected Result:** All termination reasons shown

#### TC038: Add Termination Reason
- **Steps:**
  1. Click Add
  2. Enter reason name
  3. Save
- **Expected Result:** New reason added

#### TC039: Edit Termination Reason
- **Steps:**
  1. Select a reason
  2. Click Edit
  3. Modify details
  4. Save
- **Expected Result:** Changes saved

#### TC040: Delete Termination Reason
- **Steps:**
  1. Select a reason
  2. Click Delete
  3. Confirm
- **Expected Result:** Reason deleted

---

## 8. COMMON TEST DATA REQUIREMENTS

### Employee Test Data
```
{
  firstName: "John",
  middleName: "Michael",
  lastName: "Doe",
  employeeId: "Auto-generated",
  jobTitle: "Software Engineer",
  department: "IT",
  employmentStatus: "Active",
  supervisor: "Admin",
  dateOfBirth: "1990-01-15",
  gender: "Male",
  maritalStatus: "Single",
  nationality: "British",
  email: "john.doe@example.com",
  phone: "+1234567890",
  mobile: "+9876543210"
}
```

### Filter Combinations
- Employee Name + Employment Status
- Job Title + Department
- Supervisor + Employment Status
- Employee ID + Employment Status
- All filters combined

### Pagination Test Data
- Total employees: 50+
- Results per page: 10, 25, 50
- Test navigation: First, Previous, Next, Last

---

## 9. COMMON SELECTORS AND LOCATORS

### Search Filters
```
Employee Name: input[placeholder="Type for hints..."]
Employee ID: input for employee ID
Employment Status: dropdown selector
Include Dropdown: Current Employees Only selector
Supervisor Name: input with autocomplete
Job Title: dropdown selector
```

### Buttons
```
Search: button:text("Search")
Reset: button:text("Reset")
Add: button:has-text("Add")
Save: button:text("Save")
Cancel: button:text("Cancel")
Edit: action button in row
Delete: action button in row
```

### Table
```
Main Table: table[role="table"]
Rows: tbody tr
Headers: th
Checkboxes: input[type="checkbox"]
```

---

## 10. PAGE OBJECT IMPLEMENTATION CHECKLIST

### PIMPage Class
- [ ] Search employee by name
- [ ] Search employee by ID
- [ ] Filter by employment status
- [ ] Filter by job title
- [ ] Filter by supervisor
- [ ] Apply multiple filters
- [ ] Reset filters
- [ ] Sort table columns
- [ ] Select single employee
- [ ] Select multiple employees
- [ ] Verify pagination
- [ ] Navigate to employee details
- [ ] Navigate to Add Employee
- [ ] Navigate to Reports
- [ ] Navigate to Configuration

### AddEmployeePage Class
- [ ] Fill first name
- [ ] Fill middle name
- [ ] Fill last name
- [ ] Upload profile picture
- [ ] Delete profile picture
- [ ] Verify validation errors
- [ ] Create login details checkbox
- [ ] Save employee
- [ ] Cancel operation

### EmployeeDetailsPage Class
- [ ] View personal information
- [ ] View job information
- [ ] View contact information
- [ ] Edit employee details
- [ ] Save changes
- [ ] Navigate between tabs

### ReportsPage Class
- [ ] Search report by name
- [ ] Open report
- [ ] Create custom report
- [ ] Delete report
- [ ] Download report
- [ ] Bulk select reports
- [ ] View predefined reports

### ConfigurationPage Class
- [ ] Add reporting method
- [ ] View reporting methods
- [ ] Edit reporting method
- [ ] Delete reporting method
- [ ] Add termination reason
- [ ] View termination reasons
- [ ] Edit termination reason
- [ ] Delete termination reason

---

## Notes & Best Practices

1. **Test Data Management**
   - Use test data fixtures for consistent testing
   - Clean up test data after tests (delete created employees)
   - Use unique identifiers to avoid conflicts

2. **Wait Conditions**
   - Wait for table to load before extracting data
   - Wait for dropdown options to load before selecting
   - Wait for navigation to complete before verifying

3. **Error Handling**
   - Capture validation error messages
   - Verify error messages are user-friendly
   - Test required field validation

4. **Performance**
   - Test with varying data volumes
   - Verify pagination with large datasets
   - Test search performance with many employees

5. **Security**
   - Verify users can only see authorized data
   - Test access control for edit/delete operations
   - Verify sensitive data is masked (passwords, SSN)

6. **Accessibility**
   - Verify keyboard navigation works
   - Test screen reader compatibility
   - Verify form labels are accessible
