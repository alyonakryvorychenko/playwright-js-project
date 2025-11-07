import { Locator, expect, Page } from '@playwright/test'

export class CheckoutPage {
    readonly page: Page;
    readonly addToCartBt: Locator;
    readonly shoppingCart: Locator;
    readonly checkoutBt: Locator;
    readonly checkoutInfFirstName: Locator;
    readonly checkoutInfLastName: Locator;
    readonly checkoutInfZipPostalCode: Locator;
    readonly continueBt: Locator;
    readonly finishBt: Locator;
    readonly titleCheckout: Locator;
    readonly completeHeader: Locator;
    readonly removeItemBt: Locator;
    readonly shoppingCartBadge: Locator;
    readonly productInfoName: Locator;
    readonly productInfoPrice: Locator
    readonly productInfoDescription: Locator;
    readonly checkoutBt: Locator;



    constructor(page: Page) {
        this.page = page;
        this.addToCartBt = page.locator('#add-to-cart');
        this.shoppingCart = page.locator('#shopping_cart_container');
        this.checkoutBt = page.locator('#checkout')
        this.checkoutInfFirstName = page.getByPlaceholder('First Name');
        this.checkoutInfLastName = page.getByPlaceholder('Last Name');
        this.checkoutInfZipPostalCode = page.locator('#postal-code');
        this.continueBt = page.locator('#continue');
        this.finishBt = page.locator('#finish');
        this.titleCheckout = page.locator('.title');
        this.completeHeader = page.locator('.complete-header');
        this.removeItemBt = page.locator('#remove');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.productInfoName = page.locator('[data-test="inventory-item-name"]');
        this.productInfoPrice = page.locator('[data-test="inventory-item-price"]');
        this.productInfoDescription = page.locator('[data-test="inventory-item-desc"]');
        this.checkoutBt = page.locator('#checkout');

    }

    async addProductToCart() {
        await this.addToCartBt.click();
        expect(this.removeItemBt).toHaveText('Remove');
        expect(this.shoppingCartBadge).toHaveText('1');
    }

    async productInfoCart() {
        const name = await this.productInfoName.first().innerText();
        const description = await this.productInfoDescription.first().innerText();
        const price = await this.productInfoPrice.first().innerText();
        return { name, description, price };
    }

    async openCart() {
        await this.shoppingCart.click();
        expect(this.titleCheckout).toHaveText('Your Cart');
    }


    async fillCustomInfo() {
        await this.checkoutBt.click();
        expect(this.titleCheckout).toHaveText('Checkout: Your Information');
        await this.checkoutInfFirstName.fill('John');
        await this.checkoutInfLastName.fill('Doe');
        await this.checkoutInfZipPostalCode.fill('12345');
        await this.continueBt.click();
    }

    async finishCheckout() {
        expect(this.titleCheckout).toHaveText('Checkout: Overview');
        await this.finishBt.click();
        expect(this.completeHeader).toHaveText('Thank you for your order!');
    }
}