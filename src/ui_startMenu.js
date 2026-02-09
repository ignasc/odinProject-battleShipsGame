const startMenu = document.createElement("form");
startMenu.setAttribute("id", "start-menu");

const inputElement = document.createElement("input");

const divElement = document.createElement("div");

const label = document.createElement("label");

// player one
const playerOneName = inputElement.cloneNode();
playerOneName.setAttribute("type", "text");
playerOneName.setAttribute("value", "Player 1");
playerOneName.setAttribute("name", "playerOneName");
const playerOneNameLabel = label.cloneNode();
playerOneNameLabel.setAttribute("for", "playerOneName");
playerOneNameLabel.innerHTML = "Player One name: ";

// player two
const playerTwoName = inputElement.cloneNode();
playerTwoName.setAttribute("type", "text");
playerTwoName.setAttribute("value", "Player 2");
playerTwoName.setAttribute("name", "playerTwoName");
playerTwoName.setAttribute("id", "player-two-name");
const playerTwoNameLabel = label.cloneNode();
playerTwoNameLabel.setAttribute("for", "playerTwoName");
playerTwoNameLabel.setAttribute("id", "player-two-name-label");
playerTwoNameLabel.innerHTML = "Player Two name: ";

// player two: human or computer
const playerTwoComputer = inputElement.cloneNode();
playerTwoComputer.setAttribute("type", "select");

const playerTwoComputerOption = inputElement.cloneNode();
playerTwoComputerOption.setAttribute("type", "checkbox");
playerTwoComputerOption.setAttribute("name", "computer-option");
const playerTwoComputerOptionLabel = label.cloneNode();
playerTwoComputerOptionLabel.setAttribute("for", "computer-option");
playerTwoComputerOptionLabel.innerHTML = "Player Two is computer? ";
playerTwoComputerOption.addEventListener("click", (e) => {
    if (e.target.checked) {
        document.getElementById("player-two-name").hidden = true;
        document.getElementById("player-two-name-label").hidden = true;
        document.getElementById("computer-level").hidden = false;
    } else {
        document.getElementById("player-two-name").hidden = false;
        document.getElementById("player-two-name-label").hidden = false;
        document.getElementById("computer-level").hidden = true;
    }
});

const computerLevelWrapper = document.createElement("div");
computerLevelWrapper.setAttribute("id", "computer-level");
computerLevelWrapper.hidden = true;

const radioButtonEasy = inputElement.cloneNode();
radioButtonEasy.setAttribute("type", "radio");
radioButtonEasy.setAttribute("id", "computer-easy");
radioButtonEasy.setAttribute("name", "computer-level");
radioButtonEasy.setAttribute("value", "easy");
const radioButtonEasyLabel = label.cloneNode();
radioButtonEasyLabel.setAttribute("for", "computer-easy");
radioButtonEasyLabel.innerHTML = "Easy";

const radioButtonNormal = inputElement.cloneNode();
radioButtonNormal.checked = true;
radioButtonNormal.setAttribute("type", "radio");
radioButtonNormal.setAttribute("id", "computer-normal");
radioButtonNormal.setAttribute("name", "computer-level");
radioButtonNormal.setAttribute("value", "normal");
const radioButtonNormalLabel = label.cloneNode();
radioButtonNormalLabel.setAttribute("for", "computer-normal");
radioButtonNormalLabel.innerHTML = "Normal";

const radioButtonHard = inputElement.cloneNode();
radioButtonHard.setAttribute("type", "radio");
radioButtonHard.setAttribute("id", "computer-hard");
radioButtonHard.setAttribute("name", "computer-level");
radioButtonHard.setAttribute("value", "hard");
const radioButtonHardLabel = label.cloneNode();
radioButtonHardLabel.setAttribute("for", "computer-hard");
radioButtonHardLabel.innerHTML = "Hard";

//Menu splits
const playerOneMenu = divElement.cloneNode();
playerOneMenu.setAttribute("id", "player-one-menu");
playerOneMenu.classList.add("playerMenu");
const playerTwoMenu = divElement.cloneNode();
playerTwoMenu.setAttribute("id", "player-two-menu");
playerTwoMenu.classList.add("playerMenu");

playerOneMenu.appendChild(playerOneNameLabel);
playerOneMenu.appendChild(playerOneName);

playerTwoMenu.appendChild(playerTwoComputerOptionLabel);
playerTwoMenu.appendChild(playerTwoComputerOption);

playerTwoMenu.appendChild(playerTwoNameLabel);
playerTwoMenu.appendChild(playerTwoName);

computerLevelWrapper.appendChild(radioButtonEasyLabel);
computerLevelWrapper.appendChild(radioButtonEasy);
computerLevelWrapper.appendChild(radioButtonNormalLabel);
computerLevelWrapper.appendChild(radioButtonNormal);
computerLevelWrapper.appendChild(radioButtonHardLabel);
computerLevelWrapper.appendChild(radioButtonHard);
playerTwoMenu.appendChild(computerLevelWrapper);

startMenu.appendChild(playerOneMenu);
startMenu.appendChild(playerTwoMenu);

export default startMenu;
