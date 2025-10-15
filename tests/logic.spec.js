import { test, expect } from '@playwright/test';
import { LoginpPage } from '../src/pages/LoginPage';
import dotenv from 'dotenv';
dotenv.config();

const validUsername = process.env.TEST_USER_NAME;
const validPassword = process.env.TEST_USER_PASSWORD;

test.describe('Login page tests', () => {

    test('Login to the application with valid data', async ({ page }) => {
        const loginPage = new LoginpPage(page);
        await loginPage.goto();
        await loginPage.login(validUsername, validPassword);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});