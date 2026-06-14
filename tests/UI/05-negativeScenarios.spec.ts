import { test, expect } from '@playwright/test';
import userData from '../../test-data/User.json';

test.describe('TS-10 Session Access Scenarios', () => {

    test('Access Without Login', async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/transfer.htm');
        // ParaBank requires authentication — login form must be visible
        await expect(page.locator('input[name="username"]')).toBeVisible();

        // await page.screenshot({
        //     path: `screenshots/ts-10-test1.png`,
        //     fullPage: true
        // });
    });

    test('Login Wrong Credentials', async ({ page }) => {
        await page.goto(userData.registerUser.url);
        await page.locator('input[name="username"]').fill(`nouser${Date.now()}`);
        await page.locator('input[name="password"]').fill(`nopass${Date.now()}`);
        await page.getByRole('button', { name: 'Log In' }).click();

        await expect(page.locator('body')).toContainText('The username and password could not be verified.');

        // await page.screenshot({
        //     path: `screenshots/ts-10-test2.png`,
        //     fullPage: true
        // });
    });

});
