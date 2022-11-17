const UI_ELEMENTS = {
    SETTING_BUTTON: document.querySelector('.setting-button'),
    SETTINGS_MODAL_CLOSE: document.querySelector('.settings-modal__close'),
    SETTINGS_MODAL: document.querySelector('.settings-modal'),
    SETTINGS_MODAL_FORM: document.querySelector('.settings-modal__form'),
    SETTINGS_MODAL_INPUT_NAME: document.querySelector('.settings-modal__input-name'),
    SEND_BUTTON: document.querySelector('.send-button'),
    INPUT_MESSAGE: document.querySelector('.message-input'),
    MY_TMPL: document.querySelector('#my-tmpl').content,
    COMPANION_TMPL: document.querySelector('#companion-tmpl').content,
    CHAT_FIELD: document.querySelector('.chat-field'),
    SEND_FORM: document.querySelector('.send-form'),
};

let myName = '';

UI_ELEMENTS.SETTING_BUTTON.addEventListener('click', showSettings);
UI_ELEMENTS.SETTINGS_MODAL_CLOSE.addEventListener('click', hideSettings);
UI_ELEMENTS.SEND_BUTTON.addEventListener('click', sendMessage);
UI_ELEMENTS.SEND_FORM.addEventListener('submit', sendMessage);
UI_ELEMENTS.SETTINGS_MODAL_FORM.addEventListener('submit', saveName);

function saveName(event) {
    event.preventDefault();
    myName = UI_ELEMENTS.SETTINGS_MODAL_INPUT_NAME.value;
    hideSettings();
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

function sendMessage(event) {
    event.preventDefault();
    if (UI_ELEMENTS.INPUT_MESSAGE.value) {
        const myTmplClone = UI_ELEMENTS.MY_TMPL.cloneNode(true).querySelector('.my-message');
        const myTmplText = myTmplClone.querySelector('.message-text');
        const myTmplTime = myTmplClone.querySelector('.message-time');
        myTmplText.textContent = myName + ': ' + UI_ELEMENTS.INPUT_MESSAGE.value;
        myTmplTime.textContent = getTime();
        UI_ELEMENTS.CHAT_FIELD.prepend(myTmplClone);
    
        UI_ELEMENTS.INPUT_MESSAGE.value = '';
    } else {
        alert('Введите сообщение.');
    };
};