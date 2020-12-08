import { Card } from './Card.js';
import { FormValidation } from './FormValidator.js';
import { initialCards } from './InitialCards.js';

const cardContainer = document.querySelector('.cards__grid');
const template = document.querySelector('#template');

const addButton = document.querySelector('.profile__button');
const editBtn = document.querySelector('.profile__info-button');
const closeBtnInfo = document.querySelector('.popup__close-button_block_info');
const closePopupBtn = document.querySelector('.popup__close-button_block_photo');

const popupInfo = document.querySelector('.popup_info');
const popupPhoto = document.querySelector('.popup_photo');
const addPopupContent = popupPhoto.querySelector('.popup__content_photo');
const formPopupInfo = popupInfo.querySelector('.popup__content_info');
const popupImgName = popupPhoto.querySelector('.popup__text_img-name');
const popupImgLink = popupPhoto.querySelector('.popup__text_link');

const profile = document.querySelector('.profile');
const name = profile.querySelector('.profile__info-name');
const nameInput = popupInfo.querySelector('.popup__text_name');
const profileJob = profile.querySelector('.profile__info-job');
const jobInput = popupInfo.querySelector('.popup__text_description');

const popupImg = document.querySelector('.img-popup');
const popupImgPhoto = popupImg.querySelector('.img-popup__photo');
const popupImgCaption = popupImg.querySelector('.img-popup__caption');
const closePopupBtnImg = popupImg.querySelector('.popup__close-button_block_img');

const formConfig = {
    formSelector: '.popup__content',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__text_type_error',
}

const infoFormValidation = new FormValidation(formConfig, formPopupInfo);
infoFormValidation.enableValidation();

const imgFormValidation = new FormValidation(formConfig, addPopupContent);
imgFormValidation.enableValidation();

//Добавляем карточки на страницу
initialCards.forEach((data) => {
    const cardItem = new Card(data.name, data.link, template);
    cardContainer.append(cardItem.render());
});

//Открытие попапа
const openPopup = (popupName) => {
    popupName.classList.add('popup_opened');
    window.addEventListener('keydown', pressEscClosePopup);
};

//Открываем попап профиля
function openPopupInfo() {
    openPopup(popupInfo);
    //Cкопировали первоначальное имя и должность в попап
    nameInput.value = name.textContent;
    jobInput.value = profileJob.textContent;
};

// функция открытия попапа картинки*
export function openImgPopup(picture, caption) {
    popupImgPhoto.src = picture;
    popupImgPhoto.alt = caption;
    popupImgCaption.textContent = caption;

    openPopup(popupImg);
};

// Добавляем новую карточку из попапа
const addPopupContentSubmit = (evt) => {
    evt.preventDefault();

    const cardItem = new Card(popupImgName.value, popupImgLink.value, template);
    cardContainer.prepend(cardItem.render());

    closePopup(popupPhoto);
    addPopupContent.reset();
};

//Сохранили отредактированные данные
function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupInfo);
};

//3акрывыем попап
const closePopup = (popupName) => {
    popupName.classList.remove('popup_opened');
    window.removeEventListener('keydown', pressEscClosePopup);
};

//Закрываем popup нажатием на escape
const pressEscClosePopup = (evt) => {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};

//Закрываем попап нажатием на overlay
const clickOverlayClosePopupListener = (popupName) => (evt) => {
    if (evt.target === evt.currentTarget) {
        closePopup(popupName);
    }
};

//Обработчики событий
addButton.addEventListener('click', () => {
    openPopup(popupPhoto);
    imgFormValidation.enableValidation();
});
editBtn.addEventListener('click', openPopupInfo);
formPopupInfo.addEventListener('submit', formSubmitHandler);
addPopupContent.addEventListener('submit', addPopupContentSubmit);
closeBtnInfo.addEventListener('click', () => closePopup(popupInfo));
closePopupBtn.addEventListener('click', () => closePopup(popupPhoto));
closePopupBtnImg.addEventListener('click', () => closePopup(popupImg));
popupImg.addEventListener('mousedown', clickOverlayClosePopupListener(popupImg));
popupInfo.addEventListener('mousedown', clickOverlayClosePopupListener(popupInfo));
popupPhoto.addEventListener('mousedown', clickOverlayClosePopupListener(popupPhoto));