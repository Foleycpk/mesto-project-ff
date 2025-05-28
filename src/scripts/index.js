// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { initialCards, addCard } from './cards.js';
import { openEditProfilePopup, openAddNewCardPopup } from './modals.js';

const page = document.querySelector('.page');

initialCards.forEach(function (card) {
  addCard(card);
});

const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');

const editeProfilePopup = page.querySelector('.popup_type_edit');
const addNewCardPopup = page.querySelector('.popup_type_new-card');

profileEditButton.addEventListener('click', function () {
  openEditProfilePopup(editeProfilePopup);
});

profileAddButton.addEventListener('click', function () {
  openAddNewCardPopup(addNewCardPopup);
});
