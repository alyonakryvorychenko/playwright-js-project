import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { CatalogPage } from '../src/pages/CatalogPage';
import { SortOrder } from '../test-data/SortOrder';
import dotenv from 'dotenv';
dotenv.config();

let loginPage: LoginPage;
let catalogPage: CatalogPage;

const validUsername = process.env.TEST_USER_NAME!;
const validPassword = process.env.TEST_USER_PASSWORD!;

const urlExpect = process.env.BASE_URL +'inventory.html';

test.describe('Product Catalog test', () => {

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        catalogPage = new CatalogPage(page);
    });

    test('Filter catalog list by ZA', async ({ page }) => {
         await loginPage.goto();
         await loginPage.login(validUsername, validPassword);
         await expect(page).toHaveURL(urlExpect);
         await catalogPage.chooseSortOption(SortOrder.ZA);
         await catalogPage.checkSortByName(SortOrder.ZA);
    });

      test('Filter catalog list AZ', async ({ page }) => {
         await loginPage.goto();
         await loginPage.login(validUsername, validPassword);
         await expect(page).toHaveURL(urlExpect);
         await catalogPage.chooseSortOption(SortOrder.AZ);
         await catalogPage.checkSortByName(SortOrder.AZ);
    });

      test('Filter Price to low to high', async ({ page }) => {
         await loginPage.goto();
         await loginPage.login(validUsername, validPassword);
         await expect(page).toHaveURL(urlExpect);
         await catalogPage.chooseSortOption(SortOrder.LOHI);
        await catalogPage.checkSortByPrice(SortOrder.LOHI);
    });
        test('Filter Price to high to low', async ({ page }) => {
         await loginPage.goto();
         await loginPage.login(validUsername, validPassword);
         await expect(page).toHaveURL(urlExpect);
         await catalogPage.chooseSortOption(SortOrder.HILO);
           await catalogPage.checkSortByPrice(SortOrder.HILO);
    });
})