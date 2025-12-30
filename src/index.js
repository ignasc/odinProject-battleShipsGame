import "./css/resetcss.css";
import "./css/styles.css";

import GameEngine from "./gameEngine.js";
import Player from "./player.js";
import GameUI, {
    createEmptyGameBoard,
    createGameBoard,
    updatePositionStatus,
} from "./ui_gameboard_template.js";

document.addEventListener("DOMContentLoaded", () => {
    const playerOne = new Player(true, "Ignas");
    const playerTwo = new Player(true, "Second Ignas");
    const game = new GameEngine(playerOne, playerTwo);
    const gameUI = new GameUI(playerOne, playerTwo, game);

    const btnStartGame = document.createElement("button");
    btnStartGame.addEventListener("click", () => {
        gameUI.updateUI();
    });
    btnStartGame.textContent = "start game";
    document.getElementById("mainApp").appendChild(btnStartGame);

    // create players
    // game.createPlayer(true, "Ignas");
    // game.createPlayer(true, "Second Ignas");

    // // ship placement
    // game.playerOne.placeShip(3, 0, 0, true);
    game.playerOne.placeShip(2, 5, 5, false);
    game.playerOne.placeShip(1, 9, 9, true);

    game.playerTwo.placeShip(3, 4, 4, true);
    game.playerTwo.placeShip(2, 0, 0, false);
    game.playerTwo.placeShip(1, 8, 8, true);
    // add attacked positions
    game.playerTwo.getBoard().receiveAttack(3, 4);
    game.playerTwo.getBoard().receiveAttack(4, 4);

    // const mainApp = document.getElementById("mainApp");

    // const gameBoardPlayerOne = createGameBoard(1, game.playerOne.getBoard());
    // const gameBoardPlayerTwo = createGameBoard(2, game.playerTwo.getBoard());

    // mainApp.appendChild(gameBoardPlayerOne);
    // mainApp.appendChild(gameBoardPlayerTwo);
});
