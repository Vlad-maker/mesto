const editBtn = document.querySelector('.profile__info-button');
const closeBtn = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="description"]');
const nameContent = document.querySelector('.profile__info-name');
const jobContent = document.querySelector('.profile__info-job');
let formElement = document.querySelector('.popup__content');


/*Открываем попап*/
function openPopup() {
    nameInput.value = nameContent.innerText;
    jobInput.value = jobContent.innerText;
    popup.classList.add('popup_opened');
}


/*Закрываем попап*/
function closePopup() {
    popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);


/*Редактируем профиль*/
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    const name = nameInput.value;
    const job = jobInput.value;
    nameContent.textContent = name;
    jobContent.textContent = job;

    closePopup();
}
formElement.addEventListener('submit', formSubmitHandler); 