export class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    //активация лайка
    _activateLikeButton() {
            this._element.querySelector('.element__like').classList.toggle('element__like_active');
        }
        //удаление карточки
    _activateTrashButton() {
        this._element.remove();

    }

    _setEventListener() {
        //повесить на кнопку лайка
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._activateLikeButton();
        });
        //повесить на кнопку удаления слушатель клика
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._activateTrashButton();
        });
        //повесить на кнопку слушатель с данными name и link из массива
        this._cardImage.addEventListener('click', () => {
            this._handleImageClick(this._name, this._link)
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        // создаем переменную привязанную к элементу ссылки
        // даем картинке ссылку(.src) и alt
        const cardPhotoElement = this._element.querySelector('.element__link');
        // привязываем текст к карточке
        this._element.querySelector('.element__text').textContent = this._name;
        this._cardImage = cardPhotoElement;
        this._cardImage.src = this._link;
        //вызываем слушатели
        this._setEventListener(cardPhotoElement);
        return this._element;
    }

    _getTemplate() {
        //клонирует карточки из массива
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }
}