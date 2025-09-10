import { BasePage } from "./BasePage";
export class InventoryPage extends BasePage{
    constructor(page) {
        super(page);
        this.PageTitle = page.locator ('[data-test = "title"]');
        this.ShoppingCart = page.locator('[data-test = "shopping-cart-link"]');
        this.ItemsList = page.locator ('.inventory_item');
        this.AddToCartButton = page.locator('.btn.btn_primary.btn_small.btn_inventory ');
        this.ItemPrices = page.locator('.inventory_item_price');
        this.ItemNames = page.locator('.inventory_item_name');
    }
    async open () {
        await this.NavigateTo ('/inventory.html');
    }
    async addItemToCart (itemName) {
        await this.AddToCartButton.click();
    }
    async openCart() {
        await this.ShoppingCart.click();
    }
    async getPageTitle() {
        return await this.PageTitle.textContent();
    }
    async addMostExpensiveItem () {
        const prices = await this.ItemPrices.all();
        let maxPrice = 0;
        let maxIndex = 0;
        for(let i =0; i < prices.length; i++) {
            const priceText = await prices[i].textContent();
            const price = parseFloat(priceText.replace('$', ''));
            if (price > maxPrice) {
                maxPrice=price;
                maxIndex = i;
            }
        }
        const itemName = await this.ItemNames.nth(maxIndex).textContent();
        await this.AddToCartButton.nth(maxIndex).click();
        return {
            price: maxPrice,
            name: itemName
    };


}
}