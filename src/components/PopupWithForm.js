import { Popup } from "./Popup.js";
class PopupWithForm extends Popup {
  constructor({ popupSelector, callbackFormSubmit }) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitBtn = this._form.querySelector(".popup__save");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close = () => {
    super.close();
    this._form.reset();
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackFormSubmit(this._getInputValues());
      this.close();
    });
  }
}

export { PopupWithForm };
