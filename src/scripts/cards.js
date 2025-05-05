export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const page = document.querySelector(".page");
const placesList = page.querySelector(".places__list");

export function addCard(card, method = "append") {
  const cardElement = createCard(card.name, card.link, deleteCard);
  placesList[method](cardElement);
}

function deleteCard(card) {
  card.remove();
}

function createCard(cardTitleValue, cardImageLink, deleteCard) {
  const card = page.querySelector("#card-template").content;
  const cardElement = card.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardImageLink;
  cardImage.alt = cardTitleValue;
  cardTitle.textContent = cardTitleValue;

  //TO DO вынести навешивание обработчика в index.js
  cardDeleteButton.addEventListener("click", function () {
    deleteCard(cardDeleteButton.closest(".card"));
  });

  return cardElement;
}

