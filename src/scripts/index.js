// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { initialCards, addCard, deleteCard, likeCard, openCard} from './cards.js';
import { openPopup, closePopupByCloseButtonClick, closePopupByOverlayClick, closePopupByEsc, handleEditFormSubmit, handleAddNewCardFormSubmit } from './modals.js';

const page = document.querySelector('.page');
const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');
const editeProfilePopup = page.querySelector('.popup_type_edit');
const addNewCardPopup = page.querySelector('.popup_type_new-card');
const profileNameElement = page.querySelector('.profile__title');
const profileJobElement = page.querySelector('.profile__description');
const editFormElement = page.querySelector('form[name="edit-profile"]');
const profileNameInput = editFormElement.querySelector(
  '.popup__input_type_name'
);
const profileJobInput = editFormElement.querySelector(
  '.popup__input_type_description'
);

initialCards.forEach(function (card) {
  addCard(card, deleteCard, likeCard, openCard);
});

profileEditButton.addEventListener('click', function () {
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;

  editeProfilePopup.addEventListener('click', closePopupByCloseButtonClick);
  editeProfilePopup.addEventListener('click', closePopupByOverlayClick);
  editeProfilePopup.addEventListener('keydown', closePopupByEsc);
  editeProfilePopup.addEventListener('submit', handleEditFormSubmit);

  openPopup(editeProfilePopup);
});

profileAddButton.addEventListener('click', function () {
  addNewCardPopup.addEventListener('click', closePopupByCloseButtonClick);
  addNewCardPopup.addEventListener('click', closePopupByOverlayClick);
  addNewCardPopup.addEventListener('keydown', closePopupByEsc);
  addNewCardPopup.addEventListener('submit', handleAddNewCardFormSubmit);

  openPopup(addNewCardPopup);
});
