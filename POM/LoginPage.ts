import { Page, expect } from '@playwright/test';
import { RegisterPage } from './Registerpage';

export class LoginPage {
    constructor(private page: Page) {}

    async login(username: string, password: string) {
        await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await this.page.locator('input[name="username"]').fill(username);
        await this.page.locator('input[name="password"]').fill(password);
        await this.page.getByRole('button', { name: 'Log In' }).click();
    }

    async loginOrRegister(userData: any) {
        await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await this.page.locator('input[name="username"]').fill(userData.loginUser.username);
        await this.page.locator('input[name="password"]').fill(userData.loginUser.password);
        await this.page.getByRole('button', { name: 'Log In' }).click();

        let loginSuccess = false;
        try {
            await expect(this.page.getByRole('link', { name: 'Log Out' })).toBeVisible({ timeout: 10000 });
            loginSuccess = true;
        } catch {
            loginSuccess = false;
        }

        if (!loginSuccess) {
            // DB was reset — register fresh and auto-login
            const registerPage = new RegisterPage(this.page);
            await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
            await registerPage.registerUser(userData.registerUser, userData.loginUser.username);
        }
    }
}
