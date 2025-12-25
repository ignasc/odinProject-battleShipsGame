/*
Note: cloneNode() does not clone event listener, even with "true" parameter
Instead, using a factory function to return a new DOM element
*/

import Ship from "./ship.js";
import singleSquare from "./ui_gameboard_single_square.js";

function createGameBoard(playerNumber, gameBoardRef = null) {
    const gameBoard = document.createElement("div");
    gameBoard.setAttribute("class", "gameBoard");
    gameBoard.setAttribute("id", "gameBoard" + playerNumber);

    for (let coordY = 0; coordY < 10; coordY++) {
        for (let coordX = 0; coordX < 10; coordX++) {
            const element = singleSquare.cloneNode(true);
            const positionContents = gameBoardRef.getPositionContents(
                coordX,
                coordY
            );

            if (positionContents === "attacked") {
                element.setAttribute("class", "position-attacked");
            } else if (positionContents instanceof Ship) {
                element.setAttribute("class", "position-ship-healthy");
            } else if (positionContents === "damaged") {
                element.setAttribute("class", "position-ship-damaged");
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

            element.addEventListener("click", (e) => {
                const coordX = e.target.getAttribute("data-coordx");
                const coordY = e.target.getAttribute("data-coordy");
                e.preventDefault();
                gameBoardRef.receiveAttack(coordX, coordY);
                const positionStatus = gameBoardRef.getPositionContents(
                    coordX,
                    coordY
                );
                updatePositionStatus(
                    positionStatus,
                    playerNumber,
                    coordX,
                    coordY
                );
            });

            gameBoard.appendChild(element);
        }
    }
    return gameBoard;
}

function updatePositionStatus(status, playerNumber, coordX, coordY) {
    const gameBoardPosition = document.getElementById(
        playerNumber + "_" + "X" + coordX + "Y" + coordY
    );

    if (status === "attacked") {
        gameBoardPosition.setAttribute("class", "position-attacked");
    } else if (status === "damaged") {
        gameBoardPosition.setAttribute("class", "position-ship-damaged");
    }
}

export { createGameBoard, updatePositionStatus };
