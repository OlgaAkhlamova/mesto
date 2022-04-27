import {Card} from './сard.js';
import { FormValidator } from './formvalidator.js';

const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active',
};

//popups
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_profile-edit');
const popupNewPlace = document.querySelector('.popup_new-place');
const popupShowZoom = document.querySelector('.popup_show-zoom');

//popup's close buttons
const popupEditProfileClose = popupEditProfile.querySelector('.popup__close_profile-edit');
const popupNewPlaceClose = popupNewPlace.querySelector('.popup__close_new-place');
//const popupShowZoomClose = popupShowZoom.querySelector('.popup__close_show-zoom');

//popup's open buttons
const popupEditProfileOpen = document.querySelector('.profile__info-edit');
const popupNewPlaceOpen = document.querySelector('.profile__card-add');

//for edit profile
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__info-name');
const profileJob = profile.querySelector('.profile__info-job'); 
const formElementProfile = popupEditProfile.querySelector('.popup__form_profile');
const inputName = popupEditProfile.querySelector('.popup__input_type_name');
const inputJob = popupEditProfile.querySelector('.popup__input_type_job');

//for add place
const formNewPlace = document.querySelector('.popup__form_place');
const inputPlace = formNewPlace.querySelector('.popup__input_type_designation');
const inputLink = formNewPlace.querySelector('.popup__input_type_card-link');

//for template
const cardsList = document.querySelector('.cards');

//for enlarged images from popupShowZoom
//const zoomImage = popupShowZoom.querySelector('.popup__card');
//const zoomImageName = popupShowZoom.querySelector('.popup__subtitle-zoom');

//for validation form
const buttonSavePlace = document.querySelector('.popup__save_place');
const profileValid = new FormValidator(obj, formElementProfile);
const newPlaceValid = new FormValidator(obj, formNewPlace);

profileValid.enableValidation();
newPlaceValid.enableValidation();

//*// open and close popups

const openPopup = (popup) => {
  document.addEventListener('keydown', closePopupEsc);
  popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

// closing by Esc
const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const nowOpenPopup = document.querySelector('.popup_opened');
    closePopup(nowOpenPopup);
  }
};

//*// editing a profile

function handleSubmitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
};

//*// creating a card

function renderCard(cardName, cardLink,) {
  const card = new Card(cardName, cardLink);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((card) => {
  cardsList.append(renderCard(card.name, card.link));
});

function handleSubmitNewPlaceForm(evt) {
  evt.preventDefault();
  
  cardsList.prepend(renderCard(inputName.value, inputLink.value));
  closePopup(popupNewPlace); 
  buttonSavePlace.classList.add('popup__save_inactive');
  buttonSavePlace.disabled = 'true';
  evt.currentTarget.reset();
};

//*// clearing form fields with unsaved data

function clearError() {
  const errorMessage = document.querySelectorAll(".popup__input-error_active");
  errorMessage.forEach((item) => {
    item.textContent = "";
    item.classList.remove("popup__input-error_active");
  });
  const errorBorder = document.querySelectorAll(".popup__input_type-error");
  errorBorder.forEach((item) => {
    item.classList.remove("popup__input_type-error");
  });
};

//*// listeners for opening and closing

popupEditProfileOpen.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  clearError();
  openPopup(popupEditProfile);  
});

popupNewPlaceOpen.addEventListener('click', function () {
  inputPlace.value = "";
  inputLink.value = ""; 
  clearError();
  openPopup(popupNewPlace);
});

popupEditProfile.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(popupEditProfile);
  }
});

popupNewPlace.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(popupNewPlace);
  }
});

popupShowZoom.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(popupShowZoom);
  }
});

//*// for transmit forms

formElementProfile.addEventListener('submit', handleSubmitEditProfileForm);

formNewPlace.addEventListener('submit', handleSubmitNewPlaceForm);

export {openPopup, closePopup, popupShowZoom};