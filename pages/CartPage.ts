import {expect, Locator, Page} from '@playwright/test';


export class CartPage{


    private readonly cartItem: Locator;


    constructor(private readonly page: Page){

        this.cartItem = this.page.locator("//div[@class='css-g5y9jx r-14lw9ot']");

    }
    async verifyProductInCart(expectedName: string){

        await expect(this.cartItem).toContainText(expectedName);

    }
}