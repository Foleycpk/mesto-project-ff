const page = document.querySelector('.page');

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);  
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

export function closePopupByOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.currentTarget);
  }
}

export function closePopupByCloseButtonClick(evt) {
  closePopup(evt.currentTarget.closest('.popup'));
}

export function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = page.querySelector('.popup_is-opened')
    closePopup(popup);
  }
}
