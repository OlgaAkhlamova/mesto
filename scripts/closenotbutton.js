// * // opening and closing NOT BY buttons

// by Esc
const closePopupEsc = (evt) => {
  const nowOpenPopup = document.querySelector('.popup_opened');
  if (evt.keyCode === 27) {
    closePopup(nowOpenPopup);
  }
};

popupEditProfile.addEventListener('keydown', closePopupEsc);

popupNewPlace.addEventListener('keydown', closePopupEsc);

popupShowZoom.addEventListener('keydown', closePopupEsc);

// by overlay
popupEditProfile.addEventListener('click', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popupEditProfile);
    }
});
  
popupNewPlace.addEventListener('click', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popupNewPlace);
    }
});
  
popupShowZoom.addEventListener('click', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popupShowZoom);
    }
});
