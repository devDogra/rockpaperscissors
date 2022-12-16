const numChoices = 3;
const numRounds = 5;
const choices = ["ROCK", "SCISSORS", "PAPER"]; // 0, 1, 2 : R S P

let infoDiv = document.querySelector(".info");
let iconRingContainer = document.querySelector(".icon-ring-container");
let roundResult = document.querySelector(".round-result");
let userScoreSpan = document.querySelector(".user-score");
let computerScoreSpan = document.querySelector(".computer-score");
let iconDivs = document.querySelectorAll(".icon");

let userScore = 0;
let computerScore = 0;
let gameOver = false;

// Will return 0, 1 or 2
function getComputerChoice() {
  return Math.floor(Math.random() * numChoices);
}

// Takes in a click event, outputs 0 1 or 2
function getUserChoice(e) {
  let icon = e.target.closest(".icon");
  let userChoice = icon.dataset.choice;
  return parseInt(userChoice);
}

// Checks if someone has won
function checkWin(userScore, computerScore) {
  if (userScore >= 10 || computerScore >= 10) return true;
  return false;
}

function toggleGameOverState() {
  iconRingContainer.classList.toggle("game-over");
  infoDiv.classList.toggle("game-over");
  gameOver = !gameOver;
  userScore = 0;
  computerScore = 0;
}

function handleWin() {
  if (userScore == computerScore) {
    roundResult.innerText = "Draw";
  } else if (userScore > computerScore) {
    roundResult.innerText = "You win";
  } else {
    roundResult.innerText = "You lose";
  }

  toggleGameOverState();
}

// Updates game state after a round, handles win if there is any
function updateScores(roundResult) {
  if (roundResult == 1) {
    userScore++;
  } else if (roundResult == -1) {
    computerScore++;
  } else {
    userScore += 1;
    computerScore += 1;
  }

  let win = checkWin(userScore, computerScore);
  if (win) {
    handleWin();
  }
}

function renderScores() {
  userScoreSpan.innerText = userScore;
  computerScoreSpan.innerText = computerScore;
}

// Applies styling to the option picked by user
function renderUserChoice(e) {
  let iconDiv = e.target.closest(".icon");
  iconDiv.classList.add("user");
}

// Applies styling to the option picked by computer
function renderComputerChoice(computerChoice) {
  let iconDiv = document.querySelector(
    `.icon[data-choice="${computerChoice}"]`
  );
  iconDiv.classList.add("computer");
}

// outputs +1 if player wins, 0 if draw, and -1 if computer wins
function playRound(computerChoice, playerChoice) {
  if (computerChoice == (playerChoice + 1) % numChoices) {
    return 1;
  } else if (computerChoice == playerChoice) {
    return 0;
  } else {
    return -1;
  }
}

function resetIconClasses() {
  iconDivs.forEach((iconDiv) => {
    iconDiv.classList.remove("user");
    iconDiv.classList.remove("computer");
  });
}

// Handles user clicking on an icon event
document.addEventListener("click", (e) => {
  if (!e.target.matches(".icon>img")) return;

  resetIconClasses();

  let userChoice = getUserChoice(e);
  renderUserChoice(e);

  let computerChoice = getComputerChoice();
  renderComputerChoice(computerChoice);

  let roundResult = playRound(computerChoice, userChoice);
  updateScores(roundResult);

  renderScores();
});

// Play again button click handler
document.addEventListener("click", (e) => {
  if (!e.target.matches(".play-again")) return;

  // restart game
  toggleGameOverState();
});
