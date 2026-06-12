import { Page, expect } from '@playwright/test';

export class OpenAccountPage {
    constructor(private page: Page) {}

    async clickNewAccount() {
        await this.page.getByRole('link', { name: 'Open New Account' }).click();
        await expect(this.page.locator('#type')).toBeVisible();
        await expect(this.page.locator('select').nth(1).locator('option').first()).toBeAttached();
    }

    async openSavings() {
        await this.page.locator('#type').selectOption('1');
        await this.page.getByRole('button', { name: 'Open New Account' }).click();
        await expect(this.page.locator('#rightPanel')).toContainText('Congratulations');
        await expect(this.page.locator('#newAccountId')).toHaveAttribute('href', /.+/);
    }

    async openChecking() {
        await this.page.getByRole('button', { name: 'Open New Account' }).click();
        await expect(this.page.locator('#rightPanel')).toContainText('Congratulations');
        await expect(this.page.locator('#newAccountId')).toHaveAttribute('href', /.+/);
    }
}
