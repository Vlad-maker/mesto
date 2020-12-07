import {openImgPopup} from './script.js';

//Kонструктор карточки
export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._template = templateSelector;
  };
//Like <3
  _like = (evt) => {
    evt.target.classList.toggle('cards__like_active');
  };
//Delet
  _delete = (evt) => {
    evt.target.closest('.cards__content').remove();
  };

  render() {
    this._content = this._template.content.cloneNode(true);

    this._content.querySelector('.cards__title').textContent = this._name;
    this._content.querySelector('.cards__photo').alt = this._name;
    this._content.querySelector('.cards__photo').src = this._link;

    this._content.querySelector('.cards__deletion').
      addEventListener('click', this._delete);

    this._content.querySelector('.cards__like').
      addEventListener('click', this._like);

    this._content.querySelector('.cards__open-button').
      addEventListener('click', () => openImgPopup(
        this._link,
        this._name
      ));

    return this._content;
  }
};