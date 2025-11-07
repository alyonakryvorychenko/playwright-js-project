import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { CatalogPage } from '../src/pages/CatalogPage';
import dotenv from 'dotenv';
dotenv.config();

let loginPage: LoginPage;
let catalogPage: CatalogPage;

const validUsername = process.env.TEST_USER_NAME!;
const validPassword = process.env.TEST_USER_PASSWORD!;

test.describe('Product Catalog test', () => {

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        catalogPage = new CatalogPage(page);
    });

    test('Filter catalog list by ZA', async ({ page }) => {
         await loginPage.goto();
         await loginPage.login(validUsername, validPassword);
         await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
         await catalogPage.chooseSortOption('za');
         await catalogPage.checkSortByName('za');
    });

      test('Filter catalog list AZ', async ({ page }) => {
         await loginPage.goto();
         await loginPage.login(validUsername, validPassword);
         await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
         await catalogPage.chooseSortOption('az');
         await catalogPage.checkSortByName('az');
    });

      test('Filter Price to low to high', async ({ page }) => {
         await loginPage.goto();
         await loginPage.login(validUsername, validPassword);
         await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
         await catalogPage.chooseSortOption('lohi');
        await catalogPage.checkSortByPrice('lohi');
    });
        test('Filter Price to high to low', async ({ page }) => {
         await loginPage.goto();
         await loginPage.login(validUsername, validPassword);
         await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
         await catalogPage.chooseSortOption('hilo');
           await catalogPage.checkSortByPrice('hilo');
    });
})