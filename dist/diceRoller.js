// Dice Roller Project
import { DiceSide } from "./dice.js";
// Buttons
const diceRollButton = document.getElementById("roll-button");
const resetButton = document.getElementById("reset-button");
// Dice Image Element
const diceImageElement = document.getElementById("dice-image");
// Score Elements
const scoreValueElement = document.getElementById("score-value-amount");
const totalValueElement = document.getElementById("total-value-amount");
// Player Total Score
let totalScore = 0;
//roll dice
function rolldice() {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    let dollarValue = -10;
    if (diceValue == 6)
        dollarValue = 60;
    const imagePath = "./dice_images/side_" + diceValue.toString() + ".png";
    return new DiceSide(diceValue, imagePath, dollarValue);
}
// Add Event Listener to Dice Roll Button
diceRollButton.addEventListener("click", () => {
    const currRoll = rolldice();
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
