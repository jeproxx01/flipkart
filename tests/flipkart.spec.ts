import {test} from '@playwright/test';
import { SearchResultPage } from '../pages/SearchResultPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';




test.describe('Flipkart E2E', () =>{

    
    test('Verify user can search and add Item to the cart', async({page}) =>{

        const homePage = new HomePage(page);
        const searchResultPage = new SearchResultPage(page);
        let productTab: any;
     
        await test.step('Step 1: Search for Product', async () => {
            await homePage.goto();
            await homePage.searchForProduct('Toothbrush');
        });

        await test.step('Step 2: Select Item and Switch Tab', async () =>{

            const newTab = await searchResultPage.selectFirstProduct();
            productTab = newTab;

        });

        await test.step('Step 3: Add to Cart & Handle Login Wall', async() =>{

            const productPage = new ProductPage(productTab);
            await productPage.addItemToCart();


            if(await productPage.isLoginRequired()){
                console.log('test Blocked by login Wall. Real Credentials required.');
                
            }
        });

            await test.step('Step 4: Verify Cart content', async () =>{

                const cartPage = new CartPage(productTab);
                await cartPage.verifyProductInCart('Toothbrush');                        
            });

    });

    test.only('Filter and Sort Functionality on Search Results Page', async ({page}) =>{


            const homePage = new HomePage(page);
            const searchResultPage = new SearchResultPage(page);

        await test.step('Step 1: Search For Product', async() => {

            await homePage.goto();
            await homePage.searchForProduct('Shoes');
            
        });

        await test.step('Step 2: Select Brand Filter',async() =>{

            await searchResultPage.selectBrandName();
            await searchResultPage.selectSort();


        });


    });





});

