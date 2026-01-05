import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { MenuPage } from '../pages/menuPage';

test('user can add/remove items and logout', async ({ page }) => {
  await LoginPage.goto(page);
  await LoginPage.login(page);

  // add items and manage the cart via InventoryPage
  await InventoryPage.addMultiple(page, [
    'sauce-labs-backpack',
    'sauce-labs-fleece-jacket',
    'sauce-labs-bike-light',
  ]);

  // view cart and remove an item
  await InventoryPage.openCart(page);
  await InventoryPage.removeFromCart(page, 'sauce-labs-backpack');

  // proceed to checkout and then logout via menu
  await CheckoutPage.checkout(page);

  await MenuPage.openMenu(page);
  await MenuPage.logout(page);
});