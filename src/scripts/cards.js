const card = document.querySelector('#card-template').content;

export function addCard(
  card,
  deleteCard,
  likeCard,
  openImagePopup,
  place,
  method = 'append'
) {
  const cardElement = createCard(
    card.name,
    card.link,
    deleteCard,
    likeCard,
    openImagePopup
  );
  place[method](cardElement);
}

function createCard(
  cardTitleValue,
  cardImageLink,
  deleteCard,
  likeCard,
  openImagePopup
) {
  const cardElement = card.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardImageLink;
  cardImage.alt = cardTitleValue;
  cardTitle.textContent = cardTitleValue;

  cardDeleteButton.addEventListener('click', deleteCard);

  cardLikeButton.addEventListener('click', likeCard);

  cardImage.addEventListener('click', openImagePopup);

  return cardElement;
}

export function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
