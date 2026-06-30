import {Locator, Page} from '@playwright/test';



export class ProductPage{

    private readonly addToCartBtn: Locator;
    private readonly loginTitle: Locator;
    
    constructor(private readonly page: Page){

    this.addToCartBtn = page.locator('._1psv1zeb9._1psv1ze0._1psv1zeku > div > div > div:nth-child(2)').first();
    this.loginTitle = page.getByText('Login', { exact: true }).first();
    
    }


    async addItemToCart() {
        await this.addToCartBtn.click()
    }

   async isLoginRequired(){

        return await this.loginTitle.isVisible();
    }

}


 