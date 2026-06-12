import { test, expect } from '@playwright/test';
import { OpenAccountPage } from '../../POM/OpenAccountPage';
import { LoginPage } from '../../POM/LoginPage';
import { AccountOverviewPage } from '../../POM/AccountOverviewPage';
import userData from '../../test-data/User.json';

const jsonHeader = { headers: { 'Accept': 'application/json' } };

test.describe('TS-05 Account Exists in API After UI Creation', () => {

    test('GET Accounts', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const overviewPage = new AccountOverviewPage(page);
        await loginPage.loginOrRegister(userData);
        await overviewPage.goto();
        const accountId = await overviewPage.getAccountId(0);

        const accountResp = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountId}`, jsonHeader);
        const accountData = await accountResp.json();
        const customerId = accountData.customerId;

        const response = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/customers/${customerId}/accounts`, jsonHeader);
        expect(response.status()).toBe(200);
        const accounts = await response.json();
        console.log('accounts list:', JSON.stringify(accounts));
        expect(accounts.length).toBeGreaterThan(0);

        // await page.screenshot({
        //     path: `screenshots/ts-05-test1.png`,
        //     fullPage: true
        // });
    });

    test('New Account ID Present in API Response', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const accountPage = new OpenAccountPage(page);
        await loginPage.loginOrRegister(userData);
        await accountPage.clickNewAccount();
        await accountPage.openChecking();
        const newAccountId = await page.locator('#newAccountId').textContent() as string;

        const accountResp = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${newAccountId}`, jsonHeader);
        const accountData = await accountResp.json();
        const customerId = accountData.customerId;

        const response = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/customers/${customerId}/accounts`, jsonHeader);
        expect(response.status()).toBe(200);
        const responseBody = await response.text();
        console.log('new account id:', newAccountId);
        console.log('accounts response:', responseBody);
        expect(responseBody).toContain(newAccountId);

        // await page.screenshot({
        //     path: `screenshots/ts-05-test2.png`,
        //     fullPage: true
        // });
    });

});

test.describe('TS-06 Account Type & Detail Validation via API', () => {

    test('Validate Account Type Field in API Response', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const accountPage = new OpenAccountPage(page);
        await loginPage.loginOrRegister(userData);
        await accountPage.clickNewAccount();
        await accountPage.openChecking();
        const newAccountId = await page.locator('#newAccountId').textContent() as string;

        const response = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${newAccountId}`, jsonHeader);
        expect(response.status()).toBe(200);
        const accountData = await response.json();
        console.log('account data:', JSON.stringify(accountData));

        expect(accountData.type).toBe('CHECKING');
        expect(accountData.type).not.toBeNull();

        // await page.screenshot({
        //     path: `screenshots/ts-06-test1.png`,
        //     fullPage: true
        // });
    });

    test('Validate Balance is Numeric and Non-Negative', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const accountPage = new OpenAccountPage(page);
        await loginPage.loginOrRegister(userData);
        await accountPage.clickNewAccount();
        await accountPage.openChecking();
        const accountId = await page.locator('#newAccountId').textContent() as string;

        const response = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountId}`, jsonHeader);
        expect(response.status()).toBe(200);
        const accountData = await response.json();
        console.log('account data:', JSON.stringify(accountData));

        expect(typeof accountData.balance).toBe('number');
        expect(accountData.balance).toBeGreaterThanOrEqual(0);

        // await page.screenshot({
        //     path: `screenshots/ts-06-test2.png`,
        //     fullPage: true
        // });
    });

});
