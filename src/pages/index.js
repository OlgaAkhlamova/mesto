////////////// ДРАМА В ТРЕХ ЧАСТЯХ "МАЙСКИМИ КОРОТКИМИ НОЧАМИ..." ////////////
/// Действующие лица и исполнители:
import "./index.css";
import {
  popupEditProfileOpen,
  popupNewPlaceOpen,
  inputName,
  inputJob,
  inputPlace,
  inputLink,
  inputAvatarLink,
  formNewPlace,
  formElementProfile,
  formChangeAvatar,
  popupChangeAvatarOpen
} from "../utils/constants.js";
import { obj } from "../utils/formobject.js";
import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupConfirmAction } from "../components/PopupConfirmAction";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { Api } from "../components/Api";

//*// Предисловие: "А что же сервер нам ответит?" 
///    - не узнаем, пока не спросим =)
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization:  'd354f96e-d497-4a80-83a9-7ae4ace966c3',
    'content-type': 'application/json'
  }
});
// в самом деле это была "проверка связи" в моменте отладки - выполнит сервер запрос или нет)))
//просто я ее забыла удалить))) можно оставить в комментарии? если нет - удалю
//api.getInfoUser()
//.then((res) => {
//  console.log(res);
//})
//.catch((err) => {
//  console.log('Ошибка. Запрос не выполнен');
//})

//*// ЧАСТЬ 1: отрисовка массива карточек в DOM и создание карточки из формы

//// Главное - нормально подготовиться к событию!
// 1. Попап с увеличенной картинкой поможет лучше всё разглядеть 
const popupShowZoom = new PopupWithImage(".popup_show-zoom");
popupShowZoom.setEventListeners();

// 2. Попап подтверждения действия не даст совершить опрометчивый поступок
const popupDeleteCard = new PopupConfirmAction({
  handleConfirmAction: (card) => {
    console.log(card);
    deleteCard(card); 
  }
}, ".popup_delete-card");
popupDeleteCard.setEventListeners();

// 3. Если всё-таки надо удалить карточку
function deleteCard(card) { 
  agreeDelete(true, popupDeleteCard.actionButton);
  api.deleteCardApi(card)    
    .then(() => {
      console.log(card._cardId);
      card.removeCard()
      popupDeleteCard.close();       
    })
    .catch((err) => console.log(err))
    .finally(() => agreeDelete(false, popupDeleteCard.actionButton, "Да"));
}

//4. Если захотелось лайкнуть
function addLike(card) {
  api.addLike(card.getCardId())
    .then((res) => {
      card.likeCard(res.likes.length)
    })
    .catch((err) => console.log(err))
}

//5. Если расхотелось лайкать
function deleteLike(card) {
  api.deleteLike(card.getCardId())
    .then((res) => {
      card.likeCard(res.likes.length)
    })
    .catch((err) => console.log(err))
}

//6. Отображение сохранения или удаления 
function renderLoading(isLoading, element, content) {
 if (isLoading) {
   element.textContent = "Coхранение...";
 } else {
   element.textContent = content;
 }
}

function agreeDelete(isLoading, element, content) {
  if (isLoading) {
    element.textContent = "Удаление...";
  } else {
    element.textContent = content;
  }
}

// 7. Создание экземпляра карточки
function renderCard(item) {
  const card = new Card(
    {
      data: item,
     handleCardClick: (name, link) => {
        popupShowZoom.open(name, link);
      },
      handleTrashClick: () => {
        popupDeleteCard.open(card);
      },
      handleLikeClick: () => {
        if (!card.isLiked()) { 
          addLike(card)
        } else {
          deleteLike(card)
        }
      },
      currentUserId: userId
    },
    ".cards-template"
  );
  card.generateCard();
  console.log()
  return card.generateCard();
}
// 8. Отрисовка массива карточек на странице
const sectionCards = new Section(
  {renderer: (item) => {
      const cardElement = renderCard(item);
      sectionCards.addItemAppend(cardElement);
    },
  },
  ".cards"
);

let userId = "";
// в этом месте запуталась =( но обещаю в спокойной обстановке 
// вернуться и переделать
api.getPromiseAll()
  .then((values) => {
    const cards = values[0];
    const info = values[1];
    console.log(info);
    console.log(cards);
    userProfile.setUserInfo(info);
    userId = info._id;
    sectionCards.renderItems(cards);
  })
  .catch((err) => console.log(err));

// 9. Добавление новой карточки из формы
const popupNewPlace = new PopupWithForm({
  popupSelector: ".popup_new-place",
  callbackFormSubmit: (data) => {
    renderLoading(true, popupNewPlace.submitBtn);
    api.postCard(data)
      .then((data) => {
        const newCard = renderCard(data);
        sectionCards.addItemPrepend(newCard);
        console.log(data);
        popupNewPlace.close();
      })
      .catch((err) => console.log(err))
      .finally(() => renderLoading(false, popupNewPlace.submitBtn, "Создать"));
  },
});
popupNewPlace.setEventListeners();

// 10. Слушатели событий
popupNewPlaceOpen.addEventListener("click", () => {
  newPlaceValid.clearError();
  popupNewPlace.open();
});

//*// ЧАСТЬ 2: Информация о пользователе и её редактирование

// 1. Создание объекта с данными пользователя
const userProfile = new UserInfo({
  userNameSelector: ".profile__info-name",
  userJobSelector: ".profile__info-job",
  userAvatarSelector: ".profile__avatar"
});

// 2. Создание формы редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_profile-edit",
  callbackFormSubmit: (data) => {
    renderLoading(true, popupEditProfile.submitBtn);
    api.changeProfileInfo(data)
      .then((res) => {
        userProfile.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false, popupEditProfile.submitBtn, "Сохранить")
      });
  },
});
popupEditProfile.setEventListeners();

//3. Создание формы редактирования аватара
const popupChangeAvatar = new PopupWithForm({
  popupSelector: ".popup_new-avatar",
  callbackFormSubmit: (data) => {
    renderLoading(true, popupChangeAvatar.submitBtn);
    api.changeAvatar(data)
      .then((res) => {
        userProfile.setUserInfo(res);
        popupChangeAvatar.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false, popupChangeAvatar.submitBtn, "Сохранить")
      });
    }
});
popupChangeAvatar.setEventListeners();

 //4. Слушатели события открытия форм редактирования профиля
popupEditProfileOpen.addEventListener("click", () => {
  const dataUserProfile = userProfile.getUserInfo();
  inputName.value = dataUserProfile.name;
  inputJob.value = dataUserProfile.about;
  profileValid.clearError();
  popupEditProfile.open();
});

popupChangeAvatarOpen.addEventListener('click', () => {
  formAvatarValid.clearError();
  popupChangeAvatar.open();
});

//*// ЧАСТЬ 3: валидация всех встречающихся в проекте форм: 
// - редактирования профиля
const profileValid = new FormValidator(obj, formElementProfile);
profileValid.enableValidation();
// - добавления карточки 
const newPlaceValid = new FormValidator(obj, formNewPlace);
newPlaceValid.enableValidation();
// - смены аватара
const formAvatarValid = new FormValidator(obj, formChangeAvatar);
formAvatarValid.enableValidation();

// Огромное спасибо за подробное ревью с объяснением ошибок! Про валидацию я обязательно 
//поэкспериментирую, просто сейчас время поджимает: время, отпущенное куратором на доработку
//на исходе =(  