import { Page } from 'playwright';

export default class Navbar {
  //CONSTRUCTOR
  public constructor(private readonly page: Page) {}

  //LOCATORS
  private navbarLogo = this.page.locator('[test-id="navbar-logo"]');
  navbarSignIn = () => this.page.locator('[test-id="navbar-signin"]');
  navbarSignUp = () =>  this.page.locator('[test-id="navbar-signup"]');
  navbarProfileName = () =>  this.page.locator('[test-id="navbar-profile-name"]');
  settingsBtn = () =>  this.page.locator('[test-id="navbar-settings"]');
  newArticleBtn = () =>  this.page.locator('[test-id="navbar-new-article"]');
  homeBtn = () =>  this.page.locator('[test-id="navbar-home"]');
  
  //ACTIONS
  public async getNavbarLogo(){
   return await this.navbarLogo
  }
  public async clickRegisterButton(){
    await this.navbarSignUp().click();
  }
  public async clickLoginButton(){
    await this.navbarSignIn().click();
  }
  public async getProfileName(){
    return await this.navbarProfileName().textContent();
  }
  public async clickSettingsButton(){
    await this.settingsBtn().click();
  }
  public async clickNewArticleButton(){
    await this.newArticleBtn().click();
  }
  public async clickHomeButton(){
    await this.homeBtn().click();
  }
}