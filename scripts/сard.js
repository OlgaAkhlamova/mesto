import {openPopup, closePopup, popupShowZoom} from './index.js';

class Card {
    constructor(name, link) {
        this._name = name;
        this._link = link;        
        this._zoomImage = document.querySelector('.popup__card');
        this._zoomTitle = document.querySelector('.popup__subtitle-zoom');
    }
    
    _getTemplate() {
        const cardElement = document
        .querySelector('.cards-template')
        .content
        .querySelector('.card')
        .cloneNode(true);
    
        return cardElement;
    }

    _handleShowZoom() {
        this._zoomImage.src = this._link;
        this._zoomImage.alt = this._name;
        this._zoomTitle.textContent = this._name;
        openPopup(popupShowZoom);
    }

    _handleClosePopup() {
        this._zoomImage.src = "";
        closePopup(popupShowZoom);
    }
    
    _handleLikeClick() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _handleTrashClick() {
        this._element.querySelector('.card__trash').closest('.card').remove();
    }

    _setEventListeners() {
        this._element.addEventListener('click', () => {
            this._handleShowZoom(this._name, this._link);
        });

        document.querySelector('.popup__close_show-zoom').addEventListener('click', () => {
            this._handleClosePopup();
        });

        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._element.querySelector('.card__trash').addEventListener('click', () => {
            this._handleTrashClick();
        });

    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__image').alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;
        
        return this._element;
    }
} 

export {Card}