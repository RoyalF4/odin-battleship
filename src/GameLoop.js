import Player from './Player';
import GameBoard from './Gameboard';
import { renderBoard, domElements, setActivePlayer } from './dom';

// function printBoard(board) {
//   let boardString = '';
//   board.board.forEach((row) => {
//     row.forEach((e) => {
//       boardString += ` ${typeof e === 'object' ? 'X' : e} `;
//     });
//     boardString += '\n';
//   });
// }

class GameLoop {
  #playerOne;

  #playerTwo;

  #activePlayer;

  #playerOneBoard;

  #playerTwoBoard;

  constructor(playerOne = 'PlayerOne', playerTwo = 'PlayerTwo') {
    this.#playerOne = new Player(playerOne);
    this.#playerTwo = new Player(playerTwo);
    this.#playerOneBoard = new GameBoard();
    this.#playerTwoBoard = new GameBoard();
    this.#activePlayer = this.#playerOne;
  }

  get activePlayer() {
    return this.#activePlayer;
  }

  insertDummyMoves() {
    generateShipPlacement(this.#playerOneBoard);
    generateShipPlacement(this.#playerTwoBoard);
  }

  playRound() {
    renderBoard(domElements.playerOneDiv, this.#playerOneBoard);
    renderBoard(domElements.playerTwoDiv, this.#playerTwoBoard);
    setActivePlayer(this.#activePlayer.name);

    this.#activePlayer =
      this.#activePlayer.name === this.#playerOne.name
        ? this.#playerTwo
        : this.#playerOne;
  }
}

export default GameLoop;
