import { BasePage } from "./BasePage";
export class LoginPage extends BasePage {
    constructor(page) {
        super (page);
        this.usernameInput = page.locator ('[data-test = "username"]');
        this.passwordInput = page.locator ('[data-test = "password"]');
        this.loginButton = page.locator ('[data-test = "login-button"]');
        this.errorMessage = page.locator ('[data-test = "error"]');
    }
    async open () {
        await this.NavigateTo ('/');
    }
    async login(username, password) {
        await this.usernameInput.fill (username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}