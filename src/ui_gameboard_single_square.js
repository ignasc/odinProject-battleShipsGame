import Ship from "./ship.js";

class BoardSquare {
    constructor() {
        this.shipRef = null;
        this.coordX = null;
        this.coordY = null;
        this.attacked = false;
    }

    setShipRef(shipRef) {
        // console.log("ship ref set");
        this.shipRef = shipRef;
    }

    getShipRef(shipRef) {
        return this.shipRef;
    }

    setCoords(coordX, coordY) {
        // console.log(`Position coordinates ${coordX}:${coordY} set`)
        this.coordX = coordX;
        this.coordY = coordY;
    }

    setAttacked() {
        // console.log(`Position flagged as attacked`);
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
