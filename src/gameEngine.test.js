import GameEngine from "./gameEngine.js";

describe("GameEngine class", () => {
    const newGame = new GameEngine();
    test("GameEngine (game instance) creation", () => {
        expect(newGame).toBeInstanceOf(GameEngine);
    });
    test("Player creation.", () => {
        newGame.createPlayer(true, "Ignas");
        newGame.createPlayer(false, "Computer");
        expect(newGame.createPlayer(true, "Third Player")).toBe(-1);
    });
});
