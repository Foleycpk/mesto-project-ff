import { addCard, deleteCard, likeCard, openCard } from './cards.js';

const page = document.querySelector('.page');

export function openPopup(popup) {
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

export function closePopupByOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.currentTarget);
  }
}

export function closePopupByCloseButtonClick(evt) {
  if (evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  }
}

export function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(evt.currentTarget);
  }
}

export function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const profileNameElement = page.querySelector('.profile__title');
  const profileJobElement = page.querySelector('.profile__description');
  const editFormElement = page.querySelector('form[name="edit-profile"]');
  const profileNameInput = editFormElement.querySelector('.popup__input_type_name');
  const profileJobInput = editFormElement.querySelector('.popup__input_type_description');

  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  closePopup(evt.currentTarget);
}

export function handleAddNewCardFormSubmit(evt) {
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

  addCard(newCard, deleteCard, likeCard, openCard , 'prepend');
  AddNewCardFormElement.reset();
  closePopup(evt.currentTarget);
}
