// Переменные
const placesList = document.querySelector('.places-list');

const newCardForm = document.forms.new;
const editUserForm = document.forms.user;
const buttonOpenPopup = document.querySelector('.user-info__button');
const buttonPopupEditUser = document.querySelector('.user-info__edit-button');
let buttonClosePopup = document.querySelectorAll('.popup__close');
const buttonAddCard = document.querySelector('.popup__button');
const newCardPopup = document.querySelector('#add-new-card');
const popupEditProfile = document.querySelector('#edit-user-info');
const popupBigImage = document.querySelector('#show-image');
const bigImage = document.querySelector('.popup__big-image');
const submitEditUser = popupEditProfile.querySelector('.popup__button');
const submitFormButton = newCardPopup.querySelector('.popup__button');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
      name: 'Нургуш',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
    },
    {
      name: 'Тулиновка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
    },
    {
      name: 'Остров Желтухина',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
    },
    {
      name: 'Владивосток',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
     }
  ];


  // Функции


// функция добавления карточек

function createCard(name,  link) {

    const placeCard = document.createElement('div');
    const cardImage = document.createElement('div');
    const deleteIcon = document.createElement('button');
    const cardDesc = document.createElement('div');
    const cardName = document.createElement('h3');
    const likeIcon = document.createElement('button');

    placeCard.classList.add('place-card');
    cardImage.classList.add('place-card__image');
    placeCard.appendChild(cardImage);
    cardImage.setAttribute('imageURL', `${link}`);
    cardImage.setAttribute('style',`background-image: url(${link})`);

    cardDesc.classList.add('place-card__description');
    placeCard.appendChild(cardDesc);

    cardName.classList.add('place-card__name');
    cardName.textContent = `${name}`;
    cardDesc.appendChild(cardName);

    likeIcon.classList.add('place-card__like-icon');
    cardDesc.appendChild(likeIcon);

    deleteIcon.classList.add('place-card__delete-icon');
    cardImage.appendChild(deleteIcon);


    likeIcon.addEventListener('click', likaCardHandler);
    deleteIcon.addEventListener('click', removeCardHandler);
    placeCard.addEventListener('click', openForm);

    return placeCard;
}


// лайк на карточку
function likaCardHandler(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
}

// удаление карточки по нажатию

function removeCardHandler(event) {
    const card = event.target.closest('.place-card');
    card.parentNode.removeChild(card);
}

// функции для видоизменения кнопок добавить

function disablePopUpButton(button) {
  button.setAttribute('disabled', true);
  button.classList.add('popup__button_disabled');
}

function enablePopUpButton(button) {
  button.removeAttribute('disabled');
  button.classList.remove('popup__button_disabled');
}


function isValid(elementToCheck) {
  const errorElement = document.querySelector(`#error-${elementToCheck.name}`)

  if (!elementToCheck.validity.valid) {

      if (elementToCheck.validity.typeMismatch) { 
        errorElement.textContent = 'Здесь должна быть ссылка';
       }

      if (elementToCheck.value.length < Number(elementToCheck.getAttribute('minlength'))) {

          if (elementToCheck.validity.valueMissing) { 
            errorElement.textContent = 'Это обязательное поле';
           }
          else {
             errorElement.textContent = 'Длина должна быть от 2 до 30 символов';
             }
      }

      return false;
  } 
  else {

      errorElement.textContent = '';
      return true;
  }
}

function validateEditProfile() {
  let validateUserName = isValid(editUserForm.elements.username);
  let validateAbout = isValid(editUserForm.elements.about);

  if (validateUserName && validateAbout) { 
    enablePopUpButton(submitEditUser);
   }
  else {
     disablePopUpButton(submitEditUser);
     }
}

function validateAddCard() {
  let validatePlace = isValid(newCardForm.elements.name);
  let validateURL = isValid(newCardForm.elements.link);

  if (validatePlace && validateURL) {


      enablePopUpButton(submitFormButton);
  } 
  
  else {

      disablePopUpButton(submitFormButton);
  }
}

// функция для открытия формы

function openForm(event) {
    if (event.target.classList.contains('user-info__button')) {
      newCardPopup.classList.add('popup_is-opened')
    }

    if (event.target.classList.contains('user-info__edit-button')) {
        popupEditProfile.classList.add('popup_is-opened')
        editUserForm.elements.username.value = document.querySelector('.user-info__name').textContent;
        editUserForm.elements.about.value = document.querySelector('.user-info__job').textContent;
    }

    if (event.target.classList.contains('place-card__image')) {
      bigImage.src = event.target.getAttribute('imageURL');
      popupBigImage.classList.add('popup_is-opened');
  }
}

// функция для закрытия формы

function closeForm() {
    if (event.target.classList.contains('popup__close')) {
      event.target.closest('.popup').classList.remove('popup_is-opened');
  }
}

//создание новой карточки по жмяку

 function addCard(event) {
    event.preventDefault();

    const link = newCardForm.elements.link;
    const name = newCardForm.elements.name;
    const cardContainer = createCard(name.value, link.value);
    placesList.appendChild(cardContainer);
    newCardForm.reset();
    // closeForm();
    newCardPopup.classList.remove('popup_is-opened');
}


// редактирование данных профиля

function editFormSubmit(event) {
  event.preventDefault();
  document.querySelector('.user-info__name').textContent = editUserForm.elements.username.value;
  document.querySelector('.user-info__job').textContent = editUserForm.elements.about.value;
  popupEditProfile.classList.remove('popup_is-opened');
}

//Обработчики событий
editUserForm.addEventListener('submit', editFormSubmit);
newCardForm.addEventListener('submit', addCard);
buttonOpenPopup.addEventListener('click', openForm);
buttonPopupEditUser.addEventListener('click', openForm);
buttonClosePopup.forEach(elem => elem.addEventListener('click', closeForm));
editUserForm.addEventListener('input', validateEditProfile);
newCardForm.addEventListener('input', validateAddCard);
//Вызовы функций

// прогрузка 10 карточек по умолчанию
initialCards.forEach((card) => {
  const cardElement = createCard(card.name, card.link);
  placesList.appendChild(cardElement);
})