import { test, expect } from '@playwright/test';


test('my first test', async ({ page }) => {
  await page.goto('https://google.ca');
  await expect(page).toHaveTitle('Google')
 
});