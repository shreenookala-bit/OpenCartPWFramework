import{test,expect} from '@playwright/test';
import { Loginpage } from '../src/pages/Loginpage';
import { Homepage } from '../src/pages/Homepage';

  let loginpage: Loginpage;
  let homepage: Homepage;
 test.beforeEach(async({page})=>{
      loginpage = new Loginpage(page);
     await loginpage.goToLoginpage();
     homepage= new Homepage(page)

 });

test('login page title test',async()=>{
     const pagetitle = await loginpage.getLoginpagetitle();
     console.log('Login page Title :',pagetitle);
     expect(pagetitle).toBe('Account Login');

})

test('forgot password link exit test',async()=>{
     expect(await loginpage.isForgettonpwdexist()).toBeTruthy();
});

test('User is able to login',async()=>{
    await loginpage.dologin('lakshmi.nookala@gmail.com','12345678');
    expect.soft(await homepage.isLogoutlinkexist()).toBeTruthy();
    expect.soft(await homepage.getHomePageTitle()).toBe('My Account');
});