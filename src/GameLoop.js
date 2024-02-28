import Player from './Player';
import GameBoard from './Gameboard';
import { renderBoard, domElements } from './dom';

function generateShipPlacement(board) {
  const shipSize = [5, 4, 3, 3, 2];
  const orientation = ['horizontal', 'vertical'];
  for (let i = 0; i < 5; i += 1) {
    let shipPlaced = false;
    while (!shipPlaced) {
      const beforeShips = board.ships.length;
      const randomX = Math.floor(Math.random() * 10);
      const randomY = Math.floor(Math.random() * 10);
      const randomOrientation = Math.floor(Math.random() * 2);
      try {
        board.placeShip(
          randomX,
          randomY,
          shipSize[i],
          orientation[randomOrientation],
        );
      } catch (e) {}
      if (beforeShips < board.ships.length) shipPlaced = true;
    }
  }
}

function printBoard(board) {
  let boardString = '';
  board.board.forEach((row) => {
    row.forEach((e) => {
      boardString += ` ${typeof e === 'object' ? 'X' : e} `;
    });
    boardString += '\n';
  });
}

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
    // printBoard(this.#playerOneBoard);
    // printBoard(this.#playerTwoBoard);
    renderBoard(domElements.playerOneDiv, this.#playerOneBoard);
    renderBoard(domElements.playerTwoDiv, this.#playerTwoBoard);

    this.#activePlayer =
      this.#activePlayer.name === this.#playerOne.name
        ? this.#playerTwo
        : this.#playerOne;
  }
}

export default GameLoop;
