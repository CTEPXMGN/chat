import {UI_ELEMENTS, URLS, email, messageClasses} from "./view.js";
// import format from 'date-fns/format';

UI_ELEMENTS.SETTINGS_BUTTON.addEventListener('click', showSettings);
UI_ELEMENTS.SETTINGS_MODAL_CLOSE.addEventListener('click', hideSettings);
UI_ELEMENTS.SEND_FORM.addEventListener('submit', sendMessage);
UI_ELEMENTS.SETTINGS_MODAL_FORM.addEventListener('submit', setName);
UI_ELEMENTS.SIGN_BUTTON.addEventListener('click', showSignIn);
UI_ELEMENTS.SIGN_MODAL_FORM.addEventListener('submit', getCode);
UI_ELEMENTS.SIGN_MODAL_CLOSE.addEventListener('click', hideSignIn);
UI_ELEMENTS.CONFIRM_MODAL_CLOSE.addEventListener('click', hideConfirm);
UI_ELEMENTS.CONFIRM_MODAL_FORM.addEventListener('submit', saveCoockie);
// UI_ELEMENTS.STATUS.addEventListener('click', scrollDown);
UI_ELEMENTS.CHAT_FIELD.addEventListener('scroll', loadMessages);

function showSettings() {
    UI_ELEMENTS.SETTINGS_MODAL.classList.remove('hide');
};

function hideSettings() {
    UI_ELEMENTS.SETTINGS_MODAL.classList.add('hide');
}

function getTime(data) {
    return data.slice(11, 16);
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
    const messages = result.messages.reverse();
    console.log(messages);

    for (let i = 0; i <= 20; i++) {
        if (messages[i].user.email === email) {
            renderMessage(element, messageClasses.my);
        } else {
            renderMessage(messages[i], messageClasses.companion);
        };
    };
};

// function scrollDown() {
//     console.log('!!!');
//     UI_ELEMENTS.CHAT_FIELD.scrollBy({
//         top: 40000,

//     });
// }

async function getUser() {

    await fetch(URLS.URL_NAME, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${getCookie('token')}`,
        },
    });
};

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

async function setName(event) {
    event.preventDefault();
    const myName = {
        name: UI_ELEMENTS.SETTINGS_MODAL_INPUT_NAME.value,
    }

    await fetch(URLS.URL, {
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

    const response = await fetch(URLS.URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(myEmail),
    });

    if (response.ok) {
        hideSignIn();
        showConfirm();
    } else {
        alert('Запрос на сервер не прошёл(((')
    };
};

const socket = new WebSocket(`wss://edu.strada.one/websockets?${getCookie('token')}`);

socket.onopen = function(e) {
    console.log('Connected...');
    UI_ELEMENTS.STATUS.textContent = 'Connected...';
};

socket.onclose = function(e) {
    UI_ELEMENTS.STATUS.textContent = 'Disconnected...';
    console.log('Disconnected...');
    socket.onopen;
};

if (getCookie('token')) {
    getHistory();
} else {
    showSignIn();
};

function sendMessage(e) {
    e.preventDefault();

    // socket.send(JSON.stringify({ text: UI_ELEMENTS.INPUT_MESSAGE.value }));
    // socket.onmessage = function(event) {
    //     const data = JSON.parse(event.data);
    //     if (data.user.email === email) {
    //         renderMessage(data, messageClasses.my);
    //     } else {
    //         renderMessage(data, messageClasses.companion);
    //     };
    // };

    if (UI_ELEMENTS.INPUT_MESSAGE.value) {
        socket.send(JSON.stringify({ text: UI_ELEMENTS.INPUT_MESSAGE.value }));
        socket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            if (data.user.email === email) {
                renderMessage(data, messageClasses.my);
            } else {
                renderMessage(data, messageClasses.companion);
            };
        };
    } else {
        console.log('Введите хоть что-нить.');
    }
    
    UI_ELEMENTS.INPUT_MESSAGE.value = '';
};

function renderMessage(item, classMessage) {
    const tmplClone = UI_ELEMENTS.TMPL.cloneNode(true).querySelector('.message');
    tmplClone.classList.add(classMessage);
    const tmplText = tmplClone.querySelector('.message-text');
    const tmplTime = tmplClone.querySelector('.message-time');
    tmplText.textContent = item.user.name + ': ' + item.text;
    tmplTime.textContent = getTime(item.createdAt);
    UI_ELEMENTS.CHAT_FIELD.append(tmplClone);
    tmplClone.scrollIntoView(false);
};

function loadMessages() {
    if (this.scrollTop === 0) {
        console.log('Конец страницы.');
    };
};