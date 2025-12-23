import GameBoard from "./gameboard";

class Player {
    constructor(isHuman = true, name = "Unknown") {
        this.isHuman = isHuman;
        this.name = name;
        this.gameBoard = new GameBoard();
    }

    getName() {
        return this.name;
    }

    placeShip(length, coordX, coordY, isRotated90) {
        this.gameBoard.spawnShip(length, coordX, coordY, isRotated90);
    }
}

export default Player;
