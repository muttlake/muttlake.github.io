// Dice Roller Project
import{  DiceSide } from "./dice.js";

// Buttons
const diceRollButton: HTMLButtonElement = document.getElementById("roll-button") as HTMLButtonElement;
const resetButton: HTMLButtonElement = document.getElementById("reset-button") as HTMLButtonElement;

// Dice Image Element
const diceImageElement: HTMLImageElement = document.getElementById("dice-image") as HTMLImageElement;

// Score Elements
const scoreValueElement: HTMLElement = document.getElementById("score-value-amount") as HTMLElement;
const totalValueElement: HTMLElement = document.getElementById("total-value-amount") as HTMLElement;

// Player Total Score
let totalScore: number = 0;

//roll dice
function rolldice(): DiceSide{
    const diceValue: number = Math.floor(Math.random()*6)+1;
    let dollarValue: number = -10;
    if(diceValue == 6)
        dollarValue = 60;
    const imagePath: string = "./dice_images/side_" + diceValue.toString() + ".png";
    return new DiceSide(diceValue, imagePath, dollarValue);
}

// Add Event Listener to Dice Roll Button
diceRollButton.addEventListener("click", () => {
    const currRoll: DiceSide = rolldice();
    scoreValueElement.innerText = "$" + currRoll.dollarValue.toString();
    totalScore = totalScore + currRoll.dollarValue;
    totalValueElement.innerText = "$" + totalScore.toString();
    diceImageElement.src = currRoll.imagePath;
});

// Add Event Listener to reset Button
resetButton.addEventListener("click", () => {
    scoreValueElement.innerText = "$0";
    totalScore = 0;
    totalValueElement.innerText = "$0";
});
