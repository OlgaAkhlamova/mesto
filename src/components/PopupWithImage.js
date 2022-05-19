import { Popup } from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._zoomImage = this._popup.querySelector(".popup__card");
    this._zoomTitle = this._popup.querySelector(".popup__subtitle-zoom");
  }

  open(data) {
    this._zoomImage.src = data.link;
    this._zoomImage.alt = data.name;
    this._zoomTitle.textContent = data.name;

    super.open();
  }
}

export { PopupWithImage };
