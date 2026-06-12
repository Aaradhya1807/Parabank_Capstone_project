import { Page } from '@playwright/test';

export class AccountOverviewPage {
    constructor(private page: Page) {}

    async goto() {await this.page.goto('https://parabank.parasoft.com/parabank/overview.htm');}
    async getAccountId(index: number) {return ((await this.page.locator('a[href*="activity.htm"]').nth(index).textContent()) as string).trim();}
}
