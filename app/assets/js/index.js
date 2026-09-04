import { decks, getDeckByID } from "./decks.js";
import { hexToString, removeColorClasses } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

const deckTemplate = document.querySelector("#deck-template");
const deckList = document.querySelector(".decks__list");
const homeView = document.querySelector("#home");
const notFoundView = document.querySelector("#not-found");
const pageMainContent = document.querySelector(".page__main-content");
const carouselView = document.querySelector(".carousel");

function renderHomeView() {
  homeView.style.display = "block";
  carouselView.style.display = "none";
  notFoundView.style.display = "none";
}

function renderNotFoundView() {
  homeView.style.display = "none";
  carouselView.style.display = "none";
  notFoundView.style.display = "block";
}

function handleRoute() {
  const hash = window.location.hash.slice(1) || "home";

  if (hash === "home") {
    renderHomeView();
    pageMainContent.classList.remove("page__main-content_location_carousel");
  } else if (hash.startsWith("carousel/")) {
    const id = hash.split("/")[1];
    const currentDeck = getDeckByID(id);

    if (!currentDeck) {
      renderNotFoundView();
      pageMainContent.classList.remove("page__main-content_location_carousel");
      return;
    }

    homeView.style.display = "none";
    notFoundView.style.display = "none";
    carouselView.style.display = "flex";
    renderCarouselView(currentDeck);
    pageMainContent.classList.add("page__main-content_location_carousel");
  } else {
    renderNotFoundView();
    pageMainContent.classList.remove("page__main-content_location_carousel");
  }
}

window.addEventListener("DOMContentLoaded", handleRoute);
window.addEventListener("hashchange", handleRoute);

function createDeckEl(item) {
  const deckClone = deckTemplate.content.querySelector(".deck").cloneNode(true);
  const deleteEl = deckClone.querySelector(".deck__delete-btn");
  deckClone.querySelector(".deck__title").textContent = item.name;
  deckClone.querySelector(".deck__count").textContent =
    `${item.cards.length} cards`;
  const deckLink = deckClone.querySelector(".deck__link");

  deckLink.href = `#carousel/${item.id}`;

  deleteEl.addEventListener("click", () => {
    deckClone.remove();
  });

  removeColorClasses(deckClone);

  const color = hexToString(item.color);
  const bem_modifier = `deck_color_${color}`;

  deckClone.classList.add(bem_modifier);

  return deckClone;
}

function renderDeckEl(item) {
  const newDeck = createDeckEl(item);
  deckList.prepend(newDeck);
}

decks.forEach(renderDeckEl);
