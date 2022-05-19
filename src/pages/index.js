import "./index.css";
import {
  popupEditProfileOpen,
  popupNewPlaceOpen,
  inputName,
  inputJob,
  formNewPlace,
  formElementProfile,
} from "../utils/constants.js";
import { obj } from "../utils/formobject.js";
import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";

//*// валидация форм редактирования профиля и добавления карточки
const profileValid = new FormValidator(obj, formElementProfile);
profileValid.enableValidation();

const newPlaceValid = new FormValidator(obj, formNewPlace);
newPlaceValid.enableValidation();

//*// отрисовка массива карточек в DOM и создание карточки из формы

// 1. Попап с увеличенной картинкой
const popupShowZoom = new PopupWithImage(".popup_show-zoom");
popupShowZoom.setEventListeners();

// 2. Создание экземпляра карточки
function renderCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardClick: (name, link) => {
        popupShowZoom.open(name, link);
      },
    },
    ".cards-template"
  );
  card.generateCard();
  return card.generateCard();
}
// 3. Отрисовка массива карточек на странице
const sectionCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = renderCard(item);
      sectionCards.addItemAppend(cardElement);
    },
  },
  ".cards"
);
sectionCards.renderItems();
// 4. Добавление новой карточки из формы

const popupNewPlace = new PopupWithForm({
  popupSelector: ".popup_new-place",
  callbackFormSubmit: (data) => {
    const newCardElement = renderCard(data);
    sectionCards.addItemPrepend(newCardElement);
  },
});
popupNewPlace.setEventListeners();

// 5. Слушатель события
popupNewPlaceOpen.addEventListener("click", () => {
  formNewPlace.reset();
  newPlaceValid.clearError();
  popupNewPlace.open();
});

//*// Информация о пользователе и её редактирование

// 1. Создание объекта с данными пользователя
const userProfile = new UserInfo({
  userNameSelector: ".profile__info-name",
  userJobSelector: ".profile__info-job",
});

// 2. Создание формы редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_profile-edit",
  callbackFormSubmit: (data) => {
    userProfile.setUserInfo(data);
  },
});
popupEditProfile.setEventListeners();

// 3. Слушатель события открытия формы редактирования
popupEditProfileOpen.addEventListener("click", () => {
  const dataUserProfile = userProfile.getUserInfo();
  inputName.value = dataUserProfile.name;
  inputJob.value = dataUserProfile.job;
  profileValid.clearError();
  popupEditProfile.open();
});
