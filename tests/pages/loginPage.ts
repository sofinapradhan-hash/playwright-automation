import { Page } from '@playwright/test';
import { inputs } from '../utils/inputs';
import { buttons } from '../utils/buttons';

// Login-specific selectors
export const SAUCEDEMO_URL = 'https://www.saucedemo.com/';
export const USERNAME = '[data-test="username"]';
export const PASSWORD = '[data-test="password"]';
export const LOGIN_BUTTON = '[data-test="login-button"]';
export const ERROR_CONTAINER = '.error-message-container';
export const LOGIN_BUTTON_ROLE = '[data-test="login-button"]';

export class LoginPage {
   async goto(page: Page) {
    await page.goto(SAUCEDEMO_URL);
  }

 async login(page: Page, username = 'standard_user', password = 'secret_sauce') {
    await inputs.fill(page, USERNAME, username);
    await inputs.fill(page, PASSWORD, password);
    await buttons.click(page, LOGIN_BUTTON);
  }
}
export const onLoginPage = new LoginPage()
