import Ship from "./ship.js";

describe("Testing ship class", () => {
    test("Ship is sunk", () => {
        const ship = new Ship(2);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});
