import LoginPage from '../pages/login.page';
import { Page } from 'playwright';
import Navbar from '../sections/navBar.section';
import config from 'config';

export async function login(page: Page, email:string, password:string) {
  const loginPage = new LoginPage(page);
  const navbar = new Navbar(page);
  
  await page.goto(await config.get('url'));
  await navbar.clickLoginButton()
  await loginPage.typeEmail(email);
  await loginPage.typePassword(password);
  await loginPage.clickLoginSubmitButton(); 
}