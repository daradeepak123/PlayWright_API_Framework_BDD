import { Expect, Page, Locator } from "@playwright/test";
import { UIHelper } from "../utils/uiHelpers";

export class DashBoardPage {
    page: Page;
    uiHelper: UIHelper;

    constructor(page: Page) {
        this.page = page;
        this.uiHelper = new UIHelper(page);
    }

    // ==================== SELECTORS ====================
    
    // Header Selectors
    private readonly dashboardHeading = 'h6:has-text("Dashboard")';
    private readonly upgradeButton = 'button:has-text("Upgrade")';
    private readonly userProfileImg = 'img[alt="profile picture"]';
    private readonly topbarNav = 'nav:has-text("Topbar Menu")';

    // Sidebar Menu Selectors
    private readonly sidebarNav = 'nav:has-text("Sidepanel")';
    private readonly adminMenu = 'a:has-text("Admin")';
    private readonly pimMenu = 'a:has-text("PIM")';
    private readonly leaveMenu = 'a:has-text("Leave")';
    private readonly timeMenu = 'a:has-text("Time")';
    private readonly recruitmentMenu = 'a:has-text("Recruitment")';
    private readonly myInfoMenu = 'a:has-text("My Info")';
    private readonly performanceMenu = 'a:has-text("Performance")';
    private readonly dashboardMenu = 'a:has-text("Dashboard")';
    private readonly directoryMenu = 'a:has-text("Directory")';
    private readonly maintenanceMenu = 'a:has-text("Maintenance")';
    private readonly claimMenu = 'a:has-text("Claim")';
    private readonly buzzMenu = 'a:has-text("Buzz")';

    // Dashboard Content Selectors - Using text-based selectors
    private readonly timeAtWorkCard = 'text=Time at Work';
    private readonly myActionsCard = 'text=My Actions';
    private readonly quickLaunchCard = 'text=Quick Launch';
    private readonly buzzLatestPostsCard = 'text=Buzz Latest Posts';
    private readonly employeesOnLeaveCard = 'text=Employees on Leave Today';
    private readonly employeeDistributionSubCard = 'text=Employee Distribution by Sub Unit';
    private readonly employeeDistributionLocationCard = 'text=Employee Distribution by Location';

    // ==================== METHODS ====================

    // ===== Navigation Methods =====
    
    /**
     * Navigate to Admin menu
     */
    async navigateToAdmin(): Promise<void> {
        await this.page.locator(this.adminMenu).click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to PIM menu
     */
    async navigateToPIM(): Promise<void> {
        await this.page.locator(this.pimMenu).click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Leave menu
     */
    async navigateToLeave(): Promise<void> {
        await this.page.locator(this.leaveMenu).click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Time menu
     */
    async navigateToTime(): Promise<void> {
        await this.page.locator(this.timeMenu).click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Recruitment menu
     */
    async navigateToRecruitment(): Promise<void> {
        await this.page.locator(this.recruitmentMenu).click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to My Info menu
     */
    async navigateToMyInfo(): Promise<void> {
        await this.page.locator(this.myInfoMenu).click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Performance menu
     */
    async navigateToPerformance(): Promise<void> {
        await this.page.locator(this.performanceMenu).click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Directory menu
     */
    async navigateToDirectory(): Promise<void> {
        await this.page.locator(this.directoryMenu).click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Maintenance menu
     */
    async navigateToMaintenance(): Promise<void> {
        await this.page.locator(this.maintenanceMenu).click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Claim menu
     */
    async navigateToClaim(): Promise<void> {
        await this.page.locator(this.claimMenu).click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Buzz menu
     */
    async navigateToBuzz(): Promise<void> {
        await this.page.locator(this.buzzMenu).click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Navigate to Dashboard menu
     */
    async navigateToDashboard(): Promise<void> {
        await this.page.locator(this.dashboardMenu).click();
        await this.page.waitForLoadState('networkidle');
    }

    // ===== Header/Top Navigation Methods =====

    /**
     * Click on Upgrade button
     */
    async clickUpgradeButton(): Promise<void> {
        await this.page.locator(this.upgradeButton).click();
    }

    /**
     * Click on user profile
     */
    async clickUserProfile(): Promise<void> {
        await this.page.locator(this.userProfileImg).click();
    }

    // ===== Visibility Verification Methods =====

    /**
     * Verify dashboard is loaded
     */
    async isDashboardLoaded(): Promise<boolean> {
        try {
            const heading = this.page.locator(this.dashboardHeading);
            return await heading.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify Time at Work card is visible
     */
    async isTimeAtWorkCardVisible(): Promise<boolean> {
        try {
            const card = this.page.locator(this.timeAtWorkCard).first();
            return await card.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify My Actions card is visible
     */
    async isMyActionsCardVisible(): Promise<boolean> {
        try {
            const card = this.page.locator(this.myActionsCard).first();
            return await card.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify Quick Launch card is visible
     */
    async isQuickLaunchCardVisible(): Promise<boolean> {
        try {
            const card = this.page.locator(this.quickLaunchCard).first();
            return await card.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify Buzz Latest Posts card is visible
     */
    async isBuzzLatestPostsCardVisible(): Promise<boolean> {
        try {
            const card = this.page.locator(this.buzzLatestPostsCard).first();
            return await card.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify Employees on Leave Today card is visible
     */
    async isEmployeesOnLeaveCardVisible(): Promise<boolean> {
        try {
            const card = this.page.locator(this.employeesOnLeaveCard).first();
            return await card.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify Employee Distribution by Sub Unit card is visible
     */
    async isEmployeeDistributionSubCardVisible(): Promise<boolean> {
        try {
            const card = this.page.locator(this.employeeDistributionSubCard).first();
            return await card.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify Employee Distribution by Location card is visible
     */
    async isEmployeeDistributionLocationCardVisible(): Promise<boolean> {
        try {
            const card = this.page.locator(this.employeeDistributionLocationCard).first();
            return await card.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify sidebar is visible
     */
    async isSidebarVisible(): Promise<boolean> {
        try {
            const sidebar = this.page.locator(this.sidebarNav);
            return await sidebar.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify topbar is visible
     */
    async isTopbarVisible(): Promise<boolean> {
        try {
            const topbar = this.page.locator(this.topbarNav);
            return await topbar.isVisible();
        } catch {
            return false;
        }
    }

    // ===== Wait Methods =====

    /**
     * Wait for dashboard to load
     */
    async waitForDashboardToLoad(timeoutMs?: number): Promise<void> {
        try {
            const heading = this.page.locator(this.dashboardHeading);
            await heading.waitFor({ 
                state: 'visible', 
                timeout: timeoutMs || 10000 
            });
        } catch (error) {
            console.log('Dashboard heading not found, continuing anyway');
        }
    }

    /**
     * Wait for Time at Work card to load
     */
    async waitForTimeAtWorkCardToLoad(timeoutMs?: number): Promise<void> {
        try {
            const card = this.page.locator(this.timeAtWorkCard).first();
            await card.waitFor({ 
                state: 'visible', 
                timeout: timeoutMs || 5000 
            });
        } catch (error) {
            console.log('Time at Work card not found, continuing anyway');
        }
    }

    /**
     * Wait for My Actions card to load
     */
    async waitForMyActionsCardToLoad(timeoutMs?: number): Promise<void> {
        try {
            const card = this.page.locator(this.myActionsCard).first();
            await card.waitFor({ 
                state: 'visible', 
                timeout: timeoutMs || 5000 
            });
        } catch (error) {
            console.log('My Actions card not found, continuing anyway');
        }
    }

    // ===== Click Methods for Dashboard Elements =====

    /**
     * Click on Time at Work card
     */
    async clickTimeAtWorkCard(): Promise<void> {
        try {
            const card = this.page.locator(this.timeAtWorkCard).first();
            await card.click();
        } catch (error) {
            console.log('Cannot click Time at Work card');
        }
    }

    /**
     * Click on My Actions card
     */
    async clickMyActionsCard(): Promise<void> {
        try {
            const card = this.page.locator(this.myActionsCard).first();
            await card.click();
        } catch (error) {
            console.log('Cannot click My Actions card');
        }
    }

    /**
     * Click on Quick Launch card
     */
    async clickQuickLaunchCard(): Promise<void> {
        try {
            const card = this.page.locator(this.quickLaunchCard).first();
            await card.click();
        } catch (error) {
            console.log('Cannot click Quick Launch card');
        }
    }

    /**
     * Click on Buzz Latest Posts card
     */
    async clickBuzzLatestPostsCard(): Promise<void> {
        try {
            const card = this.page.locator(this.buzzLatestPostsCard).first();
            await card.click();
        } catch (error) {
            console.log('Cannot click Buzz Latest Posts card');
        }
    }

    /**
     * Click on Employees on Leave Today card
     */
    async clickEmployeesOnLeaveCard(): Promise<void> {
        try {
            const card = this.page.locator(this.employeesOnLeaveCard).first();
            await card.click();
        } catch (error) {
            console.log('Cannot click Employees on Leave card');
        }
    }

    // ===== Menu Items Visibility Methods =====

    /**
     * Verify Admin menu is visible
     */
    async isAdminMenuVisible(): Promise<boolean> {
        try {
            const menu = this.page.locator(this.adminMenu);
            return await menu.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify PIM menu is visible
     */
    async isPIMMenuVisible(): Promise<boolean> {
        try {
            const menu = this.page.locator(this.pimMenu);
            return await menu.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify Leave menu is visible
     */
    async isLeaveMenuVisible(): Promise<boolean> {
        try {
            const menu = this.page.locator(this.leaveMenu);
            return await menu.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify Time menu is visible
     */
    async isTimeMenuVisible(): Promise<boolean> {
        try {
            const menu = this.page.locator(this.timeMenu);
            return await menu.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify Recruitment menu is visible
     */
    async isRecruitmentMenuVisible(): Promise<boolean> {
        try {
            const menu = this.page.locator(this.recruitmentMenu);
            return await menu.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify My Info menu is visible
     */
    async isMyInfoMenuVisible(): Promise<boolean> {
        try {
            const menu = this.page.locator(this.myInfoMenu);
            return await menu.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify Performance menu is visible
     */
    async isPerformanceMenuVisible(): Promise<boolean> {
        try {
            const menu = this.page.locator(this.performanceMenu);
            return await menu.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify Directory menu is visible
     */
    async isDirectoryMenuVisible(): Promise<boolean> {
        try {
            const menu = this.page.locator(this.directoryMenu);
            return await menu.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify Buzz menu is visible
     */
    async isBuzzMenuVisible(): Promise<boolean> {
        try {
            const menu = this.page.locator(this.buzzMenu);
            return await menu.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify user profile image is visible
     */
    async isUserProfileVisible(): Promise<boolean> {
        try {
            const profile = this.page.locator(this.userProfileImg);
            return await profile.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Verify upgrade button is visible
     */
    async isUpgradeButtonVisible(): Promise<boolean> {
        try {
            const button = this.page.locator(this.upgradeButton);
            return await button.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Get current page URL
     */
    async getCurrentURL(): Promise<string> {
        return this.page.url();
    }

}
