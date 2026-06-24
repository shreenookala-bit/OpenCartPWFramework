import { Locator, Page } from "@playwright/test";
export class Basepage{
    protected readonly page: Page;

    //common locator across the page
    protected readonly logo:Locator;
    protected readonly searchbox:Locator;
    protected readonly searchIcon:Locator;
    protected readonly footerLinks:Locator;
    protected readonly currency:Locator;
    protected readonly cartButton:Locator;

    constructor(page: Page){
        this.page=page;
        this.logo=page.getByAltText('naveenopencart');
        this.searchbox=page.getByPlaceholder('Search');
        this.searchIcon=page.locator('div#search button');
        this.footerLinks=page.locator('footer a');
        this.currency=page.locator('#form-currency');
        this.cartButton=page.locator('div#cart button');
    };

    //common locator/functionalities/action
    async islogoVisible(): Promise<boolean> {
        return await this.logo.isVisible();
    }
    async isSearchBoxVisible():Promise<boolean> {
        return await this.searchbox.isVisible();
    }
    async isFootersCount():Promise<number> {
       return await this.footerLinks.count();
    }
    async isFooters():Promise<string[]> {
       return await this.footerLinks.allInnerTexts();
    }
    async isCurrencyVisible():Promise<boolean> {
       return await this.currency.isVisible();
    }
    async isCartButtonVisible():Promise<boolean> {
       return await this.cartButton.isVisible()
    }

    // page level generic method
    async getPageTitle():Promise<string>{
       return await this.page.title();
    }
     getCurrenttitle():string {
        return this.page.url();
    }
    async waitforPageLoad() {
        await this.page.waitForLoadState('load');
    }
    async takeScreenshot(name:string){
        await this.page.screenshot({
            fullPage:true,
            path:`reports/screenshot/${name}.png`
});
}
}
