import {test, expect} from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage} from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test ('@ui E2E-test for buying products', async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
   
    //await expect (inventoryPage.PageTitle).toBeVisible();
    //await expect (inventoryPage.PageTitle).toHaveText('Products');
    const title = await inventoryPage.getPageTitle ();
    await expect(title).toBe('Products');

    const addedItem = await inventoryPage.addMostExpensiveItem();
    await inventoryPage.openCart();
    await expect (cartPage.CartItemNames).toHaveText(addedItem.name);
    await cartPage.goToCheckout();
    await checkoutStepOnePage.fillUserInfo('john','doe','12345');
    await checkoutStepOnePage.ClickContinue();
    await checkoutStepTwoPage.finishCheckout();
    await expect (checkoutCompletePage.ThanksTitle).toHaveText('Thank you for your order!');
    await checkoutCompletePage.CompleteFinish();
   
});