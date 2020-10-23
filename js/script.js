
const initialCards = [
    {
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

const template = document.querySelector('template');
const cardContainer = document.querySelector('.cards__grid');
const addCardButton = document.querySelector('.profile__button');

const popupPhoto = document.querySelector('.popup_photo');
const closePopupBtn = popupPhoto.querySelector('.popup__close-button_photo');
const addPopupContent = popupPhoto.querySelector('.popup__content_photo');
const popupImgLink = addPopupContent.querySelector('.popup__text_link');
const popupImgName = addPopupContent.querySelector('.popup__text_img-name');

const popupImg = document.querySelector('.img-popup');
const popupImgPhoto = popupImg.querySelector('.img-popup__photo');
const popupImgCaption = popupImg.querySelector('.img-popup__caption');
//let closePopupBtnImg = popupImg.querySelector('.popup__close-button_img');

const editBtn = document.querySelector('.profile__info-button');
const closeBtn = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-job');
let nameInput = document.querySelector('input[name="name"]');
let jobInput = document.querySelector('input[name="description"]');
let formElement = document.querySelector('.popup__content');

//Открытие попапа
function openPopup() {
    //Cкопировали первоначальное имя и должность в попап
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
        popup.classList.add('popup_opened');
    }
    editBtn.addEventListener('click', openPopup);
    //3акрытие попапа
    function closePopup() {
        popup.classList.remove('popup_opened');
    }
    closeBtn.addEventListener('click', closePopup);
    
    //Сохранили отредактированные данные
    function formSubmitHandler (evt) {
        evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;
        closePopup();
    }
    formElement.addEventListener('submit', formSubmitHandler);


//Открываем попап добавления фото
const togglePopup = (popup) => {
    popup.classList.toggle('popup_opened');
};

//Сохраняем новое фото в массив
const addPopupContentSubmit = (event) => {
    event.preventDefault();      
    const cardItem = getCardItem({
        name: popupImgName.value,
        link: popupImgLink.value
    })
    cardContainer.prepend(cardItem);
    
};

//Kонструктор карточки
const getCardItem = (cardDetails) => {

    const cardElement = template.cloneNode(true).content;

    const cardTitle = cardElement.querySelector(".cards__title");
    const cardImage = cardElement.querySelector(".cards__photo");

    cardImage.addEventListener('click', () => handleImgPreviw(cardDetails));

    cardTitle.textContent = cardDetails.name;
    cardImage.src = cardDetails.link;

    return cardElement;
};

//Увеличиваем картинку
const handleImgPreviw = (details) => {
    popupImgPhoto.src = details.link;
    popupImgPhoto.alt = `Изображение ${details.name}`;
    popupImgCaption.textContent = details.name;
    
    togglePopup(popupImg);
    //closePopupBtnImg.addEventListener('click', () => closePopup(popupImg));
}

const bindListeners = () => {
    addCardButton.addEventListener('click', () => {
        togglePopup(popupPhoto);
    });
    closePopupBtn.addEventListener('click', () => {
        togglePopup(popupPhoto);
    });
    addPopupContent.addEventListener('submit', addPopupContentSubmit);
};

bindListeners();

//Добавляем карточки на страницу 
initialCards.forEach((data) => {
    const cardItem = getCardItem(data);
    cardContainer.append(cardItem);
});








