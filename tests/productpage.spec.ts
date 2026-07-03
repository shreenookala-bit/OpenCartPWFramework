import {test, expect} from '../src/fixtures/pagefixtures';
import { ProductInfoPage } from '../src/pages/ProductInfoPage';

test.beforeEach(async({loginpage})=>{
    await loginpage.goToLoginpage();
    //await loginpage.dologin('lakshmi.nookala@gmail.com','12345678');
    await loginpage.dologin(process.env.APPUSERNAME!, process.env.PASSWORD!);
});

test('@smoke Comp logo exist on product page',async({basepage})=> {
     //expect(await productinfopage.islogoVisible()).toBeTruthy();
     expect(await basepage.islogoVisible()).toBeTruthy();
});

test('@smoke Footer exist on product page',async({basepage})=> {
     expect(await basepage.isFootersCount()).toBe(16);
})
test('@smoke verify product image count',async({homepage,searchresultpage,productinfopage})=> {
     await homepage.doSearch('macbook');
     await searchresultpage.selectproduct('MacBook Pro');
     let imgcount= await productinfopage.getProductImagecount();
     console.log('Total Images:',imgcount);
     expect(imgcount).toBe(4);
});

test('@smoke verify product information/data',async({homepage, searchresultpage,productinfopage})=> {
     await homepage.doSearch('macbook');
     await searchresultpage.selectproduct('MacBook Pro');
     let actualProductInfoMap= await productinfopage.getProductInfo();
     console.log('Actual product info:',actualProductInfoMap);
     expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
     expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
     expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
     expect.soft(actualProductInfoMap.get('Availability')).toBe('Out Of Stock');
     expect.soft(actualProductInfoMap.get('ProductPrice')).toBe('$2,000.00');
     expect.soft(actualProductInfoMap.get('ExTaxPrice')).toBe('$2,000.00');
      
});

test('verify product is added to cart',async({homepage,searchresultpage,productinfopage})=> {
     await homepage.doSearch('macbook');
     await searchresultpage.selectproduct('MacBook Pro');
     await productinfopage.getQuantity(2);
     await productinfopage.getaddtoCart();
     expect.soft(await productinfopage.isSuccessMsg()).toBeTruthy();
     await productinfopage.getshoppingcart();
     expect(await productinfopage.isLandedonShoppingPage()).toBeTruthy();
     
});