import { test, expect } from "@playwright/test";
import { PlayerAPI } from "../api/player.api";
import { GameAPI } from "../api/game.api";
import { GamePage } from "../pages/game.page";
import { GameTypes } from "../testData";

test.describe("Game Round Flow", () => {
  let playerAPI: PlayerAPI;
  let gameAPI: GameAPI;

  test.beforeAll(() => {
    playerAPI = new PlayerAPI();
    gameAPI = new GameAPI();
  });

  const testCases = [
    { gameType: GameTypes.BLACKJACK, timeout: 15000 },
    { gameType: GameTypes.ROULETTE, timeout: 20000 },
    { gameType: GameTypes.BACCARAT, timeout: 10000 },
  ];

  testCases.forEach(({ gameType, timeout }) => {
    test(`should complete ${gameType} round successfully`, async ({ page }) => {
      const gamePage = new GamePage(page);
      const playerId = await playerAPI.createPlayer(page);
      const gameId = await gameAPI.getGameId(page, gameType);
      await gamePage.navigateWithIds(playerId, gameId);
      await gamePage.startGameRound(timeout);
      await gamePage.waitForButtonDisabled(timeout);
      const actual = await gamePage.verifyGameResult(timeout);

      expect(actual, "neither win nor lose is equal").toEqual(/win|lose/i);
    });
    test("should handle loading states properly", async ({ page }) => {
      const gamePage = new GamePage(page);

      const playerId = await playerAPI.createPlayer(page);
      const gameId = await gameAPI.getGameId(page, GameTypes.BLACKJACK);
      await gamePage.navigateWithIds(playerId, gameId);

      await gamePage.startGameRound(10000);
    });

    test("should handle disabled button state", async ({ page }) => {
      const gamePage = new GamePage(page);

      const playerId = await playerAPI.createPlayer(page);
      const gameId = await gameAPI.getGameId(page, GameTypes.BACCARAT);

      await gamePage.navigateWithIds(playerId, gameId);

      await gamePage.forceDisablePlayButton();
      await gamePage.waitForButtonDisabled(1000);
    });
  });
});
