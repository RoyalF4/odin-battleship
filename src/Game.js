import Player from './Player';
import {
  domElements,
  renderStartScreen,
  renderGameScreen,
  announceWinner,
} from './dom';
import { generateShipPlacement } from './util';

class Game {
  #playerOne;

  #playerTwo;

  #activePlayer;

  #playerOneBoard;

  #playerTwoBoard;

  #numberOfPlayers;

  #isGameOver;

  constructor() {
    this.#playerOne = new Player('Player 1');
    this.#playerTwo = new Player('Computer');
    this.#activePlayer = this.#playerOne;
    this.#numberOfPlayers = 0;
    this.#isGameOver = false;
  }

  get activePlayer() {
    return this.#activePlayer;
  }

  set activePlayer(player) {
    this.#activePlayer = player;
  }

  get playerOne() {
    return this.#playerOne;
  }

  get playerTwo() {
    return this.#playerTwo;
  }

  get playerOneBoard() {
    return this.#playerOneBoard;
  }

  get playerTwoBoard() {
    return this.#playerTwoBoard;
  }

  get isGameOver() {
    return this.#isGameOver;
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
    generateShipPlacement(this.#playerOne);
    generateShipPlacement(this.#playerTwo);
  }
  //

  begin() {
    // TEMPORARY GENERATE BOARD DATA
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

  playRound(targetPlayer, targetElement, x, y) {
    const target =
      targetPlayer === this.#playerOne.name ? this.#playerOne : this.#playerTwo;
    const targetBoard = target.board;

    if (!this.#isGameOver) {
      const isHit = targetBoard.receiveAttack(x, y);
      if (isHit) {
        targetElement.classList.add('hit');
        if (targetBoard.isGameOver()) {
          this.#isGameOver = true;
          const winner =
            target === this.#playerOne ? this.#playerTwo : this.#playerOne;
          announceWinner(winner);
        }
      } else {
        targetElement.classList.add('miss');
      }

      this.#swapActivePlayer();
    }
  }

  #swapActivePlayer() {
    this.#activePlayer =
      this.#activePlayer.name === this.#playerOne.name
        ? this.#playerTwo
        : this.#playerOne;
  }
}

export default Game;
