const CHOICES = ["Rock", "Paper", "Scissors"];
let indices = {};
indices["rock"] = 0;
indices["paper"] = 1;
indices["scissors"] = 2;

function getComputerChoice() {
    let choice = Math.round(Math.random() * 2); // random int between 0 and 2.
    return CHOICES[choice].toLowerCase();
}

function playRound(playerSelection, computerSelection, playerScore, computerScore) {
    let rules = {};
    rules["rock"] = "scissors"; // rock beats scissors
    rules["paper"] = "rock"; // paper beats rock
    rules["scissors"] = "paper"; // scissors beats paper

    let playerSelectionLowerCase = playerSelection.toLowerCase();
    let playerSelectionPretty = CHOICES[indices[playerSelectionLowerCase]];
    let computerSelectionPretty = CHOICES[indices[computerSelection]];


    if (rules[playerSelectionLowerCase] === rules[computerSelection]) {
        let tieString = `It's a tie! ${playerSelectionPretty} and ${computerSelectionPretty}. ${playerScore} - ${computerScore}`;

        return [tieString, 0, 0];
    }
    else if (rules[playerSelectionLowerCase] === computerSelection) {
        ++playerScore;
        let youWinString = `You win! ${playerSelectionPretty} beats ${computerSelectionPretty}. ${playerScore} - ${computerScore}`;

        return [youWinString, 1, 0];
    }
    else if (rules[computerSelection] === playerSelectionLowerCase) {
        ++computerScore;
        let youLoseString = `You lose! ${computerSelectionPretty} beats ${playerSelectionPretty}. ${playerScore} - ${computerScore}`;

        return [youLoseString, 0, 1];
    }
}

function playGame() {
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < 5; ++i) {
        let playerSelection = prompt("Rock, Paper or Scissors? ");
        let computerSelection = getComputerChoice();
        let result = playRound(playerSelection, computerSelection, playerScore, computerScore);
        playerScore += result[1];
        computerScore += result[2];

        console.log(result[0]);
    }

    if (playerScore === computerScore) {
        console.log("The game is a tie!");
    }
    else if (playerScore > computerScore) {
        console.log("You win the game!");
    }
    else {
        console.log("You lose the game!");
    }
}

playGame();
