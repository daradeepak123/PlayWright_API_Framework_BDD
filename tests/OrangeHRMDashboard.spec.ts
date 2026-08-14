import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Dashboard - Core Functionality Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to OrangeHRM login page
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { 
            waitUntil: 'domcontentloaded' 
        });
        
        // Wait for login form elements to be ready
        await page.waitForSelector('input[placeholder="Username"]', { timeout: 10000 });
        
        // Perform login
        await page.fill('input[placeholder="Username"]', 'Admin');
        await page.fill('input[type="password"]', 'admin123');
        
        // Click login button and wait for navigation
        await page.click('.orangehrm-login-button');
        await page.waitForURL(/.*dashboard\/index/, { timeout: 30000 });
    });

    // ==================== DASHBOARD BASIC TESTS ====================

    test('TC001: Dashboard loads successfully', async ({ page }) => {
        // Verify we're on dashboard
        expect(page.url()).toContain('/dashboard/index');
    });

    test('TC002: Dashboard title is OrangeHRM', async ({ page }) => {
        // Verify page title
        expect(await page.title()).toBe('OrangeHRM');
    });

    test('TC003: Dashboard heading is visible', async ({ page }) => {
        // Verify Dashboard heading exists
        const heading = await page.locator('h6:has-text("Dashboard")').isVisible();
        expect(heading).toBeTruthy();
    });

    // ==================== DASHBOARD CARDS TESTS ====================

    test('TC004: Time at Work card is visible', async ({ page }) => {
        const card = page.locator('text=Time at Work').first();
        expect(await card.isVisible()).toBeTruthy();
    });

    test('TC005: My Actions card is visible', async ({ page }) => {
        const card = page.locator('text=My Actions').first();
        expect(await card.isVisible()).toBeTruthy();
    });

    test('TC006: Quick Launch card is visible', async ({ page }) => {
        const card = page.locator('text=Quick Launch').first();
        expect(await card.isVisible()).toBeTruthy();
    });

    test('TC007: Buzz Latest Posts card is visible', async ({ page }) => {
        const card = page.locator('text=Buzz Latest Posts').first();
        expect(await card.isVisible()).toBeTruthy();
    });

    test('TC008: Employees on Leave Today card is visible', async ({ page }) => {
        const card = page.locator('text=Employees on Leave Today').first();
        expect(await card.isVisible()).toBeTruthy();
    });

    // ==================== NAVIGATION TESTS ====================

    test('TC009: Admin menu navigates correctly', async ({ page }) => {
        // Find and click Admin menu
        const adminLink = page.locator('a:has-text("Admin")').first();
        await adminLink.click();
        
        // Wait for URL to change
        await page.waitForURL(/.*admin/, { timeout: 15000 });
        expect(page.url()).toContain('/admin');
    });

    test('TC010: PIM menu navigates correctly', async ({ page }) => {
        // Find and click PIM menu
        const pimLink = page.locator('a:has-text("PIM")').first();
        await pimLink.click();
        
        // Wait for URL to change
        await page.waitForURL(/.*pim/, { timeout: 15000 });
        expect(page.url()).toContain('/pim');
    });

    test('TC011: Leave menu navigates correctly', async ({ page }) => {
        // Find and click Leave menu
        const leaveLink = page.locator('a:has-text("Leave")').first();
        await leaveLink.click();
        
        // Wait for URL to change
        await page.waitForURL(/.*leave/, { timeout: 15000 });
        expect(page.url()).toContain('/leave');
    });

    test('TC012: Can navigate back to Dashboard', async ({ page }) => {
        // Navigate to Admin
        await page.locator('a:has-text("Admin")').first().click();
        await page.waitForURL(/.*admin/, { timeout: 15000 });
        
        // Navigate back to Dashboard
        await page.locator('a:has-text("Dashboard")').first().click();
        await page.waitForURL(/.*dashboard/, { timeout: 15000 });
        
        expect(page.url()).toContain('/dashboard/index');
    });

    // ==================== HEADER ELEMENTS TESTS ====================

    test('TC013: Upgrade button is visible', async ({ page }) => {
        const upgradeBtn = page.locator('button:has-text("Upgrade")');
        expect(await upgradeBtn.isVisible()).toBeTruthy();
    });

    test('TC014: User profile is clickable', async ({ page }) => {
        const profileImg = page.locator('img[alt="profile picture"]').first();
        expect(await profileImg.isVisible()).toBeTruthy();
        
        // Try to click it
        await profileImg.click();
        // Should still be on dashboard
        expect(page.url()).toContain('/dashboard/index');
    });

    // ==================== SIDEBAR MENU TESTS ====================

    test('TC015: PIM menu is visible', async ({ page }) => {
        const pimMenu = page.locator('a:has-text("PIM")').first();
        expect(await pimMenu.isVisible()).toBeTruthy();
    });

    test('TC016: Leave menu is visible', async ({ page }) => {
        const leaveMenu = page.locator('a:has-text("Leave")').first();
        expect(await leaveMenu.isVisible()).toBeTruthy();
    });

    test('TC017: Time menu is visible', async ({ page }) => {
        const timeMenu = page.locator('a:has-text("Time")').first();
        expect(await timeMenu.isVisible()).toBeTruthy();
    });

    test('TC018: Recruitment menu is visible', async ({ page }) => {
        const recruitmentMenu = page.locator('a:has-text("Recruitment")').first();
        expect(await recruitmentMenu.isVisible()).toBeTruthy();
    });

    test('TC019: My Info menu is visible', async ({ page }) => {
        const myInfoMenu = page.locator('a:has-text("My Info")').first();
        expect(await myInfoMenu.isVisible()).toBeTruthy();
    });

    test('TC020: Performance menu is visible', async ({ page }) => {
        const perfMenu = page.locator('a:has-text("Performance")').first();
        expect(await perfMenu.isVisible()).toBeTruthy();
    });

    // ==================== CARD INTERACTION TESTS ====================

    test('TC021: Time at Work card is interactive', async ({ page }) => {
        const card = page.locator('text=Time at Work').first();
        expect(await card.isVisible()).toBeTruthy();
        // Ensure it's not in a disabled state
        expect(await card.isEnabled()).toBeTruthy();
    });

    test('TC022: My Actions card is interactive', async ({ page }) => {
        const card = page.locator('text=My Actions').first();
        expect(await card.isVisible()).toBeTruthy();
        expect(await card.isEnabled()).toBeTruthy();
    });

    test('TC023: Quick Launch card is interactive', async ({ page }) => {
        const card = page.locator('text=Quick Launch').first();
        expect(await card.isVisible()).toBeTruthy();
        expect(await card.isEnabled()).toBeTruthy();
    });

    // ==================== MULTI-MENU NAVIGATION TEST ====================

    test('TC024: Navigate through multiple menus and return to dashboard', async ({ page }) => {
        // Start at dashboard
        expect(page.url()).toContain('/dashboard/index');
        
        // Go to Admin
        await page.locator('a:has-text("Admin")').first().click();
        await page.waitForURL(/.*admin/, { timeout: 15000 });
        expect(page.url()).toContain('/admin');
        
        // Go to PIM
        await page.locator('a:has-text("PIM")').first().click();
        await page.waitForURL(/.*pim/, { timeout: 15000 });
        expect(page.url()).toContain('/pim');
        
        // Return to Dashboard
        await page.locator('a:has-text("Dashboard")').first().click();
        await page.waitForURL(/.*dashboard/, { timeout: 15000 });
        expect(page.url()).toContain('/dashboard/index');
    });

    // ==================== CONTENT VERIFICATION TESTS ====================

    test('TC025: Dashboard has main content area', async ({ page }) => {
        // Verify at least one dashboard card is visible
        const hasCards = await page.locator('text=Time at Work').isVisible()
            .catch(() => false);
        expect(hasCards).toBeTruthy();
    });

    test('TC026: Dashboard layout is correct', async ({ page }) => {
        // Check sidebar exists
        const sidebar = page.locator('nav').first();
        const sidebarVisible = await sidebar.isVisible();
        expect(sidebarVisible).toBeTruthy();
        
        // Check banner exists
        const banner = page.locator('banner').first();
        const bannerVisible = await banner.isVisible();
        expect(bannerVisible).toBeTruthy();
    });

});
