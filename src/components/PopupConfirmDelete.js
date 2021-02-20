import { Popup } from './Popup.js';

export class PopupConfirmDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupWithSubmitDelete = document.querySelector('.form__button_agree');
    }
    setEventListeners(deleteCard) {
        super.setEventListeners();
        this._handleButtonSubmit = deleteCard;
        this._popupWithSubmitDelete.addEventListener('click', this._handleButtonSubmit);
    }

    close() {
        super.close();
        this._popupWithSubmitDelete.removeEventListener('click', this._handleButtonSubmit);
    }
}