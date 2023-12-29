import { expect, test } from "./support/pom/fixtures/fixtures";
import ArticleView from './support/pom/pages/articleView.page';
import Utils from './support/pom/utils/common.utils';
import { Article } from "./support/pom/utils/article.type";
import config from "config";


const article: Article = {
  title: `newTitle-${Utils.randomNumber}`,
  description: "newDescription",
  body: "newBody",
  tags: ["newTag", "tag2"],
};

test('delete article', async function ({page, withArticle}){
  await withArticle(article, async ()=> {
    const articleView = new ArticleView(page);
    expect(await articleView.getArticleTitle()).toContain(article.title);
    await articleView.deleteArticle();
    expect(await page.url()).toBe(config.get('url'));
    
  });
})