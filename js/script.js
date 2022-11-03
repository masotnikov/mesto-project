const initialCards = [
  {
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

// ------------------popup_profile----------------------//

const profileButton = document.querySelector(".profile__button");
const addImageButton = document.querySelector(".profile__wide-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__description");
const popupButtonClose = document.querySelector(".popup__close");

const nameInput = document.querySelector(".popup__inpute-name");
const jobInput = document.querySelector(".popup__inpute-about");

//открытие попап профайл
const popupProfile = document.querySelector("#popup-profile");

function popupOpened(popup) {
  popup.classList.add("popup_opened");
}

profileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  popupOpened(popupProfile);
});

//закрытие попап профайл
function popupClosed(popup) {
  popup.classList.remove("popup_opened");
}

popupButtonClose.addEventListener("click", () => {
  popupClosed(popupProfile);
});

// Обработчик «отправки» формы
const formProfile = document.querySelector(".popup__form");

function FormSubmitProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;

  popupClosed(popupProfile);
}

formProfile.addEventListener("submit", FormSubmitProfile);

//открытие попап addImage
const popupImage = document.querySelector("#popup-image");
addImageButton.addEventListener("click", () => {
  popupOpened(popupImage);

});

//закрытие попап addImage

const closedImageButton = document.querySelector("#close-image");
closedImageButton.addEventListener("click", () => {
  popupClosed(popupImage);
});

// функция добавления карточки
function addImage(titleValue, linkValue) {
  const gridContainer = document.querySelector(".elements");
  const gridTemplate = document.querySelector("#grid-template").content;
  const gridElement = gridTemplate.querySelector(".element").cloneNode(true);
  const title = gridElement.querySelector(".element__title");
  const link =  gridElement.querySelector(".element__photo");
  title.textContent = titleValue;
  link.src = linkValue;
  link.alt = titleValue;
  gridElement.querySelector(".element__like").addEventListener('click', function (evt){
    evt.target.classList.toggle("element__like_active");
  });
  gridElement.querySelector(".element__trash").addEventListener('click', function (evt){
    evt.target.closest(".element").remove();
  });

  gridContainer.prepend(gridElement);

}

//функция удаления карточки

const buttonTrash = document.querySelectorAll(".element__trash");
for (let i = 0; i < buttonTrash.length; i++) {
  buttonTrash[i].addEventListener("click", function (evt) {
    evt.target.closest(".element").remove();
  });
}

//переключение лайков/дизлайков
let buttonLike = document.querySelectorAll(".element__like");
for (let i = 0; i < buttonLike.length; i++) {
  buttonLike[i].addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like_active");
  });
}

// обработчик формы добавления картинок
const buttonAddImage = document.querySelector("#button-add-image");
const formImage = document.querySelector(".popup__form-image");

function FormSubmitImage(evt) {
  evt.preventDefault();
  let title = document.querySelector("#input-title");
  let src = document.querySelector("#input-src");

  addImage(title.value, src.value);
  popupClosed(popupImage);

  title.value= '';
  src.value = '';
}

formImage.addEventListener("submit", FormSubmitImage);

