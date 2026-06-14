import { test, expect } from '@playwright/test';
import { OpenAccountPage } from '../../POM/OpenAccountPage';
import { LoginPage } from '../../POM/LoginPage';
import userData from '../../test-data/User.json';

const jsonHeader = { headers: { 'Accept': 'application/json' } };

test.describe('TS-09 UI to API Validation', () => {

    test('Verify Account via API', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const accountPage = new OpenAccountPage(page);
        await loginPage.loginOrRegister(userData);
        await accountPage.clickNewAccount();
        await accountPage.openChecking();
        const newAccountId = await page.locator('#newAccountId').textContent() as string;

        const response = await page.request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${newAccountId}`, jsonHeader);
        expect(response.status()).toBe(200);
        const accountData = await response.json();
        console.log('new account id:', newAccountId);
        console.log('account data:', JSON.stringify(accountData));

        expect(accountData.type).toBe('CHECKING');
        expect(typeof accountData.balance).toBe('number');
        expect(accountData.balance).toBeGreaterThanOrEqual(0);
        expect(String(accountData.id)).toBe(newAccountId);

        // await page.screenshot({
        //     path: `screenshots/ts-09-test1.png`,
        //     fullPage: true
        // });
    });

});
