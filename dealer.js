import {
    cardDeck, ACE, HIGH_ACE_VALUE, DEFAULT_HOUSE_TARGET_TOTAL,
    playersCards, housesCards
} from "./card.js";

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
    if (playersCards.length <= 2) {
        dealHouseCard();
    }
    return card;
}

// deals house a card
function dealHouseCard() {
    const card = dealCard();
    housesCards.push(card);
}

export function dealHouseNecessaryCards() {
    const targetTotal = getTargetTotalForHouse(playersCards);
    let bestHouseScore = getBestScore(housesCards);
    if (bestHouseScore == 21) //no need to keep dealing if house is at 21
    {
        return bestHouseScore;
    }
    // dealing to house based on targetTotal from players turn
    if (targetTotal > 21) // if targetTotal > 21, house has already won because it only has two cards to begin with
    {
        return bestHouseScore;
    }
    else if (targetTotal == 21) //if target total == 21, pick cards until house can match 21
    {
        dealHouseCardsUntil(21);
        bestHouseScore = getBestScore(housesCards);
        return bestHouseScore;
    }
    else // targetTotal < 21
    {
        dealHouseCardsUntil(targetTotal);
        bestHouseScore = getBestScore(housesCards);
        return bestHouseScore;
    }
}

function dealHouseCardsUntil(targetValue) {
    let houseLowTotal = lowTotal(housesCards);
    let houseHighTotal = highTotal(housesCards);
    let continueDealing = true;
    while (continueDealing) {
        if (houseHighTotal < targetValue) {
            dealHouseCard();
            houseLowTotal = lowTotal(housesCards);
            houseHighTotal = highTotal(housesCards);
        }
        else // houseHighTotal >= targetValue
        {
            if (houseHighTotal == targetValue) {
                continueDealing = false;
            }
            else // houseHighTotal > targetValue
            {
                if (houseHighTotal <= 21) // if houseHighTotal is greater than targetValue but <= 21
                {
                    continueDealing = false;
                }
                else // houseHighTotal > 21
                {
                    if (houseLowTotal > targetValue) 
                    {
                        continueDealing = false;
                    }
                    else if (houseLowTotal == targetValue) 
                    {
                        continueDealing = false;
                    }
                    else // houseLowTotal < targetValue and houseHighTotal > 21
                    {
                        dealHouseCard();
                        houseLowTotal = lowTotal(housesCards);
                        houseHighTotal = highTotal(housesCards);
                    }
                }
            }
        }
    }
}

// return list of cards in a hand using short symbols
export function getCardsInHand(cardHand) {
    let cardsInHand = "";
    for (const card of cardHand) {
        if (cardsInHand.length === 0)
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
    for (const card of cardHand) {
        if (!foundAce) {
            if (card.rank == ACE) {
                highTotalValue += 11;
                foundAce = true;
            }
            else // card.rank is not ace
            {
                highTotalValue += card.value;
            }

        }
        else //already found an ace
        {
            highTotalValue += card.value;
        }
    }
    return highTotalValue;
}


function lowTotal(cardHand) {
    let lowTotalValue = 0;
    for (const card of cardHand) {
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
    // highTotalValue can only be >= lowTotalValue because of lowTotal and highTotal functions
    if (highTotalValue == lowTotalValue) {
        return highTotalValue;
    }
    else // highTotalValue > lowTotalValue because of the highTotal and lowTotal Functions
    {
        if (highTotalValue > 21) {
            return lowTotalValue; //lowTotalValue is always better than highTotalValue if highTotalValue is > 21
        }
        else if (highTotalValue == 21) {
            return highTotalValue;
        }
        else // highTotalValue < 21
        {
            return highTotalValue;
        }
    }
}

// get card hand totals as a string
export function getTotalsAsString(cardHand) {
    const lowTotalValue = lowTotal(cardHand);
    const highTotalValue = highTotal(cardHand);
    if (lowTotalValue === highTotalValue)
        return `${lowTotalValue}`;
    return `${lowTotalValue} or ${highTotalValue}`;
}

// get if player busted
export function didBust(cardHand) {
    if (lowTotal(cardHand) > 21 && highTotal(cardHand) > 21)
        return true;
    return false;
}

// get if player busted
export function didGetTwentyOne(cardHand) {
    if (lowTotal(cardHand) === 21 || highTotal(cardHand) === 21)
        return true;
    return false;
}