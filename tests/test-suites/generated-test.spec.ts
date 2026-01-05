import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { MenuPage } from '../pages/menuPage';

// E2E: happy path — login, add items, remove one, checkout, confirm, logout
test('E2E - add/remove items and complete checkout', async ({ page }) => {
  await LoginPage.goto(page);
  await LoginPage.login(page);

  await InventoryPage.addMultiple(page, [
    'sauce-labs-backpack',
    'sauce-labs-fleece-jacket',
    'sauce-labs-bike-light',
  ]);

  await InventoryPage.openCart(page);
  await InventoryPage.removeFromCart(page, 'sauce-labs-backpack');

  await CheckoutPage.startCheckout(page);
  await CheckoutPage.fillInformation(page, 'Test', 'User', '12345');
  await CheckoutPage.continue(page);
  await CheckoutPage.finish(page);

  const confirmation = await CheckoutPage.getConfirmationText(page);
  expect(confirmation).toContain('Thank you for your order!');

  await MenuPage.openMenu(page);
  await MenuPage.logout(page);
});

// Negative: missing postal code should show an error
test('Checkout validation - missing postal code shows error', async ({ page }) => {
  await LoginPage.goto(page);
  await LoginPage.login(page);

  await InventoryPage.addToCart(page, 'sauce-labs-backpack');
  await InventoryPage.openCart(page);

  await CheckoutPage.startCheckout(page);
  await CheckoutPage.fillInformation(page, 'First', 'Last', ''); // missing postal
  await CheckoutPage.continue(page);

  const error = await CheckoutPage.getErrorText(page);
  expect(error.toLowerCase()).toContain('error');
});