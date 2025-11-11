import { Locator, expect, Page } from '@playwright/test';
import { SortOrder } from '../../test-data/SortOrder';

export class CatalogPage {
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
        order: SortOrder) {
        let expectedList: T[] = [...values];
        switch (order) {
            case SortOrder.AZ:
                expectedList = [...values].sort((a: any, b: any) => a.localeCompare(b));
                break;
            case SortOrder.ZA:
                expectedList = [...values].sort((a: any, b: any) => b.localeCompare(a));
                break;
            case SortOrder.LOHI:
                expectedList = [...values].sort((a: any, b: any) => (a as unknown as number) - (b as unknown as number));
                break;
            case SortOrder.HILO:
                expectedList = [...values].sort((a: any, b: any) => (b as unknown as number) - (a as unknown as number));
                break;
            default:
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