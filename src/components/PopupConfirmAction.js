import { Popup } from './Popup.js';

class PopupConfirmAction extends Popup {
  constructor({handleConfirmAction}, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this.actionButton = this._popup.querySelector('.popup__save_delete-card');
    this._handleConfirmAction = handleConfirmAction;
    this._cardInfo = {};
  }

  open(card) {
    super.open();
    this._cardInfo = card;  
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
//замечание ревьюера: "this._actionButton.addEventListener('mousedown', (evt) => ..."
//при удалении карточек идет перезагрузки страницы. Такого не должно быть
//Обработчик сабмита нужно навешивать только на тег form с событием submit, 
//а не на кнопку сабмита с событием click, так как сабмит формы происходит ещё при 
//нажатии Enter, и он не будет работать, если навесить обработчик клика на кнопку только. 
//Это нужно исправить везде, где есть инпуты и форма
//так как тег form есть в попапе подтверждения, нужно submit на форму устанавливать
      evt.preventDefault();
      this._handleConfirmAction(this._cardInfo);
    });
  }
}
export {PopupConfirmAction};