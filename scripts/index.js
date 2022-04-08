//popups
const popupEditProfile = document.querySelector('.popup_profile-edit');
const popupNewPlace = document.querySelector('.popup_new-place');
const popupShowZoom = document.querySelector('.popup_show-zoom');

//popup's close buttons
const popupEditProfileClose = popupEditProfile.querySelector('.popup__close_profile-edit');
const popupNewPlaceClose = popupNewPlace.querySelector('.popup__close_new-place');
const popupShowZoomClose = popupShowZoom.querySelector('.popup__close_show-zoom');

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
const cardTemplate = document.querySelector('.cards-template').content;
const cardsList = document.querySelector('.cards');

//for enlarged images from popupShowZoom
const zoomImage = popupShowZoom.querySelector('.popup__card');
const zoomImageName = popupShowZoom.querySelector('.popup__subtitle-zoom');

//for validation form
const buttonSavePlace = document.querySelector('.popup__save_place');

//*// open and close popups
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
};

//*// editing a profile

function handleSubmitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
};

//*// creating a card

function setActionsListeners(card) {
  card.querySelector('.card__image').addEventListener('click', openPopupZoom);
  card.querySelector('.card__like').addEventListener('click', likeCard);
  card.querySelector('.card__trash').addEventListener('click', deleteCard);
};

function likeCard(evt) {
  evt.target.classList.toggle('card__like_active');
};

function deleteCard (evt) {
  evt.currentTarget.closest('.card').remove();
}

function renderCard(cardName, cardLink) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = cardName;
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  setActionsListeners(cardElement);
  return cardElement;
};

initialCards.forEach((cardElement) => {
  cardsList.append(renderCard(cardElement.name, cardElement.link));
}); 

function handleSubmitNewPlaceForm(evt) {
  evt.preventDefault();
  cardsList.prepend(renderCard(inputPlace.value, inputLink.value));
  closePopup(popupNewPlace); 
  buttonSavePlace.classList.add('popup__save_inactive');
  buttonSavePlace.disabled = 'true';
  evt.currentTarget.reset();
};

//*// looking at the image

function openPopupZoom(evt) {
  zoomImageName.textContent = evt.target.alt;
  zoomImage.src = evt.target.src;
  zoomImage.alt = evt.target.alt;
  openPopup(popupShowZoom);
}

function inactiveButton() {
  buttonSavePlace.classList.add('popup__save_inactive');
}
//*//listeners
popupEditProfileOpen.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(popupEditProfile);  
});

popupNewPlaceOpen.addEventListener('click', function () { 
  openPopup(popupNewPlace);
});

popupEditProfileClose.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

popupNewPlaceClose.addEventListener('click', function () {
  closePopup(popupNewPlace);
});

popupShowZoomClose.addEventListener('click', function () {
  closePopup(popupShowZoom);
});

formElementProfile.addEventListener('submit', handleSubmitEditProfileForm);

formNewPlace.addEventListener('submit', handleSubmitNewPlaceForm);