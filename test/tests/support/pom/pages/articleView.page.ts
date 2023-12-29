import { Page } from "@playwright/test";

export default class ArticleView{
  //CONSTRUCTOR
  public constructor(private readonly page : Page){};

  //LOCATORS
  private articleTitle = this.page.locator("h1");
  private deleteArticleButton =  this.page.locator('[test-id="delete-article-button"]');

  //ACTIONS
  public async getArticleTitle(){
    return await this.articleTitle.textContent();
  }
  public async deleteArticle(){
    await this.deleteArticleButton.click();
  }
}