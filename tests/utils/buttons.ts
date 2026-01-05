import { Page, RoleOptions } from '@playwright/test';

// Minimal button helpers — tests should call selectors directly for specific actions
async function click(page: Page, selector: string) {
  await page.locator(selector).click();
}

async function clickRole(page: Page, role: string, options?: RoleOptions) {
  await page.getByRole(role as any, options).click();
}

export const buttons = {
  click,
  clickRole,
};
