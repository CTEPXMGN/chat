import {UI_ELEMENTS, URLS} from "./view.js";

UI_ELEMENTS.SETTINGS_BUTTON.addEventListener('click', showSettings);
UI_ELEMENTS.SETTINGS_MODAL_CLOSE.addEventListener('click', hideSettings);
UI_ELEMENTS.SEND_FORM.addEventListener('submit', sendMessage);
UI_ELEMENTS.SETTINGS_MODAL_FORM.addEventListener('submit', setName);
UI_ELEMENTS.SIGN_BUTTON.addEventListener('click', showSignIn);
UI_ELEMENTS.SIGN_MODAL_FORM.addEventListener('submit', getCode);
UI_ELEMENTS.SIGN_MODAL_CLOSE.addEventListener('click', hideSignIn);
UI_ELEMENTS.CONFIRM_MODAL_CLOSE.addEventListener('click', hideConfirm);
UI_ELEMENTS.CONFIRM_MODAL_FORM.addEventListener('submit', saveCoockie);

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

function showConfirm() {
    UI_ELEMENTS.CONFIRM_MODAL.classList.remove('hide');
};

function hideConfirm() {
    UI_ELEMENTS.CONFIRM_MODAL.classList.add('hide');
};

function inputChat() {

};

function saveCoockie(event) {
    event.preventDefault();

    document.cookie = 'token=' + UI_ELEMENTS.CONFIRM_MODAL_INPUT_TOKEN.value;
    hideConfirm();
    showSettings();
};

async function getHistory() {
    const response = await fetch(URLS.URL_MESSAGES, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${getCookie('token')}`,
        },
    });
    let result = await response.json();
    // console.log(result.messages);
    const messages = result.messages;

    for (let i = 0; i <= 10; i++) {
        renderMessages(messages[i]);
    };
};

getHistory();

async function getUser() {

    const response = await fetch(URLS.URL_NAME, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${getCookie('token')}`,
        },
    });
    let result = await response.json();
    console.log(result);
};

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

async function setName(event) {
    event.preventDefault();
    const myName = {
        name: UI_ELEMENTS.SETTINGS_MODAL_INPUT_NAME.value,
    }

    const response = await fetch(URLS.URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${getCookie('token')}`,
        },
        body: JSON.stringify(myName),
    });

    getUser();
    hideSettings();
};

async function getCode(event) {
    event.preventDefault();

    let myEmail = {
        email: UI_ELEMENTS.SIGN_MODAL_INPUT_EMAIL.value,
    };

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(myEmail),
    });

    let result = await response.json();
    console.log(result);

    hideSignIn();
    showConfirm();
};

function sendMessage(event, item) {
    // event.preventDefault();
    // if (UI_ELEMENTS.INPUT_MESSAGE.value) {
        console.log(item);
        const myTmplClone = UI_ELEMENTS.MY_TMPL.cloneNode(true).querySelector('.my-message');
        const myTmplText = myTmplClone.querySelector('.message-text');
        const myTmplTime = myTmplClone.querySelector('.message-time');
        // myTmplText.textContent = item.text + ': ' + UI_ELEMENTS.INPUT_MESSAGE.value;
        myTmplText.textContent = item.user.name + ': ' + item.text;
        myTmplTime.textContent = getTime();
        UI_ELEMENTS.CHAT_FIELD.prepend(myTmplClone);
    
        UI_ELEMENTS.INPUT_MESSAGE.value = '';
    // } else {
    //     alert('Введите сообщение.');
    // };
};

function renderMessages(item) {
    const companionTmplClone = UI_ELEMENTS.COMPANION_TMPL.cloneNode(true).querySelector('.companion-message');
    const companionTmplText = companionTmplClone.querySelector('.message-text');
    const companionTmplTime = companionTmplClone.querySelector('.message-time');
    // myTmplText.textContent = item.text + ': ' + UI_ELEMENTS.INPUT_MESSAGE.value;
    companionTmplText.textContent = item.user.name + ': ' + item.text;
    companionTmplTime.textContent = getTime();
    UI_ELEMENTS.CHAT_FIELD.prepend(companionTmplClone);
}