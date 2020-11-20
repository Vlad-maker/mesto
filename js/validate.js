//Показываем ошибку
function showError(input, inputErrorClass) {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.add(inputErrorClass);
    error.textContent = input.validationMessage;
};

//Скрываем ошибку
function hideError(input, inputErrorClass) {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.remove(inputErrorClass);
    error.textContent = '';
};

//Проверяем поля ввода
function checkInputValidity(input, inputErrorClass) {
  if (!input.validity.valid) {
    showError(input, inputErrorClass);
  } else {
    hideError(input, inputErrorClass);
  }
};

//Активируем/деактивируем кнопку
function toggleButtonStatus(buttonElement, inactiveButtonClass, isActive) {
    if (isActive) {
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
    } else {
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
    }
  };

//Присваиваем слушателей событий
function setEventListeners(formElement, buttonElement, inputSelector, inactiveButtonClass ,inputErrorClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector)); 
    inputList.forEach((input) => {
      input.addEventListener('input', (evt) => {
        checkInputValidity(evt.target, inputErrorClass);
        const isValid = formElement.checkValidity();
        toggleButtonStatus(buttonElement, inactiveButtonClass, isValid);
        });
    });
 };
  
//Валидируем
  function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass}) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      const buttonElement = form.querySelector(submitButtonSelector);
      setEventListeners(form, buttonElement, inputSelector, inactiveButtonClass ,inputErrorClass);
      toggleButtonStatus(buttonElement, inactiveButtonClass, form.checkValidity());
    });
  };

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
    formSelector: '.popup__content',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__text_type_error',
    }); 

//Делаем кнопку сохранить в попапе редактирования профиля активной
//при загрузке страницы т.к. данные загружаются из разметки
const saveButton = document.querySelector('.popup__button_save');
    saveButton.disabled = false;
    saveButton.classList.remove('popup__button_disabled');