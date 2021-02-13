export class FormValidator {
    constructor(config, form) {
            this._config = config;
            this._form = form;
            this._button = form.querySelector(this._config.submitButtonSelector);
        }
        // метод показывает ошибку
    _showError(input) {
            const error = this._form.querySelector(`#${input.id}-error`);
            error.textContent = input.validationMessage;
            input.classList.add(this._config.inputSelectorInvalid);
        }
        // метод прячет ошибку
    _hideError(input) {
            const error = this._form.querySelector(`#${input.id}-error`);
            error.textContent = "";
            input.classList.remove(this._config.inputSelectorInvalid);
        }
        // проверка формы на валидность
    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideError(input);
        } else {
            this._showError(input);
        }
    }

    // метод добавления доп.класса кнопке при невалидной форме
    _setButtonState() {
        if (this._form.checkValidity()) {
            this._button.classList.remove(this._config.buttonSelectorInvalid);
            this._button.disabled = false;
        } else {
            this._button.classList.add(this._config.buttonSelectorInvalid);
            this._button.disabled = true;
        }
    }
    _setEventListeners() {
            const inputList = this._form.querySelectorAll(this._config.inputSelector);

            inputList.forEach(input => {
                input.addEventListener('input', (evt) => {
                    this._checkInputValidity(input);
                    this._setButtonState();
                })
            });

        }
        //вызов валидации
    enableValidation() {

        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    }

}