import {cardDeck, ACE, HIGH_ACE_VALUE, playersCards, housesCards} from "./card.js";

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
export function highTotal(cardHand) {
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

export function lowTotal(cardHand) {
    let lowTotalValue = 0;
    for(const card of cardHand) {
        lowTotalValue += card.value;
    }
    return lowTotalValue;
}


