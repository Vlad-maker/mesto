export const formConfig = {
    formSelector: '.popup__content',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__text_type_error',
}

export const cardContainer = document.querySelector('.cards__grid');

export const template = document.querySelector('#template');

export const profileAvatar = document.querySelector('.profile__avatar');

export const popupInfo = document.querySelector('.popup_info');
export const popupPhoto = document.querySelector('.popup_photo');
export const addPopupContent = popupPhoto.querySelector('.popup__content_photo');
export const formPopupInfo = popupInfo.querySelector('.popup__content_info');
export const popupAvatar = document.querySelector('.popup_edit-avatar');
export const changeAvatar = popupAvatar.querySelector('.popup__content_edit-avatar');


export const editBtn = document.querySelector('.profile__info-button');
export const addButton = document.querySelector('.profile__button');
export const editAvatarButton = document.querySelector('.profile__edit-avatar-button');

export const popupImgName = popupPhoto.querySelector('.popup__text_img-name');
export const popupImgLink = popupPhoto.querySelector('.popup__text_link');