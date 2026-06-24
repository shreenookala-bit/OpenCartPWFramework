import{Locator,Page} from '@playwright/test';
import { Basepage } from './Basepage';

export class Homepage extends Basepage{
    private readonly logoutlink: Locator;
    private readonly headers: Locator;
    

    constructor(page: Page){
        super(page);
        this.logoutlink= page.getByRole('link',{name: 'Logout'});
        this.headers = page.getByRole('heading',{level: 2});
  
    }
    async getHomePageTitle(){
        return await this.page.title();
    }
    async isLogoutlinkexist(){
        return await this.logoutlink.isVisible();
    }
    async getHomepageHeaders():Promise <string[]>{
       return await this.headers.allInnerTexts()
    }
    async doSearch(searchkey:string):Promise<void>{
        console.log(`Search key: ${searchkey}`);
        await this.searchbox.fill(searchkey);
        await this.searchIcon.click();
    }
}