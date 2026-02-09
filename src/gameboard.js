import Ship from "./ship.js";
import BoardSquare from "./ui_gameboard_single_square.js";

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
                const newPosition = new BoardSquare();
                newPosition.setCoords(i, j);
                row.push(newPosition);
            }
            this.board.push(row);
        }

        this.shipsLeftToPlace = [1, 1, 1, 2, 2, 3];
        this.boardHidden = false;
        this.playerNumber = parseInt(playerNumber);
    }

    getNextShip() {
        return this.shipsLeftToPlace[this.shipsLeftToPlace.length - 1];
    }

    getPositionContents(coordX, coordY) {
        return this.board[coordY][coordX];
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
                if (this.getPositionContents(offsetX, offsetY).hasShip()) {
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
                this.board[shipYcoord + i][shipXcoord].setShipRef(newShip);
                newShip.storePosition(shipXcoord, shipYcoord + i);
            }
        } else {
            for (let i = 0; i < shipLength; i++) {
                this.board[shipYcoord][shipXcoord + i].setShipRef(newShip);
                newShip.storePosition(shipXcoord + i, shipYcoord);
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
        const target = this.getPositionContents(shipXcoord, shipYcoord);

        //check if position was already fired at
        if (target.wasAttacked()) {
            return 0;
        }

        this.positionsFired.push([shipYcoord, shipXcoord]);
        target.setAttacked();

        if (target.hasShip()) {
            target.getShipRef().setPartDamaged(shipXcoord, shipYcoord);
            target.getShipRef().hit();
            return 1;
        } else {
            this.missedAttacks++;
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
