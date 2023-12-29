import { Page } from 'playwright';
import { Article } from '../utils/article.type';

export default class Editor {
  //CONSTRUCTOR
  public constructor(private readonly page: Page) {}
  
  //LOCATORS
  private titleInput = this.page.locator('[test-id="editor-title"]');
  private descInput = this.page.locator('[test-id="editor-description"]');
  private bodyInput = this.page.locator('[test-id="editor-body"]');
  private publishBtn = this.page.locator('[test-id="editor-submit"]');
  private tagsInput = this.page.locator('[test-id="editor-tags"]');

  //ACTIONS
  private async typeArticleTitle(title: string) {
    await this.titleInput.fill(title);
  }
  private async typeArticleDescription(description: string) {
    await this.descInput.fill(description);
  }
  private async typeArticleBody(body: string) {
    await this.bodyInput.fill(body);
  }
  private async typeArticleTags(tags: readonly string[]) {
    if (!tags) return;
    tags.forEach(async (tag) => {
      await this.tagsInput.fill(tag);
      await this.page.keyboard.press("Enter");
    });
  }
  private async clickPublishArticleButton() {
    await this.publishBtn.click();
  }
  public async fillArticleFormAndSubmit(article: Article) {
    await this.typeArticleTitle(article.title);
    await this.typeArticleDescription(article.description);
    await this.typeArticleBody(article.body);
    await this.typeArticleTags(article.tags);
    await this.clickPublishArticleButton();
  }
}