import { test, expect } from '@playwright/test';
import { OpenAccountPage } from '../../POM/OpenAccountPage';
import { FundTransferPage } from '../../POM/FundTransferPage';
import { LoginPage } from '../../POM/LoginPage';
import { AccountOverviewPage } from '../../POM/AccountOverviewPage';
import userData from '../../test-data/User.json';

test.describe('TS-06 Successful Fund Transfer via UI', () => {

    test('Transfer Money-Valid Amount Between Two Accounts', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const accountPage = new OpenAccountPage(page);
        const transferPage = new FundTransferPage(page);
        const overviewPage = new AccountOverviewPage(page);
        await loginPage.loginOrRegister(userData);
        await accountPage.clickNewAccount();
        await accountPage.openChecking();

        await overviewPage.goto();
        const fromAccountId = await overviewPage.getAccountId(0);
        const toAccountId = await overviewPage.getAccountId(1);

        await transferPage.goToTransferFunds();
        await page.locator('#fromAccountId').selectOption(fromAccountId);
        await page.locator('#toAccountId').selectOption(toAccountId);
        await transferPage.enterAmount('100');
        await transferPage.clickTransfer();

        await expect(page.locator('#rightPanel')).toContainText('Transfer Complete!');

        // await page.screenshot({
        //     path: `screenshots/ts-06-test1.png`,
        //     fullPage: true
        // });
    });

    test('Transfer Confirmation Page Shows Correct Details', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const accountPage = new OpenAccountPage(page);
        const transferPage = new FundTransferPage(page);
        const overviewPage = new AccountOverviewPage(page);
        await loginPage.loginOrRegister(userData);
        await accountPage.clickNewAccount();
        await accountPage.openChecking();

        await overviewPage.goto();
        const fromAccountId = await overviewPage.getAccountId(0);
        const toAccountId = await overviewPage.getAccountId(1);

        await transferPage.goToTransferFunds();
        await page.locator('#fromAccountId').selectOption(fromAccountId);
        await page.locator('#toAccountId').selectOption(toAccountId);
        await transferPage.enterAmount('200');
        await transferPage.clickTransfer();

        await expect(page.locator('#rightPanel')).toContainText('200');
        await expect(page.locator('#rightPanel')).toContainText(fromAccountId);
        await expect(page.locator('#rightPanel')).toContainText(toAccountId);

        // await page.screenshot({
        //     path: `screenshots/ts-06-test2.png`,
        //     fullPage: true
        // });
    });

});
