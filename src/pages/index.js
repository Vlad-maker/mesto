import './index.css';
import { Card } from '../js/components/Card.js';
import { FormValidation } from '../js/components/FormValidator.js';
import { Section } from '../js/components/Section.js';
import { PopupWithImage } from '../js/components/PopupWithImage.js';
import { PopupWithForm } from '../js/components/PopupWithForm.js';
import { UserInfo } from '../js/components/UserInfo.js';
import {
    initialCards,
    formConfig,
    addPopupContent,
    formPopupInfo,
    cardContainer,
    template,
    addButton,
    editBtn,
    popupImgName,
    popupImgLink
} from '../js/constants.js';

const infoFormValidation = new FormValidation(formConfig, formPopupInfo);
infoFormValidation.enableValidation();

const imgFormValidation = new FormValidation(formConfig, addPopupContent);
imgFormValidation.enableValidation();

//Создание карточки
function createCard(name, link, templateSelector, handleCardClick) {
    return new Card({
        name: name,
        link: link,
        templateSelector: templateSelector,
        handleCardClick: handleCardClick
    });
}

const popupWithImage = new PopupWithImage('.img-popup');
popupWithImage.setEventListeners();
// добавляем карточку через попап 
const popupPhotoForm = new PopupWithForm({
    popupSelector: '.popup_photo',
    handleFormSubmit: () => {
        const cardItem = createCard(popupImgName.value, popupImgLink.value, template,
            () => {
                popupWithImage.open(cardItem._name, cardItem._link);
            });
        сardList.prependItem(cardItem.render())

        popupPhotoForm.close();
    }
});
popupPhotoForm.setEventListeners();

// Стартовый набор фото
const сardList = new Section({
    items: initialCards,
    renderer: (cardElement) => {
        const card = createCard(cardElement.name, cardElement.link, template,
            () => {
                popupWithImage.open(card._name, card._link);
            });
        сardList.prependItem(card.render());
    }
}, cardContainer);
сardList.render();

// Данные профиля
const userInfo = new UserInfo('.profile__info-name', '.profile__info-job');
const popupInfoClass = new PopupWithForm({
    popupSelector: '.popup_info',
    handleFormSubmit: (values) => {
        userInfo.setUserInfo(values.name, values.description);
        popupInfoClass.close();
    }
});
popupInfoClass.setEventListeners();


// Кнопка подтверждения отредактированных данных профиля
editBtn.addEventListener('click', () => {
    popupInfoClass.open();
    const profileData = userInfo.getUserInfo();
    const nameInput = popupInfoClass._form.querySelector('.popup__text_name');
    const jobInput = popupInfoClass._form.querySelector('.popup__text_description');
    nameInput.value = profileData.name;
    jobInput.value = profileData.description;
});

// Добавляем фото
addButton.addEventListener('click', () => {
    popupPhotoForm.open();
});