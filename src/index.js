import './css/reset.css';
import './css/style.css';
import GameLoop from './GameLoop';

const gameLoop = new GameLoop('PlayerOne', 'PlayerTwo');

gameLoop.insertDummyMoves();
gameLoop.playRound();
