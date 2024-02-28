import Player from './Player';
import GameBoard from './Gameboard';

class GameLoop {
  #playerOne;

  #playerTwo;

  #activePlayer;

  #playerOneBoard;

  #playerTwoBoard;

  constructor(playerOne, playerTwo) {
    this.#playerOne = new Player(playerOne);
    this.#playerTwo = new Player(playerTwo);
    this.#playerOneBoard = new GameBoard();
    this.#playerTwoBoard = new GameBoard();
  }

  #printBoard(board) {
    let boardString = '';
    board.board.forEach((row) => {
      row.forEach((e) => {
        boardString += ` ${e} `;
      });
      boardString += '\n';
    });

    console.log(boardString);
  }

  #generateShipPlacement(board) {
    const shipSize = [5, 4, 3, 3, 2];
    const shipName = ['C', 'B', 'D', 'S', 'P'];
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

  insertDummyMoves() {
    this.#generateShipPlacement(this.#playerOneBoard);
    this.#generateShipPlacement(this.#playerTwoBoard);
  }

  playRound() {
    this.#printBoard(this.#playerOneBoard);
    this.#printBoard(this.#playerTwoBoard);
  }
}

export default GameLoop;
