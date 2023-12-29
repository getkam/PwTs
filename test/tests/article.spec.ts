import { expect, test ,prefillArticle} from "./support/pom/fixtures/fixtures";
import ArticleView from './support/pom/pages/articleView.page';
import config from "config";


//test with pre-filled article created by fixture withArticle
test('delete article', async function ({page, withArticle}){
    const articleView = new ArticleView(page);
    expect(await articleView.getArticleTitle()).toContain(prefillArticle.title);
    await articleView.deleteArticle();
    await page.waitForRequest('**/api/articles*');
    expect(page.url()).toBe(config.get('url'));
    expect(await page.innerText('body')).not.toContain(prefillArticle.title);

})
