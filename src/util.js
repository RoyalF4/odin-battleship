function generateShipPlacement(player) {
  const { board } = player;
  const shipSize = [5, 4, 3, 3, 2];
  const orientation = ['horizontal', 'vertical'];
  for (let i = 0; i < 5; i += 1) {
    let shipPlaced = false;
    while (!shipPlaced) {
      const beforeShips = board.ships.length;
      const randomX = Math.floor(Math.random() * 10);
      const randomY = Math.floor(Math.random() * 10);
      const randomOrientation = Math.floor(Math.random() * 2);

      board.placeShip(
        randomX,
        randomY,
        shipSize[i],
        orientation[randomOrientation],
      );

      if (beforeShips < board.ships.length) shipPlaced = true;
    }
  }
}

export { generateShipPlacement };
