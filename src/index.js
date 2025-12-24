import GameEngine from "./gameEngine.js";

const game = new GameEngine();
console.log("script loaded");

// create players
game.createPlayer(true, "Ignas");
game.createPlayer(true, "Second Ignas");

// ship placement
game.playerOne.placeShip(3, 0, 0, true);
game.playerOne.placeShip(2, 5, 5, false);
game.playerOne.placeShip(1, 9, 9, true);

game.playerTwo.placeShip(3, 4, 4, true);
game.playerTwo.placeShip(2, 0, 0, false);
game.playerTwo.placeShip(1, 8, 8, true);
