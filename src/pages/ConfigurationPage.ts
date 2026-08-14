import { Locator, Page } from '@playwright/test';
import { UIHelper } from '../utils/uiHelpers';

/**
 * PIM Configuration Page Object
 * Handles all interactions with PIM configuration pages (Reporting Methods, Termination Reasons, etc.)
 */
export class ConfigurationPage {
    private page: Page;
    private uiHelper: UIHelper;

    // ==================== SELECTORS ====================

    // Generic Page Elements
    private readonly pageHeading = 'h5, h6';
    private readonly dataTable = 'table[role="table"]';
    private readonly tableRows = `${this.dataTable} tbody tr`;
    private readonly tableCheckboxes = `${this.dataTable} input[type="checkbox"]`;

    // Search Section
    private readonly searchInput = 'input[placeholder="Type for hints..."], input[type="search"]';
    private readonly searchButton = 'button:has-text("Search")';
    private readonly resetButton = 'button:has-text("Reset")';
    private readonly addButton = 'button:has-text("Add")';

    // Common Form Fields
    private readonly nameInput = 'input[placeholder*="Name"]';
    private readonly descriptionField = 'textarea, input[placeholder*="Description"]';

    // Action Buttons
    private readonly editButton = 'button[aria-label*="Edit"]';
    private readonly deleteButton = 'button[aria-label*="Delete"]';
    private readonly saveButton = 'button:has-text("Save")';
    private readonly cancelButton = 'button:has-text("Cancel")';

    // ==================== CONSTRUCTOR ====================

    constructor(page: Page) {
        this.page = page;
        this.uiHelper = new UIHelper(page);
    }

    // ==================== NAVIGATION METHODS ====================

    /**
     * Navigate to Reporting Methods configuration page
     */
    async navigateToReportingMethods(): Promise<void> {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewReportingMethods');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Termination Reasons configuration page
     */
    async navigateToTerminationReasons(): Promise<void> {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewTerminationReasons');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Job Titles configuration page
     */
    async navigateToJobTitles(): Promise<void> {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitles');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Employment Status configuration page
     */
    async navigateToEmploymentStatus(): Promise<void> {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewEmploymentStatus');
        await this.page.waitForLoadState('networkidle');
    }

    // ==================== SEARCH & FILTER METHODS ====================

    /**
     * Search by name
     * @param searchTerm - Text to search
     */
    async searchByName(searchTerm: string): Promise<void> {
        const input = this.page.locator(this.searchInput).first();
        await UIHelper.fillTextBox(input, searchTerm);
        await this.clickSearchButton();
    }

    /**
     * Click search button
     */
    async clickSearchButton(): Promise<void> {
        const searchBtn = this.page.locator(this.searchButton).first();
        await UIHelper.clickElement(searchBtn);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Click reset button
     */
    async clickResetButton(): Promise<void> {
        const resetBtn = this.page.locator(this.resetButton).first();
        await UIHelper.clickElement(resetBtn);
        await this.page.waitForLoadState('networkidle');
    }

    // ==================== TABLE INTERACTION METHODS ====================

    /**
     * Get all rows from table
     */
    async getTableRows(): Promise<Locator[]> {
        return await this.page.locator(this.tableRows).all();
    }

    /**
     * Get number of items in table
     */
    async getItemCount(): Promise<number> {
        const rows = await this.getTableRows();
        return rows.length;
    }

    /**
     * Get name from specific row
     * @param rowIndex - Row index (0-based)
     */
    async getNameFromRow(rowIndex: number): Promise<string> {
        const rows = await this.getTableRows();
        if (rowIndex >= rows.length) {
            throw new Error(`Row index ${rowIndex} out of bounds`);
        }
        const row = rows[rowIndex];
        const cells = await row.locator('td').all();
        return await cells[1]?.innerText() || '';
    }

    /**
     * Get row data
     * @param rowIndex - Row index (0-based)
     */
    async getRowData(rowIndex: number): Promise<ConfigurationRowData> {
        const rows = await this.getTableRows();
        if (rowIndex >= rows.length) {
            throw new Error(`Row index ${rowIndex} out of bounds`);
        }
        const row = rows[rowIndex];
        const cells = await row.locator('td').all();

        return {
            name: await cells[1]?.innerText() || '',
            description: await cells[2]?.innerText() || '',
            actions: await cells[3]?.innerText() || '',
        };
    }

    /**
     * Select item checkbox
     * @param rowIndex - Row index to select
     */
    async selectItem(rowIndex: number): Promise<void> {
        const checkboxes = await this.page.locator(this.tableCheckboxes).all();
        if (rowIndex < checkboxes.length) {
            await checkboxes[rowIndex + 1].check(); // +1 to skip header checkbox
        }
    }

    /**
     * Select multiple items
     * @param rowIndices - Array of row indices to select
     */
    async selectMultipleItems(rowIndices: number[]): Promise<void> {
        for (const index of rowIndices) {
            await this.selectItem(index);
        }
    }

    /**
     * Click action button on row
     * @param rowIndex - Row index
     * @param actionLabel - Action text (Edit, Delete)
     */
    async clickItemAction(rowIndex: number, actionLabel: string): Promise<void> {
        const rows = await this.getTableRows();
        if (rowIndex < rows.length) {
            const row = rows[rowIndex];
            const actionButton = row.locator(`button[aria-label*="${actionLabel}"], button:has-text("${actionLabel}")`);
            if (await actionButton.isVisible()) {
                await actionButton.click();
                await this.page.waitForLoadState('networkidle');
            }
        }
    }

    /**
     * Edit item
     * @param rowIndex - Row index to edit
     */
    async editItem(rowIndex: number): Promise<void> {
        await this.clickItemAction(rowIndex, 'Edit');
    }

    /**
     * Delete item
     * @param rowIndex - Row index to delete
     */
    async deleteItem(rowIndex: number): Promise<void> {
        await this.clickItemAction(rowIndex, 'Delete');
        // Wait for confirmation dialog
        await this.page.waitForTimeout(500);
    }

    /**
     * Confirm delete in confirmation dialog
     */
    async confirmDelete(): Promise<void> {
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

    // ==================== ADD/CREATE METHODS ====================

    /**
     * Navigate to add new item
     */
    async clickAddButton(): Promise<void> {
        const addBtn = this.page.locator(this.addButton).first();
        await UIHelper.clickElement(addBtn);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Add new configuration item
     * @param itemName - Name of item to add
     * @param itemData - Additional item data
     */
    async addConfigurationItem(itemName: string, itemData?: ConfigurationItemData): Promise<void> {
        await this.clickAddButton();

        // Fill name
        const nameInput = this.page.locator(this.nameInput).first();
        await UIHelper.fillTextBox(nameInput, itemName);

        // Fill description if provided
        if (itemData?.description) {
            const descInput = this.page.locator(this.descriptionField).first();
            if (await UIHelper.isReady(descInput)) {
                await UIHelper.fillTextBox(descInput, itemData.description);
            }
        }

        // Save
        const saveBtn = this.page.locator(this.saveButton).first();
        await UIHelper.clickElement(saveBtn);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Update configuration item
     * @param rowIndex - Row index to update
     * @param itemName - New name
     * @param itemData - Additional data to update
     */
    async updateConfigurationItem(
        rowIndex: number,
        itemName: string,
        itemData?: ConfigurationItemData
    ): Promise<void> {
        await this.editItem(rowIndex);

        // Update name
        const nameInput = this.page.locator(this.nameInput).first();
        await nameInput.clear();
        await UIHelper.fillTextBox(nameInput, itemName);

        // Update description if provided
        if (itemData?.description) {
            const descInput = this.page.locator(this.descriptionField).first();
            if (await UIHelper.isReady(descInput)) {
                await descInput.clear();
                await UIHelper.fillTextBox(descInput, itemData.description);
            }
        }

        // Save
        const saveBtn = this.page.locator(this.saveButton).first();
        await UIHelper.clickElement(saveBtn);
        await this.page.waitForLoadState('networkidle');
    }

    // ==================== VERIFICATION METHODS ====================

    /**
     * Verify page is loaded
     */
    async verifyPageLoaded(): Promise<boolean> {
        const heading = this.page.locator(this.pageHeading).first();
        return await UIHelper.isReady(heading);
    }

    /**
     * Verify table is displayed
     */
    async verifyTableDisplayed(): Promise<boolean> {
        const table = this.page.locator(this.dataTable);
        return await UIHelper.isReady(table);
    }

    /**
     * Verify item exists in table
     * @param itemName - Name of item to verify
     */
    async verifyItemExists(itemName: string): Promise<boolean> {
        const rows = await this.getTableRows();
        for (const row of rows) {
            const text = await row.innerText();
            if (text.includes(itemName)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Verify search results
     * @param searchTerm - Search term used
     */
    async verifySearchResults(searchTerm: string): Promise<boolean> {
        const rows = await this.getTableRows();
        if (rows.length === 0) {
            return false;
        }
        for (const row of rows) {
            const text = await row.innerText();
            if (!text.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
        }
        return true;
    }

    /**
     * Verify no results message
     */
    async verifyNoResultsMessage(): Promise<boolean> {
        const noResultsMsg = this.page.locator('text=No Records Found');
        return await noResultsMsg.isVisible();
    }

    /**
     * Verify item created successfully
     */
    async verifyItemCreatedSuccessfully(): Promise<boolean> {
        const successMsg = this.page.locator('text=Successfully');
        return await successMsg.isVisible();
    }

    /**
     * Verify item deleted successfully
     */
    async verifyItemDeletedSuccessfully(): Promise<boolean> {
        const successMsg = this.page.locator('text=Successfully');
        return await successMsg.isVisible();
    }

    /**
     * Verify item updated successfully
     */
    async verifyItemUpdatedSuccessfully(): Promise<boolean> {
        const successMsg = this.page.locator('text=Successfully');
        return await successMsg.isVisible();
    }

    /**
     * Get error message
     */
    async getErrorMessage(): Promise<string> {
        const errorMsg = this.page.locator('.oxd-text.oxd-text--p.oxd-alert-content-text').first();
        return await errorMsg.innerText();
    }

    /**
     * Verify validation error exists
     * @param errorText - Expected error message
     */
    async verifyValidationErrorExists(errorText: string): Promise<boolean> {
        const errorMsg = await this.getErrorMessage();
        return errorMsg.includes(errorText);
    }
}

// ==================== INTERFACES ====================

/**
 * Configuration row data interface
 */
export interface ConfigurationRowData {
    name: string;
    description: string;
    actions: string;
}

/**
 * Configuration item data interface
 */
export interface ConfigurationItemData {
    name?: string;
    description?: string;
    [key: string]: string | undefined;
}
