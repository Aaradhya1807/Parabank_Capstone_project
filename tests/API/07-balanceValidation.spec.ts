import { test, expect } from '@playwright/test';
import { OpenAccountPage } from '../../POM/OpenAccountPage';
import { FundTransferPage } from '../../POM/FundTransferPage';
import { LoginPage } from '../../POM/LoginPage';
import userData from '../../test-data/User.json';

const jsonHeader = { headers: { 'Accept': 'application/json' } };

test.describe('TS-07 Balance After Transfer', () => {

    test('Source Account Debited', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const accountPage = new OpenAccountPage(page);
        const transferPage = new FundTransferPage(page);
        await loginPage.loginOrRegister(userData);

        await accountPage.clickNewAccount();
        await accountPage.openChecking();
        const fromAccountId = (await page.locator('#newAccountId').textContent() as string).trim();

        await accountPage.clickNewAccount();
        await accountPage.openChecking();
        const toAccountId = (await page.locator('#newAccountId').textContent() as string).trim();

        const beforeResp = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${fromAccountId}`, jsonHeader);
        const balanceBefore = (await beforeResp.json()).balance;
        console.log('balance before:', balanceBefore);

        await transferPage.goToTransferFunds();
        await page.locator('#fromAccountId').selectOption(fromAccountId);
        await page.locator('#toAccountId').selectOption(toAccountId);
        await transferPage.enterAmount('100');
        await transferPage.clickTransfer();
        await expect(page.locator('#rightPanel')).toContainText('Transfer Complete!');

        const afterResp = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${fromAccountId}`, jsonHeader);
        const balanceAfter = (await afterResp.json()).balance;
        console.log('balance after:', balanceAfter);

        expect(balanceAfter).toBe(balanceBefore - 100);

        // await page.screenshot({
        //     path: `screenshots/ts-07-test1.png`,
        //     fullPage: true
        // });
    });

});
