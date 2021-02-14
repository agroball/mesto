import '../pages/index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/validate.js';
import { initialCards } from '../utils/initialCards.js';
import { Section } from '../components/Section.js';
import { profilePopup, closeButton, editButton, config, addButton, popupAdd, closeAddButton, popupImage, secondNameInput, listContainerElements, inputElementTitle, inputElementLink, popupElementImage, popupElementTitle, closeImageButton, profileTitleNode, profileParagraphNode, profileForm, formsAdd, firstNameInput } from '../utils/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

//добавление валидации в формам
const validAdd = new FormValidator(config, formsAdd);
validAdd.enableValidation();

const validProfile = new FormValidator(config, profileForm);
validProfile.enableValidation();

//отрисовывает карточки
const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = createCard(item);
        }
    },
    listContainerElements
);
cardList.rendererCard();

//создает карточку
function createCard(data) {
    const card = new Card(data, ".template", handleImageClick);
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
    return cardElement;
}
//присваивание элементов и открытие картинка попап берет из Card.js
function handleImageClick(name, link) {
    const Fullsize = new PopupWithImage(popupImage);
    Fullsize.open(name, link);
}

const imagePopup = new PopupWithImage(popupImage)
imagePopup.setEventListeners();

const inputsProfile = new UserInfo({ nameSelector: '.profile__title', jobSelector: '.profile__paragraph' });

//попап редактирования профиля
const userPopup = new PopupWithForm(profilePopup, formSubmitHandler)
userPopup.setEventListeners();

function formSubmitHandler() {
    inputsProfile.setUserInfo(firstNameInput.value, secondNameInput.value);
    userPopup.close();
}
editButton.addEventListener('click', () => {
    const userInfo = inputsProfile.getUserInfo();
    firstNameInput.value = userInfo.name;
    secondNameInput.value = userInfo.job;
    userPopup.open();
});

//попап добавления карточки
const imageAddPopup = new PopupWithForm(popupAdd, submitForm)
imageAddPopup.setEventListeners();

function submitForm(data) {
    addNewCard(data);
    imageAddPopup.close();
}
addButton.addEventListener('click', () => {
    validAdd.resetValidation();
    imageAddPopup.open();
});

function addNewCard({ name, link, alt }) {
    const cardText = name;
    const cardLink = link;
    const cardAlt = alt;
    const card = createCard({ name: cardText, link: cardLink, alt: cardAlt });
}