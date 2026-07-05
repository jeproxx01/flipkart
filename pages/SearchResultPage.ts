import {Page, Locator, expect} from '@playwright/test';
import { BasePage} from './BasePage';


export class SearchResultPage extends BasePage{

    private readonly firstProduct: Locator;
    private readonly lowToHigh: Locator;
    private readonly priceText: Locator

    constructor(page: Page){

        super(page)
        this.firstProduct = page.getByRole('link', { name: 'Enshine Advance Clean Toothbrush with Ultra Soft Bristl...' }).first();
        this.lowToHigh = page.getByText('Price -- Low to High');
        this.priceText = page.locator('.hZ3P6w');
    }


       async selectFootwearCategory(optionName: string){

        const footwearCategory = this.page.getByTitle('Footwear').first();
        await footwearCategory.waitFor({state: 'visible'});
    
             const option = this.page.getByText(optionName, {exact: true});
        await option.click();

       }


    async selectBrandName(brand: string ) {
        
        
        const brandSearchInput= this.page.getByPlaceholder('Search Brand');
        await brandSearchInput.waitFor({state: 'visible'});
        await brandSearchInput.fill(brand)


        const checkbox = this.page.getByText(brand, {exact: true}).first();
         await checkbox.waitFor({state: 'visible'});
        
        // 2. Perform click and navigation wait together to avoid race conditions
        await Promise.all([
            // Flipkart URLs usually update to include the brand name
            //this.page.waitForURL(new RegExp(brand.toLowerCase(), 'i')), //Flaky
            this.page.waitForResponse(response =>response.url().includes('/search') && response.status() === 200
            ),

            checkbox.click()
        ]);

    }

    async selectFirstProduct(){


        const [newTab] = await Promise.all([

            this.page.context().waitForEvent('page'),
            this.firstProduct.click()
        ])
        await newTab.waitForLoadState();
        return newTab;
    }

    async sortByLowtoHigh(){

            const currentUrl = this.page.url()
            await this.lowToHigh.click()

            await this.page.waitForFunction((oldUrl) => window.location.href !== oldUrl, currentUrl);
            //await expect(this.page).toHaveURL(/price_asc/);
             //await this.page.waitForURL(/.*sort=price_asc/, { waitUntil: 'networkidle' });
            await this.page.waitForLoadState('domcontentloaded');
        }


       async getAllPrices(): Promise<number[]> {
        
        const priceStrings = await this.priceText.allTextContents();
        
        // Clean the strings (remove ₹ and commas) and convert to numbers
        return priceStrings.map(price => 
            parseFloat(price.replace(/[^0-9.]/g, ''))
        );
    } 

}