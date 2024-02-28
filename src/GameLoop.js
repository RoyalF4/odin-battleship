import Player from './Player';

class GameLoop {
  #playerOne;

  #playerTwo;

  #activePlayer;

  constructor(playerOne, playerTwo) {
    this.#playerOne = new Player(playerOne);
    this.#playerTwo = new Player(playerTwo);
    this.#activePlayer = this.#playerOne;
  }

  #printBoard(player) {
    let board = '';
    for (let i = 0; i < player.board.length; i += 1) {
      for (let j = 0; j < player.board[i].length; j += 1) {
        board += ' O ';
      }
      board += '\n';
    }
    console.log(board);
  }

  playRound() {
    this.#printBoard(this.#playerOne);
  }
}

export default GameLoop;
