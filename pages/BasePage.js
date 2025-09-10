export class BasePage {
    constructor(page){
        this.page = page;
        this.baseUrl = 'https://www.saucedemo.com';
    }


async NavigateTo (path = '') {
    await this.page.goto (this.baseUrl + path);
}

async ShouldHaveUrl (path){
    await expect (this.page).toHaveURL (this.baseUrl + path);
}
}