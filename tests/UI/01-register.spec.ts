import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../POM/Registerpage';
import userData from '../../test-data/User.json';

test.describe('TS-01 Valid User Registration', () => {

    test('Register New User', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const uniqueUsername = `Aaru${Date.now()}`;
        await page.goto(userData.registerUser.url);
        await registerPage.registerUser(userData.registerUser, uniqueUsername);

        await expect(page.locator('#rightPanel')).toContainText('Your account was created successfully');

        // await page.screenshot({ path: `screenshots/ts-01-test1.png`, fullPage: true });
    });

    test('Auto Login Verification', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const uniqueUsername = `Aaru${Date.now()}`;
        await page.goto(userData.registerUser.url);
        await registerPage.registerUser(userData.registerUser, uniqueUsername);

        await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible({ timeout: 15000 });
        await expect(page.getByRole('link', { name: 'Open New Account' })).toBeVisible();

        // await page.screenshot({ path: `screenshots/ts-01-test2.png`, fullPage: true });
    });

});
