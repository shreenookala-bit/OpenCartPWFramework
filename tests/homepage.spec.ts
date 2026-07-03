import {test, expect} from "@playwright/test";
import { Loginpage } from "../src/pages/Loginpage";
import { Homepage } from "../src/pages/Homepage";

let loginpage: Loginpage;
let homepage: Homepage;

test.beforeEach(async({page})=>{
    loginpage=new Loginpage(page)
    await loginpage.goToLoginpage();
    await loginpage.dologin('lakshmi.nookala@gmail.com','12345678');
    homepage= new Homepage(page);
});

test('home page title test',async()=>{
    const pagetitle= await homepage.getHomePageTitle();
    console.log('Home page title', pagetitle);
    expect(pagetitle).toBe('My Account');
});

test('logout link exist test',async()=>{
    expect(await homepage.isLogoutlinkexist()).toBeTruthy();
});

test('Home page headers exist',async()=>{
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