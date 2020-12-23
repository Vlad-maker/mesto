export class Card {
    constructor({ name, link, templateSelector, handleCardClick }) {
        this._name = name;
        this._link = link;
        this._template = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _like(evt) {
        evt.target.classList.toggle('cards__like_active');
    }

    _delete(evt) {
        evt.target.closest('.cards__content').remove();
    }

    render() {
        this._content = this._template.content.cloneNode(true);
        this._title = this._content.querySelector('.cards__title');
        this._picture = this._content.querySelector('.cards__photo');
        this._deleteButton = this._content.querySelector('.cards__deletion');
        this._likeButton = this._content.querySelector('.cards__like');
        this._popupButton = this._content.querySelector('.cards__open-button');

        this._title.textContent = this._name;
        this._picture.alt = this._name;
        this._picture.src = this._link;

        this._deleteButton.addEventListener('click', this._delete);
        this._likeButton.addEventListener('click', this._like);
        this._popupButton.addEventListener('click', () => this._handleCardClick());

        return this._content;
    }
};