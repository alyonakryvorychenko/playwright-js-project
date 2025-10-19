import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import dotenv from 'dotenv';
dotenv.config();

const validUsername = process.env.TEST_USER_NAME!;
const validPassword = process.env.TEST_USER_PASSWORD!;
const errorMessageEmptyUsername = 'Epic sadface: Username is required'
const errorMessageWrongUsernamePassword = 'Epic sadface: Username and password do not match any user in this service'

let loginPage: LoginPage;

test.describe('Login page tests', () => {

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    });

    test('Login to the application with valid data', async ({page}) => {
        await loginPage.goto();
        await loginPage.login(validUsername, validPassword);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Login without username', async ({page}) => {
        await loginPage.goto();
        await loginPage.login('', validPassword);
        await loginPage.getErrorMessageText(errorMessageEmptyUsername);
    })

     test('Username and password do not match', async ({page}) => {
        await loginPage.goto();
        await loginPage.login('test', 'test');
        await loginPage.getErrorMessageText(errorMessageWrongUsernamePassword);
    })

     test('Logout option', async ({page}) => {
        await loginPage.goto();
        await loginPage.login(validUsername, validPassword);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await loginPage.clickMenuLink(loginPage.logout);
    });
});