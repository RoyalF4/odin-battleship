function renderBoard(playerContainer, playerBoard) {
  const container = document.createElement('div');
  container.classList.add('gameboard');

  playerBoard.board.forEach((row) => {
    row.forEach((cell) => {
      const cellButton = document.createElement('button');
      cellButton.classList.add('gridCell');
      if (typeof cell === 'object') cellButton.classList.toggle('ship');
      // ellButton.textContent = ` ${typeof cell === 'object' ? 'X' : cell} `;
      container.appendChild(cellButton);
    });
  });
  playerContainer.appendChild(container);
}

export { renderBoard };

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