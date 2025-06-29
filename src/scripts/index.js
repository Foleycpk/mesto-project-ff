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
  isPopupInputValid,
  hasInvalidPopupInput,
  clearPopupErrorMessages,
  toggleButtonState,
  enablePopupButton
} from './validation.js';

const page = document.querySelector('.page');
export const placesList = page.querySelector('.places__list');
export const imagePopup = page.querySelector('.popup_type_image');
export const photoPopupImage = imagePopup.querySelector('.popup__image');
export const captionPopupImage = imagePopup.querySelector('.popup__caption');

const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');
const editeProfilePopup = page.querySelector('.popup_type_edit');
const newCardPopup = page.querySelector('.popup_type_new-card');
const popups = Array.from(page.querySelectorAll('.popup'));
const popupsWithForm = Array.from(page.querySelectorAll('.popup__form'));
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

initialCards.forEach(function (card) {
  addCard(card, deleteCard, likeCard, openImagePopup, placesList);
});

popups.forEach(function (popup) {
  popup.addEventListener('click', closePopupByCloseButtonClick);
  popup.addEventListener('click', closePopupByOverlayClick);
});

profileEditButton.addEventListener('click', openPopupProfile);

function openPopupProfile() {
  let inputList = Array.from(editeProfilePopup.querySelectorAll('.popup__input'));
  const buttonElement = editeProfilePopup.querySelector('.popup__button');

  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
  clearPopupErrorMessages(editeProfilePopup);
  toggleButtonState(inputList, buttonElement);
  openPopup(editeProfilePopup);
}

profileAddButton.addEventListener('click', openNewCardPopup);

function openNewCardPopup() {
  const inputList = Array.from(newCardPopup.querySelectorAll('.popup__input'));
  const buttonElement = newCardPopup.querySelector('.popup__button');

  addNewCardFormElement.reset();
  clearPopupErrorMessages(newCardPopup);
  toggleButtonState(inputList, buttonElement);
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
  addNewCardFormElement.reset();
  closePopup(evt.currentTarget);
}

function openImagePopup(cardImageLink, cardImageDescription) {
  photoPopupImage.src = cardImageLink;
  photoPopupImage.alt = cardImageDescription;
  captionPopupImage.textContent = cardImageDescription;
  openPopup(imagePopup);
}

popupsWithForm.forEach(function (popup) {
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));
  setPopupValidationEventListeners(popup, inputList);
});

function setPopupValidationEventListeners(popup, inputList) {
  const buttonElement = popup.querySelector('.popup__button');
  // buttonElement.classList.add('popup__button_disabled');

  inputList.forEach(function (input) {
    input.addEventListener('input', () => {
      isPopupInputValid(popup, input);
      toggleButtonState(inputList, buttonElement);
    });
  });
}



