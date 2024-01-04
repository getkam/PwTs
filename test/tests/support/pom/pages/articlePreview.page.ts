import { Page } from "@playwright/test";

export class ArticlePreview {
  //CONSTRUCTOR
  public constructor(private readonly page: Page) {}

  //LOCATORS
  private articleTitle = this.page.locator("h1");
  private bannerAuthor = this.page.locator(".banner .author");
  private bannerCreationDate = this.page.locator(".banner .date");
  private bannerEditButton = this.page.locator(".banner .ion-edit");
  private bannerDeleteButton = this.page.locator(".banner .ion-trash-a");
  private articleBody = this.page.locator(".article-content");
  private listOfTags = this.page.locator(".tag-list li").elementHandles();
  private articleAuthor = this.page.locator(".article-actions .author");
  private articleCreationDate = this.page.locator(".article-actions .author");
  private articleEditButton = this.page.locator(".article-actions .ion-edit");
  private articleDeleteButton = this.page.locator(
    ".article-actions .ion-trash-a"
  );
  private commentInput = this.page.getByPlaceholder("Write a comment...");
  private commentPostButton = this.page.locator('[type="submit"]');
  private commentContainer = "app-article-comment .card-text";
  private commentSection = this.page.locator("app-article-comment");
  private deleteComment = ".ion-trash-a";

  //ACTIONS
  public async getArticleTitle() {
    return await this.articleTitle.textContent();
  }
  public async getBannerAuthor() {
    return await this.bannerAuthor.textContent();
  }
  public async getBannerCreationDate() {
    return await this.bannerCreationDate.textContent();
  }
  public async clickEditArticle() {
    await this.bannerEditButton.click();
  }
  public async clickDeleteArticle() {
    await this.bannerDeleteButton.click();
  }
  public async getArticleBody() {
    return await this.articleBody.textContent();
  }
  /**
   * Function is collecting tags from the article preview
   * @returns list of tags as an array of strings
   */
  public async getListOfTags(): Promise<string[]> {
    const tags: string[] = [];
    await this.page.waitForSelector(".tag-list li");
    const elements = await this.listOfTags;
    for (const element of elements) {
      const text = await element.textContent();
      if (text) tags.push(text);
    }
    return tags;
  }
  public async getArticleAuthor() {
    return await this.articleAuthor.textContent();
  }
  public async getArticleCreationDate() {
    return await this.articleCreationDate.textContent();
  }
  public async clickEditArticleFromArticle() {
    await this.articleEditButton.click();
  }
  public async clickDeleteArticleFromArticle() {
    await this.articleDeleteButton.click();
  }
  public async deleteArticle() {
    await this.articleDeleteButton.click();
  }
  public async enterComment(comment: string) {
    await this.commentInput.fill(comment);
  }
  public async postComment() {
    await this.commentPostButton.click();
    await this.page.waitForResponse("**/comments");
  }
  /**
   * Function is collecting comments from the article preview
   * @returns list of comments as an array of strings
   */
  public async getComments(): Promise<string[]> {
    await this.page.waitForSelector(".card");
    const comments = await this.page.$$eval(this.commentContainer, (nodes) =>
      nodes.map((n) => (n.textContent ? String(n.textContent.trim()) : ""))
    );
    return comments as string[];
  }

  public async deleteSelectedComment(comment: string) {
    await this.commentSection
      .filter({ hasText: new RegExp(comment) })
      .locator("i")
      .click();
    await this.page.waitForResponse("**/comments/**");
  }
}
