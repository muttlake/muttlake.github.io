import {cardDeck, ACE, HIGH_ACE_VALUE, DEFAULT_HOUSE_TARGET_TOTAL, 
        playersCards, housesCards} from "./card.js";

// function to pop a random card off of card deck
function dealCard() {
    const numCardsInDeck = cardDeck.length;
    if (numCardsInDeck > 1) {
        const card = cardDeck.splice(Math.floor(Math.random() * numCardsInDeck), 1).pop();
        return card;
    }
    else if (numCardsInDeck === 1)
        return cardDeck.pop();
    return null;
}

// function to deal the player a card
export function dealPlayerCard() {
    const card = dealCard();
    playersCards.push(card);
    if(playersCards.length <= 2) {
        dealHouseCard();
    }
    return card;
}

// deals house a card
function dealHouseCard() {
    const card = dealCard();
    housesCards.push(card);
}

// function to deal house necessary cards
export function dealHouseNecessaryCards() {
    const targetTotal = getTargetTotalForHouse(playersCards);
    let houseLowTotal = lowTotal(housesCards);
    let houseHighTotal = highTotal(housesCards);
    let bestHouseScore = getBestScore(housesCards);
    if(bestHouseScore > 21)
        return bestHouseScore;
    if(bestHouseScore === 21)
        return 21;
    if(bestHouseScore > targetTotal)
        return bestHouseScore;
    let continueDealing = true;
    //both new totals are less than or equal to target total 
    //because bestHouseScore is less than or equal to target total
    let newTotal = Math.max(houseLowTotal, houseHighTotal);
    while(continueDealing) {
        const card = dealCard();
        housesCards.push(card);
        houseLowTotal = lowTotal(housesCards);
        houseHighTotal = highTotal(housesCards);
        //both totals are over 21
        if(houseLowTotal > 21 && houseHighTotal > 21) {
            newTotal = Math.min(houseLowTotal, houseHighTotal);
            continueDealing = false;
        }
        //either total is equal to 21
        if(houseLowTotal === 21 || houseHighTotal === 21) {
            newTotal = 21;
            continueDealing = false;
        }
        //either one of the totals is greater than target total but less than 21
        if((houseLowTotal > targetTotal && houseLowTotal < 21) ||
           (houseHighTotal > targetTotal && houseHighTotal < 21)) {
            //the high total is less than 21 and greater than the low total
            if(houseHighTotal > houseLowTotal && houseHighTotal < 21)
                newTotal = houseHighTotal;
            else
                newTotal = houseLowTotal;
            continueDealing = false;
        }
    }
    return newTotal;
}

// return list of cards in a hand using short symbols
export function getCardsInHand(cardHand) {
    let cardsInHand = "";
    for(const card of cardHand) {
        if(cardsInHand.length === 0)
            cardsInHand += card.getShortName();
        else
            cardsInHand += ", " + card.getShortName();
    }
    return cardsInHand;
}

// function to calculate players highTotal
function highTotal(cardHand) {
    let highTotalValue = 0;
    let foundAce = false;
    for(const card of cardHand) {
        if(!foundAce && card.rank === ACE) {
            highTotalValue += HIGH_ACE_VALUE;
            foundAce = true;
        }
        else {
            highTotalValue += card.value;
        }
    }
    return highTotalValue;
}

function lowTotal(cardHand) {
    let lowTotalValue = 0;
    for(const card of cardHand) {
        lowTotalValue += card.value;
    }
    return lowTotalValue;
}


function getTargetTotalForHouse(playerHand) {
    const playerBestScore = getBestScore(playerHand);
    if (playerBestScore > 21)
        return 0;
    return playerBestScore;
}

// get best score
export function getBestScore(cardHand) {
    const lowTotalValue = lowTotal(cardHand);
    const highTotalValue = highTotal(cardHand);
    //if both totals are over 21
    if(lowTotalValue > 21 && highTotalValue > 21)
        return Math.min(lowTotalValue, highTotalValue);
    //if either total is 21
    if(lowTotalValue === 21 || highTotalValue === 21)
        return 21;
    //if highTotal is over 21, lowTotal is less than 21 because of first conditional
    if(highTotalValue > 21)
        return lowTotalValue;
    //if lowTotal is over 21, highTotal is less than 21 because of first conditional
    if(lowTotalValue > 21)
        return highTotalValue;
    //both totals are less than 21
    return Math.max(lowTotalValue, highTotalValue);
}

// get card hand totals as a string
export function getTotalsAsString(cardHand) {
    const lowTotalValue = lowTotal(cardHand);
    const highTotalValue = highTotal(cardHand);
    if(lowTotalValue === highTotalValue)
        return `${lowTotalValue}`;
    return `${lowTotalValue} or ${highTotalValue}`;
}

// get if player busted
export function didBust(cardHand) {
    if(lowTotal(cardHand) > 21 && highTotal(cardHand) > 21)
        return true;
    return false;
}

// get if player busted
export function didGetTwentyOne(cardHand) {
    if(lowTotal(cardHand) === 21 || highTotal(cardHand) === 21)
        return true;
    return false;
}