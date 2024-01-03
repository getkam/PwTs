import Editor from "./support/pom/pages/articleEditor.page";
import Navbar from "./support/pom/sections/navBar.section";
import Utils from "./support/pom/utils/common.utils";
import { Article } from "./support/pom/utils/article.type";
import { test, expect } from "./support/pom/fixtures/fixtures";

const article: Article = {
  title: `newTitle-${Utils.randomNumber}`,
  description: "newDescription",
  body: "newBody",
  tags: ["newTag", "tag2"],
} as const;

test("create new article", async function ({ webApp }) {
  const navbar = new Navbar(webApp);
  const editor = new Editor(webApp);
  await navbar.clickNewArticleButton();
  await editor.fillArticleFormAndSubmit(article);

  expect(await webApp.locator("h1").textContent()).toContain(article.title);
});
