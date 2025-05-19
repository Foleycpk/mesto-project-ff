import { addCard } from './cards.js';

const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__description');
const editFormElement = document.querySelector('form[name="edit-profile"]');
const profileNameInput = editFormElement.querySelector('.popup__input_type_name');
const profileJobInput = editFormElement.querySelector('.popup__input_type_description');

export function openEditProfilePopup(popup) {
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;

  popup.addEventListener('click', closePopupByCloseButtonClick);
  popup.addEventListener('click', closePopupByOverlayClick);
  popup.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('submit', handleEditFormSubmit);

  openPopup(popup);
}

export function openAddNewCardPopup(popup) {
  popup.addEventListener('click', closePopupByCloseButtonClick);
  popup.addEventListener('click', closePopupByOverlayClick);
  popup.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('submit', handleAddNewCardFormSubmit);

  openPopup(popup);
}

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

export function closePopup(popup) {
  popup.removeEventListener('click', closePopupByCloseButtonClick);
  popup.removeEventListener('click', closePopupByOverlayClick);
  popup.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('submit', handleEditFormSubmit);
  popup.removeEventListener('submit', handleEditFormSubmit);

  popup.classList.remove('popup_is-opened');
}

function closePopupByOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.currentTarget);
  }
}

function closePopupByCloseButtonClick(evt) {
  if (evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  }
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(evt.currentTarget);
  }
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  closePopup(evt.currentTarget);
}

function handleAddNewCardFormSubmit(evt) {
  evt.preventDefault();

  const AddNewCardFormElement = document.querySelector(
    'form[name="new-place"]'
  );
  const cardImageNameInput = AddNewCardFormElement.querySelector(
    '.popup__input_type_card-name'
  );
  const cardImageLinkInput = AddNewCardFormElement.querySelector(
    '.popup__input_type_url'
  );
  const newCard = {
    name: cardImageNameInput.value,
    link: cardImageLinkInput.value,
  };

  addCard(newCard, 'prepend');
  debugger;
  AddNewCardFormElement.reset();
  closePopup(evt.currentTarget);
}
