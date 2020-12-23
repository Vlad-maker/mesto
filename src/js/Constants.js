export const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const formConfig = {
    formSelector: '.popup__content',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__text_type_error',
}

export const cardContainer = document.querySelector('.cards__grid');
export const template = document.querySelector('#template');
export const popupInfo = document.querySelector('.popup_info');
export const popupPhoto = document.querySelector('.popup_photo');
export const addPopupContent = popupPhoto.querySelector('.popup__content_photo');
export const formPopupInfo = popupInfo.querySelector('.popup__content_info');
export const popupImgName = popupPhoto.querySelector('.popup__text_img-name');
export const popupImgLink = popupPhoto.querySelector('.popup__text_link');
export const addButton = document.querySelector('.profile__button');
export const editBtn = document.querySelector('.profile__info-button');