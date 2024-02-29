import Player from './Player';
import GameBoard from './Gameboard';
import { domElements, renderStartScreen, renderGameScreen } from './dom';
import { generateShipPlacement } from './util';

class Game {
  #playerOne;

  #playerTwo;

  #activePlayer;

  #playerOneBoard;

  #playerTwoBoard;

  #numberOfPlayers;

  constructor() {
    this.#playerOne = new Player('Player 1');
    this.#playerTwo = new Player('Computer');
    this.#playerOneBoard = new GameBoard();
    this.#playerTwoBoard = new GameBoard();
    this.#activePlayer = this.#playerOne;
    this.#numberOfPlayers = 0;
  }

  get activePlayer() {
    return this.#activePlayer.name;
  }

  get playerOneBoard() {
    return this.#playerOneBoard;
  }

  get playerTwoBoard() {
    return this.#playerTwoBoard;
  }

  set players(playerData) {
    this.#numberOfPlayers = playerData.players;
    this.#playerOne.name = playerData.playerOneName;
    if (playerData.playerTwoName !== '') {
      this.#playerTwo.name = playerData.playerTwoName;
    }
  }

  // TEMPORARY GENERATE BOARD DATA
  insertDummyMoves() {
    generateShipPlacement(this.#playerOneBoard);
    generateShipPlacement(this.#playerTwoBoard);
  }
  //

  begin() {
    // TEMPORARY GENERATE BOARED DATA
    this.insertDummyMoves();
    //

    renderStartScreen();
    domElements.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(domElements.form));
      this.players = formData;
      domElements.form.reset();
      renderGameScreen(this);
    });
  }
}

export default Game;
