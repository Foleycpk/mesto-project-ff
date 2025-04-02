// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const page = document.querySelector(".page");
const placesList = page.querySelector(".places__list");

function createCard(cardTitleValue, cardImageLink, deleteCard) {
  const card = page.querySelector("#card-template").content;
  const cardElement = card.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardImageLink;
  cardImage.alt = cardTitleValue;
  cardElement.querySelector(".card__title").textContent = cardTitleValue;

  cardDeleteButton.addEventListener("click", function () {
    deleteCard(cardDeleteButton.closest(".card"));
  });

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

function addCard(card, method = "append") {
  const cardElement = createCard(card.name, card.link, deleteCard);
  placesList[method](cardElement);
}

initialCards.forEach(function (card) {
  addCard(card);
});
