import { test, expect } from '@playwright/test';
import { LoginPage, ERROR_CONTAINER as LOGIN_ERROR, USERNAME as LOGIN_USERNAME, LOGIN_BUTTON_ROLE } from '../pages/loginPage';
import { InventoryPage, CART_BADGE, ADD_TO_CART, INVENTORY_CONTAINER } from '../pages/inventoryPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { MenuPage } from '../pages/menuPage';

// Critical: invalid login shows error
test('Login - invalid credentials show error', async ({ page }) => {
  await LoginPage.goto(page);
  await LoginPage.login(page, 'bad_user', 'bad_pass');
  const txt = await page.locator(LOGIN_ERROR).innerText();
  expect(txt.toLowerCase()).toContain('epic sadface: username and password do not match any user in this service');
});

// Critical: locked out user
test('Login - locked out user cannot login', async ({ page }) => {
  await LoginPage.goto(page);
  await LoginPage.login(page, 'locked_out_user', 'secret_sauce');
  const txt = await page.locator(LOGIN_ERROR).innerText();
  expect(txt.toLowerCase()).toContain('locked');
});

// Major: cart persistence across reload
test('Cart persists across reload', async ({ page }) => {
  await LoginPage.goto(page);
  await LoginPage.login(page);

  await InventoryPage.addToCart(page, 'sauce-labs-backpack');
  await InventoryPage.addToCart(page, 'sauce-labs-bike-light');

  // badge should show 2
  await expect(page.locator(CART_BADGE)).toHaveText('2');

  await page.reload();
  // still shows 2
  await expect(page.locator(CART_BADGE)).toHaveText('2');
});

// Edge: rapid add/remove operations should leave consistent state
test('Rapid add/remove items maintains consistent state', async ({ page }) => {
  await LoginPage.goto(page);
  await LoginPage.login(page);

  // rapidly add and remove
  for (let i = 0; i < 3; i++) {
    await InventoryPage.addToCart(page, 'sauce-labs-backpack');
    await InventoryPage.removeFromCart(page, 'sauce-labs-backpack');
  }

  // ensure button is Add to cart (no leftover "Remove")
  const addBtn = page.locator(ADD_TO_CART('sauce-labs-backpack'));
  await expect(addBtn).toBeVisible();
});

// Edge: keyboard navigation and submit via Enter
test('Keyboard navigation - login form submits with Enter', async ({ page }) => {
  await LoginPage.goto(page);
  const username = page.locator(LOGIN_USERNAME);
  await username.click();
  await username.fill('standard_user');
  await page.keyboard.press('Tab'); // to password
  await page.keyboard.type('secret_sauce');
  await page.keyboard.press('Enter');
  // inventory should be visible
  await expect(page.locator(INVENTORY_CONTAINER)).toBeVisible();
});

// Checkout validation: missing first name / last name / postal code
test('Checkout validation - missing first name shows error', async ({ page }) => {
  await LoginPage.goto(page);
  await LoginPage.login(page);
  await InventoryPage.addToCart(page, 'sauce-labs-backpack');
  await InventoryPage.openCart(page);

  await CheckoutPage.startCheckout(page);
  await CheckoutPage.fillInformation(page, '', 'Last', '12345');
  await CheckoutPage.continue(page);
  const err = (await CheckoutPage.getErrorText(page)).toLowerCase();
  expect(err).toContain('error');
});

// Logout clears session
test('Logout clears session', async ({ page }) => {
  await LoginPage.goto(page);
  await LoginPage.login(page);
  await MenuPage.openMenu(page);
  await MenuPage.logout(page);

  // try to open inventory url directly
  await page.goto('https://www.saucedemo.com/inventory.html');
  // should show login form
  await expect(page.locator(LOGIN_BUTTON_ROLE)).toBeVisible();
});
