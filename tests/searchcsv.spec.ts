import {test, expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async({loginpage})=>{
    await loginpage.goToLoginpage();
    await loginpage.dologin(process.env.APPUSERNAME!, process.env.APPPASSWORD!);
});
//Data provider
const productdata= CsvHelper.readCsv('./src/data/product.csv');
for(const row of productdata){
test(`verify search result count - ${row.searchkey} - ${row.productname}`,async({homepage, searchresultpage})=> {
     await homepage.doSearch('macbook');
     expect(await searchresultpage.getProductSearchResultsCount()).toBe(Number(row.resultcount));
});
}
for(const row of productdata){
test(`verify user is land on product page - ${row.searchkay}-${row.productname}`,async({homepage, searchresultpage,page})=> {
     await homepage.doSearch(row.searchkey);
     await searchresultpage.selectproduct(row.productname);
     expect(await page.title()).toBe(row.productname); 
});
}

//common testcase to verify
    test('Comp logo exist on product page',async({basepage})=> {
     //expect(await productinfopage.islogoVisible()).toBeTruthy();
     expect(await basepage.islogoVisible()).toBeTruthy();
});

test('Footer exist on product page',async({basepage})=> {
     expect(await basepage.isFootersCount()).toBe(16);
});