import { chromium } from '@playwright/test';
import { RegisterPage } from './POM/Registerpage';
import * as fs from 'fs';

async function globalSetup() {
    const userData = JSON.parse(fs.readFileSync('test-data/User.json', 'utf-8'));

    const newUsername = `Aaru${Date.now()}`;
    userData.loginUser.username = newUsername;
    userData.registerUser.password = userData.loginUser.password;

    const browser = await chromium.launch();
    const page = await browser.newPage();
    const registerPage = new RegisterPage(page);

    await page.goto(userData.registerUser.url);
    await registerPage.registerUser(userData.registerUser, newUsername);

    fs.writeFileSync('test-data/User.json', JSON.stringify(userData, null, 2), 'utf-8');

    await browser.close();
}

export default globalSetup;
