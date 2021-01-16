import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
    constructor({ popupSelector, handleSubmitButton }) {
        super(popupSelector);
        this._handleSubmitButton = handleSubmitButton;
        this._submitButton = this._popup.querySelector('.popup__button_submit');
    }

    open(element) {
        super.open();
        this.element = element;
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', () => this._handleSubmitButton(this.element));
    }
}