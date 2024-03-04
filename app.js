#!/usr/bin/node

const CHOICES = ["Rock", "Paper", "Scissors"];
let indices = {};
indices["rock"] = 0;
indices["paper"] = 1;
indices["scissors"] = 2;

function getComputerChoice() {
    let choice = Math.round(Math.random() * 2); // random int between 0 and 2.
    return CHOICES[choice].toLowerCase();
}

function playRound(
    playerSelection,
    computerSelection,
    playerScore,
    computerScore) {

    let rules = {};
    rules["rock"] = "scissors"; // rock beats scissors
    rules["paper"] = "rock"; // paper beats rock
    rules["scissors"] = "paper"; // scissors beats paper

    let playerSelectionLowerCase = playerSelection.toLowerCase();
    let playerSelectionPretty = CHOICES[indices[playerSelectionLowerCase]];
    let computerSelectionPretty = CHOICES[indices[computerSelection]];

    displayChoices(playerSelectionPretty, computerSelectionPretty);

    if (rules[playerSelectionLowerCase] === rules[computerSelection]) {
        let tieString =
            `It's a tie! ${playerSelectionPretty} and ` +
            `${computerSelectionPretty}. ${playerScore} - ${computerScore}`;

        return [tieString, 0, 0];
    }
    else if (rules[playerSelectionLowerCase] === computerSelection) {
        ++playerScore;
        let youWinString =
            `You win! ${playerSelectionPretty} beats ` +
            `${computerSelectionPretty}. ${playerScore} - ${computerScore}`;

        return [youWinString, 1, 0];
    }
    else if (rules[computerSelection] === playerSelectionLowerCase) {
        ++computerScore;
        let youLoseString =
            `You lose! ${computerSelectionPretty} beats ` +
            `${playerSelectionPretty}. ${playerScore} - ${computerScore}`;

        return [youLoseString, 0, 1];
    }
}

function displayChoices(playerChoice, computerChoice) {
    const playerDisplay = document.querySelector("#player p");
    const computerDisplay = document.querySelector("#computer p");

    playerDisplay.textContent = playerChoice;
    computerDisplay.textContent = computerChoice;
}

function playGame() {
    let roundNumber = 1;
    let playerScore = 0;
    let computerScore = 0;

    let buttonSection = document.querySelector(".buttons");

    buttonSection.addEventListener("click", getInputAndPlayRound)

    function getInputAndPlayRound(event) {
        let target = event.target;

        // ignore clicks on the div outside the buttons
        if (target.nodeName === "BUTTON" && roundNumber < 6) {
            let result = playRound(
                target.id,
                getComputerChoice(),
                playerScore,
                computerScore
            )
            playerScore += result[1];
            computerScore += result[2];
            roundNumber++;

            displayScore(playerScore, computerScore);
            console.log(result[0])
        }

        if (roundNumber === 6) {
            if (playerScore === computerScore) {
                console.log("The game is a tie!");
            }
            else if (playerScore > computerScore) {
                console.log("You win the game!");
            }
            else {
                console.log("You lose the game!");
            }

            roundNumber++;
        }
    }
}

function displayScore(playerScore, computerScore) {
    let scoreDisplay = document.getElementById("score");
    scoreDisplay.textContent = `${playerScore} - ${computerScore}`;
}

playGame();
