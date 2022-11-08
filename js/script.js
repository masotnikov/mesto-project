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

const addImageButton = document.querySelector(".profile__wide-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__description");

const nameInput = document.querySelector(".popup__inpute-name");
const jobInput = document.querySelector(".popup__inpute-about");

//открытие попап профайл
const popupProfile = document.querySelector("#popup-profile");

function popupOpen(popup) {
  popup.classList.add("popup_opened");
}
const profileButton = document.querySelector(".profile__button");

profileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  popupOpen(popupProfile);
});


// Обработчик «отправки» формы
const formProfile = document.querySelector(".popup__form");

function handlerProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;


  closePopupAll();

}

formProfile.addEventListener("submit", handlerProfile);

//открытие попап addImage
const popupImage = document.querySelector("#popup-image");
addImageButton.addEventListener("click", () => {
  popupOpen(popupImage);
});



//карточки из коробки
const gridContainer = document.querySelector(".elements");
const gridTemplate = document.querySelector("#grid-template").content;
const placeInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link,
  };
});
function render() {
  placeInfo.forEach(renderCard);
}
function renderCard({ name, link }) {
  const placeElement = gridTemplate.querySelector(".element").cloneNode(true);
  placeElement.querySelector(".element__title").textContent = name;
  placeElement.querySelector(".element__photo").src = link;
  placeElement.querySelector(".element__photo").alt = name;
  gridContainer.prepend(placeElement);
}
render();

// функция добавления карточки
function addImage(titleValue, linkValue) {
  const gridContainer = document.querySelector(".elements");
  const gridTemplate = document.querySelector("#grid-template").content;
  const gridElement = gridTemplate.querySelector(".element").cloneNode(true);
  const title = gridElement.querySelector(".element__title");
  const link = gridElement.querySelector(".element__photo");
  title.textContent = titleValue;
  link.src = linkValue;
  link.alt = titleValue;
  gridElement
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });
  gridElement
    .querySelector(".element__trash")
    .addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
    });

  gridContainer.prepend(gridElement);
  openPhotoPopup();
  closePopupAll();
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

const formImage = document.querySelector(".popup__form-image");

function handlerImage(evt) {
  evt.preventDefault();
  let title = document.querySelector("#input-title");
  let src = document.querySelector("#input-src");

  addImage(title.value, src.value);

  title.value = "";
  src.value = "";

  closePopupAll();
}

formImage.addEventListener("submit", handlerImage);

function openPhotoPopup() {
  const gridElement = document.querySelectorAll(".element__photo");
  const popupPhoto = document.querySelector("#popup-photo");
  const photoImage = document.querySelector(".photo__image");

  for (let i = 0; i < gridElement.length; i++) {
    gridElement[i].addEventListener("click", function (evt) {
      const srcElem = evt.target.src;
        popupPhoto.classList.add("popup_opened");
        photoImage.src = srcElem;
    });
  }
  closePopupAll();
}

openPhotoPopup();

function closePopupAll() {
  let allButtonClose = document.querySelectorAll('.popup__close');
  let allSaveButton = document.querySelectorAll('.popup__button');
  for (let i = 0; i < allSaveButton.length; i++) {
    allSaveButton[i].addEventListener('click', function (evt) {
      evt.target.closest('.popup').classList.remove("popup_opened");
    })
  }
  for (let i = 0; i < allButtonClose.length; i++) {
    allButtonClose[i].addEventListener('click', function (evt) {
      evt.target.closest('.popup').classList.remove("popup_opened");
    })
  }
}

closePopupAll();


