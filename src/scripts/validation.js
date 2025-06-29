export function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(`${validationConfig.formSelector}`)
  );

  formList.forEach(function (form) {
    setformValidationEventListeners(form, validationConfig);
  });
}

function setformValidationEventListeners(form, validationConfig) {
  const inputList = Array.from(
    form.querySelectorAll(`${validationConfig.inputSelector}`)
  );
    const buttonElement = form.querySelector(`${validationConfig.submitButtonSelector}`);

  inputList.forEach(function (input) {
    input.addEventListener('input', () => {
      isPopupInputValid(form, input, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
    });
  });
}

function isPopupInputValid(form, input, validationConfig) {
  const errorElement = form.querySelector(
    `.${input.id}-error`
  );

  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    showError(
      input,
      errorElement,
      input.validationMessage,
      validationConfig.errorClass,
      validationConfig.inputErrorClass
    );
  } else {
    hideError(
      input,
      errorElement,
      validationConfig.errorClass,
      validationConfig.inputErrorClass
    );
  }
}

function showError(
  input,
  errorElement,
  validationMessage,
  errorClass,
  inputErrorClass
) {
  errorElement.textContent = validationMessage;
  errorElement.classList.add(`${errorClass}`);
  input.classList.add(`${inputErrorClass}`);
}

function hideError(input, errorElement, errorClass, inputErrorClass) {
  errorElement.classList.remove(`${errorClass}`);
  errorElement.textContent = '';
  input.classList.remove(`${inputErrorClass}`);
  input.setCustomValidity('');
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidPopupInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(`${inactiveButtonClass}`);
  } else {
    buttonElement.classList.remove(`${inactiveButtonClass}`);
    buttonElement.disabled = false;
  }
}

function hasInvalidPopupInput(inputList) {
  return inputList.some((input) => {
    if (!input.validity.valid) {
      return true;
    }
  });
}

export function clearValidation(form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const buttonElement = form.querySelector(`${validationConfig.submitButtonSelector}`);
  
  inputList.forEach((input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    hideError(input, errorElement, validationConfig.errorClass, validationConfig.inputErrorClass);
  });

   toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass)

}

export function enablePopupButton(buttonElement) {
  buttonElement.classList.remove('popup__button_disabled');
}