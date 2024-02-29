import Gameboard from './Gameboard';

class Player {
  #name;

  #board;

  constructor(name) {
    this.#name = name;
    this.#board = new Gameboard();
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  get board() {
    return this.#board;
  }
}

export default Player;
