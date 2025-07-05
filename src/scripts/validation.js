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
  const buttonElement = form.querySelector(
    `${validationConfig.submitButtonSelector}`
  );

  inputList.forEach(function (input) {
    input.addEventListener('input', () => {
      isPopupInputValid(form, input, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

function isPopupInputValid(form, input, validationConfig) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    showError(
      input,
      form,
      input.validationMessage,
      validationConfig.errorClass,
      validationConfig.inputErrorClass
    );
  } else {
    hideError(
      input,
      form,
      validationConfig.errorClass,
      validationConfig.inputErrorClass
    );
  }
}

function showError(
  input,
  form,
  validationMessage,
  errorClass,
  inputErrorClass
) {
  const errorElement = form.querySelector(`.${input.id}-error`);

  errorElement.textContent = validationMessage;
  errorElement.classList.add(`${errorClass}`);
  input.classList.add(`${inputErrorClass}`);
}

function hideError(input, form, errorClass, inputErrorClass) {
  const errorElement = form.querySelector(`.${input.id}-error`);

  errorElement.classList.remove(`${errorClass}`);
  errorElement.textContent = '';
  input.classList.remove(`${inputErrorClass}`);
  input.setCustomValidity('');
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidPopupInput(inputList)) {
    disableSubmitButton(buttonElement, validationConfig);
  } else {
    enableSubmitButton(buttonElement, validationConfig);
  }
}

const disableSubmitButton = (buttonElement, validationConfig) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
};

const enableSubmitButton = (buttonElement, validationConfig) => {
  buttonElement.classList.remove(`${validationConfig.inactiveButtonClass}`);
  buttonElement.disabled = false;
};

function hasInvalidPopupInput(inputList) {
  return inputList.some((input) => {
    if (!input.validity.valid) {
      return true;
    }
  });
}

export function clearValidation(form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const buttonElement = form.querySelector(
    `${validationConfig.submitButtonSelector}`
  );

  inputList.forEach((input) => {
    hideError(
      input,
      form,
      validationConfig.errorClass,
      validationConfig.inputErrorClass
    );
  });

  disableSubmitButton(buttonElement, validationConfig);
}
