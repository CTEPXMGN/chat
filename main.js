const UI_ELEMENTS = {
    SETTING_BUTTON: document.querySelector('.setting-button'),
    SETTINGS_MODAL_CLOSE: document.querySelector('.settings-modal__close'),
    SETTINGS_MODAL: document.querySelector('.settings-modal'),
    SEND_BUTTON: document.querySelector('.send-button'),
    INPUT_MESSAGE: document.querySelector('.message-input'),
    MY_TMPL: document.querySelector('#my-tmpl').content,
    COMPANION_TMPL: document.querySelector('#companion-tmpl').content,
    CHAT_FIELD: document.querySelector('.chat-field'),
};



UI_ELEMENTS.SETTING_BUTTON.addEventListener('click', function() {
    UI_ELEMENTS.SETTINGS_MODAL.classList.remove('hide');
});

UI_ELEMENTS.SETTINGS_MODAL_CLOSE.addEventListener('click', function() {
    UI_ELEMENTS.SETTINGS_MODAL.classList.add('hide');
});

UI_ELEMENTS.SEND_BUTTON.addEventListener('click', sendMessage);

function getTime() {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
}

function sendMessage() {
    if (UI_ELEMENTS.INPUT_MESSAGE.value) {
        const myTmplClone = UI_ELEMENTS.MY_TMPL.cloneNode(true).querySelector('.my-message');
        const myTmplText = myTmplClone.querySelector('.message-text');
        const myTmplTime = myTmplClone.querySelector('.message-time');
        myTmplText.textContent = 'Я: ' + UI_ELEMENTS.INPUT_MESSAGE.value;
        myTmplTime.textContent = getTime();
        UI_ELEMENTS.CHAT_FIELD.prepend(myTmplClone);
    
        UI_ELEMENTS.INPUT_MESSAGE.value = '';
    } else {
        alert('Введите сообщение.');
    };
};