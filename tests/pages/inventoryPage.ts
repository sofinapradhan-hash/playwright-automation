import { Page } from '@playwright/test';
import { buttons } from '../utils/buttons';

// Inventory-specific selectors
export const ADD_TO_CART = (itemId: string) => `[data-test="add-to-cart-${itemId}"]`;
export const REMOVE_FROM_CART = (itemId: string) => `[data-test="remove-${itemId}"]`;
export const CART_LINK = '[data-test="shopping-cart-link"]';
export const CART_BADGE = '.shopping_cart_badge';
export const INVENTORY_CONTAINER = '.inventory_container';

export class InventoryPage {
  static async addToCart(page: Page, itemId: string) {
    await buttons.click(page, ADD_TO_CART(itemId));
  }

  static async addMultiple(page: Page, itemIds: string[]) {
    for (const id of itemIds) {
      await this.addToCart(page, id);
    }
  }

  static async openCart(page: Page) {
    await buttons.click(page, CART_LINK);
  }

  static async removeFromCart(page: Page, itemId: string) {
    await buttons.click(page, REMOVE_FROM_CART(itemId));
  }
}
