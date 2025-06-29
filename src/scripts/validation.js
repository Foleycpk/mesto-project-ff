export function isPopupInputValid(popup, popupInput) {
  const errorElement = popup.querySelector(`.${popupInput.id}-error`);
  
  if (popupInput.validity.patternMismatch) {
    popupInput.setCustomValidity(popupInput.dataset.errorMessage);
  } else {
    popupInput.setCustomValidity('');
  }
  
  if (!popupInput.validity.valid) {
    showError(popupInput, errorElement, popupInput.validationMessage);
  } else {
    hideError(popupInput, errorElement);
  }
};

function showError(popupInput, errorElement, validationMessage) { 
  errorElement.textContent = validationMessage;
  errorElement.classList.add('popup__input-error_active');

  popupInput.classList.add('popup__input_type_error');
};

function hideError(popupInput, errorElement) {
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');

  popupInput.setCustomValidity('');
  popupInput.classList.remove('popup__input_type_error');
};

export function hasInvalidPopupInput(inputList) {
  return inputList.some((input) => {
    if (!input.validity.valid) {
      return true;
    }
  });
};

export function clearPopupErrorMessages(popup) {
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));

  inputList.forEach((popupInput) => {
    const errorElement = popup.querySelector(`.${popupInput.id}-error`);
    hideError(popupInput, errorElement);
  })
};

export function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidPopupInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.classList.remove('popup__button_disabled');
    buttonElement.disabled = false;
  }
}

export function enablePopupButton(buttonElement) {
  buttonElement.classList.remove('popup__button_disabled');
};