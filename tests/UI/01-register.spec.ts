import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../POM/Registerpage';
import userData from '../../test-data/User.json';

test.describe('TS-01 New User Registration with Valid Data', () => {

    test('Register New User with Valid Data', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const uniqueUsername = `Aaru${Date.now()}`;
        await page.goto(userData.registerUser.url);
        await registerPage.registerUser(userData.registerUser, uniqueUsername);

        await expect(page.locator('#rightPanel')).toContainText('Your account was created successfully');

        // await page.screenshot({
        //     path: `screenshots/ts-01-test1.png`,
        //     fullPage: true
        // });
    });

    test('Verify Auto-Login & Welcome After Registration', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const uniqueUsername = `Aaru${Date.now()}`;
        await page.goto(userData.registerUser.url);
        await registerPage.registerUser(userData.registerUser, uniqueUsername);

        await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Open New Account' })).toBeVisible();

        // await page.screenshot({
        //     path: `screenshots/ts-01-test2.png`,
        //     fullPage: true
        // });
    });

});
