import Player from "./player.js";

class GameEngine {
    constructor() {
        this.playerOne = null;
        this.playerTwo = null;
    }

    createPlayer(isHuman = true, name = "Unknown") {
        // -1 = cannot create more players
        if (this.playerOne && this.playerTwo) {
            return -1;
        }

        if (!this.playerOne) {
            this.playerOne = new Player(isHuman, name);
        } else if (!this.playerTwo) {
            this.playerTwo = new Player(isHuman, name);
        }
    }
}

export default GameEngine;
