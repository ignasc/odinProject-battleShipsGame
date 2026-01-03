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
        this.playerOneTurn = true;
    }

    updateUI() {
        this.mainApp.innerHTML = "";

        const footer = document.createElement("div");

        if (this.playerOneRef.getBoard().boardHidden) {
            footer.innerHTML = "Player TWO turn";
        } else {
            footer.innerHTML = "Player ONE turn";
        }

        const shipPlacementActive =
            !this.playerOneRef.getBoard().allShipsPlaced() ||
            !this.playerTwoRef.getBoard().allShipsPlaced();

        // Player ONE ship placement
        if (!this.playerOneRef.getBoard().allShipsPlaced()) {
            const gameBoardPlayerOne = this.#createGameBoard(
                1,
                this.playerOneRef.getBoard(),
                this.playerOneRef.getBoard().boardHidden,
                shipPlacementActive
            );
            this.mainApp.appendChild(gameBoardPlayerOne);
            footer.innerHTML = "Player ONE turn to allocate ships";
        }

        // Player TWO ship placement
        if (
            this.playerOneRef.getBoard().allShipsPlaced() &&
            !this.playerTwoRef.getBoard().allShipsPlaced()
        ) {
            const gameBoardPlayerTwo = this.#createGameBoard(
                2,
                this.playerTwoRef.getBoard(),
                this.playerTwoRef.getBoard().boardHidden,
                shipPlacementActive
            );
            this.mainApp.appendChild(gameBoardPlayerTwo);
            footer.innerHTML = "Player TWO turn to allocate ships";
        }

        // Player ONE turn to attack
        if (!shipPlacementActive && !this.playerOneRef.getBoard().boardHidden) {
            const gameBoardPlayerTwo = this.#createGameBoard(
                2,
                this.playerTwoRef.getBoard(),
                this.playerTwoRef.getBoard().boardHidden,
                shipPlacementActive
            );
            this.mainApp.appendChild(gameBoardPlayerTwo);
            footer.innerHTML = "Player ONE turn to attack";
        }
        // Player TWO turn to attack
        if (!shipPlacementActive && !this.playerTwoRef.getBoard().boardHidden) {
            const gameBoardPlayerOne = this.#createGameBoard(
                1,
                this.playerOneRef.getBoard(),
                this.playerOneRef.getBoard().boardHidden,
                shipPlacementActive
            );
            this.mainApp.appendChild(gameBoardPlayerOne);
            footer.innerHTML = "Player TWO turn to attack";
        }

        this.mainApp.appendChild(footer);
    }

    #createGameBoard(
        playerNumber,
        gameBoardRef = null,
        conceal = false,
        shipPlacement = false
    ) {
        const gameBoardElement = document.createElement("div");
        gameBoardElement.setAttribute("class", "gameBoard");
        let shipIsRotated = false;

        // active board highlight
        if (shipPlacement) {
            if (!conceal) {
                gameBoardElement.classList.toggle("gameBoard-green");
            }
        } else {
            if (conceal) {
                gameBoardElement.classList.toggle("gameBoard-green");
            }
        }

        gameBoardElement.setAttribute("id", "gameBoard" + playerNumber);

        // fill boards with position squares
        for (let coordX = 0; coordX < 10; coordX++) {
            for (let coordY = 0; coordY < 10; coordY++) {
                const newPositionSquareElement = singleSquare.cloneNode(true);
                const positionContents = gameBoardRef.getPositionContents(
                    coordX,
                    coordY
                );

                // position square indications
                if (positionContents === "attacked") {
                    newPositionSquareElement.setAttribute(
                        "class",
                        "position-attacked"
                    );
                } else if (positionContents === "damaged") {
                    newPositionSquareElement.setAttribute(
                        "class",
                        "position-ship-damaged"
                    );
                } else if (conceal) {
                    newPositionSquareElement.setAttribute(
                        "class",
                        "position-unknown"
                    );
                } else if (positionContents instanceof Ship) {
                    newPositionSquareElement.setAttribute(
                        "class",
                        "position-ship-healthy"
                    );
                } else {
                    newPositionSquareElement.setAttribute(
                        "class",
                        "position-unknown"
                    );
                }

                newPositionSquareElement.setAttribute(
                    "id",
                    playerNumber + "_" + "X" + coordX + "Y" + coordY
                );
                newPositionSquareElement.setAttribute(
                    "data-playerNo",
                    playerNumber
                );

                newPositionSquareElement.setAttribute("data-coordx", coordX);
                newPositionSquareElement.setAttribute("data-coordy", coordY);

                // event listeners: either ship placement or atacking
                newPositionSquareElement.addEventListener("click", (e) => {
                    e.preventDefault();
                    const coordX = e.target.getAttribute("data-coordx");
                    const coordY = e.target.getAttribute("data-coordy");

                    if (shipPlacement) {
                        if (!conceal) {
                            gameBoardRef.spawnShip(
                                gameBoardRef.getNextShip(),
                                coordX,
                                coordY,
                                shipIsRotated,
                                playerNumber
                            );
                            if (gameBoardRef.allShipsPlaced()) {
                                this.playerOneRef.getBoard().toggleBoard();
                                this.playerTwoRef.getBoard().toggleBoard();
                            }
                            this.updateUI();
                        }
                    } else {
                        if (gameBoardRef.boardHidden) {
                            const attackResult = gameBoardRef.receiveAttack(
                                coordX,
                                coordY
                            );
                            if (attackResult != 0) {
                                this.playerOneRef.getBoard().toggleBoard();
                                this.playerTwoRef.getBoard().toggleBoard();
                            }
                        }

                        this.updateUI();
                    }
                });

                // event listener to highlight ship placement
                if (shipPlacement && !conceal) {
                    // rotate ship placement using mouse wheel
                    newPositionSquareElement.addEventListener("wheel", () => {
                        shipIsRotated = !shipIsRotated;
                    });
                    // when mouse enters position element
                    newPositionSquareElement.addEventListener(
                        "mouseenter",
                        (e) => {
                            e.preventDefault();
                            const shipLength = gameBoardRef.getNextShip();
                            const coordX = e.target.getAttribute("data-coordx");
                            const coordY = e.target.getAttribute("data-coordy");
                            for (const child of gameBoardElement.children) {
                                const childID = child.getAttribute("id");

                                // only select positions that ship will cover
                                for (let i = 0; i < shipLength; i++) {
                                    if (!shipIsRotated) {
                                        if (
                                            childID ===
                                            `${playerNumber}_X${+coordX + i}Y${+coordY}`
                                        ) {
                                            child.classList.add(
                                                "position-ship-placing"
                                            );
                                        }
                                    } else {
                                        if (
                                            childID ===
                                            `${playerNumber}_X${+coordX}Y${+coordY + i}`
                                        ) {
                                            child.classList.add(
                                                "position-ship-placing"
                                            );
                                        }
                                    }
                                }
                            }
                        }
                    );

                    // when mouse leaves position element
                    newPositionSquareElement.addEventListener(
                        "mouseleave",
                        (e) => {
                            e.preventDefault();
                            for (const child of gameBoardElement.children) {
                                child.classList.remove("position-ship-placing");
                            }
                        }
                    );
                }

                gameBoardElement.appendChild(newPositionSquareElement);
            }
        }

        return gameBoardElement;
    }
}

export default GameUI;
