const editFormElement = document.querySelector('form[name="edit-profile"]');
const profileNameElement = document.querySelector(".profile__title");   //возможно заменить const на let
const profileJobElement = document.querySelector(".profile__description");
const profileNameInput = document.querySelector(".popup__input_type_name"); 
const profileJobInput = document.querySelector(".popup__input_type_description"); 

export function openEditProfilePopup(popup, popupCallback) {
  profileNameInput.value = profileNameElement.textContent
  profileJobInput.value = profileJobElement.textContent
  
  popupCallback(popup);
  openPopup(popup);
}

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

function closePopupByOverlayClick (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.currentTarget)
    removePopupListeners(evt.currentTarget);
  }
}

function closePopupByCloseButtonClick (evt) {
  if (
    evt.target.classList.contains('popup__close')
  ) {
    profileNameInput.value = '';
    profileJobInput.value = '';
    closePopup(evt.currentTarget)
    removePopupListeners(evt.currentTarget);
  }
};

function closePopupByEsc (evt) {
  if (evt.key === "Escape") {
    closePopup(popup);
    removePopupListeners(popup);
  }
}

export function popupCallback (popup) {
  popup.addEventListener('click', closePopupByCloseButtonClick);
  popup.addEventListener('click', closePopupByOverlayClick);
  popup.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('submit', handleEditFormSubmit); 
};

function removePopupListeners (popup) {
  popup.removeEventListener('click', closePopupByCloseButtonClick);
  popup.removeEventListener('click', closePopupByOverlayClick);
  popup.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('submit', handleEditFormSubmit); 

}

function handleEditFormSubmit (evt) {
  evt.preventDefault(); 

  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  closePopup(evt.currentTarget);
}

