import "./css/resetcss.css";
import "./css/styles.css";

import GameEngine from "./gameEngine.js";
import Player from "./player.js";
import GameUI, {
    createEmptyGameBoard,
    createGameBoard,
    updatePositionStatus,
} from "./ui_gameboard_template.js";
import startMenu from "./ui_startMenu.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = startMenu;
    const btnStartGame = document.createElement("button");
    btnStartGame.addEventListener("click", (e) => {
        e.preventDefault();
        const form = document.getElementById("start-menu");
        const formData = new FormData(form);

        const formDataObj = {};

        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        console.log(formDataObj);

        const playerOne = new Player(true, formDataObj["playerOneName"], 1);
        const playerTwo = new Player(
            formDataObj["computer-option"] === "on" ? false : true,
            formDataObj["playerTwoName"],
            2
        );

        if (formDataObj["computer-level"]) {
            playerTwo.setAiLevel(formDataObj["computer-level"]);
        }

        const game = new GameEngine(playerOne, playerTwo);
        const gameUI = new GameUI(playerOne, playerTwo, game);

        //hide second player board (this needs to be removed/fixed to not need it anymore)
        playerTwo.getBoard().toggleBoard();

        gameUI.updateUI();
    });
    btnStartGame.textContent = "start game";
    document.getElementById("mainApp").appendChild(form);
    document.getElementById("mainApp").appendChild(btnStartGame);

    // automatically trigger button for debug purposes.
    // btnStartGame.click();
});
