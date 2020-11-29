let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__editbutton');

let profileTitleNode = document.querySelector('.profile__title');
let formButtonNode = document.querySelector('.form__button');
let profileParagraphNode = document.querySelector('.profile__paragraph');

let elementHeaderLikes = document.querySelectorAll('.element__like');

let forms = document.querySelector('.form');

let firstNameInput = document.getElementById('1');
let secondNameInput = document.getElementById('2');

firstNameInput.value = profileTitleNode.textContent;
secondNameInput.value = profileParagraphNode.textContent;


editButton.addEventListener('click', togglePopupVisibility);
closeButton.addEventListener('click', togglePopupVisibility);

function togglePopupVisibility() {
    popup.classList.toggle('popup_opened');

}

forms.addEventListener('submit', handleFormSubmit);
forms.addEventListener('submit', togglePopupVisibility);

function handleFormSubmit(event) {
    event.preventDefault();
    profileTitleNode.textContent = firstNameInput.value;
    profileParagraphNode.textContent = secondNameInput.value;
}

elementHeaderLikes.forEach((elementHeaderLike) => {
    elementHeaderLike.addEventListener('click', toggleLikecolor);
});

function toggleLikecolor(event) {
    event.target.classList.toggle('element__like_active');
}