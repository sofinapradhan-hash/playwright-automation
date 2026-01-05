import { test, expect } from '@playwright/test';
import { onLoginPage } from '../pages/loginPage';
import { onInventoryPage } from '../pages/inventoryPage';
import { onCheckoutPage } from '../pages/checkoutPage';
import { onMenuPage } from '../pages/menuPage';

// E2E: happy path — login, add items, remove one, checkout, confirm, logout
test('E2E - add/remove items and complete checkout', async ({ page }) => {
  await onLoginPage.goto(page);
  await onLoginPage.login(page);

  await onInventoryPage.addMultiple(page, [
    'sauce-labs-backpack',
    'sauce-labs-fleece-jacket',
    'sauce-labs-bike-light',
  ]);

  await onInventoryPage.openCart(page);
  await onInventoryPage.removeFromCart(page, 'sauce-labs-backpack');

  await onCheckoutPage.startCheckout(page);
  await onCheckoutPage.fillInformation(page, 'Test', 'User', '12345');
  await onCheckoutPage.continue(page);
  await onCheckoutPage.finish(page);

  const confirmation = await onCheckoutPage.getConfirmationText(page);
  expect(confirmation).toContain('Thank you for your order!');

  await onMenuPage.openMenu(page);
  await onMenuPage.logout(page);
});

// Negative: missing postal code should show an error
test('Checkout validation - missing postal code shows error', async ({ page }) => {
  await onLoginPage.goto(page);
  await onLoginPage.login(page);

  await onInventoryPage.addToCart(page, 'sauce-labs-backpack');
  await onInventoryPage.openCart(page);

  await onCheckoutPage.startCheckout(page);
  await onCheckoutPage.fillInformation(page, 'First', 'Last', ''); // missing postal
  await onCheckoutPage.continue(page);

  const error = await onCheckoutPage.getErrorText(page);
  expect(error.toLowerCase()).toContain('error');
});