import Ship from "./ship.js";

class BoardSquare {
    constructor() {
        this.shipRef = null;
        this.coordX = null;
        this.coordY = null;
        this.attacked = false;
    }

    setShipRef(shipRef) {
        this.shipRef = shipRef;
    }

    getShipRef() {
        return this.shipRef;
    }

    setCoords(coordX, coordY) {
        this.coordX = coordX;
        this.coordY = coordY;
    }

    setAttacked() {
        this.attacked = true;
    }

    wasAttacked() {
        return this.attacked;
    }

    hasShip() {
        return this.shipRef instanceof Ship;
    }
}

export default BoardSquare;
