import Player from './Player';
import GameBoard from './Gameboard';
import {
  renderBoard,
  domElements,
  setActivePlayer,
  renderStartScreen,
} from './dom';

class Game {
  #playerOne;

  #playerTwo;

  #activePlayer;

  #playerOneBoard;

  #playerTwoBoard;

  constructor() {
    this.#playerOne = 'Player One';
    this.#playerTwo = 'Player Two';
    this.#playerOneBoard = new GameBoard();
    this.#playerTwoBoard = new GameBoard();
    this.#activePlayer = 'none';
  }

  get activePlayer() {
    return this.#activePlayer;
  }

  begin() {
    renderStartScreen();
  }

  //   insertDummyMoves() {
  //     generateShipPlacement(this.#playerOneBoard);
  //     generateShipPlacement(this.#playerTwoBoard);
  //   }
}

export default Game;
