/*
Note: cloneNode() does not clone event listener, even with "true" parameter
Instead, using a factory function to return a new DOM element
*/

import singleSquare from "./ui_gameboard_single_square.js";

function createGameBoard() {
    const gameBoard = document.createElement("div");
    gameBoard.setAttribute("class", "gameBoard");

    for (let coordY = 0; coordY < 10; coordY++) {
        for (let coordX = 0; coordX < 10; coordX++) {
            const element = singleSquare.cloneNode(true);

            element.setAttribute("data-coordx", coordX + 1);
            element.setAttribute("data-coordy", coordY + 1);

            element.addEventListener("click", (e) => {
                e.preventDefault();
                console.log(e);
            });

            gameBoard.appendChild(element);
        }
    }
    return gameBoard;
}

export default createGameBoard;
