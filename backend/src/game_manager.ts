import { Game } from './game.js';

class GameManager {
  private activeGames: Map<string, Game> = new Map();
  private gameLoops: Map<string, NodeJS.Timeout> = new Map();

  /**
   * Initializes a new game and starts its loop.
   */
  public createGame(lobbyId: string): Game {
    const game = new Game(lobbyId);
    this.activeGames.set(lobbyId, game);

    this.startGameLoop(lobbyId);
    return game;
  }

  /**
   * Runs an asynchronous loop checking if the game is done.
   */
  private startGameLoop(lobbyId: string): void {
    // Run the loop every 1000ms (1 second)
    const loopInterval = setInterval(() => {
      const game = this.activeGames.get(lobbyId);

      // Safety check: if game disappeared, clear interval
      if (!game) {
        this.stopGameLoop(lobbyId);
        return;
      }

      // Process game logic
      game.tick();
      console.log(`[Lobby ${lobbyId}] Tick: ${game.getState().ticks}`);

      // Check for completion
      if (game.isDone()) {
        console.log(`[Lobby ${lobbyId}] Game over!`);
        this.stopGameLoop(lobbyId);
        this.activeGames.delete(lobbyId);
      }
    }, 1000);

    this.gameLoops.set(lobbyId, loopInterval);
  }

  private stopGameLoop(lobbyId: string): void {
    const loop = this.gameLoops.get(lobbyId);
    if (loop) {
      clearInterval(loop);
      this.gameLoops.delete(lobbyId);
    }
  }

  public getGame(lobbyId: string): Game | undefined {
    return this.activeGames.get(lobbyId);
  }
}

// Export a singleton instance so the whole app shares the same manager
export const gameManager = new GameManager();
