import Player from "./player.js";

class GameEngine {
    constructor(playerOneRef, playerTwoRef) {
        this.playerOne = playerOneRef;
        this.playerTwo = playerTwoRef;
        this.gameEnd = false;

        this.shipsToPlace = {
            3: 1,
            2: 2,
            1: 3,
        };
    }

    createPlayer(isHuman = true, name = "Unknown") {
        // -1 = cannot create more players
        if (this.playerOne && this.playerTwo) {
            return -1;
        }

        if (!this.playerOne) {
            this.playerOne = new Player(isHuman, name);
        } else if (!this.playerTwo) {
            this.playerTwo = new Player(isHuman, name);
        }
    }

    // gameStateChanged() {
    //     console.log("updating UI");
    //     // if (!this.gameUI) {
    //     //     return;
    //     // }
    //     this.gameUI.updateUI();
    // }

    // updateUI() {
    //     const mainApp = document.getElementById("mainApp");
    //     mainApp.innerHTML = "";
    //     const gameBoardPlayerOne = createGameBoard(
    //         1,
    //         this.playerOne.getBoard(),
    //         false,
    //         true
    //     );
    //     const gameBoardPlayerTwo = createGameBoard(
    //         2,
    //         this.playerTwo.getBoard(),
    //         true,
    //         false
    //     );

    //     mainApp.appendChild(gameBoardPlayerOne);
    //     mainApp.appendChild(gameBoardPlayerTwo);
    // }
}

export default GameEngine;
