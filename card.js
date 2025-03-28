export class Card {
    constructor(suit, rank, image, value) {
        this.suit = suit;
        this.rank = rank;
        this.image = image;
        this.value = value;
    }

    getFullName() {
        return this.rank + " of " + this.suit;
    }

    getShortName() {
        return RANK_SHORT_SYMBOLS[this.rank] + SUIT_SHORT_SYMBOLS[this.suit];
    }
}


const PATH_TO_IMAGES = "./playingCards/";
const CLUBS_SUIT_CODE = "\u{2667}";
const DIAMONDS_SUIT_CODE = "\u{2662}";
const HEARTS_SUIT_CODE = "\u{2661}";
const SPADES_SUIT_CODE = "\u{2664}";

const SUITS = ["clubs", "diamonds", "hearts", "spades"];
const RANKS = ["ace", "two", "three", "four", "five", "six", "seven",
               "eight", "nine", "ten", "jack", "queen", "king"];
const RANK_VALUES = {"ace": 1, "two": 2, "three": 3, "four": 4, "five": 5, 
                     "six": 6, "seven": 7, "eight": 8, "nine": 9,
                     "ten": 10, "jack": 10, "queen": 10, "king": 10};
const RANK_SHORT_SYMBOLS = {"ace": "A", "two": "2", "three": "3", "four": "4", "five": "5", 
                            "six": "6", "seven": "7", "eight": "8", "nine": "9",
                            "ten": "10", "jack": "J", "queen": "Q", "king": "K"};
const SUIT_SHORT_SYMBOLS = {"clubs": CLUBS_SUIT_CODE, "diamonds": DIAMONDS_SUIT_CODE,
                            "hearts": HEARTS_SUIT_CODE, "spades": SPADES_SUIT_CODE};

export const ACE = "ace";
export const HIGH_ACE_VALUE = 11;



function buildCardDeck() {
    let cards = [];
    for(const suit of SUITS) {
        for(const rank of RANKS) {
            const pathToImage = PATH_TO_IMAGES + rank + "_of_" + suit + ".png";
            const card = new Card(suit, rank, pathToImage, RANK_VALUES[rank]);
            cards.push(card);
        }
    }
    return cards;
}

export const cardDeck = buildCardDeck();
export const playersCards = [];
export const housesCards = [];

