import { Locator, Page } from '@playwright/test';
import { UIHelper } from '../utils/uiHelpers';

/**
 * PIM (Personnel Information Management) Page Object
 * Handles all interactions with the PIM Employee List page
 */
export class PIMPage {
    private page: Page;
    private uiHelper: UIHelper;

    // ==================== SELECTORS ====================

    // Page Header
    private readonly pageHeading = 'h5:has-text("Employee Information")';

    // Search/Filter Section Selectors
    private readonly employeeNameInput = 'input[placeholder="Type for hints..."]:first-of-type';
    private readonly employeeIdInput = 'input[placeholder="Employee Id"]';
    private readonly employmentStatusDropdown = 'div:has-text("Employment Status") ~ div';
    private readonly includeDropdown = 'div:has-text("Include") ~ div';
    private readonly supervisorNameInput = 'input[placeholder="Type for hints..."]:nth-of-type(2)';
    private readonly jobTitleDropdown = 'div:has-text("Job Title") ~ div';

    // Action Buttons
    private readonly searchButton = 'button:has-text("Search")';
    private readonly resetButton = 'button:has-text("Reset")';
    private readonly addButton = 'button:has-text("Add")';

    // Table Selectors
    private readonly employeeTable = 'table[role="table"]';
    private readonly tableRows = `${this.employeeTable} tbody tr`;
    private readonly tableCheckboxes = `${this.employeeTable} input[type="checkbox"]`;
    private readonly firstNameColumn = 'columnheader:has-text("First (& Middle) Name")';
    private readonly lastNameColumn = 'columnheader:has-text("Last Name")';
    private readonly jobTitleColumn = 'columnheader:has-text("Job Title")';
    private readonly employmentStatusColumn = 'columnheader:has-text("Employment Status")';
    private readonly supervisorColumn = 'columnheader:has-text("Supervisor")';
    private readonly subUnitColumn = 'columnheader:has-text("Sub Unit")';

    // Pagination
    private readonly paginationContainer = 'nav:has-text("Pagination")';
    private readonly previousPageButton = 'button[aria-label*="Previous"]';
    private readonly nextPageButton = 'button[aria-label*="Next"]';

    // ==================== CONSTRUCTOR ====================

    constructor(page: Page) {
        this.page = page;
        this.uiHelper = new UIHelper(page);
    }

    // ==================== NAVIGATION METHODS ====================

    /**
     * Navigate to Employee List page
     */
    async navigateToPIMEmployeeList(): Promise<void> {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Add Employee page
     */
    async navigateToAddEmployee(): Promise<void> {
        await this.page.click('a:has-text("Add Employee")');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Reports page
     */
    async navigateToReports(): Promise<void> {
        await this.page.click('a:has-text("Reports")');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Configuration menu
     */
    async navigateToConfiguration(): Promise<void> {
        await this.page.click('text=Configuration');
        await this.page.waitForLoadState('networkidle');
    }

    // ==================== SEARCH & FILTER METHODS ====================

    /**
     * Search employee by name
     * @param employeeName - Full name or partial name to search
     */
    async searchEmployeeByName(employeeName: string): Promise<void> {
        const nameInput = this.page.locator(this.employeeNameInput).first();
        await UIHelper.fillTextBox(nameInput, employeeName);
        await this.clickSearchButton();
    }

    /**
     * Search employee by ID
     * @param employeeId - Employee ID to search
     */
    async searchEmployeeByID(employeeId: string): Promise<void> {
        const idInput = this.page.locator(this.employeeIdInput).first();
        await UIHelper.fillTextBox(idInput, employeeId);
        await this.clickSearchButton();
    }

    /**
     * Filter employees by employment status
     * @param status - Employment status to filter (e.g., 'Active', 'Inactive')
     */
    async filterByEmploymentStatus(status: string): Promise<void> {
        await this.page.click(this.employmentStatusDropdown);
        await this.page.click(`text=${status}`);
        await this.clickSearchButton();
    }

    /**
     * Filter employees by job title
     * @param jobTitle - Job title to filter
     */
    async filterByJobTitle(jobTitle: string): Promise<void> {
        await this.page.click(this.jobTitleDropdown);
        await this.page.click(`text=${jobTitle}`);
        await this.clickSearchButton();
    }

    /**
     * Filter employees by supervisor
     * @param supervisorName - Supervisor name to filter
     */
    async filterBySupervisor(supervisorName: string): Promise<void> {
        const supervisorInput = this.page.locator(this.supervisorNameInput);
        await UIHelper.fillTextBox(supervisorInput, supervisorName);
        await this.clickSearchButton();
    }

    /**
     * Set include filter option
     * @param option - Option to select in Include dropdown
     */
    async setIncludeOption(option: string): Promise<void> {
        await this.page.click(this.includeDropdown);
        await this.page.click(`text=${option}`);
    }

    /**
     * Apply search with current filters
     */
    async clickSearchButton(): Promise<void> {
        const searchBtn = this.page.locator(this.searchButton).first();
        await UIHelper.clickElement(searchBtn);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Clear all filters
     */
    async clickResetButton(): Promise<void> {
        const resetBtn = this.page.locator(this.resetButton).first();
        await UIHelper.clickElement(resetBtn);
        await this.page.waitForLoadState('networkidle');
    }

    // ==================== TABLE INTERACTION METHODS ====================

    /**
     * Get all rows from the employee table
     */
    async getTableRows(): Promise<Locator[]> {
        return await this.page.locator(this.tableRows).all();
    }

    /**
     * Get number of employees in table
     */
    async getEmployeeCount(): Promise<number> {
        const rows = await this.getTableRows();
        return rows.length;
    }

    /**
     * Get employee data from a specific row
     * @param rowIndex - Index of the row (0-based)
     */
    async getEmployeeDataFromRow(rowIndex: number): Promise<EmployeeRowData> {
        const rows = await this.getTableRows();
        if (rowIndex >= rows.length) {
            throw new Error(`Row index ${rowIndex} out of bounds`);
        }

        const row = rows[rowIndex];
        const cells = await row.locator('td').all();

        return {
            id: await cells[1]?.innerText() || '',
            firstName: await cells[2]?.innerText() || '',
            lastName: await cells[3]?.innerText() || '',
            jobTitle: await cells[4]?.innerText() || '',
            employmentStatus: await cells[5]?.innerText() || '',
            subUnit: await cells[6]?.innerText() || '',
            supervisor: await cells[7]?.innerText() || '',
        };
    }

    /**
     * Click on employee to view details
     * @param rowIndex - Index of employee row
     */
    async viewEmployeeDetails(rowIndex: number): Promise<void> {
        const rows = await this.getTableRows();
        if (rowIndex < rows.length) {
            await rows[rowIndex].click();
            await this.page.waitForLoadState('networkidle');
        }
    }

    /**
     * Select employee checkbox
     * @param rowIndex - Index of the row to select
     */
    async selectEmployee(rowIndex: number): Promise<void> {
        const checkboxes = await this.page.locator(this.tableCheckboxes).all();
        if (rowIndex < checkboxes.length) {
            await checkboxes[rowIndex + 1].check(); // +1 to skip header checkbox
        }
    }

    /**
     * Select multiple employees
     * @param rowIndices - Array of row indices to select
     */
    async selectMultipleEmployees(rowIndices: number[]): Promise<void> {
        for (const index of rowIndices) {
            await this.selectEmployee(index);
        }
    }

    /**
     * Click on employee action (Edit, Delete, etc)
     * @param rowIndex - Row index
     * @param actionLabel - Action text (e.g., 'Edit', 'Delete')
     */
    async clickEmployeeAction(rowIndex: number, actionLabel: string): Promise<void> {
        const rows = await this.getTableRows();
        if (rowIndex < rows.length) {
            const actionButton = rows[rowIndex].locator(`button:has-text("${actionLabel}")`);
            await actionButton.click();
            await this.page.waitForLoadState('networkidle');
        }
    }

    // ==================== SORTING METHODS ====================

    /**
     * Sort table by column
     * @param columnName - Column header text (e.g., 'Last Name', 'Job Title')
     * @param direction - 'asc' for ascending, 'desc' for descending
     */
    async sortByColumn(columnName: string, direction: 'asc' | 'desc' = 'asc'): Promise<void> {
        const columnHeader = this.page.locator(`columnheader:has-text("${columnName}")`);
        
        // Click once for ascending
        await columnHeader.click();
        
        // Click again if descending is needed
        if (direction === 'desc') {
            await columnHeader.click();
        }
        
        await this.page.waitForLoadState('networkidle');
    }

    // ==================== PAGINATION METHODS ====================

    /**
     * Navigate to next page
     */
    async goToNextPage(): Promise<void> {
        const nextBtn = this.page.locator(this.nextPageButton);
        if (await UIHelper.isReady(nextBtn)) {
            await UIHelper.clickElement(nextBtn);
            await this.page.waitForLoadState('networkidle');
        }
    }

    /**
     * Navigate to previous page
     */
    async goToPreviousPage(): Promise<void> {
        const prevBtn = this.page.locator(this.previousPageButton);
        if (await UIHelper.isReady(prevBtn)) {
            await UIHelper.clickElement(prevBtn);
            await this.page.waitForLoadState('networkidle');
        }
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
     * Verify table displays results
     */
    async verifyTableDisplayed(): Promise<boolean> {
        const table = this.page.locator(this.employeeTable);
        return await UIHelper.isReady(table);
    }

    /**
     * Verify specific employee exists in table
     * @param firstName - Employee first name
     * @param lastName - Employee last name
     */
    async verifyEmployeeExists(firstName: string, lastName: string): Promise<boolean> {
        const rows = await this.getTableRows();
        for (const row of rows) {
            const text = await row.innerText();
            if (text.includes(firstName) && text.includes(lastName)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Verify search filters are cleared
     */
    async verifyFiltersCleared(): Promise<boolean> {
        const nameInput = this.page.locator(this.employeeNameInput).first();
        const idInput = this.page.locator(this.employeeIdInput).first();
        
        const nameValue = await nameInput.inputValue();
        const idValue = await idInput.inputValue();
        
        return nameValue === '' && idValue === '';
    }

    /**
     * Verify no results message
     */
    async verifyNoResultsMessage(): Promise<boolean> {
        const noResultsMsg = this.page.locator('text=No Records Found');
        return await noResultsMsg.isVisible();
    }
}

// ==================== INTERFACES ====================

/**
 * Employee row data interface
 */
export interface EmployeeRowData {
    id: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    employmentStatus: string;
    subUnit: string;
    supervisor: string;
}
