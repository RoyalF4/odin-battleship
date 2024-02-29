import Player from './Player';
import GameBoard from './Gameboard';
import { domElements, renderStartScreen } from './dom';

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
    this.#activePlayer = 'none';
    this.#numberOfPlayers = 0;
  }

  get activePlayer() {
    return this.#activePlayer;
  }

  set players(playerData) {
    this.#numberOfPlayers = playerData.players;
    this.#playerOne.name = playerData.playerOneName;
    if (playerData.playerTwoName !== '') {
      this.#playerTwo.name = playerData.playerTwoName;
    }
  }

  begin() {
    renderStartScreen();
    domElements.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(domElements.form));
      this.players = formData;
      domElements.form.reset();
      console.log(this.#playerOne.name, this.#playerTwo.name);
    });
  }

  //   insertDummyMoves() {
  //     generateShipPlacement(this.#playerOneBoard);
  //     generateShipPlacement(this.#playerTwoBoard);
  //   }
}

export default Game;
