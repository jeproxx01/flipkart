import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultPage } from '../pages/SearchResultPage';

test('Verify error message for non-existent product', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchResultPage = new SearchResultPage(page);

    await test.step('Step 1: Search for gibberish', async () => {
        await homePage.goto();
        await homePage.searchForProduct('#$%%^^^^&$%&');
    });

    await test.step('Step 2: ASSERT the "No Results" message is visible', async () => {
        // This will retry for 5 seconds automatically
        await expect(searchResultPage.noResultsMessage).toBeVisible({ timeout: 10000 });
        
        // Optional: Assert specific text if you want to be extra sure
        await expect(searchResultPage.noResultsMessage).toHaveText(/Sorry, no results found!/);
    });
});