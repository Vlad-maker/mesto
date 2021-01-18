export class Card {
    constructor({ name, link, id, templateSelector, handleCardClick, handleDeleteButtonClick, handleLikeButtonClick }) {
        this._name = name;
        this._link = link;
        this.id = id;
        this._template = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._handleLikeButtonClick = handleLikeButtonClick;

        this._content = this._template.content.cloneNode(true);
    }
    delete() {
        this._deleteButton.closest('.cards__content').remove();
    }
    like() {
        this.likeButton.classList.toggle('cards__like_active');
    }
    setNumberOfLikes(amount) {
        this._likeNumber.textContent = amount;
    }

    render() {
        this._title = this._content.querySelector('.cards__title');
        this._picture = this._content.querySelector('.cards__photo');
        this._deleteButton = this._content.querySelector('.cards__deletion');
        this.likeButton = this._content.querySelector('.cards__like');
        this._popupButton = this._content.querySelector('.cards__open-button');
        this._likeNumber = this._content.querySelector('.cards__like-number');

        this._title.textContent = this._name;
        this._picture.alt = this._name;
        this._picture.src = this._link;

        this._deleteButton.addEventListener('click', this._handleDeleteButtonClick);
        this.likeButton.addEventListener('click', this._handleLikeButtonClick);
        this._popupButton.addEventListener('click', this._handleCardClick);

        return this._content;
    }
};