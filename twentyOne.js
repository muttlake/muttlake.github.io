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

function setFinalResult(finalPlayerScore, finalHouseScore) {
    if(finalPlayerScore > 21)
    {
        if(finalHouseScore > 21)
        {
            resultText.innerText = "Both House and Player Busted!"; 
        }
        else if(finalHouseScore == 21)
        {
            resultText.innerText = "House wins. House got 21! Player Busted."; 
        }
        else //finalHouseScore < 21
        {
            resultText.innerText = "House wins. Player Busted."
        }
    }
    else if (finalPlayerScore == 21)
    {
        if(finalHouseScore > 21)
        {
            resultText.innerText = "Nice! Player got a 21! House busted."; 
        }
        else if(finalHouseScore == 21)
        {
            resultText.innerText = "Both Player and House got a 21!!"; 
        }
        else //finalHouseScore < 21
        {
            resultText.innerText = "Nice! Player got a 21!";
        }
    }
    else //finalPlayerScore < 21
    {
        if(finalHouseScore > 21)
        {
            resultText.innerText = "Nice! Player wins! House busted!"; 
        }
        else if(finalHouseScore == 21)
        {
            resultText.innerText = "House got a 21!!"; 
        }
        else //finalHouseScore < 21
        {
            if(finalPlayerScore > finalHouseScore)
            {
                resultText.innerText = "Nice! Player wins!"; 
            }
            else if (finalPlayerScore == finalHouseScore)
            {
                resultText.innerText = "Player and House tie."; 
            }
            else //finalPlayerScore < finalHouseScore
            {
                resultText.innerText = "House wins!"; 
            }
        }
    }
}