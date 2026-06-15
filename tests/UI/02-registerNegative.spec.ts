import { test, expect } from '@playwright/test';
import userData from '../../test-data/User.json';

test.describe('TS-02 Registration Negative Scenarios', () => {

    test('Required Fields Empty', async ({ page }) => {
        await page.goto(userData.registerUser.url);
        await page.getByRole('link', { name: 'Register' }).click();
        await page.getByRole('button', { name: 'Register' }).click();

        await expect(page.locator('body')).toContainText('First name is required');
        await expect(page.locator('body')).toContainText('Last name is required');
        await expect(page.locator('body')).toContainText('Username is required');

        // await page.screenshot({ path: `screenshots/ts-02-test1.png`, fullPage: true });
    });

    test('Password Mismatch Check', async ({ page }) => {
        const username = `Aaru${Date.now()}`;
        await page.goto(userData.registerUser.url);
        await page.getByRole('link', { name: 'Register' }).click();
        await page.locator('#customer\\.firstName').fill(userData.registerUser.firstName);
        await page.locator('#customer\\.lastName').fill(userData.registerUser.lastName);
        await page.locator('#customer\\.address\\.street').fill(userData.registerUser.street);
        await page.locator('#customer\\.address\\.city').fill(userData.registerUser.city);
        await page.locator('#customer\\.address\\.state').fill(userData.registerUser.state);
        await page.locator('#customer\\.address\\.zipCode').fill(userData.registerUser.zipCode);
        await page.locator('#customer\\.phoneNumber').fill(userData.registerUser.phoneNumber);
        await page.locator('#customer\\.ssn').fill(userData.registerUser.ssn);
        await page.locator('#customer\\.username').fill(username);
        await page.locator('#customer\\.password').fill(userData.invalidUser.password);
        await page.locator('#repeatedPassword').fill(userData.invalidUser.confirmPassword);
        await page.getByRole('button', { name: 'Register' }).click();

        await expect(page.locator('body')).toContainText('Passwords did not match');

        // await page.screenshot({ path: `screenshots/ts-02-test2.png`, fullPage: true });
    });

    test('Duplicate Username Rejected', async ({ page }) => {
        await page.goto(userData.registerUser.url);
        await page.getByRole('link', { name: 'Register' }).click();
        await page.locator('#customer\\.firstName').fill(userData.registerUser.firstName);
        await page.locator('#customer\\.lastName').fill(userData.registerUser.lastName);
        await page.locator('#customer\\.address\\.street').fill(userData.registerUser.street);
        await page.locator('#customer\\.address\\.city').fill(userData.registerUser.city);
        await page.locator('#customer\\.address\\.state').fill(userData.registerUser.state);
        await page.locator('#customer\\.address\\.zipCode').fill(userData.registerUser.zipCode);
        await page.locator('#customer\\.phoneNumber').fill(userData.registerUser.phoneNumber);
        await page.locator('#customer\\.ssn').fill(userData.registerUser.ssn);
        await page.locator('#customer\\.username').fill(userData.invalidUser.duplicateUsername);
        await page.locator('#customer\\.password').fill(userData.registerUser.password);
        await page.locator('#repeatedPassword').fill(userData.registerUser.password);
        await page.getByRole('button', { name: 'Register' }).click();

        await expect(page.locator('body')).toContainText('This username already exists');

        // await page.screenshot({ path: `screenshots/ts-02-test3.png`, fullPage: true });
    });

});
