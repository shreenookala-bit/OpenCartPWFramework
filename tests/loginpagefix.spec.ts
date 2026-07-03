 import process from 'node:process';
import{ test, expect} from '../src/fixtures/pagefixtures';
import { Loginpage } from '../src/pages/Loginpage';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';

 test.beforeEach(async({loginpage})=>{
    
     await loginpage.goToLoginpage();
     
 });

test('@smoke login page title test',async({loginpage})=>{
     const pagetitle = await loginpage.getPageTitle();
     console.log('Login page Title :',pagetitle);
     expect(pagetitle).toBe('Account Login');

})

test('forgot password link exit test',async({loginpage})=>{
     expect(await loginpage.isForgettonpwdexist()).toBeTruthy();
});

test('User is able to login',async({loginpage,homepage})=>{
    await loginpage.dologin(process.env.APPUSERNAME!,process.env.PASSWORD!);
    expect.soft(await homepage.isLogoutlinkexist()).toBeTruthy();
    expect.soft(await homepage.getHomePageTitle()).toBe('My Account');
});
// DD-1 with Fixture and it is sequence mode
test('login to app with wrong credentials with data driven test',async({loginpage,testData})=>{
    for(let row of testData){
       await loginpage.dologin(row.username,row.password);
        expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
});

// DD-2 without fixtures and it is parallel mode
   let testData= CsvHelper.readCsv('src/data/loginData.csv');

   for(let row of testData){
    test(`invalid login test with - ${row.username} - ${row.password}`,async({loginpage})=>{
      await loginpage.dologin(row.username,row.password);
        expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
    }
 // DD for Excel TestData
    let logintestData= ExcelHelper.readExcel('src/data/opencartTestdata.xlsx','login');

   for(let row of logintestData){
    test(`invalid login test with excel data - ${row.username} - ${row.password}`,async({loginpage})=>{
      await loginpage.dologin(row.username,row.password);
        expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
    }

    let loginJsontestData= JsonHelper.readJson('src/data/loginTestdata.json');
    for(let row of loginJsontestData){
    test(`invalid login test with json testdata - ${row.username} - ${row.password}`,async({loginpage})=>{
      await loginpage.dologin(row.username,row.password);
        expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
    }

    //common tescases verify

    test('Comp logo exist on product page',async({basepage})=> {
     //expect(await productinfopage.islogoVisible()).toBeTruthy();
     expect(await basepage.islogoVisible()).toBeTruthy();
});

test('Footer exist on product page',async({basepage})=> {
     expect(await basepage.isFootersCount()).toBe(16);
});