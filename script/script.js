let closeButton = document.querySelector(".popup__close-button");
let editButton = document.querySelector(".profile__editbutton");
let addButton = document.querySelector(".profile__addbutton");
let closeAddButton = document.querySelector(".popup-add__close-button");
let popup = document.querySelector(".popup");
let popupAdd = document.querySelector(".popup-add");
let popupImage = document.querySelector(".popup-image");
let closeImageButton = document.querySelector(".popup-image__close-button");
let profileTitleNode = document.querySelector(".profile__title");
let profileParagraphNode = document.querySelector(".profile__paragraph");
let forms = document.getElementById("formProfile");
let formsAdd = document.getElementById("formAddCard");
let firstNameInput = document.getElementById("1");
let secondNameInput = document.getElementById("2");
const listContainerElements = document.querySelector(".elements");
const inputElementTitle = document.getElementById("title");
const inputElementLink = document.getElementById("link");
const templateElement = document.querySelector(".template");
const popupElementImage = document.querySelector('.popup-image__image');
const popupElementTitle = document.querySelector('.popup-image__title');

// Массив
let initialCards = [{
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];
// Открытие/Закрытие попапов

function openPopup(popup) {
    popup.classList.add("popup_opened");
}
addButton.addEventListener("click", () => {
    openPopup(popupAdd);
});
editButton.addEventListener("click", () => {
    firstNameInput.value = profileTitleNode.textContent;
    secondNameInput.value = profileParagraphNode.textContent;
    openPopup(popup);
});


function closePopup(popup) {
    popup.classList.remove("popup_opened");
}
closeButton.addEventListener("click", () => {
    closePopup(popup);
});
closeAddButton.addEventListener("click", () => {
    closePopup(popupAdd);
});

forms.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    profileTitleNode.textContent = firstNameInput.value;
    profileParagraphNode.textContent = secondNameInput.value;
    closePopup(popup);
}

function renderList() {
    const listItems = initialCards.map(ComposeItem);
    listContainerElements.append(...listItems);
}

function ComposeItem(item) {
    const NewItem = templateElement.content.cloneNode(true);
    const textItem = NewItem.querySelector(".element__text");
    textItem.textContent = item.name;
    const imageElement = NewItem.querySelector(".element__link");
    imageElement.setAttribute("src", item.link);
    const removeButton = NewItem.querySelector('.element__trash');
    removeButton.addEventListener('click', removeItem);
    // Луйки
    const likeButton = NewItem.querySelector('.element__like');
    likeButton.addEventListener('click', (evt) => {
        const EventTarget = evt.target.closest('.element__like');
        EventTarget.classList.toggle('element__like_active');
    });
    // Попап картинки
    imageElement.addEventListener('click', () => {
        popupElementImage.src = item.link;
        popupElementTitle.textContent = item.name;
        openPopup(popupImage);
    });
    closeImageButton.addEventListener("click", () => {
        closePopup(popupImage);
    });
    return NewItem;
}

function bindAddItemListener() {
    const addButtonElement = document.getElementById("submitAdd");
    addButtonElement.addEventListener("click", AddNewItem);
}

function AddNewItem(event) {
    event.preventDefault();
    const inputTitle = inputElementTitle.value;
    const inputLink = inputElementLink.value;
    const newItem = ComposeItem({ name: inputTitle, link: inputLink });
    listContainerElements.prepend(newItem);
    closePopup(popupAdd);
}

function removeItem(e) {
    const targetElement = e.target;
    const targetItem = targetElement.closest('.element');
    targetItem.remove();
}

renderList();
bindAddItemListener();