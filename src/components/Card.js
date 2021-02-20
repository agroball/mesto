export class Card {
    constructor({ name, link, likes, owner, _id, userId }, cardSelector, handleImageClick, deleteHandler, addLike, removeLike) {
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._ownerId = owner._id;
        this._imageId = _id;
        this._userId = userId;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._deleteHandler = deleteHandler;
        this._addLike = addLike;
        this._removeLike = removeLike;
        this._likeButton = this._likeButton.bind(this);
    }

    _getTemplate() {
        //клонирует карточки из массива
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
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
        this._cardImage.alt = this._name;
        //вызываем слушатели
        this._element.querySelector('.element__number').textContent = this._likes.length;
        this._likes.forEach((item) => {
            if (item._id === this._userId) {
                this._element.querySelector('.element__like').classList.add('element__like_active');
            }
        })
        this._removeButton = this._element.querySelector('.element__trash');
        this._setEventListener();
        this.checkId();
        return this._element;
    }

    _setEventListener() {
        this._element.querySelector('.element__like').addEventListener('click', this._likeButton);
        this._removeButton.addEventListener('click', this._deleteHandler);
        //повесить на кнопку слушатель с данными name и link из массива
        this._cardImage.addEventListener('click', () => {
            this._handleImageClick(this._name, this._link)
        });
    }

    _likeButton(evt) {
        if (!evt.target.classList.contains('element__like_active')) {
            this._element.querySelector('.element__like').classList.add('element__like_active');
            this._addLike();
        } else {
            this._element.querySelector('.element__like').classList.remove('element__like_active');
            this._removeLike();
        }
    }

    checkId(removeButton) {
        if (this._ownerId !== this._userId) {
            this._removeButton.remove();
        }
    }

    returnCardId() {
        return this._imageId;
    }
    changeLikesCounter(counter) {
            this._element.querySelector('.element__number').textContent = counter;

        }
        //удаление карточки
    removeCard() {
        this._element.remove();
        this._element = null;
    }
}