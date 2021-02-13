import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupElementImage = this._popup.querySelector('.popup__image');
        this._popupElementTitle = this._popup.querySelector('.popup__title');
    }

    open(name, link, alt) {
        this._popupElementImage.src = link;
        this._popupElementImage.alt = alt;
        this._popupElementTitle.textContent = name;
        super.open();
    }
}