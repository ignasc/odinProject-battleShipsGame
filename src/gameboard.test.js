import GameBoard from "./gameboard.js";

describe("Testing game board", () => {
    test("Game board is created", () => {
        const gameBoard = new GameBoard();
        expect(gameBoard).toBeInstanceOf(GameBoard);
    });
});
