// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { addCard, deleteCardElement, likeCard } from './card.js';
import {
  openPopup,
  closePopup,
  closePopupByCloseButtonClick,
  closePopupByOverlayClick,
} from './modals.js';
import { enableValidation, clearValidation } from './validation.js';
import { getCards, getUser, editUserProfile, createCard, changeAvatar } from './api.js';

const page = document.querySelector('.page');

export const placesList = page.querySelector('.places__list');
export const imagePopup = page.querySelector('.popup_type_image');
export const photoPopupImage = imagePopup.querySelector('.popup__image');
export const captionPopupImage = imagePopup.querySelector('.popup__caption');

const avatarImageElement = page.querySelector('.profile__image');
const editAvatarPopup = page.querySelector('.popup_type_avatar-edit');
const avatarEditForm = editAvatarPopup.querySelector(
  'form[name="avatar-edit-profile"]'
);
const avatarLinkInput = avatarEditForm.querySelector('.popup__input_type_url');
const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');
const editeProfilePopup = page.querySelector('.popup_type_edit');
const profileForm = page.querySelector('form[name="edit-profile"]');
const newCardPopup = page.querySelector('.popup_type_new-card');
const newCardForm = page.querySelector('form[name="new-place"]');
const popups = Array.from(page.querySelectorAll('.popup'));
const profileNameElement = page.querySelector('.profile__title');
const profileJobElement = page.querySelector('.profile__description');
const profileImage = page.querySelector('.profile__image');
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector(
  '.popup__input_type_description'
);
const cardImageNameInput = newCardForm.querySelector(
  '.popup__input_type_card-name'
);
const cardImageLinkInput = newCardForm.querySelector('.popup__input_type_url');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

let usersProfileData;

Promise.all([getCards(), getUser()]).then(
  ([cards, user]) => {
    usersProfileData = user;
    setProfileData(usersProfileData);

    cards.forEach(function (card) {
      addCard(
        usersProfileData._id,
        card,
        deleteCardElement,
        likeCard,
        openImagePopup,
        placesList
      );
    });
  }
);

function setProfileData(usersProfileData) {
  profileNameElement.textContent = usersProfileData.name;
  profileJobElement.textContent = usersProfileData.about;
  profileImage.style.backgroundImage = `url(${usersProfileData.avatar})`;
}

popups.forEach(function (popup) {
  popup.addEventListener('click', closePopupByCloseButtonClick);
  popup.addEventListener('click', closePopupByOverlayClick);
});

avatarImageElement.addEventListener('click', () => {
  openPopupWithValidation(editAvatarPopup, avatarEditForm);
});

profileEditButton.addEventListener('click', openPopupProfile);

function openPopupProfile() {
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
  // console.log(profileForm)
  clearValidation(profileForm, validationConfig);
  openPopup(editeProfilePopup);
}

profileAddButton.addEventListener('click', () => {
  openPopupWithValidation(newCardPopup, newCardForm);
});

function openPopupWithValidation(popup, form) {
  form.reset();
  clearValidation(form, validationConfig);
  openPopup(popup);
}

editAvatarPopup.addEventListener('submit', (evt) =>
  handleEditAvatarFormSubmit(evt, editAvatarPopup)
);
editeProfilePopup.addEventListener('submit', (evt) => {
  handleEditFormSubmit(evt, editeProfilePopup);
});
newCardPopup.addEventListener('submit', (evt) => {
  handleAddNewCardFormSubmit(evt, newCardPopup);
});

function handleEditAvatarFormSubmit(evt, popup) {
  evt.preventDefault();
  const buttonElement = evt.target.querySelector('.popup__button');
  buttonElement.textContent = 'Сохранение....';
  changeAvatar(avatarLinkInput.value)
    .then(() => {
      avatarImageElement.style.backgroundImage = `url(${avatarLinkInput.value})`;
      closePopup(popup);
      buttonElement.textContent = 'Сохранить';
    })
    .catch((err) => {
      console.log(err);
      buttonElement.textContent = 'Сохранить';
    });
}

function handleEditFormSubmit(evt, popup) {
  evt.preventDefault();
  const buttonElement = evt.target.querySelector('.popup__button');
  buttonElement.textContent = 'Сохранение....';
  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  editUserProfile(profileNameInput.value, profileJobInput.value);
  buttonElement.textContent = 'Сохранить';
  closePopup(popup);
}

function handleAddNewCardFormSubmit(evt, popup) {
  const newCard = {
    name: cardImageNameInput.value,
    link: cardImageLinkInput.value,
  };
  evt.preventDefault();
  const buttonElement = popup.querySelector('.popup__button');
  buttonElement.textContent = 'Сохранение....';
  createCard(newCard.name, newCard.link)
    .then((card) => {
      addCard(
        usersProfileData._id,
        card,
        deleteCardElement,
        likeCard,
        openImagePopup,
        placesList,
        'prepend'
      );
    })
    .then(() => {
      newCardForm.reset();
      closePopup(popup);
      buttonElement.textContent = 'Сохранить';
    })
    .catch((err) => {
      console.log(err);
    });
}

function openImagePopup(cardImageLink, cardImageDescription) {
  photoPopupImage.src = cardImageLink;
  photoPopupImage.alt = cardImageDescription;
  captionPopupImage.textContent = cardImageDescription;
  openPopup(imagePopup);
}

enableValidation(validationConfig);
