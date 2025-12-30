/*
Note: cloneNode() does not clone event listener, even with "true" parameter
Instead, using a factory function to return a new DOM element
*/

import Ship from "./ship.js";
import singleSquare from "./ui_gameboard_single_square.js";

class GameUI {
    constructor(playerOneRef, playerTwoRef, gameEngine) {
        this.playerOneRef = playerOneRef;
        this.playerTwoRef = playerTwoRef;
        this.gameEngine = gameEngine;
        this.mainApp = document.getElementById("mainApp");
    }

    updateUI(shipPlacement = false) {
        this.mainApp.innerHTML = "";
        const gameBoardPlayerOne = this.#createGameBoard(
            1,
            this.playerOneRef.getBoard(),
            false,
            shipPlacement
        );
        const gameBoardPlayerTwo = this.#createGameBoard(
            2,
            this.playerTwoRef.getBoard(),
            true,
            shipPlacement
        );

        this.mainApp.appendChild(gameBoardPlayerOne);
        this.mainApp.appendChild(gameBoardPlayerTwo);
    }

    #createGameBoard(
        playerNumber,
        gameBoardRef = null,
        conceal = false,
        shipPlacement = false
    ) {
        const gameBoardElement = document.createElement("div");
        gameBoardElement.setAttribute("class", "gameBoard");
        gameBoardElement.setAttribute("id", "gameBoard" + playerNumber);

        for (let coordX = 0; coordX < 10; coordX++) {
            for (let coordY = 0; coordY < 10; coordY++) {
                const element = singleSquare.cloneNode(true);
                const positionContents = gameBoardRef.getPositionContents(
                    coordX,
                    coordY
                );

                if (positionContents === "attacked") {
                    element.setAttribute("class", "position-attacked");
                } else if (positionContents === "damaged") {
                    element.setAttribute("class", "position-ship-damaged");
                } else if (conceal) {
                    element.setAttribute("class", "position-unknown");
                } else if (positionContents instanceof Ship) {
                    element.setAttribute("class", "position-ship-healthy");
                } else {
                    element.setAttribute("class", "position-unknown");
                }

                element.setAttribute(
                    "id",
                    playerNumber + "_" + "X" + coordX + "Y" + coordY
                );
                element.setAttribute("data-playerNo", playerNumber);

                element.setAttribute("data-coordx", coordX);
                element.setAttribute("data-coordy", coordY);

                // event listeners: either ship placement or atacking
                element.addEventListener("click", (e) => {
                    const coordX = e.target.getAttribute("data-coordx");
                    const coordY = e.target.getAttribute("data-coordy");
                    e.preventDefault();
                    if (shipPlacement) {
                        gameBoardRef.spawnShip(
                            3,
                            coordX,
                            coordY,
                            false,
                            playerNumber
                        );
                        this.updateUI();
                    } else {
                        gameBoardRef.receiveAttack(coordX, coordY);
                        const positionStatus = gameBoardRef.getPositionContents(
                            coordX,
                            coordY
                        );
                        // this.#updatePositionStatus(
                        //     positionStatus,
                        //     playerNumber,
                        //     coordX,
                        //     coordY
                        // );
                        this.updateUI();
                    }
                });

                gameBoardElement.appendChild(element);
            }
        }
        return gameBoardElement;
    }

    #updatePositionStatus(status, playerNumber, coordX, coordY) {
        const gameBoardPosition = document.getElementById(
            playerNumber + "_" + "X" + coordX + "Y" + coordY
        );

        if (status === "attacked") {
            gameBoardPosition.setAttribute("class", "position-attacked");
        } else if (status === "damaged") {
            gameBoardPosition.setAttribute("class", "position-ship-damaged");
        }
    }
}

export default GameUI;
