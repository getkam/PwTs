import Editor from "./support/pom/pages/articleEditor.page";
import Navbar from "./support/pom/components/navBar.component";
import Utils from "./support/pom/utils/common.utils";
import { Article } from "./support/pom/utils/article.type";
import { test, expect, prefillArticle } from "./support/pom/fixtures/fixtures";
import { ArticlePreview } from "./support/pom/pages/articlePreview.page";
import config from "config";
import moment from "moment";

const article: Article = {
  title: `newTitle-${Utils.randomNumber}`,
  description: "newDescription",
  body: "newBody",
  tags: ["newTag", "tag2"],
};

test("create new article", async function ({ webApp }) {
  //arrange
  const navbar = new Navbar(webApp);
  const editor = new Editor(webApp);
  const articlePreview = new ArticlePreview(webApp);
  const today = moment().format("MMMM D, YYYY");

  //act
  await navbar.clickNewArticleButton();
  await editor.fillArticleFormAndSubmit(article);

  //assert
  expect(await articlePreview.getArticleTitle()).toContain(article.title);
  expect(await articlePreview.getBannerAuthor()).toContain(
    config.get("username")
  );
  expect(await articlePreview.getBannerCreationDate()).toContain(today);
  expect(await articlePreview.getArticleBody()).toContain(article.body);
  await articlePreview.assertTags(Array.from(article.tags));
  expect(await articlePreview.getArticleAuthor()).toContain(
    config.get("username")
  );
  expect(await articlePreview.getArticleCreationDate()).toContain(today);
});
