import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('Product Search Functionality', async ({ page }) => {
    
    const searchInput = page.getByPlaceholder('Search for Products, Brands and More');
    
    await searchInput.first().fill('iphone 15');
    await searchInput.first().press('Enter');

    await expect(page).toHaveTitle(/iphone 15/i);

    await expect(page.getByText('Apple iPhone 15', { exact: false }).first()).toBeVisible();
});

test('Home Page Navigation', async ({ page }) => {
    
    const categories = ['Mobiles', 'Fashion', 'Beauty', 'Electronics', 'Home'];
    for (const category of categories) {
        await expect(page.getByText(category, { exact: true }).first()).toBeVisible();
    }
});


test('Product Detail View', async ({ page, context }) => {
    // Pre-condition: Search results for "iPhone 15" are displayed (TC-01)
    const searchInput = page.getByPlaceholder('Search for Products, Brands and More');
    await searchInput.first().fill('iphone 15');
    await searchInput.first().press('Enter');
    await expect(page).toHaveTitle(/iphone 15/i);
    await expect(page.getByText('Apple iPhone 15', { exact: false }).first()).toBeVisible();

    // TC-03 Step 1 & 2: Click the product link and capture the newly opened tab.
    // Using a regex pattern for name is more robust than a hardcoded string.
    const pagePromise = context.waitForEvent('page');
    await page.getByRole('link', { name: /Apple iPhone 15/i }).first().click();
    const newPage = await pagePromise;
    
    // Wait for the new tab to load its content
    await newPage.waitForLoadState();

    // TC-03 Expected: Verify product name/details are visible in the new tab
    // We expect the product title (H1 heading) to be visible on the detail page.
    await expect(newPage.getByRole('heading', { level: 1 })).toBeVisible();

    // Since we are running against the live production website, the product may be out of stock.
    // We check if either the "Add to Cart" button is visible, OR the "Out of stock" indicator is visible.
    const addToCartButton = newPage.getByRole('button', { name: /Add to Cart/i });
    const outOfStockText = newPage.getByText(/Out of stock/i);

    // Check if it is out of stock and conditionally assert the buttons
    const isOutOfStock = await outOfStockText.first().isVisible();
    if (isOutOfStock) {
        // Log information and assert that the Out of stock state is correctly shown
        console.log('Product is currently out of stock; verifying Out of Stock display.');
        await expect(outOfStockText.first()).toBeVisible();
    } else {
        // Assert that the checkout/action buttons are visible
        await expect(addToCartButton).toBeVisible();
        await expect(newPage.getByRole('button', { name: /Buy Now/i })).toBeVisible();
    }
});
