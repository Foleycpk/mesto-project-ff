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
  const cardElement = createCard(card.name, card.link, deleteCard, likeCard);
  placesList[method](cardElement); 
}



function createCard(cardTitleValue, cardImageLink, deleteCard, likeCard) {
  const card = page.querySelector("#card-template").content;
  const cardElement = card.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");


  cardImage.src = cardImageLink;
  cardImage.alt = cardTitleValue;
  cardTitle.textContent = cardTitleValue;

  //TO DO вынести навешивание обработчика в index.js
  cardDeleteButton.addEventListener("click", function () {
    deleteCard(cardDeleteButton.closest(".card"));
  });

  cardLikeButton.addEventListener("click", likeCard);
  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
