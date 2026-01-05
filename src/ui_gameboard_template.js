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
        this.btnMessage = "Start Game";
        this.shipPlacementActive = true;
        this.gameplayActive = false;

        // initial game parameters
        this.playerTwoRef.disableInteraction();
    }

    updateUI() {
        this.mainApp.innerHTML = "";

        const gameBoards = document.createElement("div");
        gameBoards.setAttribute("id", "game-boards");

        let currentPlayer = null;

        const controlButton = document.createElement("button");
        // controlButton.innerHTML = this.btnMessage;
        controlButton.setAttribute("id", "btn-control");

        const footer = document.createElement("div");
        this.mainApp.appendChild(footer);
        this.mainApp.appendChild(gameBoards);

        if (this.playerOneRef.getBoard().boardHidden) {
            footer.innerHTML = "Player TWO turn";
        } else {
            footer.innerHTML = "Player ONE turn";
        }

        // this.shipPlacementActive =
        //     !this.playerOneRef.getBoard().allShipsPlaced() ||
        //     !this.playerTwoRef.getBoard().allShipsPlaced();

        // Player ONE ship placement
        if (this.shipPlacementActive && this.playerOneRef.playerTurn) {
            currentPlayer = this.playerOneRef;
            const gameBoardPlayerOne = this.#createGameBoard(
                1,
                this.playerOneRef.getBoard(),
                this.playerOneRef.getBoard().boardHidden,
                this.shipPlacementActive
            );
            const gameBoardPlayerTwo = this.#createGameBoard(
                1,
                this.playerTwoRef.getBoard(),
                true,
                false,
                true
            );
            gameBoards.appendChild(gameBoardPlayerOne);
            gameBoards.appendChild(gameBoardPlayerTwo);
            footer.innerHTML = `${this.playerOneRef.name} turn to allocate ships`;
            this.btnMessage = "Hide board after ships are placed";
        }

        // Player TWO ship placement
        if (this.shipPlacementActive && this.playerTwoRef.playerTurn) {
            currentPlayer = this.playerTwoRef;
            const gameBoardPlayerTwo = this.#createGameBoard(
                2,
                this.playerTwoRef.getBoard(),
                this.playerTwoRef.getBoard().boardHidden,
                this.shipPlacementActive
            );
            const gameBoardPlayerOne = this.#createGameBoard(
                2,
                this.playerTwoRef.getBoard(),
                true,
                false,
                true
            );
            gameBoards.appendChild(gameBoardPlayerOne);
            gameBoards.appendChild(gameBoardPlayerTwo);
            footer.innerHTML = `${this.playerTwoRef.name} turn to allocate ships`;
            this.btnMessage = "Hide board after ships are placed";
        }

        // Player ONE turn to attack
        if (this.gameplayActive && this.playerOneRef.playerTurn) {
            currentPlayer = this.playerOneRef;
            // generate game board
            const gameBoardPlayerTwo = this.#createGameBoard(
                2,
                this.playerTwoRef.getBoard(),
                this.playerTwoRef.getBoard().boardHidden,
                this.shipPlacementActive
            );
            const gameBoardPlayerOne = this.#createGameBoard(
                2,
                this.playerOneRef.getBoard(),
                true,
                false,
                true
            );
            gameBoards.appendChild(gameBoardPlayerOne);
            gameBoards.appendChild(gameBoardPlayerTwo);

            // set messages
            footer.innerHTML = `${this.playerOneRef.name} turn to attack`;
        }

        // Player TWO turn to attack
        if (this.gameplayActive && this.playerTwoRef.playerTurn) {
            currentPlayer = this.playerTwoRef;
            // if player to is computer, execute its move
            if (!currentPlayer.isHuman) {
                currentPlayer.executeComputerMove(this.playerOneRef.getBoard());
                currentPlayer.disableInteraction();
                this.playerOneRef.enableInteraction();
                this.updateUI();
            }
            // generate game board
            const gameBoardPlayerOne = this.#createGameBoard(
                1,
                this.playerOneRef.getBoard(),
                this.playerOneRef.getBoard().boardHidden,
                this.shipPlacementActive
            );
            const gameBoardPlayerTwo = this.#createGameBoard(
                2,
                this.playerTwoRef.getBoard(),
                true,
                false,
                true
            );
            gameBoards.appendChild(gameBoardPlayerOne);
            gameBoards.appendChild(gameBoardPlayerTwo);

            // set messages
            footer.innerHTML = `${this.playerTwoRef.name} turn to attack`;
        }

        // Button to progress through game preparation
        controlButton.addEventListener("click", (e) => {
            e.preventDefault();

            // switch to player two ship placement
            if (
                this.shipPlacementActive &&
                this.playerOneRef.getBoard().allShipsPlaced() &&
                this.playerOneRef.playerTurn
            ) {
                this.playerOneRef.disableInteraction();
                this.playerTwoRef.enableInteraction();
                this.playerOneRef.getBoard().toggleBoard();
                this.playerTwoRef.getBoard().toggleBoard();
                this.updateUI();
            }

            //if all players finished placing ships, disable ship placement mode and switch to gameplay mode
            if (
                this.shipPlacementActive &&
                !this.gameplayActive &&
                this.playerOneRef.getBoard().allShipsPlaced() &&
                this.playerTwoRef.getBoard().allShipsPlaced()
            ) {
                this.shipPlacementActive = false;
                this.gameplayActive = true;
                this.playerOneRef.enableInteraction();
                this.playerTwoRef.disableInteraction();
                this.playerTwoRef.getBoard().toggleBoard();
                this.btnMessage = "Restart Game";
                this.updateUI();
            }
        });

        controlButton.innerHTML = this.btnMessage;
        if (!this.gameplayActive) {
            this.mainApp.appendChild(controlButton);
        }
    }

    #createGameBoard(
        playerNumber,
        gameBoardRef = null,
        conceal = false,
        shipPlacement = false,
        small = false
    ) {
        const gameBoardElement = document.createElement("div");
        if (small) {
            gameBoardElement.setAttribute("class", "gameBoard-small");
        } else {
            gameBoardElement.setAttribute("class", "gameBoard");
        }
        let shipIsRotated = false;

        let currentPlayer = null;
        if (playerNumber === 1) {
            currentPlayer = this.playerTwoRef;
        } else {
            currentPlayer = this.playerOneRef;
        }

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

                    // if player is computer AI, disable all event listeners
                    // if(!this.playerTwoRef.isHuman && playerNumber === 2){
                    //     return;
                    // }

                    const coordX = e.target.getAttribute("data-coordx");
                    const coordY = e.target.getAttribute("data-coordy");

                    if (this.shipPlacementActive) {
                        if (!conceal && !gameBoardRef.allShipsPlaced()) {
                            gameBoardRef.spawnShip(
                                gameBoardRef.getNextShip(),
                                coordX,
                                coordY,
                                shipIsRotated,
                                playerNumber
                            );
                        }
                    } else if (
                        this.gameplayActive &&
                        currentPlayer.playerTurn &&
                        currentPlayer.playerNumber != gameBoardRef.playerNumber
                    ) {
                        // during gameplay gameBoardRef references enemy board
                        const attackResult = gameBoardRef.receiveAttack(
                            coordX,
                            coordY
                        );
                        if (attackResult != 0) {
                            currentPlayer.disableInteraction();
                            if (currentPlayer.playerNumber === 1) {
                                this.playerTwoRef.enableInteraction();
                            } else {
                                this.playerOneRef.enableInteraction();
                            }
                        }
                    }
                    this.updateUI();
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
