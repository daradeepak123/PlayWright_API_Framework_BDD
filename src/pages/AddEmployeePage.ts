import { Locator, Page } from '@playwright/test';
import { UIHelper } from '../utils/uiHelpers';

/**
 * Add Employee Page Object
 * Handles all interactions with the Add Employee page
 */
export class AddEmployeePage {
    private page: Page;
    private uiHelper: UIHelper;

    // ==================== SELECTORS ====================

    // Page Header
    private readonly pageHeading = 'h6:has-text("Add Employee")';

    // Profile Picture Section
    private readonly profilePictureInput = 'input[type="file"]';
    private readonly profilePicturePreview = 'img[alt="profile picture"]';
    private readonly deleteProfilePictureButton = 'button[aria-label*="Delete"]';
    private readonly profilePictureHint = 'text=Accepts jpg, .png, .gif up to 1MB';

    // Employee Full Name Section
    private readonly firstNameInput = 'input[placeholder="First Name"]';
    private readonly middleNameInput = 'input[placeholder="Middle Name"]';
    private readonly lastNameInput = 'input[placeholder="Last Name"]';

    // Employee ID Section
    private readonly employeeIdInput = 'input:below(text=Employee Id)';

    // Create Login Details Section
    private readonly createLoginCheckbox = 'input[type="checkbox"]:has-text("Create Login Details")';

    // Action Buttons
    private readonly saveButton = 'button:has-text("Save")';
    private readonly cancelButton = 'button:has-text("Cancel")';

    // Form Sections
    private readonly employeeFullNameSection = 'text=Employee Full Name';
    private readonly requiredFieldsNote = 'text=* Required';

    // Error Messages
    private readonly validationErrorMessages = '.oxd-input-field-error';
    private readonly errorMessage = '.oxd-text.oxd-text--p.oxd-alert-content-text';

    // ==================== CONSTRUCTOR ====================

    constructor(page: Page) {
        this.page = page;
        this.uiHelper = new UIHelper(page);
    }

    // ==================== NAVIGATION METHODS ====================

    /**
     * Navigate to Add Employee page
     */
    async navigateToAddEmployee(): Promise<void> {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
        await this.page.waitForLoadState('networkidle');
    }

    // ==================== FORM FILLING METHODS ====================

    /**
     * Fill first name
     * @param firstName - Employee first name
     */
    async fillFirstName(firstName: string): Promise<void> {
        const input = this.page.locator(this.firstNameInput).first();
        await UIHelper.fillTextBox(input, firstName);
    }

    /**
     * Fill middle name
     * @param middleName - Employee middle name
     */
    async fillMiddleName(middleName: string): Promise<void> {
        const input = this.page.locator(this.middleNameInput).first();
        await UIHelper.fillTextBox(input, middleName);
    }

    /**
     * Fill last name
     * @param lastName - Employee last name
     */
    async fillLastName(lastName: string): Promise<void> {
        const input = this.page.locator(this.lastNameInput).first();
        await UIHelper.fillTextBox(input, lastName);
    }

    /**
     * Fill complete employee name
     * @param firstName - First name
     * @param lastName - Last name
     * @param middleName - Optional middle name
     */
    async fillEmployeeName(
        firstName: string,
        lastName: string,
        middleName?: string
    ): Promise<void> {
        await this.fillFirstName(firstName);
        if (middleName) {
            await this.fillMiddleName(middleName);
        }
        await this.fillLastName(lastName);
    }

    /**
     * Get employee ID value
     */
    async getEmployeeId(): Promise<string> {
        const idInput = this.page.locator(this.employeeIdInput).first();
        return await idInput.inputValue() || '';
    }

    /**
     * Fill employee ID (if editable)
     * @param employeeId - Employee ID value
     */
    async fillEmployeeId(employeeId: string): Promise<void> {
        const input = this.page.locator(this.employeeIdInput).first();
        await UIHelper.fillTextBox(input, employeeId);
    }

    /**
     * Upload profile picture
     * @param filePath - Path to the image file
     */
    async uploadProfilePicture(filePath: string): Promise<void> {
        const fileInput = this.page.locator(this.profilePictureInput);
        await fileInput.setInputFiles(filePath);
        // Wait for image to process
        await this.page.waitForTimeout(1000);
    }

    /**
     * Delete uploaded profile picture
     */
    async deleteProfilePicture(): Promise<void> {
        const deleteBtn = this.page.locator(this.deleteProfilePictureButton).first();
        if (await UIHelper.isReady(deleteBtn)) {
            await UIHelper.clickElement(deleteBtn);
        }
    }

    /**
     * Check "Create Login Details" checkbox
     */
    async checkCreateLoginDetailsCheckbox(): Promise<void> {
        const checkbox = this.page.locator(this.createLoginCheckbox).first();
        const isChecked = await checkbox.isChecked();
        if (!isChecked) {
            await checkbox.check();
            // Wait for login fields to appear
            await this.page.waitForTimeout(500);
        }
    }

    /**
     * Uncheck "Create Login Details" checkbox
     */
    async uncheckCreateLoginDetailsCheckbox(): Promise<void> {
        const checkbox = this.page.locator(this.createLoginCheckbox).first();
        const isChecked = await checkbox.isChecked();
        if (isChecked) {
            await checkbox.uncheck();
            await this.page.waitForTimeout(500);
        }
    }

    /**
     * Fill login credentials (if available)
     * @param username - Username for login
     * @param password - Password
     * @param confirmPassword - Confirm password
     */
    async fillLoginCredentials(
        username: string,
        password: string,
        confirmPassword: string
    ): Promise<void> {
        // First check the checkbox to show login fields
        await this.checkCreateLoginDetailsCheckbox();

        // Fill username
        const usernameInput = this.page.locator('input[placeholder="Username"]').first();
        if (await UIHelper.isReady(usernameInput)) {
            await UIHelper.fillTextBox(usernameInput, username);
        }

        // Fill password
        const passwordInput = this.page.locator('input[type="password"]').first();
        if (await UIHelper.isReady(passwordInput)) {
            await UIHelper.fillTextBox(passwordInput, password);
        }

        // Fill confirm password
        const confirmPasswordInput = this.page.locator('input[type="password"]').nth(1);
        if (await UIHelper.isReady(confirmPasswordInput)) {
            await UIHelper.fillTextBox(confirmPasswordInput, confirmPassword);
        }
    }

    // ==================== ACTION METHODS ====================

    /**
     * Save employee
     */
    async clickSaveButton(): Promise<void> {
        const saveBtn = this.page.locator(this.saveButton).first();
        await UIHelper.clickElement(saveBtn);
        // Wait for save to complete
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Cancel and return
     */
    async clickCancelButton(): Promise<void> {
        const cancelBtn = this.page.locator(this.cancelButton).first();
        await UIHelper.clickElement(cancelBtn);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Complete employee add form with minimum data
     * @param firstName - First name (required)
     * @param lastName - Last name (required)
     */
    async addEmployeeMinimal(firstName: string, lastName: string): Promise<void> {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.clickSaveButton();
    }

    /**
     * Complete employee add form with full data
     * @param employeeData - Employee information
     */
    async addEmployeeFull(employeeData: AddEmployeeData): Promise<void> {
        // Fill name
        await this.fillEmployeeName(
            employeeData.firstName,
            employeeData.lastName,
            employeeData.middleName
        );

        // Upload picture if provided
        if (employeeData.profilePicturePath) {
            await this.uploadProfilePicture(employeeData.profilePicturePath);
        }

        // Fill ID if provided
        if (employeeData.employeeId) {
            await this.fillEmployeeId(employeeData.employeeId);
        }

        // Create login if needed
        if (employeeData.createLoginDetails) {
            await this.fillLoginCredentials(
                employeeData.username || '',
                employeeData.password || '',
                employeeData.confirmPassword || ''
            );
        }

        // Save
        await this.clickSaveButton();
    }

    // ==================== VALIDATION METHODS ====================

    /**
     * Verify page is loaded
     */
    async verifyPageLoaded(): Promise<boolean> {
        const heading = this.page.locator(this.pageHeading);
        return await UIHelper.isReady(heading);
    }

    /**
     * Verify first name field is visible
     */
    async verifyFirstNameFieldVisible(): Promise<boolean> {
        const input = this.page.locator(this.firstNameInput).first();
        return await input.isVisible();
    }

    /**
     * Verify last name field is visible
     */
    async verifyLastNameFieldVisible(): Promise<boolean> {
        const input = this.page.locator(this.lastNameInput).first();
        return await input.isVisible();
    }

    /**
     * Get all validation error messages
     */
    async getValidationErrors(): Promise<string[]> {
        const errors = await this.page.locator(this.validationErrorMessages).all();
        const errorMessages: string[] = [];
        for (const error of errors) {
            const text = await error.innerText();
            if (text) {
                errorMessages.push(text);
            }
        }
        return errorMessages;
    }

    /**
     * Verify specific validation error exists
     * @param errorText - Error message text to verify
     */
    async verifyValidationErrorExists(errorText: string): Promise<boolean> {
        const errors = await this.getValidationErrors();
        return errors.some(err => err.includes(errorText));
    }

    /**
     * Verify profile picture is uploaded
     */
    async verifyProfilePictureUploaded(): Promise<boolean> {
        const preview = this.page.locator(this.profilePicturePreview);
        const src = await preview.getAttribute('src');
        return src !== null && src !== '' && !src.includes('default');
    }

    /**
     * Verify save button is enabled
     */
    async verifySaveButtonEnabled(): Promise<boolean> {
        const saveBtn = this.page.locator(this.saveButton).first();
        return await saveBtn.isEnabled();
    }

    /**
     * Verify required fields note is displayed
     */
    async verifyRequiredFieldsNoteDisplayed(): Promise<boolean> {
        const note = this.page.locator(this.requiredFieldsNote);
        return await note.isVisible();
    }

    /**
     * Verify login details checkbox is visible
     */
    async verifyLoginDetailsCheckboxVisible(): Promise<boolean> {
        const checkbox = this.page.locator(this.createLoginCheckbox).first();
        return await checkbox.isVisible();
    }

    /**
     * Verify login fields appear after checking checkbox
     */
    async verifyLoginFieldsAppear(): Promise<boolean> {
        await this.checkCreateLoginDetailsCheckbox();
        const usernameInput = this.page.locator('input[placeholder="Username"]').first();
        return await usernameInput.isVisible();
    }

    /**
     * Verify employee was created successfully
     * Checks if we navigated to employee details page
     */
    async verifyEmployeeCreatedSuccessfully(): Promise<boolean> {
        // After saving, should redirect to employee details
        const url = this.page.url();
        return url.includes('/pim/viewPersonalDetails') || url.includes('/pim/viewEmployeeList');
    }

    /**
     * Get success message
     */
    async getSuccessMessage(): Promise<string> {
        const successMsg = this.page.locator('.oxd-text.oxd-text--p.oxd-alert-content-text');
        return await successMsg.innerText();
    }

    /**
     * Verify picture upload hint is visible
     */
    async verifyPictureHintVisible(): Promise<boolean> {
        const hint = this.page.locator(this.profilePictureHint);
        return await hint.isVisible();
    }
}

// ==================== INTERFACES ====================

/**
 * Employee data interface for adding new employee
 */
export interface AddEmployeeData {
    firstName: string;
    lastName: string;
    middleName?: string;
    employeeId?: string;
    profilePicturePath?: string;
    createLoginDetails?: boolean;
    username?: string;
    password?: string;
    confirmPassword?: string;
}
