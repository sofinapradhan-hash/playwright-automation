# Sauce Demo — Manual Test Checklist ✅

Scope: https://www.saucedemo.com/ — basic e2e flows for login, inventory, cart, checkout, and logout.

Preconditions
- Use a clean browser profile (no cached session).
- Test accounts: `standard_user` / `secret_sauce` (valid). Use invalid creds for negative tests.

Test data
- Valid user: standard_user / secret_sauce
- Invalid user: bad_user / bad_pass
- Items to operate on: `sauce-labs-backpack`, `sauce-labs-fleece-jacket`, `sauce-labs-bike-light`

Checklist (step, expected result)
1. Open homepage
   - Step: Navigate to https://www.saucedemo.com/
   - Expect: Login form visible (username, password, login button)

2. Login (happy path)
   - Step: Enter valid creds and click Login
   - Expect: Inventory page loads; product list visible; no error message

3. Login (invalid creds)
   - Step: Enter invalid creds and click Login
   - Expect: Error message shown; user remains on login page

4. Add items to cart
   - Step: From inventory, click `Add to cart` on three different items
   - Expect: Cart badge updates (count increases), item buttons change to `Remove`

5. View cart & remove item
   - Step: Click cart icon; remove one item
   - Expect: Item removed from cart, cart count decremented, removed item absent from list

6. Proceed to Checkout
   - Step: From cart, click `Checkout` and fill required info (First name, Last name, Postal Code) → Continue → Finish
   - Expect: Checkout complete page / confirmation displayed; order summary present

7. Menu & Logout
   - Step: Open menu → click Logout
   - Expect: Redirected to login page; session cleared (cannot access inventory without login)

8. Negative / Edge cases
   - Step: Attempt checkout with missing postal code
   - Expect: Inline error or prevented continue
   - Step: Try to add an item when network is slow (simulate throttling)
   - Expect: UI handles gracefully (loading indicators, retryable state)

9. Accessibility & keyboard flows
   - Step: Tab through login and inventory controls
   - Expect: Focus order logical; all controls reachable and actionable via keyboard

Exploratory charters (10–15 min each)
- Cart edge cases: remove all items, change counts (if supported), persistence across navigation
- Profile/Session: Log in/out repeatedly, check session clearing and localStorage
- Flakiness: Rapidly add/remove items, network throttling, interrupt flows

Bug report template (use for any failing checks)
- Title: short summary
- Steps to reproduce: numbered steps
- Actual result: what happened
- Expected result: what should have happened
- Environment: OS / browser / Playwright version (if automated)
- Attachments: screenshots / console logs / HAR (if available)

Automation notes
- Use existing Page Objects: `LoginPage`, `InventoryPage`, `CheckoutPage`, `MenuPage`.
- Run automated suite: `npx playwright test` (add script: `"test": "playwright test"` to `package.json`).

Evidence capture
- Take a screenshot at each major step that fails.
- Copy console logs and Playwright trace (if running automated tests).

Pass criteria
- All critical flows (login → add → remove → checkout → logout) behave as expected with no blocking issues.

Contact/owner: QA lead or developer owning test scaffolding for follow up.
