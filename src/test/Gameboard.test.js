import Gameboard from '../Gameboard';
import Ship from '../Ship';

describe('Gameboard class', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('create Gameboard object', () => {
    expect(gameboard).toBeTruthy();
  });

  test('get the board from Gameboard object', () => {
    expect(gameboard.board).not.toBe(undefined);
  });

  test('if gameboard has a missed property to track missed attacks', () => {
    expect(gameboard.missed.length).toBe(0);
  });

  test('if gameboard has an array called ships to track ships on the board', () => {
    expect(gameboard.ships.length).toBe(0);
  });

  //   test('check whether a coordinate is valid for placement', () => {
  //     expect(gameboard.isOpenPosition(4, 3)).toBe(true);
  //   });

  //   test('check whether a coordinate not valid for placement', () => {
  //     expect(gameboard.isOpenPosition(12, 3)).toBe(false);
  //   });

  //   test('is a coordinate invalid because it is already occupied', () => {
  //     const myBoard = new Gameboard();
  //     myBoard.board[0][0] = 1;
  //     expect(myBoard.isOpenPosition(0, 0)).toBe(false);
  //   });

  //   test('gameboard can tell if a ship will fit on the board', () => {
  //     expect(gameboard.isValidPlacement(0, 0, 5, 'horizontal')).toBe(true);
  //   });

  //   test('cannot place ship on board because it is blocked by another ship', () => {
  //     const myBoard = new Gameboard();
  //     myBoard.board[1][0] = new Ship(5);
  //     expect(myBoard.isValidPlacement(0, 0, 5, 'horizontal')).toBe(false);
  //   });

  //   test('gameboard can tell if a ship will not fit on the board horizontally because it is out of bounds', () => {
  //     expect(gameboard.isValidPlacement(7, 7, 5, 'horizontal')).toBe(false);
  //   });

  //   test('gameboard will not place ship vertically if it is not a valid move', () => {
  //     expect(gameboard.isValidPlacement(0, 9, 5, 'vertical')).toBe(true);
  //   });

  test('gameboard can place a ship at the given coordinates', () => {
    const myBoard = new Gameboard();
    const lengthBefore = myBoard.ships.length;
    myBoard.placeShip(0, 0, 4, 'horizontal');
    expect(myBoard.ships.length).toBe(lengthBefore + 1);
  });

  test('gameboard will not create a new ship if move is not valid', () => {
    // gameboard.playerMove(12, 0, 4, 'horizontal');
    // const lengthBefore = gameboard.ships.length;
    expect(() => {
      gameboard.playerMove(12, 0, 4, 'horizontal');
    }).toThrow();
  });

  test('determine if an attack is a miss', () => {
    const missedBefore = gameboard.missed.length;
    gameboard.receiveAttack(0, 0);
    expect(gameboard.missed.length).toBe(missedBefore + 1);
  });

  test('determine if an attack is a hit', () => {
    const missedBefore = gameboard.missed.length;
    gameboard.placeShip(0, 0, 1, 'horizontal');
    gameboard.receiveAttack(0, 0);
    expect(gameboard.missed.length).toBe(missedBefore);
  });

  test('record missed attacks', () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.missed[0]).toStrictEqual([0, 0]);
  });

  test('if an attack is a hit, add hit to ship', () => {
    gameboard.placeShip(0, 0, 3, 'horizontal');
    gameboard.receiveAttack(0, 1);
    expect(gameboard.ships[0].hits).toBe(1);
  });
});
