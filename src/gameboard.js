import Ship from "./ship.js";

class GameBoard {
    constructor() {
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
    }

    getPositionContents(coordX, coordY) {
        return this.board[coordY][coordX];
    }

    #setPositionContents(status, coordX, coordY) {
        this.board[coordY][coordX] = status;
    }

    spawnShip(shipLength, coordX, coordY, isRotated90, playerOwner) {
        const newShip = new Ship(
            shipLength,
            coordX,
            coordY,
            isRotated90,
            playerOwner
        );

        //check if ship is within board boundaries
        if (isRotated90) {
            if (coordY + shipLength > 10) {
                return -1;
            }
        } else {
            if (coordX + shipLength > 10) {
                return -1;
            }
        }

        //check if positions are already occupied
        if (isRotated90) {
            for (let i = 0; i < shipLength; i++) {
                if (this.board[coordY + i][coordX] instanceof Ship) {
                    return -1;
                }
            }
        } else {
            for (let i = 0; i < shipLength; i++) {
                if (this.board[coordY][coordX + i] instanceof Ship) {
                    return -1;
                }
            }
        }

        // reserve positions on board by referencing the ship instance
        this.ships.push(newShip);
        if (isRotated90) {
            for (let i = 0; i < shipLength; i++) {
                this.board[coordY + i][coordX] = newShip;
            }
        } else {
            for (let i = 0; i < shipLength; i++) {
                this.board[coordY][coordX + i] = newShip;
            }
        }
    }

    receiveAttack(coordX, coordY) {
        //return codes:
        //  -1 = missed
        //  0 = already fired before
        //  1 = hit
        //check if position was already fired at
        for (let i = 0; i < this.positionsFired.length; i++) {
            const position = this.positionsFired[i];
            if (position[1] === coordX && position[0] === coordY) {
                return 0;
            }
        }
        this.positionsFired.push([coordY, coordX]);
        const target = this.getPositionContents(coordX, coordY);

        if (target instanceof Ship) {
            target.hit();
            this.#setPositionContents("damaged", coordX, coordY);
            return 1;
        } else {
            this.missedAttacks++;
            this.#setPositionContents("attacked", coordX, coordY);
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
