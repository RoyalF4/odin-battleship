import Player from '../Player';

describe('Player test', () => {
  let player;

  beforeEach(() => {
    player = new Player('Player');
  });

  test('player name is passed and set', () => {
    expect(player.name).toBe('Player');
  });
});
