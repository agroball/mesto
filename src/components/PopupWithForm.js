import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector)
        this._formSubmit = formSubmit;
        this._formSelector = this._popup.querySelector('.form');
        this._formSubmitHandler = this._formSubmitHandler.bind(this);

    }

    _getInputValues() {
        this._inputList = Array.from(this._formSelector.querySelectorAll('.form__name'));
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues; // возвращаем объект значений
    }

    setEventListeners() {
        this._formSelector.addEventListener('submit', this._formSubmitHandler);
        super.setEventListeners();

    }

    // метод закрывает форму и сбрасывает инпуты
    close() {
        super.close();
        this._formSelector.reset();
    }

    _formSubmitHandler(evt) {
        evt.preventDefault();
        this._formSubmit(this._getInputValues());
    }


}