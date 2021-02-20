//закрытие/открытие попап
export class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    // метод добавления листнеров
    setEventListeners() {
        // обработчик клика мимо окна
        this._popup.addEventListener('click', this._handleOverlayClose);
        // обработчик клика по крестику
        this._closeButton.addEventListener('click', this.close);
        // document.addEventListener('keydown', this._handleEscClose);
    }

    //закрытие по esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    // закрытие попапа по клику на оверлей
    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }

}