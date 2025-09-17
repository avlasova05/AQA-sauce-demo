import {test, expect} from '@playwright/test';
import { defineConfig, devices } from '@playwright/test';
test ('@ui check the authorization on Sauce Demo', async ({page}) =>{
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await page.getByPlaceholder('Username').fill('standard_user');
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('.submit-button.btn_action').click();
    await expect (page).toHaveURL('https://www.saucedemo.com/inventory.html');


});
test ('@ui unsuccessful authorization on Sauce Demo', async({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('.submit-button.btn_action').click();
    await expect (page.locator('[data-test = "error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

