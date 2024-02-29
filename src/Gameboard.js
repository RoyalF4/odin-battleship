import Ship from './Ship';

const ARRAY_SIZE = 10;

class Gameboard {
  #array;

  #missed;

  #ships;

  constructor() {
    this.#array = Array(ARRAY_SIZE)
      .fill()
      .map(() => Array(ARRAY_SIZE).fill(0));
    this.#missed = [];
    this.#ships = [];
  }

  get array() {
    return this.#array;
  }

  get missed() {
    return this.#missed;
  }

  get ships() {
    return this.#ships;
  }

  #isOpenPosition(x, y) {
    return (
      x >= 0 &&
      x < ARRAY_SIZE &&
      y >= 0 &&
      y < ARRAY_SIZE &&
      this.#array[x][y] === 0
    );
  }

  #isValidPlacement(x, y, size, orientation) {
    if (orientation === 'horizontal') {
      let yCoord = y;
      for (let i = 0; i < size; i += 1) {
        if (!this.#isOpenPosition(x, yCoord)) return false;
        yCoord += 1;
      }
    } else {
      let xCoord = x;
      for (let i = 0; i < size; i += 1) {
        if (!this.#isOpenPosition(xCoord, y)) return false;
        xCoord += 1;
      }
    }
    return true;
  }

  #createShip(x, y, size, orientation) {
    const ship = new Ship(size);
    this.#ships.push(ship);
    if (orientation === 'horizontal') {
      let yCoord = y;
      for (let i = 0; i < size; i += 1) {
        this.#array[x][yCoord] = ship;
        yCoord += 1;
      }
    } else {
      let xCoord = x;
      for (let i = 0; i < size; i += 1) {
        this.#array[xCoord][y] = ship;
        xCoord += 1;
      }
    }
  }

  placeShip(x, y, size, orientation) {
    if (this.#isValidPlacement(x, y, size, orientation))
      this.#createShip(x, y, size, orientation);
  }

  receiveAttack(x, y) {
    if (typeof this.#array[x][y] !== 'object') {
      this.#missed.push([x, y]);
    } else {
      const ship = this.#array[x][y];
      ship.hit();
    }
  }
}

export default Gameboard;
