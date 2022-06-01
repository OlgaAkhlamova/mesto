import { Popup } from './Popup.js';

class PopupConfirmAction extends Popup {
  constructor({handleConfirmAction}, popupSelector) {
    super(popupSelector);
    this._actionButton = this._popup.querySelector('.popup__save_delete-card');
    this._handleConfirmAction = handleConfirmAction;
    this._cardInfo = {};
  }

  open(card) {
    super.open();
    this._cardInfo = card;  
  }

  setEventListeners() {
    super.setEventListeners();
    this._actionButton.addEventListener('mousedown', (evt) => {
      evt.preventDefault();
      this._handleConfirmAction(this._cardInfo);
    });
  }
}
export {PopupConfirmAction};