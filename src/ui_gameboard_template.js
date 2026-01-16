/*
Note: cloneNode() does not clone event listener, even with "true" parameter
Instead, using a factory function to return a new DOM element
*/

import scoreBoard from "./ui_score_board.js";

class GameUI {
    constructor(playerOneRef, playerTwoRef, gameEngine) {
        this.playerOneRef = playerOneRef;
        this.playerTwoRef = playerTwoRef;
        this.playerOneBoard = playerOneRef.getBoard();
        this.playerTwoBoard = playerTwoRef.getBoard();
        this.gameEngine = gameEngine;
        this.mainApp = document.getElementById("mainApp");
        this.playerOneTurn = true;
        this.btnMessage = "Start Game";
        this.shipPlacementActive = true;
        this.gameplayActive = false;
        this.gameEnded = false;

        // initial game parameters
        this.playerTwoRef.disableInteraction();
    }

    updateUI() {
        this.mainApp.innerHTML = "";

        const gameBoardContainer = document.createElement("div");
        gameBoardContainer.setAttribute("id", "game-boards");

        const gameBoardPlayerOneContainer = document.createElement("div");
        gameBoardPlayerOneContainer.setAttribute(
            "class",
            "game-board-player-container"
        );
        const gameBoardPlayerTwoContainer = document.createElement("div");
        gameBoardPlayerTwoContainer.setAttribute(
            "class",
            "game-board-player-container"
        );

        let currentPlayer = null;

        const controlButton = document.createElement("button");
        controlButton.setAttribute("id", "btn-control");

        const footer = document.createElement("h1");
        this.mainApp.appendChild(footer);
        this.mainApp.appendChild(gameBoardContainer);

        if (this.playerOneBoard.boardHidden) {
            footer.innerHTML = "Player TWO turn";
        } else {
            footer.innerHTML = "Player ONE turn";
        }

        // Game winning conditions
        if (
            this.gameplayActive &&
            (this.playerOneBoard.areAllShipsDestroyed() ||
                this.playerTwoBoard.areAllShipsDestroyed())
        ) {
            this.gameplayActive = false;
            this.gameEnded = true;
            let winningPlayer = null;

            this.playerOneRef.disableInteraction();
            this.playerTwoRef.disableInteraction();

            if (this.playerOneBoard.areAllShipsDestroyed()) {
                winningPlayer = this.playerTwoRef;
            } else {
                winningPlayer = this.playerOneRef;
            }
            // generate game board
            const gameBoardPlayerOne = this.#createGameBoard(
                this.playerOneRef.playerNumber,
                this.playerOneBoard,
                false,
                false,
                false
            );
            const gameBoardPlayerTwo = this.#createGameBoard(
                this.playerTwoRef.playerNumber,
                this.playerTwoBoard,
                false,
                false,
                false
            );
            gameBoardPlayerOneContainer.appendChild(
                scoreBoard(this.playerOneBoard, this.shipPlacementActive)
            );

            gameBoardPlayerOneContainer.appendChild(gameBoardPlayerOne);

            gameBoardPlayerTwoContainer.appendChild(
                scoreBoard(this.playerTwoBoard, this.shipPlacementActive)
            );

            gameBoardPlayerTwoContainer.appendChild(gameBoardPlayerTwo);

            // set messages
            footer.innerHTML = `${winningPlayer.name} has won the game!`;
        }

        // Player ONE ship placement
        if (this.shipPlacementActive && this.playerOneRef.playerTurn) {
            currentPlayer = this.playerOneRef;
            const gameBoardPlayerOne = this.#createGameBoard(
                this.playerOneRef.playerNumber,
                this.playerOneBoard,
                this.playerOneBoard.boardHidden,
                this.shipPlacementActive
            );
            const gameBoardPlayerTwo = this.#createGameBoard(
                this.playerTwoRef.playerNumber,
                this.playerTwoBoard,
                true,
                false,
                true
            );
            gameBoardPlayerOneContainer.appendChild(
                scoreBoard(this.playerOneBoard, this.shipPlacementActive)
            );

            gameBoardPlayerOneContainer.appendChild(gameBoardPlayerOne);

            gameBoardPlayerTwoContainer.appendChild(
                scoreBoard(this.playerTwoBoard, this.shipPlacementActive)
            );

            gameBoardPlayerTwoContainer.appendChild(gameBoardPlayerTwo);

            footer.innerHTML = `${this.playerOneRef.name} turn to allocate ships`;
            this.btnMessage = "Hide board after ships are placed";
        }

        // Player TWO ship placement
        if (this.shipPlacementActive && this.playerTwoRef.playerTurn) {
            currentPlayer = this.playerTwoRef;
            const gameBoardPlayerTwo = this.#createGameBoard(
                this.playerTwoRef.playerNumber,
                this.playerTwoBoard,
                this.playerTwoBoard.boardHidden,
                this.shipPlacementActive
            );
            const gameBoardPlayerOne = this.#createGameBoard(
                this.playerOneRef.playerNumber,
                this.playerOneBoard,
                true,
                false,
                true
            );
            gameBoardPlayerOneContainer.appendChild(
                scoreBoard(this.playerOneBoard, this.shipPlacementActive)
            );

            gameBoardPlayerOneContainer.appendChild(gameBoardPlayerOne);

            gameBoardPlayerTwoContainer.appendChild(
                scoreBoard(this.playerTwoBoard, this.shipPlacementActive)
            );

            gameBoardPlayerTwoContainer.appendChild(gameBoardPlayerTwo);

            footer.innerHTML = `${this.playerTwoRef.name} turn to allocate ships`;
            this.btnMessage = "Hide board after ships are placed";
        }

        // Player ONE turn to attack
        if (this.gameplayActive && this.playerOneRef.playerTurn) {
            currentPlayer = this.playerOneRef;
            // generate game board
            const gameBoardPlayerTwo = this.#createGameBoard(
                this.playerTwoRef.playerNumber,
                this.playerTwoBoard,
                this.playerTwoBoard.boardHidden,
                this.shipPlacementActive
            );
            const gameBoardPlayerOne = this.#createGameBoard(
                this.playerOneRef.playerNumber,
                this.playerOneBoard,
                true,
                false,
                true
            );
            gameBoardPlayerOneContainer.appendChild(
                scoreBoard(this.playerOneBoard, this.shipPlacementActive)
            );

            gameBoardPlayerOneContainer.appendChild(gameBoardPlayerOne);

            gameBoardPlayerTwoContainer.appendChild(
                scoreBoard(this.playerTwoBoard, this.shipPlacementActive)
            );

            gameBoardPlayerTwoContainer.appendChild(gameBoardPlayerTwo);

            // set messages
            footer.innerHTML = `${this.playerOneRef.name} turn to attack`;
        }

        // Player TWO turn to attack
        if (this.gameplayActive && this.playerTwoRef.playerTurn) {
            currentPlayer = this.playerTwoRef;
            // if player two is computer, execute its move
            if (!currentPlayer.isHuman) {
                currentPlayer.executeComputerMove(this.playerOneBoard);
                currentPlayer.disableInteraction();
                this.playerOneRef.enableInteraction();
                this.updateUI();
                return; //note: this return prevents double "restart game" button when computer opponent wins in the end game. Issue needs solving.
            }
            // generate game board
            const gameBoardPlayerOne = this.#createGameBoard(
                this.playerOneRef.playerNumber,
                this.playerOneBoard,
                this.playerOneBoard.boardHidden,
                this.shipPlacementActive
            );
            const gameBoardPlayerTwo = this.#createGameBoard(
                this.playerTwoRef.playerNumber,
                this.playerTwoBoard,
                true,
                false,
                true
            );
            gameBoardPlayerOneContainer.appendChild(
                scoreBoard(this.playerOneBoard, this.shipPlacementActive)
            );

            gameBoardPlayerOneContainer.appendChild(gameBoardPlayerOne);

            gameBoardPlayerTwoContainer.appendChild(
                scoreBoard(this.playerTwoBoard, this.shipPlacementActive)
            );

            gameBoardPlayerTwoContainer.appendChild(gameBoardPlayerTwo);

            // set messages
            footer.innerHTML = `${this.playerTwoRef.name} turn to attack`;
        }

        gameBoardContainer.appendChild(gameBoardPlayerOneContainer);
        gameBoardContainer.appendChild(gameBoardPlayerTwoContainer);

        // Button to progress through game preparation
        controlButton.addEventListener("click", (e) => {
            e.preventDefault();
            // game winning conditions or mid game
            if (this.gameEnded || this.gameplayActive) {
                window.location.reload();
                return;
            }

            // switch to player two ship placement
            if (
                this.shipPlacementActive &&
                this.playerOneBoard.allShipsPlaced() &&
                this.playerOneRef.playerTurn
            ) {
                this.playerOneRef.disableInteraction();
                this.playerTwoRef.enableInteraction();
                this.playerOneBoard.toggleBoard();
                this.playerTwoBoard.toggleBoard();
                this.updateUI();
            }

            //if all players finished placing ships, disable ship placement mode and switch to gameplay mode
            if (
                this.shipPlacementActive &&
                !this.gameplayActive &&
                this.playerOneBoard.allShipsPlaced() &&
                this.playerTwoBoard.allShipsPlaced()
            ) {
                this.shipPlacementActive = false;
                this.gameplayActive = true;
                this.playerOneRef.enableInteraction();
                this.playerTwoRef.disableInteraction();
                this.playerTwoBoard.toggleBoard();
                this.btnMessage = "Restart Game";
                this.updateUI();
            }
        });

        controlButton.innerHTML = this.btnMessage;
        // if (!this.gameplayActive || this.gameEnded) {
        // }
        this.mainApp.appendChild(controlButton);
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
        const button = document.createElement("button");
        button.setAttribute("class", "single-square");

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
                const newPositionSquareElement = button.cloneNode(true);
                const positionContents = gameBoardRef.getPositionContents(
                    coordX,
                    coordY
                );

                // position square indications
                if (
                    positionContents.wasAttacked() &&
                    !positionContents.hasShip()
                ) {
                    newPositionSquareElement.setAttribute(
                        "class",
                        "position-attacked"
                    );
                } else if (
                    positionContents.wasAttacked() &&
                    positionContents.hasShip()
                ) {
                    newPositionSquareElement.setAttribute(
                        "class",
                        "position-ship-damaged"
                    );
                } else if (conceal) {
                    newPositionSquareElement.setAttribute(
                        "class",
                        "position-unknown"
                    );
                } else if (
                    !positionContents.wasAttacked() &&
                    positionContents.hasShip()
                ) {
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

                    // disable all events when game has ended
                    if (this.gameEnded) {
                        return;
                    }

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
