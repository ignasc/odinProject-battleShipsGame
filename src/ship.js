class Ship {
    constructor(length, coordX, coordY, isRotated90, playerOwner) {
        this.length = length;
        this.coordX = coordX;
        this.coordY = coordY;
        this.hits = 0;
        this.isRotated90 = isRotated90;
        this.shipPositions = [];
        this.playerOwner = playerOwner;
    }

    getPlayerNumber() {
        return this.playerOwner;
    }

    storePosition(coordX, coordY) {
        this.shipPositions.push([coordX, coordY]);
    }

    getShipPositions() {
        return this.shipPositions;
    }

    isRotated() {
        return this.isRotated90;
    }

    getLength() {
        return this.length;
    }

    hit() {
        this.hits++;
    }
    isDamaged() {
        return this.hits != 0 && this.hits < this.length ? true : false;
    }

    isSunk() {
        return this.hits >= this.length ? true : false;
    }
}

export default Ship;
