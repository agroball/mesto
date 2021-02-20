import '../pages/index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../utils/initialCards.js';
import { Section } from '../components/Section.js';
import { profilePopup, closeButton, avatarForm, popupFormAvatar, deteleForm, avatarButton, editButton, config, addButton, popupAdd, closeAddButton, popupImage, secondNameInput, listContainerElements, inputElementTitle, inputElementLink, popupElementImage, popupElementTitle, closeImageButton, profileTitleNode, profileParagraphNode, profileForm, formsAdd, firstNameInput } from '../utils/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupConfirmDelete } from '../components/PopupConfirmDelete.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
        authorization: 'dc63b407-867c-4698-ab85-c3ed97052e84',
        'Content-type': 'application/json'
    }
});

//добавление валидации в формам
const validAdd = new FormValidator(config, formsAdd);
validAdd.enableValidation();

const validProfile = new FormValidator(config, profileForm);
validProfile.enableValidation();

const validationAvatar = new FormValidator(config, avatarForm);
validationAvatar.enableValidation();


const inputsProfile = new UserInfo({ nameSelector: '.profile__title', jobSelector: '.profile__paragraph', avatarSelector: '.profile__avatar' });

const fullsize = new PopupWithImage(popupImage);

const cardList = new Section(
    (item) => {
        cardList.addItem(createCard(item))
    },
    '.elements'
);

function createCard({ name, link, likes, owner, _id }) {
    const card = new Card({ name, link, likes, owner, _id, userId: inputsProfile.returnUserId() }, '.template', handleImageClick, () => {
        popupDeleteCard.setEventListeners(removeCard(card));
        popupDeleteCard.open();
    }, () => {
        api.addLike(card.returnCardId())
            .then(res => card.changeLikesCounter(res.likes.length))
    }, () => {
        api.removeLike(card.returnCardId())
            .then(res => card.changeLikesCounter(res.likes.length))
    }, );
    return card.generateCard();
}

const formSubmitHandler = () => {
    renderLoading(profilePopup, true);
    api.setUserInfo(firstNameInput.value, secondNameInput.value)
        .then((res) => {
            inputsProfile.initUserInfo(res.name, res.about, res.avatar)
            renderLoading(profilePopup, false)
        })
        .catch((err) => {
            console.log(err)
        })
    userPopup.close();
}
const submitGalleryForm = (data) => {
    renderLoading(popupAdd, true);
    api.addCard(data.title__add, data.link__add)
        .then((res) => {
            cardList.addItem(createCard(res));
            renderLoading(popupAdd, false);
        })
        .catch((err) => {
            console.log(err)
        })
    console.log(data);
    imageAddPopup.close();
}


//попап фулзайза картинки
const imagePopup = new PopupWithImage(popupImage)
imagePopup.setEventListeners();
//попап редактирования профиля
const userPopup = new PopupWithForm(profilePopup, formSubmitHandler)
userPopup.setEventListeners();
//попап добавления карточки
const imageAddPopup = new PopupWithForm(popupAdd, submitGalleryForm)
imageAddPopup.setEventListeners();
//попап подтверждения удаления карточки
const popupDeleteCard = new PopupConfirmDelete(deteleForm);


editButton.addEventListener('click', () => {
    const userInfo = inputsProfile.getUserInfo();
    firstNameInput.value = userInfo.name;
    secondNameInput.value = userInfo.job;
    userPopup.open();
});

addButton.addEventListener('click', () => {
    validAdd.resetValidation();
    imageAddPopup.open();
});
avatarButton.addEventListener('click', () => {
        validationAvatar.resetValidation();
        popupUpdateAvatar.open();
    })
    //присваивание элементов и открытие картинка попап берет из Card.js
function handleImageClick(name, link) {
    fullsize.open(name, link);
}

// Рендер картинок при загрузке
api.getInitialCards()
    .then((res) => {
        cardList.render(res)
        console.log(res)
    })
    .catch((err) => {
        console.log(err);
    });

api.getUserInfo()
    .then(res => {
        inputsProfile.initUserInfo(res.name, res.about, res.avatar);
        inputsProfile.setUserId(res._id);
    })
    .catch((err) => {
        console.log(err);
    });


const removeCard = (card) => {
    return () => {
        api.deleteCard(card.returnCardId())
            .then((res) => {
                popupDeleteCard.close();
                card.removeCard();
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

const submitAvatarForm = (imageUrl) => {
    renderLoading(popupFormAvatar, true);
    api.updateAvatarImage(imageUrl.avatar__link)
        .then((res) => {
            inputsProfile.initUserInfo(res.name, res.about, res.avatar);
            renderLoading(popupFormAvatar, false);

        })
        .catch((err) => {
            console.log(err)
        })
    popupUpdateAvatar.close();

}
const popupUpdateAvatar = new PopupWithForm(popupFormAvatar, submitAvatarForm);
popupUpdateAvatar.setEventListeners();

function renderLoading(popupSelector, isLoading) {
    const buttonElement = popupSelector.querySelector('.form__button');
    if (isLoading) {
        buttonElement.textContent = 'Сохранение...';
    } else {
        if (popupSelector === popupAdd) {
            buttonElement.textContent = 'Создать';

        } else {
            buttonElement.textContent = 'Сохранить';

        }
    }
}