const UI_ELEMENTS = {
    SETTINGS_BUTTON: document.querySelector('.setting-button'),
    SETTINGS_MODAL_CLOSE: document.querySelector('.settings-modal__close'),
    SETTINGS_MODAL: document.querySelector('.settings-modal'),
    SETTINGS_MODAL_FORM: document.querySelector('.settings-modal__form'),
    SETTINGS_MODAL_INPUT_NAME: document.querySelector('.settings-modal__input-name'),
    SETTINGS_MODAL_BUTTON: document.querySelector('.settings-modal__button'),
    USER_NAME: document.querySelector('.user-name'),
    SEND_BUTTON: document.querySelector('.send-button'),
    INPUT_MESSAGE: document.querySelector('.message-input'),
    MY_TMPL: document.querySelector('#my-tmpl').content,
    COMPANION_TMPL: document.querySelector('#companion-tmpl').content,
    CHAT_FIELD: document.querySelector('.chat-field'),
    SEND_FORM: document.querySelector('.send-form'),
    SIGN_BUTTON: document.querySelector('.sign-button'),
    SIGN_MODAL_BUTTON: document.querySelector('.sign-modal__button'),
    SIGN_MODAL_FORM: document.querySelector('.sign-modal__form'),
    SIGN_MODAL: document.querySelector('.sign-modal'),
    SIGN_MODAL_CLOSE: document.querySelector('.sign-modal__close'),
    SIGN_MODAL_INPUT_EMAIL: document.querySelector('.sign-modal__input-email'),
};

let user = {
    name: '',
    isSigned: false,
};

let email = {};
const URL = 'https://edu.strada.one/api/user';

UI_ELEMENTS.SETTINGS_BUTTON.addEventListener('click', showSettings);
UI_ELEMENTS.SETTINGS_MODAL_CLOSE.addEventListener('click', hideSettings);
UI_ELEMENTS.SEND_BUTTON.addEventListener('click', sendMessage);
UI_ELEMENTS.SEND_FORM.addEventListener('submit', sendMessage);
UI_ELEMENTS.SETTINGS_MODAL_FORM.addEventListener('submit', saveName);
UI_ELEMENTS.SETTINGS_MODAL_BUTTON.addEventListener('click', saveName);
UI_ELEMENTS.SIGN_BUTTON.addEventListener('click', showSignIn);
UI_ELEMENTS.SIGN_MODAL_BUTTON.addEventListener('click', getCode);
UI_ELEMENTS.SIGN_MODAL_FORM.addEventListener('submit', getCode);
UI_ELEMENTS.SIGN_MODAL_CLOSE.addEventListener('click', hideSignIn);

function saveName(event) {
    event.preventDefault();
    user.isSigned = UI_ELEMENTS.SETTINGS_MODAL_INPUT_NAME.value;
    hideSettings();
    UI_ELEMENTS.USER_NAME.textContent = UI_ELEMENTS.SETTINGS_MODAL_INPUT_NAME.value;
    UI_ELEMENTS.SETTINGS_MODAL_INPUT_NAME.value = '';
};

function showSettings() {
    UI_ELEMENTS.SETTINGS_MODAL.classList.remove('hide');
};

function hideSettings() {
    UI_ELEMENTS.SETTINGS_MODAL.classList.add('hide');
}

function getTime() {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
};

function showSignIn() {
    UI_ELEMENTS.SIGN_MODAL.classList.remove('hide');
};

function hideSignIn() {
    UI_ELEMENTS.SIGN_MODAL.classList.add('hide');
};

async function getCode(event) {
    event.preventDefault();

    const myEmail = UI_ELEMENTS.SIGN_MODAL_INPUT_EMAIL.value;

    let response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(myEmail)
    });

    let result = await response.json();

    console.log(result);
};

function sendMessage(event) {
    event.preventDefault();
    if (UI_ELEMENTS.INPUT_MESSAGE.value) {
        const myTmplClone = UI_ELEMENTS.MY_TMPL.cloneNode(true).querySelector('.my-message');
        const myTmplText = myTmplClone.querySelector('.message-text');
        const myTmplTime = myTmplClone.querySelector('.message-time');
        myTmplText.textContent = user.isSigned + ': ' + UI_ELEMENTS.INPUT_MESSAGE.value;
        myTmplTime.textContent = getTime();
        UI_ELEMENTS.CHAT_FIELD.prepend(myTmplClone);
    
        UI_ELEMENTS.INPUT_MESSAGE.value = '';
    } else {
        alert('Введите сообщение.');
    };
};