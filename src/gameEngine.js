import Player from "./player.js";

class GameEngine {
    constructor(playerOneRef, playerTwoRef) {
        this.playerOne = playerOneRef;
        this.playerTwo = playerTwoRef;
        this.gameEnd = false;
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
            this.playerTwo.getBoard().toggleBoard();
        }
    }

    allShipsPlaced() {
        return this.playerOne.getBoard().allShipsPlaced() &&
            this.playerOne.getBoard().allShipsPlaced()
            ? true
            : false;
    }
}

export default GameEngine;
