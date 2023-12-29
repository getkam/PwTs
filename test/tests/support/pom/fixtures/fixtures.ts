import { test as base } from "@playwright/test";
import { login } from "../utils/login.page.utils";
import Navbar from "../sections/navBar.section";
import Editor from "../pages/articleEditor.page";
import config from "config";

export const test  = base.extend({
  webApp: async ({ page }, use) => {
    await login(page, await config.get('email'), await config.get('password'));
    await use(page);
  },
  withArticle: async ({ page, webApp, article }, use) => {
    const navbar = new Navbar(page);
    const editor = new Editor(page);
    await navbar.clickNewArticleButton();
    await editor.fillArticleFormAndSubmit(article);
    await use(article);
  },
});

export { expect } from "@playwright/test";

