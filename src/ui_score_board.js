function scoreBoard(boardReference, shipPlacementActive = null) {
    if (shipPlacementActive === null) {
        return document.createElement("div");
    }
    const divWrapper = document.createElement("div");

    const shipListFooter = document.createElement("p");
    const shipListContainer = document.createElement("ul");
    const shipListContainerElement = document.createElement("li");

    if (shipPlacementActive) {
        // information related to ship placement
        shipListFooter.innerHTML = `Ships remaining to place:`;
        const shipList = {};
        for (let i = 0; i < boardReference.shipsLeftToPlace.length; i++) {
            const ship = boardReference.shipsLeftToPlace[i];
            if (!(ship in shipList)) {
                shipList[ship] = 0;
            }
            shipList[ship]++;
        }
        for (let [key, value] of Object.entries(shipList)) {
            const listEntry = shipListContainerElement.cloneNode();
            listEntry.innerHTML = `Ship(${key}) x${value}`;
            shipListContainer.appendChild(listEntry);
        }
    } else {
        // information related to ship losses
        shipListFooter.innerHTML = `Ships remaining in battlefield:`;
        const shipList = {};
        for (let i = 0; i < boardReference.ships.length; i++) {
            const ship = boardReference.ships[i];
            if (!ship.isSunk()) {
                if (!(ship.length in shipList)) {
                    shipList[ship.length] = 0;
                }
                shipList[ship.length]++;
            }
        }
        for (let [key, value] of Object.entries(shipList)) {
            const listEntry = shipListContainerElement.cloneNode();
            listEntry.innerHTML = `Ship(${key}) x${value}`;
            shipListContainer.appendChild(listEntry);
        }
    }

    divWrapper.appendChild(shipListFooter);
    divWrapper.appendChild(shipListContainer);

    return divWrapper;
}

export default scoreBoard;
