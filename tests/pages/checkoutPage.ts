import { Page } from '@playwright/test';
import { buttons } from '../utils/buttons';
import { inputs } from '../utils/inputs';

// Checkout-specific selectors
export const CHECKOUT = '[data-test="checkout"]';
export const FIRST_NAME = '[data-test="firstName"]';
export const LAST_NAME = '[data-test="lastName"]';
export const POSTAL_CODE = '[data-test="postalCode"]';
export const CONTINUE_BUTTON = '[data-test="continue"]';
export const FINISH_BUTTON = '[data-test="finish"]';
export const ORDER_COMPLETE_HEADER = '.complete-header';
export const ERROR_CONTAINER = '.error-message-container';

export class CheckoutPage {
  // From cart: click checkout to go to information step
  async startCheckout(page: Page) {
    await buttons.click(page, CHECKOUT);
  }

  async fillInformation(page: Page, firstName: string, lastName: string, postalCode: string) {
    await inputs.fill(page, FIRST_NAME, firstName);
    await inputs.fill(page, LAST_NAME, lastName);
    await inputs.fill(page, POSTAL_CODE, postalCode);
  }

  async continue(page: Page) {
    await buttons.click(page, CONTINUE_BUTTON);
  }

  async finish(page: Page) {
    await buttons.click(page, FINISH_BUTTON);
  }

  async getConfirmationText(page: Page): Promise<string> {
    return page.locator(ORDER_COMPLETE_HEADER).innerText();
  }

  async getErrorText(page: Page): Promise<string> {
    return page.locator(ERROR_CONTAINER).innerText();
  }
}

export const onCheckoutPage = new CheckoutPage();