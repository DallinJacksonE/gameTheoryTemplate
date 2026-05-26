export class Game {
  private id: string;
  private ticks: number = 0;
  private maxTicks: number = 10;
  private done: boolean = false;

  constructor(id: string) {
    this.id = id;
  }

  // Advances the game state by one unit of time or one turn
  public tick(): void {
    if (this.done) return;

    this.ticks++;
    if (this.ticks >= this.maxTicks) {
      this.done = true;
    }
  }

  public isDone(): boolean {
    return this.done;
  }

  public getState() {
    return {
      id: this.id,
      ticks: this.ticks,
      isDone: this.done
    };
  }
}
