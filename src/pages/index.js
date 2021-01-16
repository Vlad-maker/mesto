import './index.css';
import { Card } from '../js/components/Card.js';
import { FormValidation } from '../js/components/FormValidator.js';
import { Section } from '../js/components/Section.js';
import { PopupWithImage } from '../js/components/PopupWithImage.js';
import { PopupWithForm } from '../js/components/PopupWithForm.js';
import { PopupWithSubmit } from '../js/components/PopupWithSubmit.js';
import { UserInfo } from '../js/components/UserInfo.js';
import { Api } from '../js/Api.js';

import {
    formConfig,
    addPopupContent,
    formPopupInfo,
    cardContainer,
    template,
    addButton,
    editBtn,
    editAvatarButton,
    popupAvatar,
    changeAvatar,
    popupImgName,
    popupImgLink
} from '../js/constants.js';

const userInfo = new UserInfo('.profile__info-name', '.profile__info-job');

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-19/',
    headers: {
        authorization: 'b88baff0-9a43-403c-833b-e4c683401608',
        'Content-type': 'application/json',
    }
});

function renderLoading(isLoading, buttonSelector, defaultMessage) {
    if (isLoading) {
        document.querySelector(buttonSelector).textContent = 'Сохранение...';
    } else {
        document.querySelector(buttonSelector).textContent = defaultMessage;
    }
}


// проверка на наличие лайка
function hasMyLike(myId) {
    return like => like._id === myId;
}

// профиль и карточки с сервера
Promise.all([
        api.getProfileData(),
        api.getInitialCards(),
    ])
    .then(([userData, initialCards]) => {
        // получение информации о профиле с сервера
        userInfo.setUserInfo(userData.name, userData.about);
        profileAvatar.src = userData.avatar;
        userInfo.setUserId(userData._id);

        // получение карточек с сервера
        const cardList = new Section({
            items: initialCards,
            renderer: (cardElement) => {
                const card = createCard(cardElement.name, cardElement.link, cardElement._id, template);
                if (cardElement.likes.some(hasMyLike(userInfo.getUserId()))) {
                    card.render().querySelector('.cards__like').classList.add('cards__like_active');
                }
                card.render().querySelector('.cards__like-number').textContent = cardElement.likes.length;
                if (userInfo.getUserId() == cardElement.owner._id) {
                    card.render().querySelector('.cards__deletion').style.display = "block";
                };
                cardList.addItem(card.render());
            }
        }, cardContainer);
        cardList.render();
    })
    .catch((err) => {
        console.log(err);
    });




const infoFormValidation = new FormValidation(formConfig, formPopupInfo);
infoFormValidation.enableValidation();

const imgFormValidation = new FormValidation(formConfig, addPopupContent);
imgFormValidation.enableValidation();

const avatarFormValidation = new FormValidation(formConfig, changeAvatar);
avatarFormValidation.enableValidation();

//функция создания карточки
function createCard(name, link, id, templateSelector) {
    const card = new Card({
        name,
        link,
        id,
        templateSelector,
        handleCardClick: () => {
            popupWithImage.open(name, link);
        },
        handleDeleteButtonClick: () => {
            popupWithSubmit.open(card);
        },
        handleLikeButtonClick: () => {
            if (card.likeButton.classList.contains('cards__like_active')) {
                api.removeLike(card.id)
                    .then(res => {
                        card.toggleLike();
                        card.setNumberOfLikes(res.likes.length);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                api.setLike(card.id)
                    .then(res => {
                        card.toggleLike();
                        card.setNumberOfLikes(res.likes.length);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            };
        }
    });
    return card;
};


const popupWithImage = new PopupWithImage('.img-popup');
popupWithImage.setEventListeners();
// добавляем карточку через попап 
const popupPhotoForm = new PopupWithForm({
    popupSelector: '.popup_photo',
    handleFormSubmit: () => {
        renderLoading(true, '.popup__button_create', '');
        api.addCard(popupImgName.value, popupImgLink.value)
            .then(res => {
                const cardItem = createCard(popupImgName.value, popupImgLink.value, res._id, template);
                cardItem.render().querySelector('.cards__deletion').style.display = "block";
                const newCardAdding = new Section({
                    items: [cardItem],
                    renderer: () => {
                        newCardAdding.addItem(cardItem.render());
                    }
                }, cardContainer);
                newCardAdding.render();

                popupPhotoForm.close();
                addPopupContent.reset();
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => renderLoading(false, '.popup__button_create', 'Создать'));
    }
});
popupPhotoForm.setEventListeners();



// Данные профиля
const popupInfoClass = new PopupWithForm({
    popupSelector: '.popup_info',
    handleFormSubmit: (values) => {
        renderLoading(true, '.popup__button_save', '')
        api.updateProfileData(values.name, values.description)
            .then(() => {
                userInfo.setUserInfo(values.name, values.description);
                popupInfoClass.close();
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => renderLoading(false, '.popup__button_save', 'Сохранить'));

    }
});
popupInfoClass.setEventListeners();

// попап подтверждения действия
const popupWithSubmit = new PopupWithSubmit({
    popupSelector: '.popup_submit',
    handleSubmitButton: (card) => {
        api.deleteCard(card.id)
            .then(() => {
                card.delete();
                popupWithSubmit.close();
            })
            .catch(err => {
                console.log(err);
            });
    }
});
popupWithSubmit.setEventListeners();

// попап обновления аватарки
const popupAvatarClass = new PopupWithForm({
    popupSelector: '.popup_edit-avatar',
    handleFormSubmit: (value) => {
        renderLoading(true, '.popup__button_update', '')
        api.updateProfileAvatar(value.link)
            .then(() => {
                popupAvatar.src = value.link;
                popupAvatarClass.close();
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => renderLoading(false, '.popup__button_update', 'Сохранить'));
    }
});
popupAvatarClass.setEventListeners();

// кнопка редактирования аватара
editAvatarButton.addEventListener('click', () => {
    popupAvatarClass.open();
    avatarFormValidation.enableValidation();
})


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