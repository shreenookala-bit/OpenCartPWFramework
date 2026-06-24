import{Locator, Page}from '@playwright/test';
import { Basepage } from './Basepage';

export class Loginpage extends Basepage{
    //private Locators:
  private readonly emailId: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;
  private readonly forgottenPasswordLink: Locator;
  private readonly LoginErrorMessage: Locator;
  
  //constr... of class : init the locator
  constructor(page:Page){
    super(page)
    this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.password= page.getByRole('textbox', { name: 'Password' });
    this.loginBtn= page.getByRole('button', { name: 'Login' });
    this.forgottenPasswordLink= page.getByRole('link', { name: 'Forgotten Password'}).first();
    this.LoginErrorMessage=page.locator('.alert.alert-danger.alert-dismissible');
  };
   // public page actions methods/behaviour
 async goToLoginpage(): Promise<void> {
    await this.page.goto('opencart/index.php?route=account/login');
 }

   async getLoginpagetitle(): Promise<string>{
   return await this.page.title();
 }
 async isForgettonpwdexist(): Promise<boolean>{
    return await this.forgottenPasswordLink.isVisible();
}
async dologin(username: string,password: string):Promise<void>{
    console.log(`app cred : ${username}: ${password}`);
    await this.emailId.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
}

   async isInvalidLoginErrorDisplayed(): Promise<boolean>{
    return await this.LoginErrorMessage.isVisible();
   }
}