import { test as base } from "@playwright/test";
import { login } from "../utils/login.page.utils";
import Navbar from "../components/navBar.component";
import Editor from "../pages/articleEditor.page";
import config from "config";
import { Article } from "../utils/article.type";
import Utils from "../utils/common.utils";

export const prefillArticle: Article = {
  title: `Pre-filled Article -${Utils.randomNumber}`,
  description: "Test Description",
  body: "Test Body",
  tags: ["test", "test2"],
};

export const test = base.extend({
  webApp: async ({ page }, use) => {
    await login(page, await config.get("email"), await config.get("password"));
    await use(page);
  },
  withArticle: async ({ page, webApp }, use) => {
    const article: Article = {
      title: prefillArticle.title,
      description: "Test Description",
      body: "Test Body",
      tags: ["test", "test2"],
    };
    const navbar = new Navbar(page);
    const editor = new Editor(page);
    await navbar.clickNewArticleButton();
    await editor.fillArticleFormAndSubmit(article);
    await use(article);
  },
});

export { expect } from "@playwright/test";
