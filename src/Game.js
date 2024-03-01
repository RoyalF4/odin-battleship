import Player from './Player';
import {
  domElements,
  renderStartScreen,
  renderGameScreen,
  announceWinner,
  gameOverMenu,
} from './dom';
import { generateShipPlacement, cartesianToIndex } from './util';

class Game {
  #playerOne;

  #playerTwo;

  #activePlayer;

  #numberOfPlayers;

  #isGameOver;

  constructor(
    playerOne = new Player('Player 1'),
    playerTwo = new Player('Computer'),
    numberOfPlayers = 1,
  ) {
    this.#playerOne = playerOne;
    this.#playerTwo = playerTwo;
    this.#activePlayer = this.#playerOne;
    this.#numberOfPlayers = numberOfPlayers;
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

  get isGameOver() {
    return this.#isGameOver;
  }

  get numberOfPlayers() {
    return this.#numberOfPlayers;
  }

  set players(playerData) {
    this.#numberOfPlayers = playerData.players;
    this.#playerOne.name = playerData.playerOneName;
    if (playerData.playerTwoName !== '') {
      this.#numberOfPlayers = 2;
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
          gameOverMenu(this);
          const reset = document.querySelector('.reset');
          reset.addEventListener('click', () => {
            this.#resetGame();
          });
        }
      } else {
        targetElement.classList.add('miss');
      }

      this.#swapActivePlayer();
      // Computer player move logic
      if (targetPlayer === 'Computer' && this.#isGameOver === false) {
        const playerCells = document.querySelectorAll('.gridCell');
        let isNewMove = true;
        let randomX;
        let randomY;
        do {
          randomX = Math.floor(Math.random() * 10);
          randomY = Math.floor(Math.random() * 10);
          const nextMove = playerCells.item(cartesianToIndex(randomX, randomY));
          isNewMove =
            !nextMove.classList.contains('hit') &&
            !nextMove.classList.contains('miss');
        } while (!isNewMove);
        setTimeout(() => {
          this.playRound(
            this.#playerOne.name,
            playerCells.item(cartesianToIndex(randomX, randomY)),
            randomX,
            randomY,
          );
        }, '1000');
      }
    }
  }

  #swapActivePlayer() {
    this.#activePlayer =
      this.#activePlayer.name === this.#playerOne.name
        ? this.#playerTwo
        : this.#playerOne;
  }

  #resetGame() {
    this.#playerOne = new Player(this.#playerOne.name);
    this.#playerTwo = new Player(this.#playerTwo.name);
    this.#isGameOver = false;
    this.#activePlayer = this.#playerOne;
    this.insertDummyMoves();
    renderGameScreen(this);
  }
}

export default Game;
