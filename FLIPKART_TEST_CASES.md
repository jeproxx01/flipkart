# QA Test Case Document: Flipkart Web Application

**Project:** Flipkart E-commerce Testing  
**Version:** 1.0  
**URL:** https://www.flipkart.com/

---

## TC-01: Product Search Functionality
**Priority:** High  
**Objective:** Verify that a user can successfully search for a specific product and view the results.

### Pre-conditions:
- Browser is open and navigated to `https://www.flipkart.com/`.
- Login popup is closed (if it appears).

### Test Steps:
1. Locate the search input field at the top of the page.
2. Enter the text "iPhone 15" into the search field.
3. Click the search icon or press the `Enter` key.
4. Observe the results page.

### Expected Results:
- The search results page loads successfully.
- The page title contains "iPhone 15".
- Multiple "iPhone 15" products are listed with their price, rating, and images.

---

## TC-02: Home Page Navigation & UI Verification
**Priority:** Medium  
**Objective:** Verify that the main product categories are visible and accessible from the home page.

### Pre-conditions:
- Browser is open and navigated to `https://www.flipkart.com/`.

### Test Steps:
1. Scroll through the homepage.
2. Verify the presence of the main navigation menu/categories (e.g., Mobiles, Fashion, Electronics, Home & Kitchen).
3. Click on the "Mobiles" category.

### Expected Results:
- All primary categories are displayed with clear icons and text.
- Clicking "Mobiles" navigates the user to the dedicated Mobile phones section.

---

## TC-03: Product Detail View (Optional)
**Priority:** Medium  
**Objective:** Verify that clicking a product result opens its detailed description page.

### Pre-conditions:
- Search results for "iPhone 15" are displayed (TC-01).

### Test Steps:
1. Click on the first product title in the search results list.
2. Observe the new tab or page that opens.

### Expected Results:
- A new page (or tab) opens with the full product details.
- Product name, price, description, and "Add to Cart" / "Buy Now" buttons are visible.

---

## How to Export this to PDF
You can use the following methods to convert this plan to PDF:
1. **VS Code**: Install the "Markdown PDF" extension and right-click -> `Markdown PDF: Export (pdf)`.
2. **Playwright Script**: Use the included `tests/export-pdf.spec.ts` (if available) to programmatically export.
3. **Browser**: Open this file in a Markdown viewer and use `Ctrl+P` -> `Save as PDF`.
