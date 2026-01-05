import { Page } from '@playwright/test';
import { buttons } from '../utils/buttons';

export const MENU_ROLE_NAME = 'Open Menu';
export const LOGOUT = '[data-test="logout-sidebar-link"]';

export class MenuPage {
  static async openMenu(page: Page) {
    await buttons.clickRole(page, 'button', { name: MENU_ROLE_NAME });
  }

  static async logout(page: Page) {
    await buttons.click(page, LOGOUT);
  }
}
