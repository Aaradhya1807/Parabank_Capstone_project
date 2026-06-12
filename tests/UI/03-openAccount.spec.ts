import { test, expect } from '@playwright/test';
import { OpenAccountPage } from '../../POM/OpenAccountPage';
import { LoginPage } from '../../POM/LoginPage';
import userData from '../../test-data/User.json';

test.describe('TS-03 Successful Account Creation', () => {

    test('Create Savings Account', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const accountPage = new OpenAccountPage(page);
        await loginPage.loginOrRegister(userData);
        await accountPage.clickNewAccount();
        await accountPage.openSavings();

        await expect(page.locator('#rightPanel')).toContainText('Congratulations');

        // await page.screenshot({
        //     path: `screenshots/ts-03-test1.png`,
        //     fullPage: true
        // });
    });

    test('Create Checking Account', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const accountPage = new OpenAccountPage(page);
        await loginPage.loginOrRegister(userData);
        await accountPage.clickNewAccount();
        await accountPage.openChecking();

        await expect(page.locator('#rightPanel')).toContainText('Congratulations');

        // await page.screenshot({
        //     path: `screenshots/ts-03-test2.png`,
        //     fullPage: true
        // });
    });

    test('Verify Account Creation Message', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const accountPage = new OpenAccountPage(page);
        await loginPage.loginOrRegister(userData);
        await accountPage.clickNewAccount();
        await accountPage.openChecking();

        await expect(page.locator('#rightPanel')).toContainText('Congratulations');
        await expect(page.locator('#rightPanel')).toContainText('Your new account number');

        // await page.screenshot({
        //     path: `screenshots/ts-03-test3.png`,
        //     fullPage: true
        // });
    });

});
