const numChoices = 3;
const numRounds = 5;

const choices = ["ROCK", "SCISSORS", "PAPER"];
// 0, 1, 2
// R S P
// R beats S, S beats P, P beats S

// Will return 0, 1 or 2
function getComputerChoice() {
  return Math.floor(Math.random() * numChoices);
}

// Eg : ROCK, rock, RoCK, R, r, Rcccc are all valid options for rock
// Returns 0, 1, 2
function getUserChoice() {
  let userChoice = prompt(
    "Pick Rock Paper or Scissors:  (Not picking will pick one randomly) "
  );

  if (userChoice == "" || userChoice == null) return getComputerChoice();
  userChoice = userChoice.toUpperCase();

  for (let i = 0; i != choices.length; i++) {
    if (userChoice == choices[i] || userChoice[0] == choices[i][0]) {
      return i;
    }
  }
  //   return 2;
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

function playGame(numRounds) {
  let userScore = 0;
  let computerScore = 0;
  for (let round = 1; round <= numRounds; round++) {
    let userChoice = getUserChoice();
    let computerChoice = getComputerChoice();

    let roundResult = playRound(computerChoice, userChoice);

    if (roundResult == 1) {
      let msg = `${choices[userChoice]} beats ${choices[computerChoice]}!
       User wins round ${round}`;
      console.log(msg);
      userScore++;
    } else if (roundResult == 0) {
      let msg = `Round ${round} is a draw!`;
      console.log(msg);
      userScore += 0.5;
      computerScore += 0.5;
    } else {
      let msg = `${choices[computerChoice]} beats ${choices[userChoice]}!
        Computer wins round ${round}`;
      console.log(msg);
      computerScore++;
    }
  }

  // Display score
  let finalScoreMsg =
    `FINAL SCORE \n` +
    `User: ${userScore} \n` +
    `Computer: ${computerScore} \n`;

  console.log(finalScoreMsg);

  if (userScore == computerScore) {
    console.log("The game is a draw! ");
  } else if (userScore < computerScore) {
    console.log("Computer wins!");
  } else {
    console.log("User wins");
  }
}

playGame(numRounds);
