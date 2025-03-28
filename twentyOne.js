import {dealPlayerCard, getCardsInHand} from "./dealer.js";
import {playersCards, housesCards} from "./card.js";

//buttons
const hitButton = document.getElementById("hit");
const stayButton = document.getElementById("stay");

//card image
const cardImage = document.getElementById("current-card-image");

//cards dealt lists
const playersCardsList = document.getElementById("players-cards-list");
const housesCardsList = document.getElementById("houses-cards-list");


hitButton.addEventListener("click", function(e) {
    const card = dealPlayerCard();
    cardImage.src = card.image;
    playersCardsList.innerText = getCardsInHand(playersCards);
    housesCardsList.innerText = getCardsInHand(housesCards);
    e.preventDefault();
});




