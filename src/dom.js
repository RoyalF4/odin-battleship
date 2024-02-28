const domElements = {
  playerOneDiv: document.querySelector('.playerOneContainer'),
  playerTwoDiv: document.querySelector('.playerTwoContainer'),
};

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

export { renderBoard, domElements };

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
