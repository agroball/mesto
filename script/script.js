import { Card } from './Card.js';
import { FormValidator } from './validate.js';
import { initialCards } from './initialCards.js';

//Переменные
const profilePopup = document.getElementById("profilePopup");
const closeButton = profilePopup.querySelector(".popup__close-button");
const editButton = document.querySelector(".profile__editbutton");
const addButton = document.querySelector(".profile__addbutton");
const popupAdd = document.getElementById("addPopup");
const closeAddButton = document.getElementById("closeAddButton");
const popupImage = document.getElementById("imagePopup");
const closeImageButton = document.querySelector(".popup__close-button-image");
const profileTitleNode = document.querySelector(".profile__title");
const profileParagraphNode = document.querySelector(".profile__paragraph");
const profileForm = document.getElementById("formProfile");
const formsAdd = document.getElementById("formAddCard");
const firstNameInput = document.getElementById("name");
const secondNameInput = document.getElementById("job");
const listContainerElements = document.querySelector(".elements");
const inputElementTitle = document.getElementById("title");
const inputElementLink = document.getElementById("link");
// const templateElement = document.querySelector(".template");
const popupElementImage = document.querySelector('.popup__image');
const popupElementTitle = document.querySelector('.popup__title');
// const submitElementProfile = document.getElementById("submitProfile");

// Отрисовка карточек 
initialCards.forEach((item) => {
    const cardElement = createCard(item);
    listContainerElements.append(cardElement);
});
//присваивание элементов и открытие картинка попап
function handleImageClick(name, link) {
    popupElementImage.src = link;
    popupElementTitle.textContent = name;
    openPopup(popupImage);
}

function createCard(item) {
    const card = new Card(item, ".template", handleImageClick);
    const cardElement = card.generateCard();
    return cardElement
}

//открытие попап
function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', handlePressButton);
    document.addEventListener('click', handleOverlayClick);
}
//закрытие попап
function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', handlePressButton);
    document.removeEventListener('click', handleOverlayClick);
}
// редактирование профиля
function handleFormSubmit(event) {
    event.preventDefault();
    profileTitleNode.textContent = firstNameInput.value;
    profileParagraphNode.textContent = secondNameInput.value;
    closePopup(profilePopup);
}
//закрытие по esc
function handlePressButton(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}
//закрытие по клику на оверлэй
function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
}

function addNewItem(evt) {
    evt.preventDefault();
    const card = createCard({
        name: inputElementTitle.value,
        link: inputElementLink.value,
    });
    listContainerElements.prepend(card);
    closePopup(popupAdd);
    formsAdd.reset();
}
formsAdd.addEventListener("submit", addNewItem);

//Обработчики
//открытие попап добавления карточки
addButton.addEventListener("click", () => {
    openPopup(popupAdd);
});
//открытие редактирования профиля
editButton.addEventListener("click", () => {
    firstNameInput.value = profileTitleNode.textContent;
    secondNameInput.value = profileParagraphNode.textContent;
    openPopup(profilePopup);
});
//закрытие редактора на крест
closeButton.addEventListener("click", () => {
    closePopup(profilePopup);
});
//закрытие добавления карточки на крест
closeAddButton.addEventListener("click", () => {
    closePopup(popupAdd);
});
//закрытие картинки на крест
closeImageButton.addEventListener("click", () => {
    closePopup(popupImage);
});
//обработчик закрытия редактирования при сабмите
profileForm.addEventListener("submit", handleFormSubmit);

//валидация
const config = {
    formSelector: '.form',
    inputSelector: '.form__name',
    submitButtonSelector: '.form__button',
    buttonSelectorInvalid: 'form__button_invalid',
    inputSelectorInvalid: 'popup__input_state_invalid'
};
//добавление валидации в формам
const validAdd = new FormValidator(config, formsAdd);
validAdd.enableValidation();

const validProfile = new FormValidator(config, profileForm);
validProfile.enableValidation();