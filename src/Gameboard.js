import Ship from './Ship';

const BOARD_SIZE = 10;

class Gameboard {
  #board;

  #missed;

  #ships;

  constructor() {
    this.#board = new Array(BOARD_SIZE).fill(new Array(BOARD_SIZE).fill(0));
    this.#missed = [];
    this.#ships = [];
  }

  get board() {
    return this.#board;
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
      x < BOARD_SIZE &&
      y >= 0 &&
      y < BOARD_SIZE &&
      this.board[x][y] === 0
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
        this.#board[x][yCoord] = ship;
        yCoord += 1;
      }
    } else {
      let xCoord = x;
      for (let i = 0; i < size; i += 1) {
        this.#board[xCoord][y] = ship;
        xCoord += 1;
      }
    }
  }

  placeShip(x, y, size, orientation) {
    if (this.#isValidPlacement(x, y, size, orientation)) {
      this.#createShip(x, y, size, orientation);
    } else {
      throw new Error('Invalid Move');
    }
  }

  receiveAttack(x, y) {
    if (typeof this.#board[x][y] !== 'object') {
      this.#missed.push([x, y]);
    } else {
      const ship = this.#board[x][y];
      ship.hit();
    }
  }
}

export default Gameboard;
