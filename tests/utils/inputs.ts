import { Page, Locator } from '@playwright/test';

function getLocator(page: Page, selector: string): Locator {
  return page.locator(selector);
}

async function fill(page: Page, selector: string, value: string) {
  const locator = getLocator(page, selector);
  await locator.click();
  // Clear existing value first to ensure deterministic state
  await locator.fill('');
  await locator.fill(value);
}

export const inputs = {
  getLocator,
  fill,
};
