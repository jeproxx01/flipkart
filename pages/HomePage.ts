import {Page, Locator} from '@playwright/test';
import { BasePage} from './BasePage';



export class HomePage extends BasePage {

    private readonly searchInput: Locator;
    private readonly closeLoginBtn: Locator;


    constructor(page: Page){

    super(page)

    this.searchInput = this.page.getByRole('textbox', { name: 'Search for products, brands and more' });
    this.closeLoginBtn = this.page.locator('span:has-text("✕"), button._2doB4z');

    }

    async goto(){

        await this.navigateTo('/');

        if(await this.closeLoginBtn.isVisible()){
            await this.closeLoginBtn.click(); 
        }
    }

    async searchForProduct(productName: string){

        await this.searchInput.fill(productName);
        await this.searchInput.press("Enter");     
    }


}