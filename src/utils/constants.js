//Переменные
export const profilePopup = document.getElementById("profilePopup");
export const closeButton = profilePopup.querySelector(".popup__close-button");
export const editButton = document.querySelector(".profile__editbutton");
export const addButton = document.querySelector(".profile__addbutton");
export const popupAdd = document.getElementById("addPopup");
export const closeAddButton = document.getElementById("closeAddButton");
export const popupImage = document.getElementById("imagePopup");
export const closeImageButton = document.querySelector(".popup__close-button-image");
export const profileTitleNode = document.querySelector(".profile__title");
export const profileParagraphNode = document.querySelector(".profile__paragraph");
export const profileForm = document.getElementById("formProfile");
export const formsAdd = document.getElementById("formAddCard");
export const firstNameInput = document.getElementById("name");
export const secondNameInput = document.getElementById("job");
export const listContainerElements = document.querySelector(".elements");
export const inputElementTitle = document.getElementById("title");
export const inputElementLink = document.getElementById("link");
// const templateElement = document.querySelector(".template");
export const popupElementImage = document.querySelector('.popup__image');
export const popupElementTitle = document.querySelector('.popup__title');
// const submitElementProfile = document.getElementById("submitProfile");
//валидация
export const config = {
    formSelector: '.form',
    inputSelector: '.form__name',
    submitButtonSelector: '.form__button',
    buttonSelectorInvalid: 'form__button_invalid',
    inputSelectorInvalid: 'popup__input_state_invalid'
};