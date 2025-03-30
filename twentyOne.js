import { reBuildCardDeck, playersCards, housesCards } from "./card.js";
import {
    dealPlayerCard, getCardsInHand, getTotalsAsString, didBust,
    didGetTwentyOne, dealHouseNecessaryCards, getBestScore
} from "./dealer.js";

//buttons
const hitButton = document.getElementById("hit");
const stayButton = document.getElementById("stay");

//card image
const cardImage = document.getElementById("current-card-image");

//cards dealt lists
const playerCardsList = document.getElementById("player-cards-list");
const houseCardsList = document.getElementById("house-cards-list");

//totals values texts
const playerTotalValueText = document.getElementById("player-score-value");
const houseTotalValueText = document.getElementById("house-score-value");

//result text
const resultText = document.getElementById("result-text");

//constants
const BUSTED = "BUSTED";
const BOTH_BUSTED = "Both BUSTED!";
const TWENTY_ONE = "TWENTY ONE! Player wins";
const TWENTY_ONE_HOUSE_TIES = "TWENTY ONE! House ties Player";
const TWENTY_ONE_FOR_HOUSE = "House gets a Twenty One";
const PLAYER_AND_HOUSE_TIE = "Player and House Tie!";
const HOUSE_WINS = "House Wins";
const PLAYER_WINS = "Player Wins";
const PENDING = "PENDING";
const STAY = "STAY";
const PLAY_AGAIN = "Play Again";
const EMPTY_STRING = "";
const START_PLAYING = "Start Playing!";
const PLACEHOLDER_IMAGE = "./playingCards/placeholder_card.png";


//hit button
hitButton.addEventListener("click", (e) => {
    const card = dealPlayerCard();
    cardImage.src = card.image;
    playerCardsList.innerText = getCardsInHand(playersCards);
    houseCardsList.innerText = getCardsInHand(housesCards);
    playerTotalValueText.innerText = getTotalsAsString(playersCards);
    houseTotalValueText.innerText = getTotalsAsString(housesCards);
    if (didBust(playersCards) || didGetTwentyOne(playersCards))
        closeOutGameWithDealer();
    e.preventDefault();
});

//stay button
stayButton.addEventListener("click", (e) => {
    if (stayButton.innerText === PLAY_AGAIN)
        restartGame();
    else
        closeOutGameWithDealer();
});

// restart game
function restartGame() {
    resultText.innerText = PENDING;
    hitButton.disabled = false;
    cardImage.src = PLACEHOLDER_IMAGE;
    stayButton.innerText = STAY;
    playerCardsList.innerText = EMPTY_STRING;
    houseCardsList.innerText = EMPTY_STRING;
    playerTotalValueText.innerText = START_PLAYING;
    houseTotalValueText.innerText = START_PLAYING;

    //restart variables
    playersCards.splice(0, playersCards.length);
    housesCards.splice(0, housesCards.length);
    reBuildCardDeck();
}

// close out game with dealer
function closeOutGameWithDealer() {
    //deal remaining necessary cards to house
    dealHouseNecessaryCards();
    const bestPlayerScore = getBestScore(playersCards);
    const bestHouseScore = getBestScore(housesCards);

    //set values
    houseCardsList.innerText = getCardsInHand(housesCards);
    playerTotalValueText.innerText = `${bestPlayerScore}`;
    houseTotalValueText.innerText = `${bestHouseScore}`;
    setFinalResult(bestPlayerScore, bestHouseScore);

    //close game to be restarted
    hitButton.disabled = true;
    stayButton.innerText = PLAY_AGAIN;
}

function setFinalResult(playerScore, houseScore) {
    console.log(`player score: ${playerScore}`);
    console.log(`house score: ${houseScore}`);
    //get result text
    if (playerScore > 21 && houseScore > 21) {
        resultText.innerText = BOTH_BUSTED;
    }
    else if (playerScore <= 21 && houseScore > 21) {
        if (playerScore == 21) {
            resultText.innerText = TWENTY_ONE;
        }
        resultText.innerText = PLAYER_WINS;
    }
    else if (playerScore > 21 && houseScore <= 21) {
        if (houseScore === 21) {
            resultText.innerText = TWENTY_ONE_FOR_HOUSE;
        }
        resultText.innerText = HOUSE_WINS;
    }
    else if (playerScore === 21 && houseScore === 21) {
        resultText.innerText = TWENTY_ONE_HOUSE_TIES;
    } 
    else if (playerScore === 21 && houseScore < 21) {
        resultText.innerText = TWENTY_ONE;
    }
    else if (playerScore < 21 && houseScore === 21) {
        resultText.innerText = TWENTY_ONE_FOR_HOUSE;
    }
    //both house and player have less than 21
    else {
        if (playerScore > houseScore) {
            resultText.innerText = PLAYER_WINS;
        }
        else if (playerScore === houseScore) {
            resultText.innerText = PLAYER_AND_HOUSE_TIE;
        }
        //houseScore is higher than player score
        else {
            resultText.innerText = HOUSE_WINS;
        }

    }
}
