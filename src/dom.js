const domElements = {
  playerOneDiv: document.querySelector('.playerOneContainer'),
  playerTwoDiv: document.querySelector('.playerTwoContainer'),
  activePlayer: document.querySelector('.activePlayer'),
  main: document.querySelector('main'),
};

// EVENTS

function radioChangeEvent() {
  console.log('hello');
  domElements.playerTwoInputContainer.classList.toggle('hidden');
}

// RENDER CONTENT

function renderBoard(playerContainer, playerBoard) {
  const container = document.createElement('div');
  container.classList.add('gameboard');

  playerBoard.board.forEach((row, x) => {
    row.forEach((cell, y) => {
      const cellButton = document.createElement('button');
      cellButton.classList.add('gridCell');
      if (typeof cell === 'object') cellButton.classList.toggle('ship');
      cellButton.addEventListener('click', () => {
        console.log(x, y);
      });
      // ellButton.textContent = ` ${typeof cell === 'object' ? 'X' : cell} `;
      container.appendChild(cellButton);
    });
  });
  playerContainer.appendChild(container);
}

function renderStartScreen() {
  domElements.main.textContent = '';
  const content = document.createElement('div');
  content.classList.add('.content');

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
  inputOne.checked = true;
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

  content.appendChild(radio);

  const radioInputs = content.querySelectorAll('input[type="radio"]');
  radioInputs.forEach((radioInput) =>
    radioInput.addEventListener('change', radioChangeEvent),
  );

  // add input for player names
  const playerOneInputContainer = document.createElement('div');
  const playerOneLabel = document.createElement('label');
  playerOneLabel.htmlFor = 'playerOneName';
  playerOneLabel.textContent = 'Player One:';
  const playerOneInput = document.createElement('input');
  playerOneInput.id = 'playerOneName';
  playerOneInput.type = 'text';
  playerOneInput.minLength = 3;
  playerOneInput.required = true;
  playerOneInputContainer.appendChild(playerOneLabel);
  playerOneInputContainer.appendChild(playerOneInput);
  content.appendChild(playerOneInputContainer);

  const playerTwoInputContainer = document.createElement('div');
  playerTwoInputContainer.classList.toggle('hidden');
  domElements.playerTwoInputContainer = playerTwoInputContainer;
  const playerTwoLabel = document.createElement('label');
  playerTwoLabel.htmlFor = 'playerTwoName';
  playerTwoLabel.textContent = 'Player Two:';
  const playerTwoInput = document.createElement('input');
  playerTwoInput.id = 'playerTwoName';
  playerTwoInput.type = 'text';
  playerTwoInput.minLength = 3;
  playerTwoInput.required = true;
  playerTwoInputContainer.appendChild(playerTwoLabel);
  playerTwoInputContainer.appendChild(playerTwoInput);
  content.appendChild(playerTwoInputContainer);

  domElements.main.appendChild(content);
}

function setActivePlayer(activePlayer) {
  domElements.activePlayer.textContent = activePlayer;
}

export { renderBoard, domElements, setActivePlayer, renderStartScreen };

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
