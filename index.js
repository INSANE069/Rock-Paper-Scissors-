// DOM Elements
const main = document.getElementById("main");
const selection = document.getElementById("selection");
const resultText = document.getElementById("result");
const userSelect = document.getElementById("user_select");
const computerSelect = document.getElementById("computer_select");
const resetButton = document.getElementById("reset");
const rulesButton = document.getElementById("rules");
const closeModalButton = document.getElementById("close-modal");
const userScoreElement = document.getElementById("user-score");
const computerScoreElement = document.getElementById("computer-score");
const rulesImage = document.getElementById("rules-image");
const nextButton = document.getElementById("nextButton");
const hurrayPage = document.getElementById("hurraypage");
const container = document.getElementById("scores");
const playagainbutton = document.getElementById("playagain")

const choices = ["rock", "paper", "scissors"];
let userScore = localStorage.getItem('userScore') ? parseInt(localStorage.getItem('userScore')) : 0;
let computerScore = localStorage.getItem('computerScore') ? parseInt(localStorage.getItem('computerScore')) : 0;

updateScore(userScore, computerScore);


document.querySelectorAll(".choice-click").forEach((button) => {
    button.addEventListener("click", (event) => {
        const userChoice = event.currentTarget.dataset.choice;
        playGame(userChoice);
    });
});

// Play game logic
function playGame(userChoice) {
    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);

    // Update the UI with the selections
    updateSelection(userSelect, userChoice);
    updateSelection(computerSelect, computerChoice);

    showResult(winner);

    if (winner === "win") {
        userScore++;
    } else if (winner === "lose") {
        computerScore++;
    }

    // Store both scores in localStorage
    localStorage.setItem('userScore', userScore);
    localStorage.setItem('computerScore', computerScore);

    updateScore(userScore, computerScore); // Update scores in the UI
}

// Get random choice for computer
function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Determine winner
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "draw";
    }

    if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "scissors" && computerChoice === "paper") ||
        (userChoice === "paper" && computerChoice === "rock")
    ) {
        return "win";
    }

    return "lose";
}

// Update score display function
function updateScore(userScore, computerScore) {
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
}

// Update the selected choices 
function updateSelection(selectionElement, choice) {
    selectionElement.classList.remove('btn-paper');
    selectionElement.classList.remove('btn-rock');
    selectionElement.classList.remove('btn-scissors');

    selectionElement.classList.add(`btn-${choice}`);

    const choiceImages = {
        rock: "icons8-fist-67 1.png",
        paper: "icons8-hand-64 1.png",
        scissors: "17911 1.png"
    };

    const img = selectionElement.querySelector('img');
    img.src = `./iconimages/${choiceImages[choice]}`;
    img.alt = choice;

    main.style.display = "none";
    selection.style.display = "flex";
}

//condition
function showResult(result) {
    resultText.textContent = result;

    // Apply winning design conditionally
    if (result === 'win') {
        userSelect.classList.add('winner-shadow');
        computerSelect.classList.remove('winner-shadow');
        nextButton.style.display = "block";
    } else if (result === 'lose') {
        computerSelect.classList.add('winner-shadow');
        userSelect.classList.remove('winner-shadow');
        nextButton.style.display = "none"; // Hide the Next button if the user loses
    } else {
        // In case of a draw, remove shadows from both
        userSelect.classList.remove('winner-shadow');
        computerSelect.classList.remove('winner-shadow');
        nextButton.style.display = "none"; // Hide the Next button 
    }
}

// Reset game
resetButton.addEventListener("click", () => {
    selection.style.display = "none";
    main.style.display = "flex";
});


function resetGame() {
    userScore = 0;
    computerScore = 0;
    localStorage.removeItem('userScore'); // Clear user score from localStorage
    localStorage.removeItem('computerScore'); // Clear computer score from localStorage
    updateScore(userScore, computerScore);

    // Reset selection display
    userSelect.classList.remove('winner-shadow');
    computerSelect.classList.remove('winner-shadow');
}

// Show rules modal
// Show rules modal
rulesButton.addEventListener("click", () => {
    rulesImage.style.display = "block"; // Show the rules image
    closeModalButton.style.display = "block"; // Show the close button
});

// Close rules modal
closeModalButton.addEventListener("click", () => {
    rulesImage.style.display = "none"; // Hide the rules image
    closeModalButton.style.display = "none"; // Hide the close button
});

closeModalButton.style.display = "none"
hurrayPage.style.display = "none";
nextButton.addEventListener("click", () => {
    // Hide the current game elements
    main.style.display = "none";
    selection.style.display = "none";
    nextButton.style.display = "none";
    container.style.display = "none"
    // Show the hurrayPage div
    hurrayPage.style.display = "block";

});


playagainbutton.addEventListener("click", () => {
    // Hide the hurrayPage div
    hurrayPage.style.display = "none";

    // Reset the game state
    resetGame();

    // Show the main game elements again
    main.style.display = "flex";
    container.style.display = "block"; // Ensure the score container is displayed
});