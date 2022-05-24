class FormValidator {
  constructor(listSelector, formElement) {
    this._listSelector = listSelector;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._listSelector.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._listSelector.submitButtonSelector
    );
  }

  //отображение на странице ошибки валидации
  _showInputError = (inputElement, validationMessage) => {
    this._inputError = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._listSelector.inputErrorClass);
    this._inputError.textContent = validationMessage;
    this._inputError.classList.add(this._listSelector.errorClass);
  };

  //скрытие элементов ошибок валидации
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._listSelector.inputErrorClass);
    errorElement.classList.remove(this._listSelector.errorClass);
    errorElement.textContent = "";
  };

  //проверка валидации одного поля ввода у формы
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //функции смены активности кнопки
  _hasInvalidInput = (inputList) => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  setActiveButton() {
    this._buttonElement.removeAttribute("disabled");
    this._buttonElement.classList.remove(
      this._listSelector.inactiveButtonClass
    );
  }

  setDisabledButton() {
    this._buttonElement.classList.add(this._listSelector.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  toggleButtonState = (inputList) => {
    if (this._hasInvalidInput(inputList)) {
      this.setDisabledButton();
    } else {
      this.setActiveButton();
    }
  };

  //очистка полей формы при несохраненных данных
  clearError() {
    this._inputList.forEach((item) => {
      this._hideInputError(item);
    });
    this.toggleButtonState();
  }

  //слушатель событий всех полей формы
  _setEventListeners = () => {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };
}

export { FormValidator };
