import {Page, Locator} from '@playwright/test';
import { BasePage} from './BasePage';


export class SearchResultPage extends BasePage{

    private readonly firstProduct: Locator;

    constructor(page: Page){

        super(page)
        this.firstProduct = page.getByRole('link', { name: 'Enshine Advance Clean Toothbrush with Ultra Soft Bristl...' })

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