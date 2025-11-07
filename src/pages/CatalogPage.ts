import { Locator, expect, Page } from '@playwright/test'

export class CatalogPage {
    // readonly page: Page;
    readonly productSort: Locator;
    readonly sortItemsLocators: Locator;
    readonly productPrices: Locator;
    readonly productName: Locator;
    readonly headerTitle: Locator;
    readonly productInfoName: Locator;
    readonly productInfoDescription: Locator;
    readonly productInfoPrice: Locator;


    constructor(page: Page) {
        this.productSort = page.locator('.product_sort_container');
        this.sortItemsLocators = page.locator('.product_sort_container option');
        this.productPrices = page.locator('.inventory_item_price');
        this.productName = page.locator('.inventory_item_name');
        this.headerTitle = page.locator('.header_secondary_container');
        this.productInfoName = page.locator('.inventory_item_name ');
        this.productInfoPrice = page.locator('.inventory_item_price');
        this.productInfoDescription = page.locator('.inventory_item_desc');
    }

    async chooseSortOption(filterOption: string) {
        await this.productSort.selectOption(filterOption);
        await expect(this.productSort).toHaveValue(filterOption);
    }

    async putProductInfoInArray(locator: Locator) {
        const texts = await locator.allInnerTexts();
        return texts.map(t => t.trim());
    }

    async checkSortElements<T>(
        values: T[],
        order: 'az' | 'za' | 'lohi' | 'hilo') {
        let expectedList: T[];
        switch (order) {
            case 'az':
                expectedList = [...values].sort((a: any, b: any) => a.localeCompare(b));
                break;
            case 'za':
                expectedList = [...values].sort((a: any, b: any) => b.localeCompare(a));
                break;
            case 'lohi':
                expectedList = [...values].sort((a: any, b: any) => a - b);
                break;
            case 'hilo':
                expectedList = [...values].sort((a: any, b: any) => b - a);
                break;
        }
        console.log('Current List:', values);
        console.log('Expected List:', expectedList);
        expect(values).toEqual(expectedList);
    }

    async checkSortByName(order: 'az' | 'za') {
        const names = await this.putProductInfoInArray(this.productName);
        await this.checkSortElements(names, order);
    }

    async checkSortByPrice(order: 'lohi' | 'hilo') {
        const prices = await this.putProductInfoInArray(this.productPrices);
        const priceNumbers = prices.map(price => parseFloat(price.replace('$', '')));
        await this.checkSortElements(priceNumbers, order);
    }

    async productInfoFirst() {
        const name = await this.productInfoName.first().innerText();
        const description = await this.productInfoDescription.first().innerText();
        const price = await this.productInfoPrice.first().innerText();
        return {name, description, price};
    }
    async openProductView() {
        await this.productName.first().click();
        await expect(this.headerTitle).toHaveText('Back to products');
    }

}