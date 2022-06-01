export const popupEditProfileOpen = document.querySelector(
  ".profile__info-edit"
);
export const popupNewPlaceOpen = document.querySelector(".profile__card-add");
export const popupDeleteCardOpen = document.querySelector('.card__trash');
export const popupChangeAvatarOpen = document.querySelector('.profile__overlay');
export const popupEditProfile = document.querySelector(".popup_profile-edit");
export const popupDeleteCard = document.querySelector('.popup_delete-card');
export const popupChangeAvatar = document.querySelector('.popup_new-avatar');
export const formElementProfile = popupEditProfile.querySelector(
  ".popup__form_profile"
);
export const formChangeAvatar = document.querySelector('.popup__form_new-avatar');
export const inputName = popupEditProfile.querySelector(
  ".popup__input_type_name"
);
export const inputJob = popupEditProfile.querySelector(
  ".popup__input_type_job"
);
export const formNewPlace = document.querySelector(".popup__form_place");
export const inputPlace = formNewPlace.querySelector(
  ".popup__input_type_designation"
);
export const inputLink = formNewPlace.querySelector(
  ".popup__input_type_card-link"
);
export const inputAvatarLink = document.querySelector('.popup__input_type_new-avatar')