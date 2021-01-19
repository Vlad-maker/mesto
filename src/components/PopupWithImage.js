import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._picture = this._popup.querySelector('.img-popup__photo');
        this._caption = this._popup.querySelector('.img-popup__caption');
    }
    open(caption, picture) {
        super.open();
        this._picture.src = picture;
        this._picture.alt = caption;
        this._caption.textContent = caption;
    }
};