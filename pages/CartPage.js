import { BasePage } from "./BasePage";
export class CartPage extends BasePage {
    constructor (page) {
        super(page);
        this.CartItem = page.locator ('.cart_item');
        this.CheckOutButton = page.locator ('[data-test = "checkout"]');
        this.ContShoppingButton = page.locator('[data-test = "continue-shopping"]');
        this.CartItemNames = page.locator('.inventory_item_name');
        this.CartItemPrices = page.locator('.inventory_item_price');
    }
    async open() {
        await this.NavigateTo('/cart.html');
    }
    async goToCheckout() {
        await this.CheckOutButton.click();
    }
    async ItemsCount () {
        return await this.CartItem.count ();
    }
    async getAllItemNames () {
        return await this.CartItemNames.allTextContents();
    }
}