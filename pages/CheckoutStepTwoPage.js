import { BasePage } from "./BasePage";
export class CheckoutStepTwoPage extends BasePage {
    constructor(page) {
        super(page);
        this.orderInfo = page.locator('.summary_info');
        this.total = page.locator('[data-test = "total-label"]');
        this.finishButton = page.locator('[data-test = "finish"]');
    }
    async open() {
        await this.NavigateTo('/checkout-step-two.html');
    }
    async finishCheckout() {
        await this.finishButton.click();
    }
}