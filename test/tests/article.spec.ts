import { expect, test, prefillArticle } from "./support/pom/fixtures/fixtures";
import { ArticlePreview } from "./support/pom/pages/articlePreview.page";
import config from "config";

test("delete article", async function ({ page, withArticle }) {
  const articlePreview = new ArticlePreview(page);
  expect(await articlePreview.getArticleTitle()).toContain(
    prefillArticle.title
  );
  await articlePreview.deleteArticle();
  await page.waitForRequest("**/api/articles*");
  expect(page.url()).toBe(config.get("url"));
  expect(await page.innerText("body")).not.toContain(prefillArticle.title);
});

test("add and delete a comment", async function ({ page, withArticle }) {
  const articlePreview = new ArticlePreview(page);
  await articlePreview.enterComment("first test comment");
  await articlePreview.postComment();
  await articlePreview.enterComment("second test comment");
  await articlePreview.postComment();
  await articlePreview.enterComment("third test comment");
  await articlePreview.postComment();
  const comments = await articlePreview.getComments();
  expect(comments).toContain("first test comment");
  expect(comments).toContain("second test comment");
  expect(comments).toContain("third test comment");
  await articlePreview.deleteSelectedComment("second test comment");
  const updatedComments = await articlePreview.getComments();
  expect(updatedComments).not.toContain("second test comment");
});
