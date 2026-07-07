import {test, expect} from '../src/fixtures/pagefixtures';

test.beforeEach(async({loginpage})=>{
    await loginpage.goToLoginpage();
    //await loginpage.dologin('lakshmi.nookala@gmail.com','12345678');
    await loginpage.dologin(process.env.APPUSERNAME!, process.env.APPPASSWORD!);
});

test('verify search result count',async({homepage, searchresultpage})=> {
     await homepage.doSearch('macbook');
     expect(await searchresultpage.getProductSearchResultsCount()).toBe(3);
});

test('@smoke verify user is land on product page',async({homepage, searchresultpage,page})=> {
     await homepage.doSearch('macbook');
     await searchresultpage.selectproduct('MacBook Pro');
     expect(await page.title()).toBe('MacBook Pro'); 
});