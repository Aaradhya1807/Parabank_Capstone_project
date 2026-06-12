import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/LoginPage';
import userData from '../../test-data/User.json';

const jsonHeader = { headers: { 'Accept': 'application/json' } };

test.describe('TS-13 Unauthenticated / Session Access Scenarios', () => {

    test('GET Accounts – Invalid Customer ID Returns Error', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginOrRegister(userData);

        const response = await page.request.get('https://parabank.parasoft.com/parabank/services/bank/customers/99999999/accounts', jsonHeader);
        const responseBody = await response.text();
        console.log('status:', response.status(), 'response:', responseBody);
        expect([400, 404]).toContain(response.status());
        expect(responseBody.length).toBeGreaterThan(0);

        // await page.screenshot({
        //     path: `screenshots/ts-13-test3.png`,
        //     fullPage: true
        // });
    });

    test('GET Accounts API Accessible Without Auth (No 401 Enforced)', async ({ request }) => {
        const response = await request.get('https://parabank.parasoft.com/parabank/services/bank/customers/12212/accounts', jsonHeader);
        console.log('status:', response.status(), 'response:', await response.text());
        expect(response.status()).toBe(200);
    });

});
