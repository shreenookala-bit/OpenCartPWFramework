import{Locator, Page}from '@playwright/test';
import { Basepage } from './Basepage';

export class SearchResultpage extends Basepage{
    //private Locators:
  private readonly searchresults: Locator;
  
  
  //constr... of class : init the locator
  constructor(page:Page){
    super(page)
    this.searchresults = page.locator('div.product-layout')
  }

  //actions:
  async getProductSearchResultsCount(): Promise<number>{
    return await this.searchresults.count()
  }
  async selectproduct(productName:string): Promise<void> {
    await this.page.getByRole('link', { name:productName,exact:true }).first().click();

  }
}