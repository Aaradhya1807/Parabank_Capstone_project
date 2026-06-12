import { Page } from '@playwright/test';

export class RegisterPage {
    constructor(private page: Page) {}

    async registerUser(userData: any, username: string) {
        await this.page.getByRole('link', { name: 'Register' }).click();
        await this.page.locator('#customer\\.firstName').fill(userData.firstName);
        await this.page.locator('#customer\\.lastName').fill(userData.lastName);
        await this.page.locator('#customer\\.address\\.street').fill(userData.street);
        await this.page.locator('#customer\\.address\\.city').fill(userData.city);
        await this.page.locator('#customer\\.address\\.state').fill(userData.state);
        await this.page.locator('#customer\\.address\\.zipCode').fill(userData.zipCode);
        await this.page.locator('#customer\\.phoneNumber').fill(userData.phoneNumber);
        await this.page.locator('#customer\\.ssn').fill(userData.ssn);
        await this.page.locator('#customer\\.username').fill(username);
        await this.page.locator('#customer\\.password').fill(userData.password);
        await this.page.locator('#repeatedPassword').fill(userData.password);
        await this.page.getByRole('button', { name: 'Register' }).click();
    }
}
