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

## TC-04: Filter and Sort Functionality on Search Results Page (PLP)
**Priority:** High  
**Objective:** Verify that users can filter products by brand and sort them by price.

### Pre-conditions:
- Search results page is loaded (e.g., search for "Laptops").

### Test Steps:
1. Locate the filter panel on the left side of the page.
2. Select a specific brand filter (e.g., "HP").
3. Verify that the search results update.
4. Click on the "Price -- Low to High" option in the sort options bar at the top of the list.
5. Verify the order of prices in the list.

### Expected Results:
- Selecting the "HP" filter updates the list to show only HP laptops.
- Sorting by "Price -- Low to High" sorts the results dynamically in ascending order of price.
- Breadcrumbs and active filters indicate "HP" is applied.

---

## TC-05: Shopping Cart Management
**Priority:** Critical  
**Objective:** Verify that a user can add products to the cart, update quantity, and remove items.

### Pre-conditions:
- A product detail page (PDP) is open (e.g., Apple iPhone 15).

### Test Steps:
1. Click the "Add to Cart" button on the product page.
2. Observe navigation to the shopping cart page.
3. Locate the quantity selector and increase the quantity to 2.
4. Verify the total price updates.
5. Click the "Remove" button for the product.
6. Confirm removal in the confirmation modal.

### Expected Results:
- Clicking "Add to Cart" successfully adds the item and redirects the user to the cart page or shows the cart item count incremented.
- Increasing quantity updates the subtotal and total amount correctly.
- Removing the item successfully removes it from the cart, displaying a "Missing Cart items?" or "Your cart is empty" message.

---

## TC-06: Checkout Process & Address Selection
**Priority:** Critical  
**Objective:** Verify that a user can proceed to the checkout screen and selection/entry of delivery address.

### Pre-conditions:
- The user is logged in.
- At least one product is added to the cart.
- The cart page is open.

### Test Steps:
1. Click the "Place Order" button in the cart.
2. Observe the checkout stepper page.
3. Under the "Delivery Address" section, select an existing address or click "Add a new address" and fill in required fields (Name, Phone, Pincode, Locality, Address, City, State).
4. Click "Deliver Here" / "Save and Deliver Here".
5. Proceed to the Order Summary step and review details.
6. Click "Continue" to proceed to the Payment Options step.

### Expected Results:
- Clicking "Place Order" successfully opens the multi-step checkout flow.
- A new address can be added with all fields validated (e.g., pincode must be numbers).
- The order summary displays the correct items, quantities, and delivery charges.
- The user reaches the Payment screen showing various payment methods (UPI, Credit/Debit card, Netbanking, Cash on Delivery).

---

## TC-07: User Authentication & Negative Login Validation
**Priority:** High  
**Objective:** Verify that login fails with appropriate error messages when incorrect credentials are provided.

### Pre-conditions:
- Home page is open.
- The Login popup or page is accessible.

### Test Steps:
1. Click the "Login" button on the header.
2. Enter an invalid mobile number (e.g., less than 10 digits) or an invalid email format (e.g., "invalid_email@xyz").
3. Click "Request OTP" or submit.
4. Verify the validation error message.
5. Enter a valid but unregistered mobile number/email.
6. Observe the error behavior or verification requirement.

### Expected Results:
- Entering an invalid mobile number/email displays inline validation errors like "Please enter a valid Email ID/Mobile number".
- The system prevents proceeding to the OTP verification step for malformed inputs.

---

## TC-08: Zero Search Results Handling (Negative Test)
**Priority:** Medium  
**Objective:** Verify that searching for a non-existent or gibberish term displays a clear "no results found" message and suggestions.

### Pre-conditions:
- Browser is navigated to the home page.

### Test Steps:
1. Click on the search input field.
2. Enter a gibberish string (e.g., "xyzabc987654321").
3. Press `Enter` or click the search button.
4. Observe the results page.

### Expected Results:
- The page displays a "Sorry, no results found!" message or similar explanation.
- It displays suggestions to check spelling or try generic keywords.
- No product listings are shown on the page.

---

## How to Export this to PDF
You can use the following methods to convert this plan to PDF:
1. **VS Code**: Install the "Markdown PDF" extension and right-click -> `Markdown PDF: Export (pdf)`.
2. **Playwright Script**: Use the included `tests/export-pdf.spec.ts` (if available) to programmatically export.
3. **Browser**: Open this file in a Markdown viewer and use `Ctrl+P` -> `Save as PDF`.
