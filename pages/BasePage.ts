import {Page, expect} from '@playwright/test'


export class BasePage{

    constructor(protected readonly page:Page ){}


    async navigateTo(path: string){

        await this.page.goto(path);
    }

    async wait(ms: number){
        await this.page.waitForTimeout(ms);
    }

        async expectPageTitle(title: string){
            await expect(this.page).toHaveTitle(title);
        }
}