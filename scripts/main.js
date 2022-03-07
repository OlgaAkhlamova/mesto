let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__info-edit');
let closePopup = popup.querySelector('.popup__close');

let profile = document.querySelector('.profile');
let profileContainer = profile.querySelector('.profile__info');
let profileName = profile.querySelector('.profile__info-name');
let profileJob = profile.querySelector('.profile__info-job');

let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__subtitle_type_name');
let jobInput = popup.querySelector('.popup__subtitle_type_job');

function addPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;  
}

function removePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    removePopup();
}

openPopup.addEventListener('click', addPopup);

closePopup.addEventListener('click', removePopup);

formElement.addEventListener('submit', formSubmitHandler); 
