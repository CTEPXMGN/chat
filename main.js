const UI_ELEMENTS = {
    SETTING_BUTTON: document.querySelector('.setting-button'),
    SETTINGS_MODAL_CLOSE: document.querySelector('.settings-modal__close'),
    SETTINGS_MODAL: document.querySelector('.settings-modal'),
}

UI_ELEMENTS.SETTING_BUTTON.addEventListener('click', function() {
    const modal = UI_ELEMENTS.SETTINGS_MODAL;
    modal.classList.remove('hide');
});

UI_ELEMENTS.SETTINGS_MODAL_CLOSE.addEventListener('click', function() {
    const modal = UI_ELEMENTS.SETTINGS_MODAL;
    modal.classList.add('hide');
})