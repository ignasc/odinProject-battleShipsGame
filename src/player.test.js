import Player from "./player";

describe("Player class", () => {
    test("Player creation", () => {
        const player = new Player();
        expect(player).toBeInstanceOf(Player);
    });
});
