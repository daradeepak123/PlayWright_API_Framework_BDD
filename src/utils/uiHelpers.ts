import { expect, Locator } from '@playwright/test';

export class UIHelper {

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

}