class Card {
  constructor({ data, handleCardClick, handleTrashClick,
     handleLikeClick, currentUserId }, cardSelector) {
    this._data = data;
    this._cardId = data._id;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._countLike = data.likes.length;
    this._myId = currentUserId;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
  }

  //клонирование заготовки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  // id карточки
  getCardId() {
    return this._cardId;
  }

  //лайк
  likeCard(size) {
    this._likeButton.classList.toggle("card__like_active");
    this._likeCounter.textContent = size;
  };

  //удаление
  removeCard() {
    this._element.remove();
    this._element = null;
  };

  //прячем корзину, если чужая карточка
  hiddenTrash() {
    this.isMyCard = this._ownerId === this._myId;
    this._trashButton.classList.toggle('card__trash_hidden', !this.isMyCard);
  }

  //общий слушатель активности
  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
    this._likeButton.addEventListener("click", this._handleLikeClick);
    this._trashButton.addEventListener("click", this._handleTrashClick);
  }

  //создание карточки
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like");
    this._likeCounter = this._element.querySelector(".card__like-counter")
    this._trashButton = this._element.querySelector(".card__trash");
    this._data.likes.forEach(elem => {
      if (elem._id === this._myId) {
        this._likeButton.classList.add("card__like_active");
      }
    });
    this.hiddenTrash();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._likeCounter.textContent = this._countLike;
    return this._element;
  }
}
export { Card };
