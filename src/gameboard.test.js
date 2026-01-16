import GameBoard from "./gameboard.js";
import Ship from "./ship.js";

describe("Testing game board", () => {
    test("Game board is created", () => {
        const gameBoard = new GameBoard();
        expect(gameBoard).toBeInstanceOf(GameBoard);
    });
    test("Spawn a ship", () => {
        const gameBoard = new GameBoard();
        gameBoard.spawnShip(2, 2, 2, true, "player1");
        gameBoard.spawnShip(4, 0, 0, false, "player1");
        expect(gameBoard.getPositionContents(2, 2).getShipRef()).toBeInstanceOf(
            Ship
        );
        expect(gameBoard.getPositionContents(2, 3).getShipRef()).toBeInstanceOf(
            Ship
        );
        expect(gameBoard.getPositionContents(0, 0).getShipRef()).toBeInstanceOf(
            Ship
        );
        expect(gameBoard.getPositionContents(1, 0).getShipRef()).toBeInstanceOf(
            Ship
        );
        expect(gameBoard.getPositionContents(2, 0).getShipRef()).toBeInstanceOf(
            Ship
        );
        expect(gameBoard.getPositionContents(3, 0).getShipRef()).toBeInstanceOf(
            Ship
        );

        //Attempt to spawn ships in occupied areas
        expect(gameBoard.spawnShip(4, 0, 0, false, "player1")).toBe(-1);
        expect(gameBoard.spawnShip(4, 1, 0, false, "player1")).toBe(-1);
        expect(gameBoard.spawnShip(4, 3, 0, false, "player1")).toBe(-1);
        expect(gameBoard.spawnShip(1, 2, 3, false, "player1")).toBe(-1);
    });
    test("Test ship position and reference on board", () => {
        const gameBoard = new GameBoard();
        const shipLength = 3;
        gameBoard.spawnShip(shipLength, 2, 2, true, "player1");
        expect(gameBoard.getPositionContents(2, 2).getShipRef()).toBeInstanceOf(
            Ship
        );
        expect(gameBoard.getPositionContents(2, 3).getShipRef()).toBeInstanceOf(
            Ship
        );
        expect(gameBoard.getPositionContents(2, 4).getShipRef()).toBeInstanceOf(
            Ship
        );
    });
    test("Shoot the ship", () => {
        const gameBoard = new GameBoard();

        const shipLength = 3;
        expect(gameBoard.areAllShipsDestroyed()).toBe(-1);
        gameBoard.spawnShip(shipLength, 2, 2, true, "player1");
        expect(gameBoard.areAllShipsDestroyed()).toBe(false);
        gameBoard.receiveAttack(2, 4); //hit ship
        gameBoard.receiveAttack(2, 2); //hit ship
        gameBoard.receiveAttack(2, 3); //hit ship
        expect(gameBoard.areAllShipsDestroyed()).toBe(true);

        expect(gameBoard.getMissedAttackCount()).toBe(0);

        gameBoard.spawnShip(shipLength, 0, 0, false, "player1");
        expect(gameBoard.areAllShipsDestroyed()).toBe(false);
        gameBoard.receiveAttack(2, 0);
        gameBoard.receiveAttack(1, 0);
        gameBoard.receiveAttack(0, 0);
        expect(gameBoard.areAllShipsDestroyed()).toBe(true);

        gameBoard.receiveAttack(8, 8); //missed attack
        expect(gameBoard.getMissedAttackCount()).toBe(1);
        expect(gameBoard.getPositionContents(8, 8).wasAttacked()).toBe(true);
        gameBoard.receiveAttack(7, 8); //missed attack
        expect(gameBoard.getMissedAttackCount()).toBe(2);
    });
});
