import { removeColorClasses, hexToString } from "./colors.js";

function renderCarouselView(deck) {
  const carousel = document.querySelector(".carousel");
  const title = carousel.querySelector(".carousel__title");
  const cardElement = carousel.querySelector(".carousel__card");
  const cardText = carousel.querySelector(".carousel__card-text");
  const flipButton = carousel.querySelector(".carousel__btn_type_flip");
  const leftArrow = carousel.querySelector(".carousel__btn_type_left");
  const rightArrow = carousel.querySelector(".carousel__btn_type_right");

  carousel.style.display = "flex";

  function getCarouselTitleString(deck, currentIndex) {
    return `${currentIndex + 1}/${deck.cards.length}· ${deck.name} `;
  }

  function disableButton(button) {
    button.disabled = true;
    button.classList.add("carousel__btn_disabled");
  }

  function enableButton(button) {
    button.disabled = false;
    button.classList.remove("carousel__btn_disabled");
  }

  let currentIndex = 0;
  let showingQuestion = true;

  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];
    cardText.textContent = currentCard.question;
    title.textContent = getCarouselTitleString(deck, currentIndex);

    if (currentIndex === 0) {
      disableButton(leftArrow);
    } else {
      enableButton(leftArrow);
    }

    if (currentIndex === deck.cards.length - 1) {
      disableButton(rightArrow);
    } else {
      enableButton(rightArrow);
    }

    if (showingQuestion) {
      cardText.textContent = currentCard.question;
      removeColorClasses(cardElement);

      const color = hexToString(deck.color);
      cardElement.classList.add(`card__carousel_color_${color}`);
    } else {
      cardText.textContent = currentCard.answer;
      removeColorClasses(cardElement);
      cardElement.classList.add("carousel__card_color_white");
    }
  }

  rightArrow.addEventListener("click", () => {
    currentIndex++;
    showingQuestion = true;
    updateDisplay();
  });

  leftArrow.addEventListener("click", () => {
    currentIndex--;
    showingQuestion = true;
    updateDisplay();
  });

  removeColorClasses(cardElement);

  const color = hexToString(deck.color);

  cardElement.classList.add(`card__carousel_color_${color}`);

  flipButton.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  });

  updateDisplay();
}

export { renderCarouselView };
