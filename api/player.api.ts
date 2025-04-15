import { Page } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

export class PlayerAPI {
  generatePlayerId(): string {
    return uuidv4();
  }

  async createPlayer(page: Page): Promise<string> {
    const playerId = uuidv4();

    await page.route("**/players", (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({ playerId }),
      })
    );

    const response = await page.request.post("/players", {
      data: { playerId },
    });

    if (response.status() !== 201) {
      throw new Error(`Player creation failed: ${await response.text()}`);
    }

    return playerId;
  }
}
