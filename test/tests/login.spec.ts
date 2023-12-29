import { test, expect } from '@playwright/test';
import Navbar from "./support/pom/sections/navBar.section";
import LoginPage from "./support/pom/pages/login.page";
import config from 'config';
import { newEmail, newUserName } from './support/pom/utils/login.page.data';

test.beforeEach(async ({ page }) => {
  await page.goto(await config.get('url'));
});

test('has title', async function ({ page }){
   expect(await page.title()).toContain('Conduit');
});

test('registration', async function ({ page }) {
  const navbar = new Navbar(page);
  const loginPage = new LoginPage(page);
  await navbar.clickRegisterButton();
  await loginPage.typeUsername(newUserName);
  await loginPage.typeEmail(newEmail);
  await loginPage.typePassword(await config.get('password'));
  await loginPage.clickLoginSubmitButton();
  expect(await navbar.getProfileName()).toContain(newUserName);
});

test('login', async function ({ page }) {
  const navbar = new Navbar(page);
  const loginPage = new LoginPage(page);
  await navbar.clickLoginButton();
  await loginPage.typeEmail(await config.get('email'));
  await loginPage.typePassword(await config.get('password'));
  await loginPage.clickLoginSubmitButton();
  expect(await navbar.getProfileName()).toContain(await config.get('username'));
});
