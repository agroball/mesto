let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__editbutton');

let profileTitleNode = document.querySelector('.profile__title');
let formButtonNode = document.querySelector('.form__button');
let profileParagraphNode = document.querySelector('.profile__paragraph');

let elementHeaderLikes = document.querySelectorAll('.element__like');


editButton.addEventListener('click', togglePopupVisibility);
closeButton.addEventListener('click', togglePopupVisibility);

function togglePopupVisibility() {
    popup.classList.toggle('popup__opened');
}

let forms = [...document.querySelectorAll('.form')];

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

elementHeaderLikes.forEach((elementHeaderLike) => {
    elementHeaderLike.addEventListener('click', toggleLikecolor);
});


function toggleLikecolor(event) {
    event.target.classList.toggle('element__like_black');
}