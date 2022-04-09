const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__input-error_active',
};


//отображение на странице ошибки валидации
const showInputError = (formElement, inputElement, validationMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(obj.errorClass);
};

//скрытие элементов ошибок валидации
const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
};

//проверка валидации одного поля ввода у формы
const checkInputValidity = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

//функции смены активности кнопки
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
};

const activeButton = function(buttonElement, obj) {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(obj.inactiveButtonClass);
};

const disabledButton = function(buttonElement, obj) {
  buttonElement.classList.add(obj.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true); 
};

const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList, obj)) {  
    disabledButton(buttonElement, obj);   
  } else {
    activeButton(buttonElement, obj);    
  } 
};

//слушатель событий всех полей формы
const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
};
  
const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });      
    setEventListeners(formElement, obj);
  });
};
  
enableValidation(obj); 
