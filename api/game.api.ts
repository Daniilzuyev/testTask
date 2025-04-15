export class GameAPI {
  async getGameId(page: any, gameType: string): Promise<string> {
    const response = await page.request.get(`/games?type=${gameType}`);
    const json = await response.json();
    return json.gameId;
  }
}
