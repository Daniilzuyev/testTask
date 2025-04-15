import { Page, expect, Locator } from "@playwright/test";

export class GamePage {
  constructor(private readonly page: Page) {}

  get playButton(): Locator {
    return this.page.locator('[data-locator="play-button"]');
  }

  get gameResult(): Locator {
    return this.page.locator('[data-locator="game-result"]');
  }

  async navigateWithIds(playerId: string, gameId: string) {
    await this.page.goto(`/?playerid=${playerId}&gameid=${gameId}`);
    await this.page.waitForLoadState("networkidle");
  }

  async forceDisablePlayButton() {
    await this.page.evaluate(() => {
      document
        .querySelector('[data-locator="play-button"]')
        ?.setAttribute("disabled", "");
    });
  }

  async startGameRound(timeout = 10000) {
    await this.playButton.waitFor({ state: "visible", timeout });
    await expect(this.playButton).toBeEnabled();
    await this.playButton.click();
  }

  async waitForButtonDisabled(timeout = 10000) {
    await expect(this.playButton).toBeDisabled({ timeout });
  }

  async verifyGameResult(timeout = 10000): Promise<string> {
    await this.gameResult.waitFor({ state: "visible", timeout });
    return await this.gameResult.innerText();
  }
}
