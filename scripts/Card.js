import {openPopup, popupShowZoom} from './index.js';

class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;        
        this._zoomImage = document.querySelector('.popup__card');
        this._zoomTitle = document.querySelector('.popup__subtitle-zoom');
    }
    //клонирование заготовки
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
    
        return cardElement;
    }
    //создание попапа с увеличенным изображением
    _handleShowZoom() {
        this._zoomImage.src = this._link;
        this._zoomImage.alt = this._name;
        this._zoomTitle.textContent = this._name;
        openPopup(popupShowZoom);
    }
    //лайк
    _handleLikeClick = () => {
        this._likeButton.classList.toggle('card__like_active');
    }
    //корзина
    _handleTrashClick = () => {
        this._element.remove();
    }
    //общий слушатель активности
    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleShowZoom(this._name, this._link);
        });

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