export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._pressEscClosePopup = this._pressEscClosePopup.bind(this);
        this._clickOverlayClosePopup = this._clickOverlayClosePopup.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._pressEscClosePopup);
        this._popup.addEventListener('click', this._clickOverlayClosePopup);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._pressEscClosePopup);
        this._popup.removeEventListener('click', this._clickOverlayClosePopup);
        this._closeButton.removeEventListener('click', this.close);
    }

    _pressEscClosePopup(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _clickOverlayClosePopup(evt) {
        if (evt.target === this._popup) {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton = this._popup.querySelector('.popup__close');
        this._closeButton.addEventListener('click', this.close.bind(this));
    }
}