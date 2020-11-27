let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__editbutton');

const profileTitleNode = document.querySelector('.profile__title');
const formButtonNode = document.querySelector('.form__button');
const profileParagraphNode = document.querySelector('.profile__paragraph');


editButton.addEventListener('click', togglePopupVisibility);
closeButton.addEventListener('click', togglePopupVisibility);

function togglePopupVisibility() {
    popup.classList.toggle('popup__opened');
}

const forms = [...document.querySelectorAll('.form')];

forms.forEach((formNode) => {
    formNode.addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(event) {
    event.preventDefault();
    let formNameNode = event.currentTarget.querySelector('.form__name');
    let formJobNode = event.currentTarget.querySelector('.form__job');
    profileTitleNode.textContent = formNameNode.value;
    profileParagraphNode.textContent = formJobNode.value;
}

let elementHeaderLike = document.querySelectorAll('.element__header_like');

elementHeaderLike.addEventListener('click', toggleLikecolor);

function toggleLikecolor() {
    elementHeaderLike.classList.toggle('element__header_like_black');
}