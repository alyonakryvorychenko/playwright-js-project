import { LoginPage } from "../src/pages/LoginPage";
import { CatalogPage } from "../src/pages/CatalogPage";
import { CheckoutPage } from "../src/pages/CheckoutPage";
import { test, expect } from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config();

let loginPage: LoginPage;
let catalogPage: CatalogPage;
let checkoutPage: CheckoutPage;

const validUsername = process.env.TEST_USER_NAME!;
const validPassword = process.env.TEST_USER_PASSWORD!;

test.describe('Product Catalog test', () => {

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        catalogPage = new CatalogPage(page);
        checkoutPage = new CheckoutPage(page);
    });

    test('add product to cart, check data and complete checkout', async ({ page }) => {
        await loginPage.goto();
        await loginPage.login(validUsername, validPassword);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        const productInfoCatalog = await catalogPage.productInfoFirst();
        await catalogPage.openProductView();
        await checkoutPage.addProductToCart();
        await checkoutPage.openCart()
        const productInfoCart = await checkoutPage.getProductInfoCart();
        expect(productInfoCart).toEqual(productInfoCatalog);
        await checkoutPage.fillCustomInfo();
        await checkoutPage.finishCheckout()
    });

})

