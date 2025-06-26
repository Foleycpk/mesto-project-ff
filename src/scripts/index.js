// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { addCard, deleteCard, likeCard } from './card.js';
import {initialCards} from './cards.js'
import {
  openPopup,
  closePopup,
  closePopupByCloseButtonClick,
  closePopupByOverlayClick,
} from './modals.js';

const page = document.querySelector('.page');
export const placesList = page.querySelector('.places__list');
export const imagePopup = page.querySelector('.popup_type_image');
export const photoPopupImage = imagePopup.querySelector('.popup__image');
export const captionPopupImage = imagePopup.querySelector('.popup__caption');

const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');
const editeProfilePopup = page.querySelector('.popup_type_edit');
const newCardPopup = page.querySelector('.popup_type_new-card');
const popups = [imagePopup, editeProfilePopup, newCardPopup];
const profileNameElement = page.querySelector('.profile__title');
const profileJobElement = page.querySelector('.profile__description');
const editFormElement = page.querySelector('form[name="edit-profile"]');
const profileNameInput = editFormElement.querySelector(
  '.popup__input_type_name'
);
const profileJobInput = editFormElement.querySelector(
  '.popup__input_type_description'
);
const addNewCardFormElement = page.querySelector('form[name="new-place"]');
const cardImageNameInput = addNewCardFormElement.querySelector(
  '.popup__input_type_card-name'
);
const cardImageLinkInput = addNewCardFormElement.querySelector(
  '.popup__input_type_url'
);

popups.forEach(function (item) {
  item.addEventListener('click', closePopupByCloseButtonClick);
  item.addEventListener('click', closePopupByOverlayClick);
});

editeProfilePopup.addEventListener('submit', handleEditFormSubmit);

newCardPopup.addEventListener('submit', handleAddNewCardFormSubmit);

function openImagePopup(cardImageLink, cardImageDescription) {
  photoPopupImage.src = cardImageLink;
  photoPopupImage.alt = cardImageDescription;
  captionPopupImage.textContent = cardImageDescription;
  openPopup(imagePopup);
}

initialCards.forEach(function (card) {
  addCard(card, deleteCard, likeCard, openImagePopup, placesList);
});

function openPopupProfile() {
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
  openPopup(editeProfilePopup);
}

profileEditButton.addEventListener('click', openPopupProfile);

function openNewCardPopup() {
  openPopup(newCardPopup);
}

profileAddButton.addEventListener('click', openNewCardPopup);

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  closePopup(evt.currentTarget);
}

function handleAddNewCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardImageNameInput.value,
    link: cardImageLinkInput.value,
  };

  addCard(newCard, deleteCard, likeCard, openImagePopup, placesList, 'prepend');
  addNewCardFormElement.reset();
  closePopup(evt.currentTarget);
}
