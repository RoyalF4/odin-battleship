const domElements = {
  playerOneDiv: document.querySelector('.playerOneContainer'),
  playerTwoDiv: document.querySelector('.playerTwoContainer'),
  activePlayer: document.querySelector('.activePlayer'),
  main: document.querySelector('main'),
};

// EVENTS

function radioChangeEvent() {
  const isHidden =
    domElements.playerTwoInputContainer.classList.contains('hidden');
  if (isHidden) {
    domElements.playerTwoInputContainer.classList.toggle('hidden');
    domElements.playerTwoInput.setAttribute('required', '');
  } else {
    domElements.playerTwoInput.removeAttribute('required');
    domElements.playerTwoInputContainer.classList.toggle('hidden');
  }
}

// RENDER CONTENT

function renderBoard(playerContainer, player, game) {
  const container = document.createElement('div');
  container.classList.add('gameboard');
  container.dataset.player = player.name;

  const playerBoard = player.board.array;

  playerBoard.forEach((row, x) => {
    row.forEach((cell, y) => {
      const cellButton = document.createElement('button');
      cellButton.classList.add(
        player.name === 'Computer' ? 'computerCell' : 'gridCell',
      );
      if (typeof cell === 'object') cellButton.classList.toggle('ship');
      cellButton.addEventListener('click', (event) => {
        const isNewMove =
          !event.target.classList.contains('hit') &&
          !event.target.classList.contains('miss');
        if (isNewMove) {
          const targetPlayer = event.target.parentElement.dataset.player;
          if (targetPlayer !== game.activePlayer.name && !game.isGameOver) {
            game.playRound(targetPlayer, event.target, x, y);
          }
        }
      });
      container.appendChild(cellButton);
    });
  });
  playerContainer.appendChild(container);
}

function gameLegend() {
  const legend = document.createElement('div');
  legend.classList.add('legend');

  const missContainer = document.createElement('div');
  missContainer.classList.add('missContainer');

  const missLabel = document.createElement('div');
  missLabel.textContent = 'Miss';

  const missLegend = document.createElement('button');
  missLegend.classList.add('gridCell');
  missLegend.classList.add('miss');

  missContainer.appendChild(missLabel);
  missContainer.appendChild(missLegend);

  const hitContainer = document.createElement('div');
  hitContainer.classList.add('hitContainer');

  const hitLabel = document.createElement('div');
  hitLabel.textContent = 'Hit';

  const hitLegend = document.createElement('button');
  hitLegend.classList.add('gridCell');
  hitLegend.classList.add('hit');

  hitContainer.appendChild(hitLabel);
  hitContainer.appendChild(hitLegend);

  legend.appendChild(missContainer);
  legend.appendChild(hitContainer);

  return legend;
}

function renderStartScreen() {
  domElements.main.textContent = '';
  const content = document.createElement('div');
  content.classList.add('content');

  // create form
  const form = document.createElement('form');
  domElements.form = form;

  // add radio input for amount of players
  const radio = document.createElement('fieldset');
  const divOne = document.createElement('div');
  const labelOne = document.createElement('label');
  labelOne.htmlFor = 'onePlayerRadio';
  labelOne.textContent = '1 Player';
  const inputOne = document.createElement('input');
  inputOne.id = 'onePlayerRadio';
  inputOne.name = 'players';
  inputOne.type = 'radio';
  inputOne.value = 1;
  inputOne.setAttribute('checked', '');
  divOne.appendChild(labelOne);
  divOne.appendChild(inputOne);
  radio.appendChild(divOne);

  const divTwo = document.createElement('div');
  const labelTwo = document.createElement('label');
  labelTwo.htmlFor = 'twoPlayerRadio';
  labelTwo.textContent = '2 Players';
  const inputTwo = document.createElement('input');
  inputTwo.id = 'twoPlayerRadio';
  inputTwo.name = 'players';
  inputTwo.type = 'radio';
  inputTwo.value = 2;
  divTwo.appendChild(labelTwo);
  divTwo.appendChild(inputTwo);
  radio.appendChild(divTwo);

  form.appendChild(radio);

  const radioInputs = form.querySelectorAll('input[type="radio"]');
  radioInputs.forEach((radioInput) =>
    radioInput.addEventListener('change', radioChangeEvent),
  );

  // add input for player names
  const containerForInput = document.createElement('div');
  containerForInput.classList.add('containerForInput');
  const playerOneInputContainer = document.createElement('div');
  const playerOneLabel = document.createElement('label');
  playerOneLabel.htmlFor = 'playerOneName';
  playerOneLabel.textContent = 'Player One:';
  const playerOneInput = document.createElement('input');
  playerOneInput.id = 'playerOneName';
  playerOneInput.name = 'playerOneName';
  playerOneInput.type = 'text';
  playerOneInput.minLength = 3;
  playerOneInput.required = true;
  playerOneInputContainer.appendChild(playerOneLabel);
  playerOneInputContainer.appendChild(playerOneInput);
  containerForInput.appendChild(playerOneInputContainer);

  const playerTwoInputContainer = document.createElement('div');
  playerTwoInputContainer.classList.toggle('hidden');
  domElements.playerTwoInputContainer = playerTwoInputContainer;
  const playerTwoLabel = document.createElement('label');
  playerTwoLabel.htmlFor = 'playerTwoName';
  playerTwoLabel.textContent = 'Player Two:';
  const playerTwoInput = document.createElement('input');
  playerTwoInput.id = 'playerTwoName';
  playerTwoInput.name = 'playerTwoName';
  playerTwoInput.type = 'text';
  playerTwoInput.minLength = 3;
  domElements.playerTwoInput = playerTwoInput;
  playerTwoInputContainer.appendChild(playerTwoLabel);
  playerTwoInputContainer.appendChild(playerTwoInput);
  containerForInput.appendChild(playerTwoInputContainer);
  form.appendChild(containerForInput);

  // submit button
  const submitButton = document.createElement('button');
  submitButton.classList.add('menuBtn');
  submitButton.textContent = 'Start Game!';
  form.appendChild(submitButton);

  content.appendChild(form);
  domElements.main.appendChild(content);
}

function renderGameScreen(game) {
  domElements.main.textContent = '';
  const gameWindow = document.createElement('div');
  gameWindow.classList.add('gameWindow');
  const content = document.createElement('div');
  content.classList.add('computerGame');

  // player 1 board
  const playerOneBoard = document.createElement('div');
  playerOneBoard.classList.add('playerOneContainer', 'board');
  playerOneBoard.dataset.player = 'playerOne';
  content.appendChild(playerOneBoard);
  // player 2 board
  const playerTwoBoard = document.createElement('div');
  playerTwoBoard.classList.add('playerTwoContainer', 'board');
  playerTwoBoard.dataset.player = 'playerTwo';
  content.appendChild(playerTwoBoard);

  // render player boards
  renderBoard(playerOneBoard, game.playerOne, game);
  renderBoard(playerTwoBoard, game.playerTwo, game);

  gameWindow.appendChild(content);
  gameWindow.appendChild(gameLegend());
  domElements.main.appendChild(gameWindow);
}

function announceWinner(winner) {
  const div = document.createElement('div');
  div.textContent = `${winner.name} Wins!`;
  domElements.main.appendChild(div);
}

function gameOverMenu() {
  const container = document.createElement('div');
  const resetButton = document.createElement('button');
  resetButton.classList.add('reset');
  resetButton.textContent = 'Reset';

  const newGameButton = document.createElement('button');
  newGameButton.classList.add('newGame');
  newGameButton.textContent = 'New Game';

  container.appendChild(resetButton);
  container.appendChild(newGameButton);
  domElements.main.appendChild(container);
}

export {
  renderBoard,
  domElements,
  renderStartScreen,
  renderGameScreen,
  announceWinner,
  gameOverMenu,
};

// function printBoard(board) {
//     let boardString = '';
//     board.board.forEach((row) => {
//       row.forEach((e) => {
//         boardString += ` ${typeof e === 'object' ? 'X' : e} `;
//       });
//       boardString += '\n';
//     });

//     console.log(boardString);
//   }
