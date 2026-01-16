import Player from "./player.js";
import Ship from "./ship.js";

describe("Player class", () => {
    const player = new Player(true, "Ignas");
    test("Player creation", () => {
        expect(player).toBeInstanceOf(Player);
        expect(player.getName()).toBe("Ignas");
    });
    test("Player spawn ships", () => {
        player.placeShip(3, 0, 0, true);
        player.placeShip(2, 5, 5, false);
        player.placeShip(1, 9, 9, true);

        expect(
            player.gameBoard.getPositionContents(0, 0).getShipRef()
        ).toBeInstanceOf(Ship);
        expect(
            player.gameBoard.getPositionContents(0, 1).getShipRef()
        ).toBeInstanceOf(Ship);
        expect(
            player.gameBoard.getPositionContents(0, 2).getShipRef()
        ).toBeInstanceOf(Ship);

        expect(
            player.gameBoard.getPositionContents(5, 5).getShipRef()
        ).toBeInstanceOf(Ship);
        expect(
            player.gameBoard.getPositionContents(6, 5).getShipRef()
        ).toBeInstanceOf(Ship);

        expect(
            player.gameBoard.getPositionContents(9, 9).getShipRef()
        ).toBeInstanceOf(Ship);
    });
});
