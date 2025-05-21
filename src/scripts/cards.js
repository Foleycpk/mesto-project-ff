import { openPopupImage } from './modals.js';

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const page = document.querySelector('.page');
const placesList = page.querySelector('.places__list');

export function addCard(card, method = 'append') {
  const cardElement = createCard(
    card.name,
    card.link,
    deleteCard,
    likeCard,
    openCard
  );
  placesList[method](cardElement);
}

function createCard(
  cardTitleValue,
  cardImageLink,
  deleteCard,
  likeCard,
  openCard
) {
  const card = page.querySelector('#card-template').content;
  const cardElement = card.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardImageLink;
  cardImage.alt = cardTitleValue;
  cardTitle.textContent = cardTitleValue;

  cardDeleteButton.addEventListener('click', function () {
    deleteCard(cardDeleteButton.closest('.card'));
  });

  cardLikeButton.addEventListener('click', likeCard);

  cardElement.addEventListener('click', openCard);

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function openCard(evt) {
  if (!evt.target.classList.contains('card__like-button')) {
    const imagePopup = page.querySelector('.popup_type_image');
    const cardElement = evt.currentTarget;
    const imageElement = cardElement.querySelector('.card__image');
    const imageLink = imageElement.src;
    const imageDescription = imageElement.alt;

    openPopupImage(imagePopup, imageLink, imageDescription);
  }
}
