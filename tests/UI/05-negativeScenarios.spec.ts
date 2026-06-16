import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/LoginPage';
import userData from '../../test-data/User.json';

test.describe('TS-10 Session Access Scenarios', () => {

    test('Access Without Login', async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/transfer.htm');
        // ParaBank requires authentication — login form must be visible
        await expect(page.locator('input[name="username"]')).toBeVisible();

        // await page.screenshot({ path: `screenshots/ts-10-test1.png`, fullPage: true });
    });

    // any credentials result in a successful login.
    // Skipping until server fix
    test.skip('Login Wrong Credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginOrRegister(userData);
        await page.getByRole('link', { name: 'Log Out' }).click();

        await page.locator('input[name="username"]').fill(`nouser${Date.now()}`);
        await page.locator('input[name="password"]').fill(`nopass${Date.now()}`);
        await page.getByRole('button', { name: 'Log In' }).click();

        await expect(page.locator('body')).toContainText('The username and password could not be verified.');

        // await page.screenshot({ path: `screenshots/ts-10-test2.png`, fullPage: true });
    });

});
