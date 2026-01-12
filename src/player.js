import GameBoard from "./gameboard.js";
import Ship from "./ship.js";

class Player {
    constructor(isHuman = true, name = "Unknown", playerNumber) {
        this.isHuman = isHuman;
        this.name = name;
        this.gameBoard = new GameBoard(playerNumber);
        this.playerTurn = true;
        this.playerNumber = playerNumber;

        this.aiMoves = [];
        this.aiLevel = null;

        if (!this.isHuman) {
            this.#setupComputerAI();
        }
    }

    setAiLevel(level) {
        this.aiLevel = level;
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

    #isShipLocationIllegal(coordX, coordY, targetX, targetY) {
        if (
            (coordX - 1 === targetX && coordY + 1 === targetY) ||
            (coordX + 1 === targetX && coordY + 1 === targetY) ||
            (coordX - 1 === targetX && coordY - 1 === targetY) ||
            (coordX + 1 === targetX && coordY - 1 === targetY)
        ) {
            return true;
        } else {
            return false;
        }
    }

    #isShipLocationPossible(coordX, coordY, targetX, targetY, shipRef = null) {
        if (
            (coordX - 1 === targetX && coordY === targetY) ||
            (coordX + 1 === targetX && coordY === targetY) ||
            (coordX === targetX && coordY - 1 === targetY) ||
            (coordX === targetX && coordY + 1 === targetY)
        ) {
            // if ship is already sunk, then targeted position cannot have another instance of ship, otherwise target position may have another ship instance
            if (shipRef instanceof Ship) {
                return !shipRef.isSunk();
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    executeComputerMove(enemyGameBoard = null) {
        if (!enemyGameBoard) {
            return;
        }
        const coordX = this.aiMoves[this.aiMoves.length - 1][0];
        const coordY = this.aiMoves.pop()[1];
        const positionContents = enemyGameBoard.getPositionContents(
            coordX,
            coordY
        );
        const result = enemyGameBoard.receiveAttack(coordX, coordY);
        console.log(`PC attacks at ${coordX}:${coordY}`);

        //analyse attack results based on difficulty level
        if (
            result === 1 &&
            (this.aiLevel === "normal" || this.aiLevel === "hard")
        ) {
            //check if ship has been destroyed
            // remove illegal attack positions and move potential ship attack positions to the front queue
            const potentialShipPositions = [];
            const remainingPositions = [];
            this.aiMoves.forEach((position) => {
                const positionIlegal = this.#isShipLocationIllegal(
                    coordX,
                    coordY,
                    position[0],
                    position[1]
                );
                const positionMayBeShip = this.#isShipLocationPossible(
                    coordX,
                    coordY,
                    position[0],
                    position[1],
                    positionContents instanceof Ship ? positionContents : null
                );

                if (positionMayBeShip) {
                    potentialShipPositions.push(position);
                } else if (!positionIlegal) {
                    remainingPositions.push(position);
                }
            });
            this.aiMoves = [...remainingPositions, ...potentialShipPositions];
        }
    }
}

export default Player;
