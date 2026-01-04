import GameBoard from "./gameboard.js";

class Player {
    constructor(isHuman = true, name = "Unknown", playerNumber) {
        this.isHuman = isHuman;
        this.name = name;
        this.gameBoard = new GameBoard(playerNumber);
        this.playerTurn = true;
        this.playerNumber = playerNumber;
    }

    disableInteraction() {
        this.playerTurn = false;
    }
    enableInteraction() {
        this.playerTurn = true;
    }

    getName() {
        return this.name;
    }

    getBoard() {
        return this.gameBoard;
    }

    placeShip(length, coordX, coordY, isRotated90) {
        this.gameBoard.spawnShip(length, coordX, coordY, isRotated90);
    }
}

export default Player;
