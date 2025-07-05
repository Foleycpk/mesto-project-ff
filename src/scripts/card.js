import { deleteCard, addLike, removeLike } from './api';

const card = document.querySelector('#card-template').content;

export function addCard(
  userId,
  card,
  deleteCardElement,
  likeCard,
  openImagePopup,
  place,
  method = 'append'
) {
  const cardElement = createCardElement(
    userId,
    card._id,
    card.name,
    card.link,
    card.likes,
    card.owner._id,
    deleteCardElement,
    likeCard,
    openImagePopup
  );

  place[method](cardElement);
}

function createCardElement(
  userId,
  cardId,
  cardTitleValue,
  cardImageLink,
  cardLikes,
  cardOwnerId,
  deleteCardElement,
  likeCard,
  openImagePopup
) {
  const cardElement = card.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = cardImageLink;
  cardImage.alt = cardTitleValue;
  cardTitle.textContent = cardTitleValue;
  cardLikeCounter.textContent = cardLikes.length;

  if (cardOwnerId === userId) {
    cardDeleteButton.addEventListener('click', (evt) => {
      deleteCardElement(evt, cardId);
    });
  } else {
    cardDeleteButton.remove();
  }

  if (isUserLiked(cardLikes, userId)) {
    likeCard(cardElement);
  }

  cardLikeButton.addEventListener('click', (evt) => {
    if (cardLikeButton.classList.contains('card__like-button_is-active')) {
      removeLike(cardId)
        .then((data) => {
          likeCard(cardElement);
          cardLikeCounter.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен');
        });
    } else {
      addLike(cardId)
        .then((data) => {
          likeCard(cardElement);
          cardLikeCounter.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен');
        });
    }
  });

  cardImage.addEventListener('click', (evt) => {
    openImagePopup(evt.target.src, evt.target.alt);
  });

  return cardElement;
}

export function deleteCardElement(evt, cardId) {
  deleteCard(cardId)
    .then((data) => {
      evt.target.closest('.card').remove();
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен');
    });
}

export function likeCard(cardElement) {
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.classList.toggle('card__like-button_is-active');
}

function isUserLiked(cardLikes, userId) {
  if (cardLikes.length === 0) {
    return false;
  }

  return cardLikes.some((like) => {
    if (like._id === userId) {
      return true;
    }
  });
}
