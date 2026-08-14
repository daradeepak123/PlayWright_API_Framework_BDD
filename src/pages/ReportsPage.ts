import { Locator, Page } from '@playwright/test';
import { UIHelper } from '../utils/uiHelpers';

/**
 * Reports Page Object
 * Handles all interactions with the Employee Reports page
 */
export class ReportsPage {
    private page: Page;
    private uiHelper: UIHelper;

    // ==================== SELECTORS ====================

    // Page Header
    private readonly pageHeading = 'h5:has-text("Employee Reports")';

    // Search Section
    private readonly reportNameInput = 'input[placeholder="Type for hints..."]';
    private readonly searchButton = 'button:has-text("Search")';
    private readonly resetButton = 'button:has-text("Reset")';
    private readonly addButton = 'button:has-text("Add")';

    // Reports Table
    private readonly reportsTable = 'table[role="table"]';
    private readonly tableRows = `${this.reportsTable} tbody tr`;
    private readonly tableCheckboxes = `${this.reportsTable} input[type="checkbox"]`;
    private readonly reportNameColumn = 'text';

    // Pre-defined Reports
    private readonly reportAllEmployeeSubUnitHierarchy = 'text=All Employee Sub Unit Hierarchy Report';
    private readonly reportEmployeeContactInfo = 'text=Employee Contact info report';
    private readonly reportEmployeeJobDetails = 'text=Employee Job Details';
    private readonly reportPIMSample = 'text=PIM Sample Report';

    // Row Actions
    private readonly editAction = 'button[aria-label*="Edit"]';
    private readonly deleteAction = 'button[aria-label*="Delete"]';
    private readonly downloadAction = 'button[aria-label*="Download"]';
    private readonly viewAction = 'button[aria-label*="View"]';

    // ==================== CONSTRUCTOR ====================

    constructor(page: Page) {
        this.page = page;
        this.uiHelper = new UIHelper(page);
    }

    // ==================== NAVIGATION METHODS ====================

    /**
     * Navigate to Reports page
     */
    async navigateToReports(): Promise<void> {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewDefinedPredefinedReports');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Add Report page
     */
    async navigateToAddReport(): Promise<void> {
        const addBtn = this.page.locator(this.addButton).first();
        await UIHelper.clickElement(addBtn);
        await this.page.waitForLoadState('networkidle');
    }

    // ==================== SEARCH & FILTER METHODS ====================

    /**
     * Search report by name
     * @param reportName - Report name to search
     */
    async searchReportByName(reportName: string): Promise<void> {
        const input = this.page.locator(this.reportNameInput).first();
        await UIHelper.fillTextBox(input, reportName);
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

    /**
     * Clear search input
     */
    async clearSearchInput(): Promise<void> {
        const input = this.page.locator(this.reportNameInput).first();
        await input.clear();
    }

    // ==================== TABLE INTERACTION METHODS ====================

    /**
     * Get all reports in table
     */
    async getTableRows(): Promise<Locator[]> {
        return await this.page.locator(this.tableRows).all();
    }

    /**
     * Get number of reports
     */
    async getReportCount(): Promise<number> {
        const rows = await this.getTableRows();
        return rows.length;
    }

    /**
     * Get report name from specific row
     * @param rowIndex - Row index (0-based)
     */
    async getReportNameFromRow(rowIndex: number): Promise<string> {
        const rows = await this.getTableRows();
        if (rowIndex >= rows.length) {
            throw new Error(`Row index ${rowIndex} out of bounds`);
        }
        const row = rows[rowIndex];
        const cells = await row.locator('td').all();
        return await cells[1]?.innerText() || '';
    }

    /**
     * Get report data from specific row
     * @param rowIndex - Row index (0-based)
     */
    async getReportDataFromRow(rowIndex: number): Promise<ReportRowData> {
        const rows = await this.getTableRows();
        if (rowIndex >= rows.length) {
            throw new Error(`Row index ${rowIndex} out of bounds`);
        }
        const row = rows[rowIndex];
        const cells = await row.locator('td').all();

        return {
            name: await cells[1]?.innerText() || '',
            actions: await cells[2]?.innerText() || '',
        };
    }

    /**
     * Open report
     * @param reportIndex - Index of report to open
     */
    async openReport(reportIndex: number): Promise<void> {
        const rows = await this.getTableRows();
        if (reportIndex < rows.length) {
            const reportName = await this.getReportNameFromRow(reportIndex);
            const reportLink = this.page.locator(`text=${reportName}`);
            await reportLink.click();
            await this.page.waitForLoadState('networkidle');
        }
    }

    /**
     * Open report by name
     * @param reportName - Name of report to open
     */
    async openReportByName(reportName: string): Promise<void> {
        const reportLink = this.page.locator(`text=${reportName}`).first();
        await reportLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Click action button on report row
     * @param reportIndex - Row index
     * @param actionLabel - Action text (Edit, Delete, Download, View)
     */
    async clickReportAction(reportIndex: number, actionLabel: string): Promise<void> {
        const rows = await this.getTableRows();
        if (reportIndex < rows.length) {
            const row = rows[reportIndex];
            const actionButton = row.locator(`button[aria-label*="${actionLabel}"]`);
            if (await actionButton.isVisible()) {
                await actionButton.click();
                await this.page.waitForLoadState('networkidle');
            }
        }
    }

    /**
     * Edit report
     * @param reportIndex - Row index of report to edit
     */
    async editReport(reportIndex: number): Promise<void> {
        await this.clickReportAction(reportIndex, 'Edit');
    }

    /**
     * Delete report
     * @param reportIndex - Row index of report to delete
     */
    async deleteReport(reportIndex: number): Promise<void> {
        await this.clickReportAction(reportIndex, 'Delete');
        // Wait for confirmation dialog
        await this.page.waitForTimeout(500);
    }

    /**
     * Download report
     * @param reportIndex - Row index of report to download
     */
    async downloadReport(reportIndex: number): Promise<void> {
        await this.clickReportAction(reportIndex, 'Download');
    }

    /**
     * View report
     * @param reportIndex - Row index of report to view
     */
    async viewReport(reportIndex: number): Promise<void> {
        await this.clickReportAction(reportIndex, 'View');
    }

    /**
     * Select report checkbox
     * @param rowIndex - Row index to select
     */
    async selectReport(rowIndex: number): Promise<void> {
        const checkboxes = await this.page.locator(this.tableCheckboxes).all();
        if (rowIndex < checkboxes.length) {
            await checkboxes[rowIndex + 1].check(); // +1 to skip header checkbox
        }
    }

    /**
     * Select multiple reports
     * @param rowIndices - Array of row indices to select
     */
    async selectMultipleReports(rowIndices: number[]): Promise<void> {
        for (const index of rowIndices) {
            await this.selectReport(index);
        }
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

    // ==================== CREATE REPORT METHODS ====================

    /**
     * Create custom report
     * @param reportName - Name for the new report
     * @param reportData - Additional report data
     */
    async createCustomReport(reportName: string, reportData?: CreateReportData): Promise<void> {
        await this.navigateToAddReport();
        
        // Fill report name
        const nameInput = this.page.locator('input[placeholder*="Report Name"]').first();
        await UIHelper.fillTextBox(nameInput, reportName);

        // Fill additional fields if provided
        if (reportData?.description) {
            const descInput = this.page.locator('textarea').first();
            if (await UIHelper.isReady(descInput)) {
                await UIHelper.fillTextBox(descInput, reportData.description);
            }
        }

        // Click save
        const saveBtn = this.page.locator('button:has-text("Save")').first();
        await UIHelper.clickElement(saveBtn);
        await this.page.waitForLoadState('networkidle');
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
     * Verify reports table is displayed
     */
    async verifyReportsTableDisplayed(): Promise<boolean> {
        const table = this.page.locator(this.reportsTable);
        return await UIHelper.isReady(table);
    }

    /**
     * Verify predefined report exists
     * @param reportName - Name of predefined report
     */
    async verifyReportExists(reportName: string): Promise<boolean> {
        const rows = await this.getTableRows();
        for (const row of rows) {
            const text = await row.innerText();
            if (text.includes(reportName)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Verify all predefined reports exist
     */
    async verifyAllPredefinedReportsExist(): Promise<boolean> {
        const reports = [
            'All Employee Sub Unit Hierarchy Report',
            'Employee Contact info report',
            'Employee Job Details',
            'PIM Sample Report'
        ];

        for (const report of reports) {
            const exists = await this.verifyReportExists(report);
            if (!exists) {
                return false;
            }
        }
        return true;
    }

    /**
     * Verify specific report in first position
     * @param reportName - Expected report name
     */
    async verifyReportInPosition(reportName: string, position: number): Promise<boolean> {
        const name = await this.getReportNameFromRow(position);
        return name.includes(reportName);
    }

    /**
     * Verify search results filtered correctly
     * @param searchTerm - Search term used
     */
    async verifySearchResultsFiltered(searchTerm: string): Promise<boolean> {
        const rows = await this.getTableRows();
        for (const row of rows) {
            const text = await row.innerText();
            if (!text.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
        }
        return true;
    }

    /**
     * Verify search input is cleared
     */
    async verifySearchInputCleared(): Promise<boolean> {
        const input = this.page.locator(this.reportNameInput).first();
        const value = await input.inputValue();
        return value === '';
    }

    /**
     * Verify no reports message
     */
    async verifyNoReportsMessage(): Promise<boolean> {
        const noResultsMsg = this.page.locator('text=No Records Found');
        return await noResultsMsg.isVisible();
    }

    /**
     * Get success message
     */
    async getSuccessMessage(): Promise<string> {
        const msg = this.page.locator('.oxd-text.oxd-text--p.oxd-alert-content-text').first();
        return await msg.innerText();
    }

    /**
     * Verify report deleted successfully
     */
    async verifyReportDeletedSuccessfully(): Promise<boolean> {
        const successMsg = this.page.locator('text=Successfully');
        return await successMsg.isVisible();
    }

    /**
     * Verify report created successfully
     */
    async verifyReportCreatedSuccessfully(): Promise<boolean> {
        const successMsg = this.page.locator('text=Successfully');
        return await successMsg.isVisible();
    }
}

// ==================== INTERFACES ====================

/**
 * Report row data interface
 */
export interface ReportRowData {
    name: string;
    actions: string;
}

/**
 * Create report data interface
 */
export interface CreateReportData {
    name?: string;
    description?: string;
    selectedFields?: string[];
    filters?: {
        [key: string]: string;
    };
}
