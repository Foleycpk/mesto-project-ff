// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { addCard, deleteCard, likeCard } from './card.js';
import { initialCards } from './cards.js';
import {
  openPopup,
  closePopup,
  closePopupByCloseButtonClick,
  closePopupByOverlayClick,
} from './modals.js';
import {
  enableValidation,
  clearValidation,
} from './validation.js';

const page = document.querySelector('.page');
export const placesList = page.querySelector('.places__list');
export const imagePopup = page.querySelector('.popup_type_image');
export const photoPopupImage = imagePopup.querySelector('.popup__image');
export const captionPopupImage = imagePopup.querySelector('.popup__caption');

const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');
const editeProfilePopup = page.querySelector('.popup_type_edit');
const profileForm = page.querySelector('form[name="edit-profile"]');
const newCardPopup = page.querySelector('.popup_type_new-card');
const newCardForm = page.querySelector('form[name="new-place"]');
const popups = Array.from(page.querySelectorAll('.popup'));
const formList = Array.from(page.querySelectorAll('.popup__form'));
const profileNameElement = page.querySelector('.profile__title');
const profileJobElement = page.querySelector('.profile__description');
const profileNameInput = profileForm.querySelector(
  '.popup__input_type_name'
);
const profileJobInput = profileForm.querySelector(
  '.popup__input_type_description'
);
const cardImageNameInput = newCardForm.querySelector(
  '.popup__input_type_card-name'
);
const cardImageLinkInput = newCardForm.querySelector(
  '.popup__input_type_url'
);
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}; 

initialCards.forEach(function (card) {
  addCard(card, deleteCard, likeCard, openImagePopup, placesList);
});

popups.forEach(function (popup) {
  popup.addEventListener('click', closePopupByCloseButtonClick);
  popup.addEventListener('click', closePopupByOverlayClick);
});

profileEditButton.addEventListener('click', openPopupProfile);

function openPopupProfile() {
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
  clearValidation(profileForm, validationConfig); 
  openPopup(editeProfilePopup);
}

profileAddButton.addEventListener('click', openNewCardPopup);

function openNewCardPopup() {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
  openPopup(newCardPopup);
}

editeProfilePopup.addEventListener('submit', handleEditFormSubmit);
newCardPopup.addEventListener('submit', handleAddNewCardFormSubmit);

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
  newCardForm.reset();
  closePopup(evt.currentTarget);
}

function openImagePopup(cardImageLink, cardImageDescription) {
  photoPopupImage.src = cardImageLink;
  photoPopupImage.alt = cardImageDescription;
  captionPopupImage.textContent = cardImageDescription;
  openPopup(imagePopup);
}

enableValidation(validationConfig);
