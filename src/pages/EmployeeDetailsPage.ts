import { Locator, Page } from '@playwright/test';
import { UIHelper } from '../utils/uiHelpers';

/**
 * Employee Details Page Object
 * Handles all interactions with the Employee Personal Details page
 */
export class EmployeeDetailsPage {
    private page: Page;
    private uiHelper: UIHelper;

    // ==================== SELECTORS ====================

    // Page Header
    private readonly pageHeading = 'h6:has-text("Personal Details")';

    // Tab Selectors
    private readonly personalDetailsTab = 'button:has-text("Personal Details")';
    private readonly contactDetailsTab = 'button:has-text("Contact Details")';
    private readonly emergencyContactsTab = 'button:has-text("Emergency Contacts")';
    private readonly dependentsTab = 'button:has-text("Dependents")';
    private readonly immigrationTab = 'button:has-text("Immigration")';
    private readonly jobDetailsTab = 'button:has-text("Job Details")';
    private readonly salaryTab = 'button:has-text("Salary")';
    private readonly reportToTab = 'button:has-text("Report-to")';
    private readonly workExperienceTab = 'button:has-text("Work Experience")';
    private readonly educationTab = 'button:has-text("Education")';
    private readonly skillsTab = 'button:has-text("Skills")';
    private readonly languagesTab = 'button:has-text("Languages")';
    private readonly licensesTab = 'button:has-text("Licenses")';
    private readonly membershipsTab = 'button:has-text("Memberships")';

    // Action Buttons
    private readonly editButton = 'button:has-text("Edit")';
    private readonly saveButton = 'button:has-text("Save")';
    private readonly cancelButton = 'button:has-text("Cancel")';
    private readonly deleteButton = 'button:has-text("Delete")';

    // Personal Details Fields
    private readonly firstNameField = 'input[placeholder="First Name"]';
    private readonly middleNameField = 'input[placeholder="Middle Name"]';
    private readonly lastNameField = 'input[placeholder="Last Name"]';
    private readonly employeeIdField = 'input:has-text("Employee Id")';
    private readonly dateOfBirthField = 'input[placeholder*="yyyy"]';
    private readonly genderDropdown = 'div:has-text("Gender") ~ div';
    private readonly maritalStatusDropdown = 'div:has-text("Marital Status") ~ div';
    private readonly nationalityDropdown = 'div:has-text("Nationality") ~ div';

    // Contact Details Fields
    private readonly mobileField = 'input[placeholder*="Mobile"]';
    private readonly workEmailField = 'input[placeholder*="Work Email"]';
    private readonly otherEmailField = 'input[placeholder*="Other Email"]';

    // Job Details Fields
    private readonly jobTitleField = 'text=Job Title';
    private readonly employmentStatusField = 'text=Employment Status';
    private readonly departmentField = 'text=Department';
    private readonly supervisorField = 'text=Supervisor';
    private readonly employmentDateField = 'input[placeholder*="Employment Date"]';

    // ==================== CONSTRUCTOR ====================

    constructor(page: Page) {
        this.page = page;
        this.uiHelper = new UIHelper(page);
    }

    // ==================== NAVIGATION METHODS ====================

    /**
     * Navigate to employee details page
     * @param empId - Employee ID or employee number
     */
    async navigateToEmployeeDetails(empId: string | number): Promise<void> {
        const url = `https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPersonalDetails/empNumber/${empId}`;
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }

    // ==================== TAB NAVIGATION METHODS ====================

    /**
     * Click on Personal Details tab
     */
    async clickPersonalDetailsTab(): Promise<void> {
        const tab = this.page.locator(this.personalDetailsTab).first();
        await UIHelper.clickElement(tab);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Click on Contact Details tab
     */
    async clickContactDetailsTab(): Promise<void> {
        const tab = this.page.locator(this.contactDetailsTab).first();
        await UIHelper.clickElement(tab);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Click on Emergency Contacts tab
     */
    async clickEmergencyContactsTab(): Promise<void> {
        const tab = this.page.locator(this.emergencyContactsTab).first();
        await UIHelper.clickElement(tab);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Click on Job Details tab
     */
    async clickJobDetailsTab(): Promise<void> {
        const tab = this.page.locator(this.jobDetailsTab).first();
        await UIHelper.clickElement(tab);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Click on Salary tab
     */
    async clickSalaryTab(): Promise<void> {
        const tab = this.page.locator(this.salaryTab).first();
        await UIHelper.clickElement(tab);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Click on Work Experience tab
     */
    async clickWorkExperienceTab(): Promise<void> {
        const tab = this.page.locator(this.workExperienceTab).first();
        await UIHelper.clickElement(tab);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Click on Education tab
     */
    async clickEducationTab(): Promise<void> {
        const tab = this.page.locator(this.educationTab).first();
        await UIHelper.clickElement(tab);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Click on Skills tab
     */
    async clickSkillsTab(): Promise<void> {
        const tab = this.page.locator(this.skillsTab).first();
        await UIHelper.clickElement(tab);
        await this.page.waitForLoadState('networkidle');
    }

    // ==================== EDIT & UPDATE METHODS ====================

    /**
     * Click Edit button
     */
    async clickEditButton(): Promise<void> {
        const editBtn = this.page.locator(this.editButton).first();
        await UIHelper.clickElement(editBtn);
        // Wait for form to switch to edit mode
        await this.page.waitForTimeout(500);
    }

    /**
     * Check if page is in edit mode
     */
    async isInEditMode(): Promise<boolean> {
        const saveBtn = this.page.locator(this.saveButton).first();
        return await saveBtn.isVisible();
    }

    /**
     * Update first name
     * @param firstName - New first name
     */
    async updateFirstName(firstName: string): Promise<void> {
        const input = this.page.locator(this.firstNameField).first();
        await UIHelper.fillTextBox(input, firstName);
    }

    /**
     * Update middle name
     * @param middleName - New middle name
     */
    async updateMiddleName(middleName: string): Promise<void> {
        const input = this.page.locator(this.middleNameField).first();
        await UIHelper.fillTextBox(input, middleName);
    }

    /**
     * Update last name
     * @param lastName - New last name
     */
    async updateLastName(lastName: string): Promise<void> {
        const input = this.page.locator(this.lastNameField).first();
        await UIHelper.fillTextBox(input, lastName);
    }

    /**
     * Update date of birth
     * @param dob - Date of birth (YYYY-MM-DD format)
     */
    async updateDateOfBirth(dob: string): Promise<void> {
        const input = this.page.locator(this.dateOfBirthField).first();
        await UIHelper.fillTextBox(input, dob);
    }

    /**
     * Select gender
     * @param gender - Gender value (Male, Female, etc.)
     */
    async selectGender(gender: string): Promise<void> {
        await this.page.click(this.genderDropdown);
        await this.page.click(`text=${gender}`);
    }

    /**
     * Select marital status
     * @param status - Marital status (Single, Married, etc.)
     */
    async selectMaritalStatus(status: string): Promise<void> {
        await this.page.click(this.maritalStatusDropdown);
        await this.page.click(`text=${status}`);
    }

    /**
     * Select nationality
     * @param nationality - Nationality name
     */
    async selectNationality(nationality: string): Promise<void> {
        await this.page.click(this.nationalityDropdown);
        await this.page.click(`text=${nationality}`);
    }

    /**
     * Update mobile number
     * @param mobile - Mobile number
     */
    async updateMobile(mobile: string): Promise<void> {
        const input = this.page.locator(this.mobileField).first();
        if (await UIHelper.isReady(input)) {
            await UIHelper.fillTextBox(input, mobile);
        }
    }

    /**
     * Update work email
     * @param email - Work email address
     */
    async updateWorkEmail(email: string): Promise<void> {
        const input = this.page.locator(this.workEmailField).first();
        if (await UIHelper.isReady(input)) {
            await UIHelper.fillTextBox(input, email);
        }
    }

    /**
     * Save changes
     */
    async clickSaveButton(): Promise<void> {
        const saveBtn = this.page.locator(this.saveButton).first();
        await UIHelper.clickElement(saveBtn);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Cancel changes
     */
    async clickCancelButton(): Promise<void> {
        const cancelBtn = this.page.locator(this.cancelButton).first();
        await UIHelper.clickElement(cancelBtn);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Delete employee
     */
    async clickDeleteButton(): Promise<void> {
        const deleteBtn = this.page.locator(this.deleteButton).first();
        await UIHelper.clickElement(deleteBtn);
        // Wait for confirmation dialog
        await this.page.waitForTimeout(500);
    }

    /**
     * Confirm delete in confirmation dialog
     */
    async confirmDelete(): Promise<void> {
        // Click confirm button in delete dialog
        await this.page.click('button:has-text("Delete")');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Cancel delete
     */
    async cancelDelete(): Promise<void> {
        await this.page.click('button:has-text("Cancel")');
        await this.page.waitForTimeout(500);
    }

    // ==================== VERIFICATION METHODS ====================

    /**
     * Verify page is loaded
     */
    async verifyPageLoaded(): Promise<boolean> {
        const heading = this.page.locator(this.pageHeading);
        return await UIHelper.isReady(heading);
    }

    /**
     * Verify employee first name
     * @param firstName - Expected first name
     */
    async verifyFirstName(firstName: string): Promise<boolean> {
        const input = this.page.locator(this.firstNameField).first();
        const value = await input.inputValue();
        return value === firstName;
    }

    /**
     * Verify employee last name
     * @param lastName - Expected last name
     */
    async verifyLastName(lastName: string): Promise<boolean> {
        const input = this.page.locator(this.lastNameField).first();
        const value = await input.inputValue();
        return value === lastName;
    }

    /**
     * Get employee details
     */
    async getEmployeeDetails(): Promise<EmployeeDetails> {
        await this.clickPersonalDetailsTab();

        const firstName = await this.page.locator(this.firstNameField).first().inputValue() || '';
        const lastName = await this.page.locator(this.lastNameField).first().inputValue() || '';
        const employeeId = await this.page.locator(this.employeeIdField).first().inputValue() || '';

        return {
            firstName,
            lastName,
            employeeId,
            pageUrl: this.page.url(),
        };
    }

    /**
     * Verify tab is accessible
     * @param tabName - Tab name to check
     */
    async verifyTabAccessible(tabName: string): Promise<boolean> {
        const tab = this.page.locator(`button:has-text("${tabName}")`).first();
        return await tab.isVisible() && await tab.isEnabled();
    }

    /**
     * Get success message
     */
    async getSuccessMessage(): Promise<string> {
        const msg = this.page.locator('.oxd-text.oxd-text--p.oxd-alert-content-text').first();
        return await msg.innerText();
    }

    /**
     * Verify changes saved successfully
     */
    async verifyChangesSavedSuccessfully(): Promise<boolean> {
        const successMsg = this.page.locator('text=Successfully');
        return await successMsg.isVisible();
    }
}

// ==================== INTERFACES ====================

/**
 * Employee details interface
 */
export interface EmployeeDetails {
    firstName: string;
    lastName: string;
    employeeId: string;
    pageUrl: string;
    middleName?: string;
    dateOfBirth?: string;
    gender?: string;
    maritalStatus?: string;
    nationality?: string;
    mobile?: string;
    email?: string;
}
