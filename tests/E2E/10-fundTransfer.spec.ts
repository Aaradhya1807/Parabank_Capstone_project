import { test, expect } from '@playwright/test';
import { OpenAccountPage } from '../../POM/OpenAccountPage';
import { FundTransferPage } from '../../POM/FundTransferPage';
import { LoginPage } from '../../POM/LoginPage';
import userData from '../../test-data/User.json';

const jsonHeader = { headers: { 'Accept': 'application/json' } };

test.describe('TS-08 Debit Credit Check', () => {

    test('Debit Equals Credit', async ({ page }) => {
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

        const fromBefore = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${fromAccountId}`, jsonHeader);
        const fromBalanceBefore = (await fromBefore.json()).balance;
        const toBefore = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${toAccountId}`, jsonHeader);
        const toBalanceBefore = (await toBefore.json()).balance;
        console.log('from balance before:', fromBalanceBefore);
        console.log('to balance before:', toBalanceBefore);

        await transferPage.goToTransferFunds();
        await page.locator('#fromAccountId').selectOption(fromAccountId);
        await page.locator('#toAccountId').selectOption(toAccountId);
        await transferPage.enterAmount('100');
        await transferPage.clickTransfer();
        await expect(page.locator('#rightPanel')).toContainText('Transfer Complete!');

        const fromAfter = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${fromAccountId}`, jsonHeader);
        const fromBalanceAfter = (await fromAfter.json()).balance;
        const toAfter = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${toAccountId}`, jsonHeader);
        const toBalanceAfter = (await toAfter.json()).balance;
        console.log('from balance after:', fromBalanceAfter);
        console.log('to balance after:', toBalanceAfter);

        const moneyTaken = fromBalanceBefore - fromBalanceAfter;
        const moneyAdded = toBalanceAfter - toBalanceBefore;

        expect(moneyTaken).toBe(100);
        expect(moneyAdded).toBe(100);
        expect(moneyTaken).toBe(moneyAdded);

        // await page.screenshot({ path: `screenshots/ts-08-test1.png`, fullPage: true });
    });

});
