import GameBoard from './Gameboard';

class Player {
  #name;

  #board;

  constructor(name) {
    this.#name = name;
    this.#board = new GameBoard();
  }

  get name() {
    return this.#name;
  }

  get board() {
    return this.#board;
  }
}

export default Player;
