// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const page = document.querySelector(".page");
const placesList = page.querySelector(".places__list");

function addCard(cardTitleValue, cardImageLink, deleteCard) {
  const card = page.querySelector("#card-template").content;
  const cardElement = card.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = cardTitleValue;
  cardElement.querySelector(".card__image").src = cardImageLink;
  cardElement.querySelector(".card__image").alt = cardTitleValue;

  cardDeleteButton.addEventListener("click", function () {
    deleteCard(cardDeleteButton.closest(".card"));
  });

  placesList.append(cardElement);
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach(function (card) {
  addCard(card.name, card.link, deleteCard);
});
