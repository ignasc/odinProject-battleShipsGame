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
    const playerOne = new Player(true, "Ignas", 1);
    const playerTwo = new Player(true, "Second Ignas", 2);
    const game = new GameEngine(playerOne, playerTwo);
    const gameUI = new GameUI(playerOne, playerTwo, game);

    //initial game settings
    playerTwo.getBoard().toggleBoard();

    const btnStartGame = document.createElement("button");
    btnStartGame.addEventListener("click", () => {
        gameUI.updateUI();
    });
    btnStartGame.textContent = "start game";
    document.getElementById("mainApp").appendChild(btnStartGame);

    // automatically trigger button for debug purposes.
    btnStartGame.click();
});
