import GameEngine from "./gameEngine.js";

describe("GameEngine class", () => {
    const player = new GameEngine();
    test("GameEngine (game instance) creation", () => {
        expect(player).toBeInstanceOf(GameEngine);
    });
});
