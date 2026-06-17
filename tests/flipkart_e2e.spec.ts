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
    
    await expect(page.getByText('Mobiles', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Fashion', { exact: true }).first()).toBeVisible();
});

