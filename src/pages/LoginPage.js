import { Page, expect, Locator } from '@playwright/test';

export class LoginpPage {

    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        
    }

    async goto() {
        await this.page.goto(process.env.BASE_URL || 'https://www.saucedemo.com/');
        await expect(this.page).toHaveTitle('Swag Labs');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}