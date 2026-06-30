import {expect, Locator, Page} from '@playwright/test';


export class CartPage{


    private readonly cartItem: Locator;


    constructor(private readonly page: Page){

        this.cartItem = this.page.getByText('Enshine Advance Clean').first();

    }
    async verifyProductInCart(expectedName: string){

        await expect(this.cartItem).toContainText(expectedName);

    }
}