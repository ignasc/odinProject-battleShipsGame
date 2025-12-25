const gameBoard = document.createElement("div");
gameBoard.setAttribute("class", "gameBoard");

const singleSquare = document.createElement("div");
singleSquare.setAttribute("class", "single-square");

let debug_squareCounter = 1;
for (let coordY = 0; coordY < 10; coordY++) {
    for (let coordX = 0; coordX < 10; coordX++) {
        const element = singleSquare.cloneNode();
        element.setAttribute("data-coordx", coordX);
        element.setAttribute("data-coordy", coordY);
        element.innerHTML = debug_squareCounter
        debug_squareCounter++
        gameBoard.appendChild(element);
    }
}

export default gameBoard;
