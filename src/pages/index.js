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

api.getInfoUser()
.then((res) => {
  console.log(res);
})
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен');
})

//*// ЧАСТЬ 1: отрисовка массива карточек в DOM и создание карточки из формы

//// Главное - нормально подготовиться к событию!
// 1. Попап с увеличенной картинкой поможет лучше всё разглядеть 
const popupShowZoom = new PopupWithImage(".popup_show-zoom");
popupShowZoom.setEventListeners();

// 2. Попап подтверждения действия не даст совершить опрометчивый поступок
const popupDeleteCard = new PopupConfirmAction({
  handleConfirmAction: (card) => {
    deleteCard(card); 
  }
}, ".popup_delete-card");
popupDeleteCard.setEventListeners();

// 3. Если всё-таки надо удалить карточку
function deleteCard(card) {   
  api.deleteCardApi(card)    
    .then((card) => {
      console.log(card._cardId);
      card.removeCard()       
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupDeleteCard.close();
    });
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

//6. Отображение сохранения изменений
function saveChanges(isLoading, element, content) {
  console.log(element);
 if (isLoading) {
   element.textContent = "Coхранение...";
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
      handleLikeClick: (evt) => {
        if (!evt.target.classList.contains("card__like_active")) {
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
    saveChanges(true, popupNewPlace.submitBtn);
    api.postCard(data)
      .then((data) => {
        const newCard = renderCard(data);
        sectionCards.addItemPrepend(newCard);
        console.log(data);
        popupNewPlace.close();
      })
      .catch((err) => console.log(err))
      .finally(() => saveChanges(false, popupNewPlace.submitBtn, "Сохранить"));
  },
});
popupNewPlace.setEventListeners();

// 10. Слушатели событий
popupNewPlaceOpen.addEventListener("click", () => {
 formNewPlace.reset();
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
    saveChanges(true, popupEditProfile.submitBtn);
    api.changeProfileInfo(data)
      .then((res) => {
        userProfile.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
          saveChanges(false, popupEditProfile.submitBtn, "Сохранить")
      });
  },
});
popupEditProfile.setEventListeners();

//3. Создание формы редактирования аватара
const popupChangeAvatar = new PopupWithForm({
  popupSelector: ".popup_new-avatar",
  callbackFormSubmit: (data) => {
    saveChanges(true, popupChangeAvatar.submitBtn);
    api.changeAvatar(data)
      .then((res) => {
        userProfile.setUserInfo(res);
        popupChangeAvatar.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        saveChanges(false, popupChangeAvatar.submitBtn, "Сохранить")
      });
    }
});
popupChangeAvatarOpen.addEventListener('click', () => {
  popupChangeAvatar.open();
});
popupChangeAvatar.setEventListeners();

 //4. Слушатель события открытия формы редактирования
popupEditProfileOpen.addEventListener("click", () => {
  const dataUserProfile = userProfile.getUserInfo();
  inputName.value = dataUserProfile.name;
  inputJob.value = dataUserProfile.about;
  profileValid.clearError();
  popupEditProfile.open();
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