import GameBoard from "./gameboard.js";

class Player {
    constructor(isHuman = true, name = "Unknown", playerNumber) {
        this.isHuman = isHuman;
        this.name = name;
        this.gameBoard = new GameBoard(playerNumber);
        this.playerTurn = true;
        this.playerNumber = playerNumber;

        this.aiMoves = [];

        if (!this.isHuman) {
            this.#setupComputerAI();
        }
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

    #setupComputerAI() {
        // generate all board positions
        const arrayOfMoves = [];
        for (let coordX = 0; coordX < 10; coordX++) {
            for (let coordY = 0; coordY < 10; coordY++) {
                arrayOfMoves.push([coordX, coordY]);
            }
        }
        // shuffle the array in semi-random order
        this.#shuffleArray(arrayOfMoves);
        // to be implemented
        while (arrayOfMoves.length > 0) {
            this.aiMoves.push(arrayOfMoves.pop());
        }

        let safetyCounter = 100;
        while (safetyCounter > 0 && !this.gameBoard.allShipsPlaced()) {
            const randomIndex = Math.floor(
                Math.random() * (this.aiMoves.length - 1)
            );

            this.gameBoard.spawnShip(
                this.gameBoard.getNextShip(),
                this.aiMoves[randomIndex][0],
                this.aiMoves[randomIndex][1],
                Math.random() < 0.5 ? true : false,
                2
            );
            safetyCounter--;
        }
    }

    #shuffleArray(array) {
        // Fisher–Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

            let t = array[i];
            array[i] = array[j];
            array[j] = t;
        }
    }

    executeComputerMove(enemyGameBoard = null) {
        if (!enemyGameBoard) {
            return;
        }
        const coordX = this.aiMoves[this.aiMoves.length - 1][0];
        const coordY = this.aiMoves.pop()[1];
        enemyGameBoard.receiveAttack(coordX, coordY);
    }
}

export default Player;
