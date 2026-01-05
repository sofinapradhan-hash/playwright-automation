import { test, expect } from '@playwright/test';
import { onLoginPage } from '../pages/loginPage';
import { onInventoryPage } from '../pages/inventoryPage';
import { onCheckoutPage } from '../pages/checkoutPage';
import { onMenuPage } from '../pages/menuPage';

test('user can add/remove items and logout', async ({ page }) => {
  await onLoginPage.goto(page);
  await onLoginPage.login(page);

  // add items and manage the cart via InventoryPage
  await onInventoryPage.addMultiple(page, [
    'sauce-labs-backpack',
    'sauce-labs-fleece-jacket',
    'sauce-labs-bike-light',
  ]);

  // view cart and remove an item
  await onInventoryPage.openCart(page);
  await onInventoryPage.removeFromCart(page, 'sauce-labs-backpack');

  // proceed to checkout and then logout via menu
  //await CheckoutPage.checkout(page);

  await onMenuPage.openMenu(page);
  await onMenuPage.logout(page);
});