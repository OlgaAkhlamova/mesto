//popups
const popupEditProfile = document.querySelector('.popup_profile-edit');
const popupNewPlace = document.querySelector('.popup_new-place');
const popupShowZoom = document.querySelector('.popup_showzoom');

//popup's close buttons
const popupEditProfileClose = popupEditProfile.querySelector('.popup__close_profile-edit');
const popupNewPlaceClose = popupNewPlace.querySelector('.popup__close_new-place');
const popupShowZoomClose = popupShowZoom.querySelector('.popup__close_showzoom');

//popup's open buttons
const popupEditProfileOpen = document.querySelector('.profile__info-edit');
const popupNewPlaceOpen = document.querySelector('.profile__card-add');

//other buttons
const likeButton = document.querySelector('.cards__like');
const trashButton = document.querySelector('.cards__trash');

//for edit profile
const profile = document.querySelector('.profile');
const profileContainer = profile.querySelector('.profile__info');
const profileName = profile.querySelector('.profile__info-name');
const profileJob = profile.querySelector('.profile__info-job'); 
const formElementProfile = popupEditProfile.querySelector('.popup__form_profile');
const inputName = popupEditProfile.querySelector('.popup__subtitle_type_name');
const inputJob = popupEditProfile.querySelector('.popup__subtitle_type_job');

//for add place
const newPlace = document.querySelector('.cards');
const placeName = document.querySelector('.cards__title');
const placeLink = document.querySelector('.cards__image');
const formNewPlace = document.querySelector('.popup__form_place');
const inputPlace = document.querySelector('.popup__subtitle_type_designation');
const inputLink = document.querySelector('.popup__subtitle_type_cardlink');
const savePlaceButton = document.querySelector('.popup__save_place');

//for template
const cardTemplate = document.querySelector('.cards-template').content;
const cardsList = document.querySelector('.cards');

//for enlarged images from popupShowZoom
const zoomImage = popupShowZoom.querySelector('.popup__card');
const zoomImageName = popupShowZoom.querySelector('.popup__subtitlezoom');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//*// open and close popups
const openPopup = function (popup) {
    popup.classList.add('popup_opened');
};

const removePopup = function (popup) {
    popup.classList.remove('popup_opened');
};

//*// editing a profile

function formSubmitHandlerProfile (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  removePopup(popupEditProfile);
};

//*// creating a card

function setActionsListeners(card) {
  card.querySelector('.cards__image').addEventListener('click', openPopupZoom);
  card.querySelector('.cards__like').addEventListener('click', likeCard);
  card.querySelector('.cards__trash').addEventListener('click', deleteCard);
};

function likeCard(evt) {
  evt.target.classList.toggle('cards__like_active');
};

function deleteCard (evt) {
  evt.currentTarget.closest('.cards__item').remove();
}

function renderCard(cardName, cardLink) {
  const cardTemplate = document.querySelector('.cards-template').content;
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  cardElement.querySelector('.cards__title').textContent = cardName;
  cardElement.querySelector('.cards__image').src = cardLink;
  cardElement.querySelector('.cards__image').alt = cardName;
  setActionsListeners(cardElement);
  return cardElement;
};

initialCards.forEach((cardElement) => {
  cardsList.append(renderCard(cardElement.name, cardElement.link));
}); 

//*//addind a new card

function addNewCard(evt) {
  evt.preventDefault();
  const newPlaceName = evt.target.querySelector('.popup__subtitle_type_designation').value;
  const newPlaceLink = evt.target.querySelector('.popup__subtitle_type_cardlink').value;
  renderCard(newPlaceName, newPlaceLink);
  evt.currentTarget.reset();
};

function formSubmitHandlerNewPlace(evt) {
  evt.preventDefault();
  cardsList.prepend(renderCard(inputPlace.value, inputLink.value));
  removePopup(popupNewPlace);
  //evt.currentTarget.reset();
};

//*// looking at the image

function openPopupZoom(evt) {
  zoomImageName.textContent = evt.target.alt;
  zoomImage.src = evt.target.src;
  zoomImage.alt = evt.target.alt;
  openPopup(popupShowZoom);
}

//*//listeners
popupEditProfileOpen.addEventListener('click', function () {
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;  
});

popupNewPlaceOpen.addEventListener('click', function () {
  openPopup(popupNewPlace);
});

popupEditProfileClose.addEventListener('click', function () {
  removePopup(popupEditProfile);
});

popupNewPlaceClose.addEventListener('click', function () {
  removePopup(popupNewPlace);
});

popupShowZoomClose.addEventListener('click', function () {
  removePopup(popupShowZoom);
});

savePlaceButton.addEventListener('.click', function () {
  addNewCard(newPlaceName, newPlaceLink);
});

formElementProfile.addEventListener('submit', formSubmitHandlerProfile);

formNewPlace.addEventListener('submit', formSubmitHandlerNewPlace);
