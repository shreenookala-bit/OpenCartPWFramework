import{Locator,Page} from '@playwright/test';
import { Basepage } from './Basepage';

export class ProductInfoPage extends Basepage{
    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private readonly productQuantity: Locator;
    private readonly addtoCartButton:Locator;
    private readonly successMsg :Locator;
    private readonly shoppingcart:Locator;
    private readonly shoppingpage:Locator;
    private map: Map<string,string|number>;

    constructor(page: Page){
        super(page);
        this.header= page.getByRole('heading',{level:1});
        this.productImages = page.locator('div#content li img');
        this.productMetaData= page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing= page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.productQuantity= page.getByRole('textbox', { name: 'Qty' });
        this.addtoCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.successMsg= page.locator('div.alert.alert-success.alert-dismissible');
        this.shoppingcart= page.getByRole('link', { name: 'shopping cart' });
        this.shoppingpage=page.locator('#content');

        this.map = new Map<string,string|number>();

    };
    async getProductHeader() : Promise<string>{
        return await this.header.innerText();
    }
    async getProductImagecount():Promise<number> {
        //await this.page.waitForTimeout(4000);
        await this.productImages.first().waitFor({state:'visible'});
        return await this.productImages.count();
    }

   // @returns this method is returning the actual product data : header,imagescount,metadata,pricing data

    async getProductInfo():Promise<Map<string,string|number>> {
       this.map.set('ProductHeader',await this.getProductHeader());
       this.map.set('ProductImageCount',await this.getProductImagecount());
       await this.getProductMetaData();
       await this.getProductPricingData();
       return this.map;
    }
    //Brand : Apple,
    //Product code: Product 18
    //Rewards point : 800
    //Availabilty: Out of stock


    private async getProductMetaData():Promise <void> {
       let metadata= await this.productMetaData.allInnerTexts();
       for(let data of metadata){
         let meta = data.split(':');
         let metakey = meta[0].trim();
         let metaval= meta[1].trim();
         this.map.set(metakey,metaval);
       }
    }
     //  $2,000.00
     // Ex Tax: $2,000.00
    private async getProductPricingData():Promise<void>{
        let pricedata =await this.productPricing.allInnerTexts();
        let productprice=pricedata[0].trim();
        let exTaxprice=pricedata[1].split(':')[1].trim();
        this.map.set('ProductPrice',productprice);
        this.map.set('ExTaxPrice',exTaxprice);
     
    }
    async getQuantity(quantity:number) : Promise<void> {
         await this.productQuantity.fill('quantity');
       
    }
    async getaddtoCart() : Promise<void> {
         await this.addtoCartButton.click();
         await this.addtoCartButton.waitFor({state:'visible'});
       
    }
     async isSuccessMsg():Promise<boolean> { 
        return await this.successMsg.isVisible();
   }
   async getshoppingcart() : Promise<void> {
         await this.shoppingcart.first().click();
   }
   async isLandedonShoppingPage() : Promise<boolean>{
        return await this.shoppingpage.isVisible();
   }
}
