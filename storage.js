class Storage {

    constructor(value, storage = localStorage) {
        this.value = value;
        this.storage = storage;
    }

    set(value) {
        const messages = value;
        this.storage.setItem(this.value, JSON.stringify([...messages]));
    }

    get() {
        return JSON.parse(this.storage.getItem(this.value));
    }

    clear() {
        this.storage.removeItem(this.value);
    }

    isEmpty() {
        if (this.storage.key(this.value) === null || this.storage.key(this.value) === undefined) {
            return true;
        }
        return false;
    }
};

export const historyOfMessages = new Storage('messages', localStorage);