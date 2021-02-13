import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    open(name, link, alt) {
        const popupElementImage = document.querySelector('.popup__image');
        const popupElementTitle = document.querySelector('.popup__title');
        popupElementImage.src = link;
        popupElementTitle.alt = alt;
        popupElementTitle.textContent = name;
        super.setEventListeners();
        super.open();
    }
}