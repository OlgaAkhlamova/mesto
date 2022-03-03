let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.popup-open');
let closePopup = popup.querySelector('.popup-close')

function togglePopup() {
    popup.classList.toggle('popup__opened');  
}

openPopup.addEventListener('click', togglePopup);

closePopup.addEventListener('click', togglePopup);

let profile = document.querySelector('.profile');
let profileContainer = profile.querySelector('.profile__info');
let profileName = profile.querySelector('.profile__info-name');
let profileJob = profile.querySelector('.profile__info-job')

let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('.input-name');
let jobInput = popup.querySelector('.input-job');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popup.classList.remove('popup__opened')
}

formElement.addEventListener('submit', formSubmitHandler); 
