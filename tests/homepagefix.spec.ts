import {test, expect} from '../src/fixtures/pagefixtures';


test.beforeEach(async({loginpage})=>{
    await loginpage.goToLoginpage();
    await loginpage.dologin('lakshmi.nookala@gmail.com','12345678');

});

test('@smoke home page title test',async({homepage})=>{
    const pagetitle= await homepage.getPageTitle();
    console.log('Home page title', pagetitle);
    expect(pagetitle).toBe('My Account');
});

test('@smoke logout link exist test',async({homepage})=>{
    expect(await homepage.isLogoutlinkexist()).toBeTruthy();
});

test('@smoke Home page headers exist',async({homepage})=>{
    let allheaders= await homepage.getHomepageHeaders();
    console.log('Home page headers:',allheaders);
    expect(allheaders).toHaveLength(4);
    expect(allheaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);
});