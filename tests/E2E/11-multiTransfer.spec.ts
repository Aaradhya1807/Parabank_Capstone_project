import { test, expect } from '@playwright/test';
import { OpenAccountPage } from '../../POM/OpenAccountPage';
import { FundTransferPage } from '../../POM/FundTransferPage';
import { LoginPage } from '../../POM/LoginPage';
import userData from '../../test-data/User.json';

const jsonHeader = { headers: { 'Accept': 'application/json' } };

test.describe('TS-11 Multi-Account Fund Transfer Consistency', () => {

    test('Many Transfers in a Row-API Balances Stay Correct', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const accountPage = new OpenAccountPage(page);
        const transferPage = new FundTransferPage(page);
        await loginPage.loginOrRegister(userData);

        await accountPage.clickNewAccount();
        await accountPage.openChecking();
        const accountA = (await page.locator('#newAccountId').textContent() as string).trim();

        await accountPage.clickNewAccount();
        await accountPage.openChecking();
        const accountB = (await page.locator('#newAccountId').textContent() as string).trim();

        await accountPage.clickNewAccount();
        await accountPage.openChecking();
        const accountC = (await page.locator('#newAccountId').textContent() as string).trim();

        const respA = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountA}`, jsonHeader);
        const balanceABefore = (await respA.json()).balance;
        const respB = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountB}`, jsonHeader);
        const balanceBBefore = (await respB.json()).balance;
        const respC = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountC}`, jsonHeader);
        const balanceCBefore = (await respC.json()).balance;
        console.log('balances before:', balanceABefore, balanceBBefore, balanceCBefore);

        await transferPage.goToTransferFunds();
        await transferPage.enterAmount('100');
        await page.locator('#fromAccountId').selectOption(accountA);
        await page.locator('#toAccountId').selectOption(accountB);
        await transferPage.clickTransfer();
        await expect(page.locator('#rightPanel')).toContainText('Transfer Complete!');

        await transferPage.goToTransferFunds();
        await transferPage.enterAmount('50');
        await page.locator('#fromAccountId').selectOption(accountB);
        await page.locator('#toAccountId').selectOption(accountC);
        await transferPage.clickTransfer();
        await expect(page.locator('#rightPanel')).toContainText('Transfer Complete!');

        const respAAfter = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountA}`, jsonHeader);
        const balanceAAfter = (await respAAfter.json()).balance;
        const respBAfter = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountB}`, jsonHeader);
        const balanceBAfter = (await respBAfter.json()).balance;
        const respCAfter = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountC}`, jsonHeader);
        const balanceCAfter = (await respCAfter.json()).balance;
        console.log('balances after:', balanceAAfter, balanceBAfter, balanceCAfter);

        expect(balanceABefore - balanceAAfter).toBe(100);
        expect(balanceBAfter - balanceBBefore).toBe(50);
        expect(balanceCAfter - balanceCBefore).toBe(50);

        // await page.screenshot({
        //     path: `screenshots/ts-11-test1.png`,
        //     fullPage: true
        // });
    });

});
