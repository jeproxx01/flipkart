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

    async selectFootwearCategory(optionName: string){

        const footwearCategory = this.page.getByTitle('Footwear').first();
        await expect(footwearCategory).toBeVisible();

        const option = this.page.getByText(optionName, {exact: true});
        await option.click();

    }

    async selectBrandName(brand: string) {
        
        
        const brandSearchInput= this.page.getByPlaceholder('Search Brand');
        await expect(brandSearchInput).toBeVisible()
        await brandSearchInput.fill(brand)


        const checkbox = this.page.getByText(brand, {exact: true}).first();
        await expect(checkbox).toBeVisible();
        
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

    async selectSort(){

            const currentUrl = this.page.url()
            await this.lowToHigh.click()

            await this.page.waitForFunction((oldUrl) => window.location.href !== oldUrl, currentUrl);
            await expect(this.page).toHaveURL(/price_asc/);

            const prices = await this.page.locator('.hZ3P6w').allTextContents();
            console.log('Prices:', prices);
        }


}