import { Page, expect, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly logout: Locator;
    readonly menuButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('.error-message-container');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logout = page.locator('#logout_sidebar_link');
        
    }

    async goto(){
        await this.page.goto(process.env.BASE_URL || 'https://www.saucedemo.com/');
        // await expect(this.page).toHaveTitle('Swag Labs');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessageText(errorMessageTest: string) {
        const errorMessage =  await this.errorMessage.textContent();
        expect(errorMessage).toEqual(errorMessageTest);
    }

    async clickMenuLink (link: Locator){
       await this.menuButton.click();
       await link.click();
       await expect(this.page).toHaveURL('https://www.saucedemo.com/');
    }

}