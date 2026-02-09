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
        this.shipPositions.push({
            coords: [coordX, coordY],
            damaged: false,
        });
    }
    setPartDamaged(coordX = null, coordY = null) {
        for (let i = 0; i < this.shipPositions.length; i++) {
            const shipPart = this.shipPositions[i];
            if (
                shipPart["coords"][0] === coordX &&
                shipPart["coords"][1] === coordY
            ) {
                shipPart["damaged"] = true;
            }
        }
    }
    getShipPartAt(coordX, coordY) {
        for (let i = 0; i < this.shipPositions.length; i++) {
            const shipPart = this.shipPositions[i];
            if (
                shipPart["coords"][0] === coordX &&
                shipPart["coords"][1] === coordY
            ) {
                return shipPart;
            }
        }
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
