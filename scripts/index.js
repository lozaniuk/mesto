const popupOpenEdit = document.querySelector(".popup_type_edit");
const popupOpenAdd = document.querySelector(".popup_type_add");
const popupOpenImage = document.querySelector(".popup_type_open-image");
const popupCloseProfile = document.querySelector(
    ".popup__close-button_type_edit"
);
const popupCloseBtnAdd = document.querySelector(
    ".popup__close-button_type_add"
);
const popupCloseBtnImage = document.querySelector(
    ".popup__close-button_type_image"
);
const popupOpenBtnEdit = document.querySelector(".profile__edit-button");
const popupOpenBtnAdd = document.querySelector(".profile__add-button");
const popupEditForm = document.querySelector(".popup__form_type_edit");
const popupAddForm = document.querySelector(".popup__form_type_add");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const template = document
    .querySelector("#element")
    .content.querySelector(".element__item");
const cards = document.querySelector(".element");
const titleInput = document.querySelector(".popup__input_type_title");
const linkInput = document.querySelector(".popup__input_type_link");
const popupImage = document.querySelector(".popup__image");
const popupSubtitle = document.querySelector(".popup__subtitle");
const popupSubmitAdd = document.querySelector(".popup__submit_type_add");
function showInitialCards() {
    const elements = initialCards.map((item) => {
        return createCard(item);
    });

    cards.append(...elements);
}

showInitialCards();

function createCard(item) {
    const card = template.cloneNode(true);
    const cardImage = card.querySelector(".element__image");
    cardImage.src = item.link;
    cardImage.alt = item.name;
    card.querySelector(".element__title").textContent = item.name;

    card.querySelector(".element__trash").addEventListener("click", () => {
        card.remove();
    });

    card.querySelector(".element__button").addEventListener(
        "click",
        (event) => {
            event.currentTarget.classList.toggle("element__button_active");
        }
    );

    cardImage.addEventListener("click", () => {
        openPopup(popupOpenImage);
        popupImage.src = item.link;
        popupImage.alt = item.name;
        popupSubtitle.textContent = item.name;
    });

    return card;
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.addEventListener("keydown", keyHandlerEscape);
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", keyHandlerEscape);
}

popupOpenBtnEdit.addEventListener("click", function () {
    openPopup(popupOpenEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
});

popupOpenBtnAdd.addEventListener("click", function () {
    openPopup(popupOpenAdd);
    disableButton(popupSubmitAdd);
});

popupCloseProfile.addEventListener("click", function () {
    popupEditForm.reset();
    closePopup(popupOpenEdit);
});

popupCloseBtnAdd.addEventListener("click", function () {
    closePopup(popupOpenAdd);
});

popupCloseBtnImage.addEventListener("click", function () {
    closePopup(popupOpenImage);
});

function editSubmitForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupOpenEdit);
}

popupEditForm.addEventListener("submit", editSubmitForm);

function addSubmitForm(evt) {
    evt.preventDefault();
    const title = titleInput.value;
    const link = linkInput.value;

    const card = createCard({ name: title, link: link });

    cards.prepend(card);
    popupAddForm.reset();
    closePopup(popupOpenAdd);
}

popupAddForm.addEventListener("submit", addSubmitForm);

// Закрытие попапа нажатием на Esc
function keyHandlerEscape(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector(".popup_opened");
        closePopup(popupOpened);
    }
}
// Закрытие попапа кликом на оверлей
const popupOverlays = document.querySelectorAll(".popup");
popupOverlays.forEach((item) => {
    item.addEventListener("mousedown", (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(evt.target);
        }
    });
});
