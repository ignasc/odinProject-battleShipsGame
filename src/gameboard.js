import Ship from "./ship.js";

const surroundingPositionOffsets = [
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [0, 0],
];

class GameBoard {
    constructor(playerNumber) {
        this.ships = [];
        this.board = [];
        this.positionsFired = [];
        this.missedAttacks = 0;
        for (let i = 0; i < 10; i++) {
            const row = [];
            for (let j = 0; j < 10; j++) {
                row.push("empty");
            }
            this.board.push(row);
        }

        // this.shipsLeftToPlace = [1, 1, 1, 2, 2, 3];
        this.shipsLeftToPlace = [2, 3];
        this.boardHidden = false;
        this.playerNumber = parseInt(playerNumber);
    }

    getNextShip() {
        return this.shipsLeftToPlace[this.shipsLeftToPlace.length - 1];
    }

    getPositionContents(coordX, coordY) {
        return this.board[coordY][coordX];
    }

    #setPositionContents(status, coordX, coordY) {
        this.board[coordY][coordX] = status;
    }

    getBoardContents() {
        return this.board;
    }

    getPlayerNumber() {
        return this.playerNumber;
    }

    toggleBoard() {
        this.boardHidden = !this.boardHidden;
    }

    allShipsPlaced() {
        return this.shipsLeftToPlace.length === 0 ? true : false;
    }

    #isShipPositionLegal(coordX, coordY) {
        for (let i = 0; i < surroundingPositionOffsets.length; i++) {
            const posOffset = surroundingPositionOffsets[i];
            const offsetX = coordX + posOffset[0];
            const offsetY = coordY + posOffset[1];
            if (offsetX >= 0 && offsetY >= 0 && offsetX < 10 && offsetY < 10) {
                if (
                    this.getPositionContents(offsetX, offsetY) instanceof Ship
                ) {
                    return false;
                }
            }
        }
        return true;
    }

    spawnShip(shipLength, coordX, coordY, isRotated90, playerOwner) {
        const shipXcoord = parseInt(coordX);
        const shipYcoord = parseInt(coordY);
        const newShip = new Ship(
            shipLength,
            shipXcoord,
            shipYcoord,
            isRotated90,
            playerOwner
        );

        //check if ship is within board boundaries
        if (isRotated90) {
            if (shipYcoord + shipLength > 10) {
                return -1;
            }
        } else {
            if (shipXcoord + shipLength > 10) {
                return -1;
            }
        }
        //check if positions are legal (current and surrounding positions not occupied)
        if (isRotated90) {
            for (let i = 0; i < shipLength; i++) {
                if (!this.#isShipPositionLegal(shipXcoord, shipYcoord + i)) {
                    return -1;
                }
            }
        } else {
            for (let i = 0; i < shipLength; i++) {
                if (!this.#isShipPositionLegal(shipXcoord + i, shipYcoord)) {
                    return -1;
                }
            }
        }
        // reserve positions on board by referencing the ship instance
        this.ships.push(newShip);
        if (isRotated90) {
            for (let i = 0; i < shipLength; i++) {
                this.board[shipYcoord + i][shipXcoord] = newShip;
            }
        } else {
            for (let i = 0; i < shipLength; i++) {
                this.board[shipYcoord][shipXcoord + i] = newShip;
            }
        }
        this.shipsLeftToPlace.pop();
    }

    receiveAttack(coordX, coordY) {
        const shipXcoord = parseInt(coordX);
        const shipYcoord = parseInt(coordY);
        //return codes:
        //  -1 = missed
        //  0 = already fired before
        //  1 = hit
        //check if position was already fired at
        for (let i = 0; i < this.positionsFired.length; i++) {
            const position = this.positionsFired[i];
            if (position[1] === shipXcoord && position[0] === shipYcoord) {
                return 0;
            }
        }
        this.positionsFired.push([shipYcoord, shipXcoord]);
        const target = this.getPositionContents(shipXcoord, shipYcoord);

        if (target instanceof Ship) {
            target.hit();
            this.#setPositionContents("damaged", shipXcoord, shipYcoord);
            return 1;
        } else {
            this.missedAttacks++;
            this.#setPositionContents("attacked", shipXcoord, shipYcoord);
            return -1;
        }
    }

    getMissedAttackCount() {
        return this.missedAttacks;
    }

    areAllShipsDestroyed() {
        // -1 = no ships spawned
        if (this.ships.length === 0) {
            return -1;
        }
        for (let i = 0; i < this.ships.length; i++) {
            const ship = this.ships[i];
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }
}

export default GameBoard;
