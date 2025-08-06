const choiceButtons = document.querySelectorAll(".choice-btn");
const myScoreDisplay = document.getElementById("player-score");
const pcScoreDisplay = document.getElementById("computer-score");
const gameArea = document.getElementById("game-area");
const resultArea = document.getElementById("result-area");
const playAgainBtn = document.getElementById("replay-button");
const playAgainWinBtn = document.getElementById("play-again-win-btn");
const playerChoiceDisplay = document.getElementById("player-choice-display");
const pcChoiceDisplay = document.getElementById("pc-choice-display");
const opponentText = document.getElementById("opponent-text");
const tieMessage = document.getElementById("tie-message");
const rulesModal = document.getElementById("rules-modal");
const scoreContainer = document.getElementById("score-container");
const winScreen = document.getElementById("win-screen");

// Buttons and other elements
const nextBtn = document.getElementById("next-button");
const rulesBtn = document.getElementById("rules-button");
const rulesWinBtn = document.getElementById("rules-win-button");
const closeBtn = document.getElementById("close-button");

const gameOptions = ["paper", "rock", "scissors"];

let playerMove = undefined;
let playerScore = Number(getStoredScore("playerScore"));
let pcScore = Number(getStoredScore("pcScore"));

choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        playerMove = button.getAttribute("data-selection");
        determineWinner();
    });
});

playAgainBtn.addEventListener("click", () => {
    gameArea.style.display = "flex";
    resultArea.style.display = "none";
    rulesBtn.style.visibility = "visible";
    nextBtn.style.visibility = "hidden";
    rulesWinBtn.style.visibility = "hidden";
});
playAgainWinBtn.addEventListener("click", () => {
    scoreContainer.style.display = "flex";
    gameArea.style.display = "flex";
    resultArea.style.display = "none";
    winScreen.style.display = "none";
});

rulesBtn.addEventListener("click", () => {
    rulesModal.style.display = "flex";
});
rulesWinBtn.addEventListener("click", () => {
    rulesModal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    rulesModal.style.display = "none";
});

nextBtn.addEventListener("click", () => {
    scoreContainer.style.display = "none";
    gameArea.style.display = "none";
    resultArea.style.display = "none";
    winScreen.style.display = "flex";
    rulesBtn.style.visibility = "visible";
    nextBtn.style.visibility = "hidden";
    rulesWinBtn.style.visibility = "hidden";
});

function determineWinner() {
    const pcMove = getRandomMove();
    updateMoveDisplay(playerChoiceDisplay, playerMove);
    updateMoveDisplay(pcChoiceDisplay, pcMove);

    if (playerMove === pcMove) {
        // Draw
        tieMessage.innerText = "TIE UP";
        opponentText.style.visibility = "hidden";
        playAgainBtn.innerText = "Replay";
        rulesBtn.style.visibility = "visible";
        nextBtn.style.visibility = "hidden";
        rulesWinBtn.style.visibility = "hidden";
        pcChoiceDisplay.classList.remove("winning-choice");
        playerChoiceDisplay.classList.remove("winning-choice");
    } else if (
        (playerMove === "paper" && pcMove === "rock") ||
        (playerMove === "rock" && pcMove === "scissors") ||
        (playerMove === "scissors" && pcMove === "paper")
    ) {
        // Player wins
        updateScore("playerScore", 1);
        tieMessage.innerText = "You Won";
        opponentText.style.visibility = "visible";
        playAgainBtn.innerText = "Play Again";
        nextBtn.style.visibility = "visible";
        rulesBtn.style.visibility = "hidden";
        rulesWinBtn.style.visibility = "visible";
        playerChoiceDisplay.classList.add("winning-choice");
        pcChoiceDisplay.classList.remove("winning-choice");
    } else {
        // PC wins
        updateScore("pcScore", 1);
        tieMessage.innerText = "You Lost";
        opponentText.style.visibility = "visible";
        playAgainBtn.innerText = "Play Again";
        rulesBtn.style.visibility = "visible";
        nextBtn.style.visibility = "hidden";
        rulesWinBtn.style.visibility = "hidden";
        pcChoiceDisplay.classList.add("winning-choice");
        playerChoiceDisplay.classList.remove("winning-choice");
    }

    gameArea.style.display = "none";
    resultArea.style.display = "flex";
}

function updateScore(scoreType, value) {
    if (scoreType === "playerScore") {
        playerScore += value;
        myScoreDisplay.innerText = playerScore;
        saveScoreToLocalStorage("playerScore", playerScore);
    } else {
        pcScore += value;
        pcScoreDisplay.innerText = pcScore;
        saveScoreToLocalStorage("pcScore", pcScore);
    }
}

function getRandomMove() {
    return gameOptions[Math.floor(Math.random() * gameOptions.length)];
}

function updateMoveDisplay(element, option) {
    element.classList.remove("choice-rock", "choice-paper", "choice-scissors");

    const icon = element.querySelector("img");
    element.classList.add(`choice-${option}`);
    icon.src = `./assets/${option}.png`;
    icon.alt = option;
}

function saveScoreToLocalStorage(key, score) {
    localStorage.setItem(key, score);
}

function getStoredScore(key) {
    const numReg = /^-?[\d.]+(?:e-?\d+)?$/;
    let score;
    if (
        localStorage.getItem(key) === null ||
        !localStorage.getItem(key).match(numReg)
    ) {
        localStorage.setItem(key, "0");
        score = "0";
    } else {
        score = localStorage.getItem(key);
        if (key === "playerScore") {
            myScoreDisplay.innerText = score;
        } else {
            pcScoreDisplay.innerText = score;
        }
    }

    return score;
}