import Ship from '../Ship';

describe('Ship class', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(5);
  });

  test('create ship object', () => {
    expect(ship).toBeTruthy();
  });

  test('be able to pass in a ships length', () => {
    const myShip = new Ship(3);
    expect(myShip.length).toBe(3);
  });

  test('get ships length', () => {
    expect(ship.length).toBe(5);
  });

  test('get the number of times a ship has been hit', () => {
    expect(ship.hits).toBe(0);
  });

  test('if ship has been sunk or not', () => {
    expect(ship.isSunk()).toBe(false);
  });

  test('if a shit gets hit, its hits property should increase by 1', () => {
    const myShip = new Ship(3);
    myShip.hit();
    expect(myShip.hits).toBe(1);
  });

  test('if a ships length is the same as the number of hits, its sunk', () => {
    const myShip = new Ship(1);
    myShip.hit();
    expect(myShip.isSunk()).toBe(true);
  });
});
