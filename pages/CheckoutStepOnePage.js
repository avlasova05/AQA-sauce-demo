import { BasePage } from "./BasePage";
export class CheckoutStepOnePage extends BasePage {
    constructor(page) {
        super(page);
        this.firstName = page.locator('[data-test = "firstName"]');
        this.lastName = page.locator('[data-test = "lastName"]');
        this.postalCode = page.locator('[data-test = "postalCode"]');
        this.ContinueButton = page.locator('[data-test = "continue"]');
    }
    async open() {
        await this.NavigateTo('/checkout-step-one.html');
    }
    async fillUserInfo(firstName, lastName, postalCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }
    async ClickContinue() {
        await this.ContinueButton.click();
    }
}