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
const templateElement = document.querySelector(".template");
const popupElementImage = document.querySelector('.popup__image');
const popupElementTitle = document.querySelector('.popup__title');
const submitElementProfile = document.getElementById("submitProfile");
const initialCards = [{
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
//Функции
function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', handlePressButton);
    document.addEventListener('click', handleOverlayClick);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', handlePressButton);
    document.removeEventListener('click', handleOverlayClick);
}

function handleFormSubmit(event) {
    event.preventDefault();
    profileTitleNode.textContent = firstNameInput.value;
    profileParagraphNode.textContent = secondNameInput.value;
    closePopup(profilePopup);
}

function handlePressButton(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
}

function renderList() {
    const listItems = initialCards.map(composeItem);
    listContainerElements.append(...listItems);
}

function bindAddItemListener() {
    formsAdd.addEventListener("submit", addNewItem);
}

function addNewItem(event) {
    event.preventDefault();
    const inputTitle = inputElementTitle.value;
    const inputLink = inputElementLink.value;
    const newItem = composeItem({ name: inputTitle, link: inputLink });
    listContainerElements.prepend(newItem);
    closePopup(popupAdd);
    formsAdd.reset();
}

function removeItem(e) {
    e.target.closest('.element').remove();
}

function composeItem(item) {
    const newItem = templateElement.content.cloneNode(true);
    const textItem = newItem.querySelector(".element__text");
    textItem.textContent = item.name;
    const imageElement = newItem.querySelector(".element__link");
    imageElement.src = item.link;
    imageElement.alt = item.name;
    const removeButton = newItem.querySelector('.element__trash');
    removeButton.addEventListener('click', removeItem);
    // Луйки
    const likeButton = newItem.querySelector('.element__like');
    likeButton.addEventListener('click', (evt) => {
        evt.target.closest('.element__like').classList.toggle('element__like_active');
    });
    // Попап картинки
    imageElement.addEventListener('click', () => {
        popupElementImage.src = item.link;
        popupElementImage.alt = item.name;
        popupElementTitle.textContent = item.name;
        openPopup(popupImage);
    });
    return newItem;
}
//Обработчики
addButton.addEventListener("click", () => {
    openPopup(popupAdd);
});
editButton.addEventListener("click", () => {
    firstNameInput.value = profileTitleNode.textContent;
    secondNameInput.value = profileParagraphNode.textContent;
    openPopup(profilePopup);
});

closeButton.addEventListener("click", () => {
    closePopup(profilePopup);
});
closeAddButton.addEventListener("click", () => {
    closePopup(popupAdd);
});

closeImageButton.addEventListener("click", () => {
    closePopup(popupImage);
});

profileForm.addEventListener("submit", handleFormSubmit);
//Вызов функций
renderList();
bindAddItemListener();