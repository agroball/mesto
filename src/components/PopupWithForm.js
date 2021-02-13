import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector)
        this._formSubmit = formSubmit;
        this._formSelector = this._popupSelector.querySelector('.form');

    }

    _getInputValues() {
        this._inputList = Array.from(this._formSelector.querySelectorAll('.form__name'));
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues; // возвращаем объект значений
    }
    _formSubmitHandler() {
        this._formSubmit(this._getInputValues());

    }

    setEventListeners() {
        this._formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
        });
        super.setEventListeners();

    }

    // метод закрывает форму и сбрасывает инпуты
    close() {
        super.close();
        this._formSelector.reset();
    }

}