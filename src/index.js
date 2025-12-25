import "./css/resetcss.css";
import "./css/styles.css";

import GameEngine from "./gameEngine.js";
import { createGameBoard } from "./ui_gameboard_template.js";

document.addEventListener("DOMContentLoaded", () => {
    const game = new GameEngine();
    console.log("script loaded");

    // create players
    game.createPlayer(true, "Ignas");
    game.createPlayer(true, "Second Ignas");

    // ship placement
    game.playerOne.placeShip(3, 0, 0, true);
    game.playerOne.placeShip(2, 5, 5, false);
    game.playerOne.placeShip(1, 9, 9, true);

    // atack on player one
    game.playerOne.getBoard().receiveAttack(0, 1);
    game.playerOne.getBoard().receiveAttack(3, 3);
    game.playerOne.getBoard().receiveAttack(9, 9);

    game.playerTwo.placeShip(3, 4, 4, true);
    game.playerTwo.placeShip(2, 0, 0, false);
    game.playerTwo.placeShip(1, 8, 8, true);

    // attack on player two
    game.playerTwo.getBoard().receiveAttack(0, 1);
    game.playerTwo.getBoard().receiveAttack(3, 3);
    game.playerTwo.getBoard().receiveAttack(9, 9);

    const mainApp = document.getElementById("mainApp");

    const gameBoardPlayerOne = createGameBoard(1, game.playerOne.getBoard());
    const gameBoardPlayerTwo = createGameBoard(2, game.playerTwo.getBoard());

    mainApp.appendChild(gameBoardPlayerOne);
    mainApp.appendChild(gameBoardPlayerTwo);
});
