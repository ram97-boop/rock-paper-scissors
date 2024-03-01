const CHOICES = ["rock", "paper", "scissors"];

function getComputerChoice() {
    let choice = Math.round(Math.random() * 2); // random int between 0 and 2.
    return CHOICES[choice];
}