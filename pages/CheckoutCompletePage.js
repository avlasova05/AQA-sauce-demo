import { BasePage } from "./BasePage";
export class CheckoutCompletePage extends BasePage {
    constructor(page) {
        super(page);
        this.ThanksTitle = page.locator('.complete-header');
        this.BackHomeButton = page.locator('[data-test = "back-to-products"]');
    }
    async open() {
        await this.NavigateTo('/checkout-complete.html');
    }
    async CompleteFinish() {
        await this.BackHomeButton.click();
    }
}