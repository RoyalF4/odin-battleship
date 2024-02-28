import GameLoop from '../GameLoop';

describe('GameLoop test', () => {
  let gameLoop;

  beforeEach(() => {
    gameLoop = new GameLoop();
  });

  test('active player swaps after each round', () => {
    const oldActivePlayer = gameLoop.activePlayer.name;
    gameLoop.playRound();
    expect(oldActivePlayer).not.toBe(gameLoop.activePlayer.name);
  });
});
