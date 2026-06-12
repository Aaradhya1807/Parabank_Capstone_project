import { Page, expect } from '@playwright/test';

export class FundTransferPage {
    constructor(private page: Page) {}

    async goToTransferFunds() {
        await this.page.getByRole('link', { name: 'Transfer Funds' }).click();
        await expect(this.page.locator('#fromAccountId option').first()).toBeAttached({ timeout: 15000 });
    }

    async enterAmount(amount: string) {await this.page.locator('#amount').fill(amount);}

    async selectFrom() {await this.page.locator('#fromAccountId').selectOption({ index: 0 });}

    async selectTo() {await this.page.locator('#toAccountId').selectOption({ index: 1 });}

    async clickTransfer() {await this.page.getByRole('button', { name: 'Transfer' }).click();}
}
