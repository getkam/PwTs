import { Page } from 'playwright';

export default class LoginPage {
  
  //CONSTRUCTOR
  public constructor(private readonly page: Page) {}

  //LOCATORS
  submitBtn = ()=> this.page.locator('button[type="submit"]');
  userNameInput = ()=>  this.page.locator('input[formcontrolname="username"]');
  emailInput = ()=> this.page.locator('input[formcontrolname="email"]');
  passwordInput = ()=> this.page.locator('input[formcontrolname="password"]');

  //ACTIONS
  public async clickLoginSubmitButton() {
    await this.submitBtn().click();
  }
  public async typeUsername(username: string) {
    await this.userNameInput().fill(username);
  }
  public async typeEmail(email: string) {
    await this.emailInput().fill(email);
  }
  public async typePassword(password: string) {
    await this.passwordInput().fill(password);
  }
}