class Card {
    constructor({data, handleCardClick}, cardSelector) {
        this._name = data.name;
        this._link = data.link; 
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;       
    }

    //клонирование заготовки
    _getTemplate() {const cardElement = document.querySelector(this._cardSelector)
        .content.querySelector('.card').cloneNode(true);   
        return cardElement;
    }

    //лайк
    _handleLikeClick = () => {   
        this._likeButton.classList.toggle('card__like_active');
    }

    //корзина
    _handleTrashClick = () => { 
        this._element.remove();
        this._element = null;
    }

    //общий слушатель активности
    _setEventListeners() {
        this._cardImage.addEventListener('click', 
        () => {this._handleCardClick({name: this._name, link: this._link})});
        this._likeButton.addEventListener('click', this._handleLikeClick);
        this._trashButton.addEventListener('click', this._handleTrashClick);
    }

    //создание карточки
    generateCard() { 
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._likeButton = this._element.querySelector('.card__like');
        this._trashButton = this._element.querySelector('.card__trash');
        this._setEventListeners();
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;       
        return this._element;
    }
} 
export {Card}