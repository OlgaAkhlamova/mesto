let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__info-edit');
let closePopup = popup.querySelector('.popup__close');

let profile = document.querySelector('.profile');
let profileContainer = profile.querySelector('.profile__info');
let profileName = profile.querySelector('.profile__info-name');
let profileJob = profile.querySelector('.profile__info-job');

let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__subtitle_name');
let jobInput = popup.querySelector('.popup__subtitle_job');

function togglePopup() {
    popup.classList.toggle('popup_opened');
    nameInput.textContent = profileName;
    jobInput.textContent = profileJob;  
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popup.classList.remove('popup_opened')
}

openPopup.addEventListener('click', togglePopup);

closePopup.addEventListener('click', togglePopup);

formElement.addEventListener('submit', formSubmitHandler); 
