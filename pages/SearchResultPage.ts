import {Page, Locator, expect} from '@playwright/test';
import { BasePage} from './BasePage';


export class SearchResultPage extends BasePage{

    private readonly firstProduct: Locator;
    private readonly secondProduct: Locator;
    private readonly lowToHigh: Locator;

    constructor(page: Page){

        super(page)
        this.firstProduct = page.getByRole('link', { name: 'Enshine Advance Clean Toothbrush with Ultra Soft Bristl...' })
        this.lowToHigh = page.getByText('Price -- Low to High');
        this.secondProduct = page.getByRole('link', { name: 'NIKE COURT ROYALE 2 NN' }).first();
    }



    async selectBrandName(brand: string = 'NIKE') {
        
        
        const brandSearchInput= this.page.getByPlaceholder('Search Brand');
        await brandSearchInput.fill(brand)
        await brandSearchInput.waitFor();

        const checkbox = this.page.getByText(brand, {exact: true}).first();
        
        // 2. Perform click and navigation wait together to avoid race conditions
        await Promise.all([
            // Flipkart URLs usually update to include the brand name
            this.page.waitForURL(new RegExp(brand.toLowerCase(), 'i')),
            checkbox.click()
        ]);

    }

    async selectSort(){
        const currentUrl = this.page.url()
        await this.lowToHigh.click()

        await this.page.waitForFunction((oldUrl) => window.location.href !== oldUrl, currentUrl);

        const prices = await this.page.locator('.hZ3P6w').allTextContents();
        console.log('Prices:', prices);
    }


    async selectFirstProduct(){


        const [newTab] = await Promise.all([

            this.page.context().waitForEvent('page'),
            this.firstProduct.click()
        ])
        await newTab.waitForLoadState();
        return newTab;
    }

        

}