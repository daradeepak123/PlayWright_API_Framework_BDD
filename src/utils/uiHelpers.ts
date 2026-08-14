import { expect, Locator, Page } from '@playwright/test';

export class UIHelper {
    page: Page;

    constructor(page?: Page) {
        if (page) {
            this.page = page;
        }
    }

    static generateRandomText(prefix = 'test') {
        const randomPart = Math.random().toString(36).substring(2, 8);
        console.log(Math.random().toString(36))
        return `${prefix}${Date.now()}${randomPart}`;
    }

    static async isReady(locator: Locator): Promise<boolean> {
        return (await locator.isVisible()) && (await locator.isEnabled());
    }

    static async verifyHeading(locator: Locator, expectedText: string) {
        if (await this.isReady(locator)) {
            const actualText = await locator.innerText();
            console.log('Heading Text:', actualText);
            await expect(locator).toHaveText(expectedText);
        } else {
            console.log('Heading is not visible or enabled');
        }
    }

    static async fillTextBox(locator: Locator, text: string) {
        if (await this.isReady(locator)) {
            await locator.clear();
            await locator.fill(text);
        } else {
            console.log('TextBox is not visible or enabled');
        }
    }

    static async clickElement(locator: Locator) {
        if (await this.isReady(locator)) {
            await locator.click();
        } else {
            console.log('Element is not visible or enabled');
        }
    }

    // ==================== INSTANCE METHODS ====================

    /**
     * Click on element by selector
     */
    async click(selector: string | Locator): Promise<void> {
        if (typeof selector === 'string') {
            await this.page.locator(selector).click();
        } else {
            await selector.click();
        }
    }

    /**
     * Fill text in element
     */
    async fill(selector: string | Locator, text: string): Promise<void> {
        if (typeof selector === 'string') {
            await this.page.locator(selector).fill(text);
        } else {
            await selector.fill(text);
        }
    }

    /**
     * Get text from element
     */
    async getText(selector: string | Locator): Promise<string> {
        if (typeof selector === 'string') {
            return await this.page.locator(selector).textContent() || '';
        } else {
            return await selector.textContent() || '';
        }
    }

    /**
     * Check if element is visible
     */
    async isElementVisible(selector: string | Locator): Promise<boolean> {
        try {
            if (typeof selector === 'string') {
                return await this.page.locator(selector).isVisible();
            } else {
                return await selector.isVisible();
            }
        } catch (error) {
            return false;
        }
    }

    /**
     * Wait for element to appear
     */
    async waitForElement(selector: string | Locator, timeoutMs?: number): Promise<void> {
        if (typeof selector === 'string') {
            await this.page.locator(selector).waitFor({ 
                state: 'visible', 
                timeout: timeoutMs || 5000 
            });
        } else {
            await selector.waitFor({ 
                state: 'visible', 
                timeout: timeoutMs || 5000 
            });
        }
    }

    /**
     * Get locator from selector
     */
    getLocator(selector: string): Locator {
        return this.page.locator(selector);
    }

    /**
     * Type text into element with delay
     */
    async type(selector: string | Locator, text: string, delayMs?: number): Promise<void> {
        if (typeof selector === 'string') {
            await this.page.locator(selector).type(text, { delay: delayMs || 0 });
        } else {
            await selector.type(text, { delay: delayMs || 0 });
        }
    }

    /**
     * Double click on element
     */
    async doubleClick(selector: string | Locator): Promise<void> {
        if (typeof selector === 'string') {
            await this.page.locator(selector).dblclick();
        } else {
            await selector.dblclick();
        }
    }

    /**
     * Right click on element
     */
    async rightClick(selector: string | Locator): Promise<void> {
        if (typeof selector === 'string') {
            await this.page.locator(selector).click({ button: 'right' });
        } else {
            await selector.click({ button: 'right' });
        }
    }

    /**
     * Hover over element
     */
    async hover(selector: string | Locator): Promise<void> {
        if (typeof selector === 'string') {
            await this.page.locator(selector).hover();
        } else {
            await selector.hover();
        }
    }

    /**
     * Get element count
     */
    async getElementCount(selector: string): Promise<number> {
        return await this.page.locator(selector).count();
    }

    /**
     * Get all text contents from elements
     */
    async getAllTextContents(selector: string): Promise<string[]> {
        return await this.page.locator(selector).allTextContents();
    }

    /**
     * Check if element is enabled
     */
    async isElementEnabled(selector: string | Locator): Promise<boolean> {
        try {
            if (typeof selector === 'string') {
                return await this.page.locator(selector).isEnabled();
            } else {
                return await selector.isEnabled();
            }
        } catch (error) {
            return false;
        }
    }

    /**
     * Clear element value
     */
    async clear(selector: string | Locator): Promise<void> {
        if (typeof selector === 'string') {
            await this.page.locator(selector).clear();
        } else {
            await selector.clear();
        }
    }

    /**
     * Press key on element
     */
    async pressKey(selector: string | Locator, key: string): Promise<void> {
        if (typeof selector === 'string') {
            await this.page.locator(selector).press(key);
        } else {
            await selector.press(key);
        }
    }

    /**
     * Get attribute value
     */
    async getAttribute(selector: string | Locator, attributeName: string): Promise<string | null> {
        if (typeof selector === 'string') {
            return await this.page.locator(selector).getAttribute(attributeName);
        } else {
            return await selector.getAttribute(attributeName);
        }
    }

    /**
     * Select option from dropdown
     */
    async selectOption(selector: string | Locator, optionValue: string): Promise<void> {
        if (typeof selector === 'string') {
            await this.page.locator(selector).selectOption(optionValue);
        } else {
            await selector.selectOption(optionValue);
        }
    }

}